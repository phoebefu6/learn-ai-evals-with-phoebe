/* eval-live.js - the in-browser evaluation scorecard for learn-ai-evals-with-phoebe.
 *
 * It runs a real retrieval evaluation over a GOLDEN SET (question -> expected chunk id) against
 * Recall's corpora (from rag-corpora.js). It retrieves with a deliberately SIMPLIFIED lexical
 * embedder (term frequency + a synonym map, same as the RAG course playground) so it runs with
 * zero network - but the EVALUATION MATH is the real thing: Hit Rate@k, MRR, and Precision@1 are
 * computed exactly as they are in production. Change k and watch the scorecard move.
 *
 * Usage:
 *   <div class="evalbox" data-k="3"
 *        data-caption="Change k and watch Hit Rate and MRR move"></div>
 * Requires rag-corpora.js loaded first.
 */
(function () {
  "use strict";

  /* ---- embedder (identical mechanic to the RAG course's rag-live.js) ---- */
  var SYN = [
    ["cost", "spend", "spending", "budget", "price", "cheaper", "expensive", "dollars"],
    ["cut", "reduce", "lower", "trim", "save", "saving"],
    ["hire", "hiring", "recruit", "headcount", "engineer", "engineers", "staff"],
    ["board", "quarterly", "quarter", "q2", "review"],
    ["flight", "flights", "fly", "flying", "seat", "seats", "aisle", "window", "travel", "trip"],
    ["hotel", "stay", "room", "lodging"],
    ["expense", "expenses", "receipt", "reimburse", "reimbursement", "claim"],
    ["meeting", "meetings", "calendar", "schedule", "one-to-one"],
    ["allergy", "allergic", "shellfish", "health", "medical", "medication", "tablet"],
    ["graduate", "graduation", "graduates", "daughter", "family"],
    ["payment", "pay", "gateway", "transaction"],
    ["outage", "down", "downtime", "unavailable", "failed", "failure", "error", "errors", "503"],
    ["latency", "slow", "slowness", "spike", "spiked", "performance", "peak"],
    ["login", "signin", "sign-in", "session", "sessions", "authentication"],
    ["email", "emails", "notification", "notifications", "smtp", "sending"],
    ["crash", "crashed", "crash-free", "mobile", "android", "app", "launch"],
    ["reindex", "index", "relevance", "stale"],
    ["refund", "refunds", "refunded", "return", "returns", "returned", "money", "money-back", "charged", "charge"],
    ["password", "reset", "forgot", "credentials"],
    ["shipping", "ship", "delivery", "deliver", "express"],
    ["warranty", "defect", "defects", "repair", "care"],
    ["delete", "deletion", "remove", "erase", "close", "permanently"],
    ["hours", "open", "support", "contact", "chat"],
    ["privacy", "personal", "export", "gdpr"],
    ["subscription", "renew", "renewal", "cancel", "billing"]
  ];
  var CANON = {};
  SYN.forEach(function (g) { g.forEach(function (w) { CANON[w] = g[0]; }); });
  var STOP = { "the": 1, "a": 1, "an": 1, "of": 1, "to": 1, "and": 1, "or": 1, "in": 1, "on": 1,
    "for": 1, "is": 1, "are": 1, "was": 1, "were": 1, "be": 1, "with": 1, "by": 1, "at": 1, "it": 1,
    "as": 1, "that": 1, "this": 1, "i": 1, "we": 1, "you": 1, "my": 1, "our": 1, "do": 1, "did": 1,
    "does": 1, "what": 1, "when": 1, "how": 1, "who": 1, "which": 1, "where": 1, "why": 1, "can": 1,
    "will": 1, "not": 1, "no": 1, "from": 1, "long": 1 };
  function tokens(t) { return String(t).toLowerCase().match(/[a-z0-9][a-z0-9-]*/g) || []; }
  function embed(t) {
    var tf = {}, ts = tokens(t), i, w, n = 0;
    for (i = 0; i < ts.length; i++) { w = ts[i]; if (STOP[w]) continue; w = CANON[w] || w; tf[w] = (tf[w] || 0) + 1; }
    for (w in tf) n += tf[w] * tf[w];
    n = Math.sqrt(n) || 1;
    for (w in tf) tf[w] /= n;
    return tf;
  }
  function cosine(a, b) { var s = 0, k; for (k in a) if (b[k]) s += a[k] * b[k]; return s; }

  /* ---- the golden set: question -> the chunk id that SHOULD rank first, scoped to a corpus ---- */
  var GOLDEN = [
    { q: "which hotel chain does he prefer", corpus: "A", expected: "A6" },
    { q: "follow up with the finance chief", corpus: "A", expected: "A7" },
    { q: "what did I commit to before September", corpus: "A", expected: "A1" },
    { q: "dietary restriction for a dinner booking", corpus: "A", expected: "A5" },
    { q: "duplicate revenue on the dashboard", corpus: "B", expected: "INC-430" },
    { q: "coupon rejected for european customers", corpus: "B", expected: "INC-433" },
    { q: "slow login during peak", corpus: "B", expected: "INC-410" },
    { q: "notification emails not sending", corpus: "B", expected: "INC-415" },
    { q: "I forgot my password", corpus: "C", expected: "C-reset" },
    { q: "is accidental damage covered", corpus: "C", expected: "C-warranty" },
    { q: "cancel and get money back", corpus: "C", expected: "C-refund" },
    { q: "do you sell my personal data", corpus: "C", expected: "C-privacy" }
  ];

  function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }

  /* rank a corpus for a query, return array of ids best-first */
  function rank(corpusKey, q) {
    var corpus = (window.RAG_CORPORA && window.RAG_CORPORA[corpusKey]) || [];
    var qv = embed(q);
    return corpus.map(function (d) { return { id: d.id, s: cosine(qv, embed(d.text)) }; })
      .sort(function (a, b) { return b.s - a.s; });
  }

  /* run the whole golden set at a given k -> per-item results + aggregate metrics */
  function evaluate(k) {
    var rows = GOLDEN.map(function (g) {
      var ranked = rank(g.corpus, g.q);
      var pos = ranked.findIndex(function (r) { return r.id === g.expected; }); /* 0-based */
      var rank1 = pos + 1; /* 1-based rank, 0 if not found */
      var hit = pos > -1 && pos < k;
      return { q: g.q, expected: g.expected, got: ranked.length ? ranked[0].id : "-",
        rank: pos > -1 ? rank1 : null, hit: hit };
    });
    var n = rows.length;
    var hits = rows.filter(function (r) { return r.hit; }).length;
    var mrr = rows.reduce(function (a, r) { return a + (r.rank ? 1 / r.rank : 0); }, 0) / n;
    var p1 = rows.filter(function (r) { return r.rank === 1; }).length / n;
    return { rows: rows, hitRate: hits / n, mrr: mrr, p1: p1, n: n, k: k };
  }

  function bar(label, value, sub) {
    var pct = Math.round(value * 100);
    return '<div class="ev-metric"><div class="ev-mlabel">' + esc(label) +
      ' <b>' + value.toFixed(2) + '</b></div>' +
      '<div class="ev-mbar"><span style="width:' + pct + '%"></span></div>' +
      (sub ? '<div class="ev-msub">' + esc(sub) + '</div>' : '') + '</div>';
  }

  function wire(box) {
    var k = parseInt(box.getAttribute("data-k") || "3", 10);
    var caption = box.getAttribute("data-caption") || "";
    box.innerHTML = "";

    var bar0 = document.createElement("div");
    bar0.className = "ev-bar";
    bar0.innerHTML = '<span class="ev-dot"></span><span class="ev-title">evaluation scorecard</span>' +
      '<span class="ev-tag">golden set &middot; ' + GOLDEN.length + ' questions</span>';
    box.appendChild(bar0);

    var ctr = document.createElement("div");
    ctr.className = "ev-controls";
    ctr.innerHTML = '<span class="ev-klabel">retrieve top-k:</span>';
    [1, 3, 5].forEach(function (kv) {
      var b = document.createElement("button");
      b.type = "button"; b.className = "ev-kbtn" + (kv === k ? " ev-on" : ""); b.textContent = "k=" + kv;
      b.addEventListener("click", function () { k = kv; render(); });
      ctr.appendChild(b);
    });
    box.appendChild(ctr);

    var out = document.createElement("div"); out.className = "ev-out";
    box.appendChild(out);
    if (caption) { var c = document.createElement("div"); c.className = "ev-cap"; c.textContent = caption; box.appendChild(c); }

    function render() {
      Array.prototype.forEach.call(ctr.querySelectorAll(".ev-kbtn"), function (b) {
        b.classList.toggle("ev-on", b.textContent === "k=" + k);
      });
      var r = evaluate(k);
      var html = '<div class="ev-cards">' +
        bar("Hit Rate@" + k, r.hitRate, "expected chunk in top " + k) +
        bar("MRR", r.mrr, "1 / rank of the right chunk") +
        bar("Precision@1", r.p1, "right chunk ranked first") + "</div>";
      html += '<table class="ev-table"><thead><tr><th>Question</th><th>Expected</th><th>Top hit</th><th>Rank</th><th>@' + k + '</th></tr></thead><tbody>';
      r.rows.forEach(function (row) {
        html += "<tr><td>" + esc(row.q) + "</td><td>" + esc(row.expected) + "</td><td>" + esc(row.got) +
          "</td><td>" + (row.rank || "-") + "</td><td>" +
          (row.hit ? '<span class="ev-pass">hit</span>' : '<span class="ev-miss">miss</span>') + "</td></tr>";
      });
      html += "</tbody></table>";
      out.innerHTML = html;
    }
    render();
  }

  function init() {
    Array.prototype.slice.call(document.querySelectorAll(".evalbox")).forEach(wire);
  }
  if (document.readyState === "loading") { document.addEventListener("DOMContentLoaded", init); }
  else { init(); }
})();
