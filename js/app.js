/* =========================================================
   תיק 30 – הצינור הסודי | לוגיקת הכלי (גרסה 2 – מסלול היברידי)
   המורה מקרינה, התלמידים כותבים בדף העבודה המודפס.
   ========================================================= */
(() => {
"use strict";
const D = window.L30, MEDIA = window.L30_MEDIA || {};
const IMG = n => `assets/img/${n}.jpg`;
const WORKSHEET = "worksheet/daf-avoda-30.pdf";
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;" }[c]));
const shuffle = a => a[Math.floor(Math.random() * a.length)];

/* ---------------- Icons (monochrome SVG) ---------------- */
const sv = p => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${p}</svg>`;
const I = {
  eye: sv('<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>'),
  think: sv('<path d="M7 17a4 4 0 0 1-.5-8A5.5 5.5 0 0 1 17 7.5a4 4 0 0 1 .5 8H7z"/><circle cx="7" cy="20" r="1.2"/><circle cx="4.5" cy="22" r=".7"/>'),
  search: sv('<circle cx="11" cy="11" r="6.5"/><path d="m20 20-4.2-4.2"/>'),
  split: sv('<path d="M12 21v-7"/><path d="M12 14 6 8M12 14l6-6"/><path d="M6 3v5h5M18 3v5h-5"/>'),
  gear: sv('<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/>'),
  check: sv('<path d="m5 12 5 5 9-10"/>'),
  next: sv('<path d="M15 5l-7 7 7 7"/>'),
  prev: sv('<path d="M9 5l7 7-7 7"/>'),
  down: sv('<path d="M12 4v16M6 14l6 6 6-6"/>'),
  play: sv('<path d="M8 5v14l11-7z" fill="currentColor"/>'),
  teacher: sv('<rect x="3" y="4" width="18" height="12" rx="1.5"/><path d="M8 20h8M12 16v4"/>'),
  user: sv('<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>'),
  bulb: sv('<path d="M9 18h6M10 21h4"/><path d="M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2V16h5v-.1c0-.8.4-1.5 1-2A6 6 0 0 0 12 3z"/>'),
  dice: sv('<rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="8" cy="8" r="1.2" fill="currentColor"/><circle cx="16" cy="16" r="1.2" fill="currentColor"/><circle cx="12" cy="12" r="1.2" fill="currentColor"/><circle cx="16" cy="8" r="1.2" fill="currentColor"/><circle cx="8" cy="16" r="1.2" fill="currentColor"/>'),
  print: sv('<path d="M6 9V3h12v6"/><rect x="3" y="9" width="18" height="8" rx="1.5"/><path d="M6 14h12v7H6z"/>'),
  home: sv('<path d="M3 11 12 4l9 7"/><path d="M5 10v10h14V10"/>'),
  plus: sv('<path d="M12 5v14M5 12h14"/>'),
  question: sv('<circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.7.3-1 .9-1 1.6V14"/><circle cx="12" cy="17.2" r=".6" fill="currentColor"/>'),
  x: sv('<path d="M6 6l12 12M18 6 6 18"/>'),
  refresh: sv('<path d="M20 11a8 8 0 1 0-2.3 5.7"/><path d="M20 4v7h-7"/>'),
  cup: sv('<path d="M6 4h12l-1.5 16h-9z"/><path d="M6.5 9h11"/>'),
  food: sv('<path d="M4 14h16a8 8 0 0 1-16 0z"/><path d="M9 10c0-2 2-2 2-4M13 10c0-2 2-2 2-4"/>'),
  bottle: sv('<path d="M10 2h4v3l2 3v13H8V8l2-3z"/><path d="M8 12h8"/>'),
  trash: sv('<path d="M4 7h16M9 7V4h6v3M6 7l1 14h10l1-14"/>'),
  tool: sv('<path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.5 2.5-2.5-.5-.5-2.5z"/>'),
  paper: sv('<path d="M6 3h9l4 4v14H6z"/><path d="M14 3v5h5M9 13h7M9 17h7"/>'),
  drop: sv('<path d="M12 3s6 7 6 11a6 6 0 0 1-12 0c0-4 6-11 6-11z"/>'),
  screen: sv('<rect x="3" y="4" width="18" height="12" rx="1.5"/><path d="M8 20h8"/>'),
  bench: sv('<path d="M3 10h18M4 14h16M6 14v5M18 14v5M5 10V7M19 10V7"/>')
};
I.bulbIc = I.bulb;

I.pause = sv('<rect x="6" y="5" width="4" height="14" rx="1" fill="currentColor"/><rect x="14" y="5" width="4" height="14" rx="1" fill="currentColor"/>');
I.sheet = sv('<path d="M6 3h9l4 4v14H6z"/><path d="M14 3v5h5M9 12h7M9 16h7"/>');
I.pen = sv('<path d="M4 20h4L19 9l-4-4L4 16z"/><path d="m13.5 6.5 4 4"/>');
I.people = sv('<circle cx="9" cy="8" r="3.2"/><circle cx="17" cy="9" r="2.6"/><path d="M3 20a6 6 0 0 1 12 0M14.5 20a4.5 4.5 0 0 1 7-3.7"/>');

/* ---------------- State ---------------- */
const KEY = "l30.v2";
const read = k => { try { return JSON.parse(localStorage.getItem(k)) || null; } catch(e){ return null; } };
const write = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch(e){} };
const freshClass = () => ({ at:0, seg:0, stop:{}, aff:{}, extras:[], discovered:"", sort:{}, sortChecked:false,
  opt:{}, initial:{ choice:"", mix:[], why:"" }, current:null, drawn:[], log:{}, active:null, lastInsight:"",
  toolShown:0, turnProblem:"", deep:{}, ideasOpen:false, pcard:null, gi:0, game:{}, commonShown:false,
  showInsights:true, blur:false, narration:true });
let cls = Object.assign(freshClass(), read(KEY) || {});
const st = () => cls;
let saveT;
const save = () => { clearTimeout(saveT); saveT = setTimeout(() => write(KEY, cls), 250); };
const saveNow = () => write(KEY, cls);
const getP = (o, p) => p.split(".").reduce((a, k) => (a == null ? undefined : a[k]), o);
const setP = (o, p, v) => { const ks = p.split("."); let a = o; ks.slice(0,-1).forEach(k => { if (a[k] == null || typeof a[k] !== "object") a[k] = {}; a = a[k]; }); a[ks.at(-1)] = v; };

/* ---------------- Narration media (embed › MP4 › MP3) ---------------- */
const probe = {};            // id -> "embed" | "video" | "audio" | "none"
let player = null;           // current <audio>
function stopAudio() { if (player) { player.pause(); player = null; } }
function detectMedia(id, cb) {
  if (probe[id]) return cb(probe[id]);
  if ((MEDIA[id] || "").trim()) { probe[id] = "embed"; return cb("embed"); }
  const tryEl = (tag, src, ok, fail) => { const el = document.createElement(tag); el.preload = "metadata"; el.muted = true;
    let done = false; el.onloadedmetadata = () => { if (done) return; done = true; el.onerror = null; el.removeAttribute("src"); el.load(); ok(); }; el.onerror = () => { if (done) return; done = true; fail(); }; el.src = src; };
  tryEl("video", `assets/video/${id}.mp4`, () => { probe[id] = "video"; cb("video"); },
    () => tryEl("audio", `assets/audio/${id}.mp3`, () => { probe[id] = "audio"; cb("audio"); }, () => { probe[id] = "none"; cb("none"); }));
}
/* ---------------- Small UI builders ---------------- */
const fid = p => "f-" + p.replace(/[^a-z0-9]/gi, "_");
const val = p => getP(st(), p) ?? "";
function field(p, label, o = {}) {
  const tag = o.input ? `<input type="text" id="${fid(p)}" data-bind="${p}" value="${esc(val(p))}" placeholder="${esc(o.ph||"")}">`
    : `<textarea id="${fid(p)}" data-bind="${p}" class="${o.tall?"tall":""}" placeholder="${esc(o.ph||"")}" ${o.rows?`rows="${o.rows}"`:""}>${esc(val(p))}</textarea>`;
  return `<div class="field">${label?`<label for="${fid(p)}">${esc(label)}${o.sub?`<span class="sub">${esc(o.sub)}</span>`:""}</label>`:""}${tag}<div class="nudge" id="n-${fid(p)}" role="status" hidden></div></div>`;
}
const insight = t => `<div class="insight">${I.bulb}<div>${esc(t)}</div></div>`;
const head = (title, lead, kicker) => `<div class="head">${kicker?`<div class="kicker">${esc(kicker)}</div>`:""}<h1>${esc(title)}</h1>${lead?`<p class="lead">${esc(lead)}</p>`:""}</div>`;
const pills = (name, items, sel, multi) => `<div class="pills" role="group">${items.map(t => `<button type="button" class="pill" data-pill="${name}" data-v="${esc(t)}" data-multi="${multi?1:0}" aria-pressed="${multi ? (sel||[]).includes(t) : sel===t}">${esc(t)}</button>`).join("")}</div>`;

/* choice labels for Roi's case */
const optById = id => D.options.find(o => o.id === id);
function choiceText(c) {
  if (!c || !c.choice) return "עוד לא נבחר";
  if (c.choice === "MIX") return "שילוב: " + ((c.mix||[]).map(id => optById(id)?.letter).filter(Boolean).join(" + ") || "כמה אפשרויות");
  if (c.choice === "NONE") return "עדיין לא החלטנו";
  const o = optById(c.choice); return `${o.letter} – ${o.t}`;
}
function choicePicker(prefix, c) {
  const all = [...D.options.map(o => ({ id:o.id, lbl:`<b>${o.letter}</b> ${esc(o.t)}` })), ...D.leaningExtra.map(e => ({ id:e.id, lbl:esc(e.t) }))];
  return `<div class="radio-list" role="radiogroup">${all.map(o => `<button type="button" class="radio" role="radio" data-choice="${prefix}" data-v="${o.id}" aria-checked="${c.choice===o.id}"><span class="dot"></span><span>${o.lbl}</span></button>`).join("")}</div>
  <div class="mix" ${c.choice==="MIX"?"":"hidden"} style="margin-top:.8rem"><div class="label" style="font-family:var(--font-head);font-weight:600;color:var(--ink);margin-bottom:.4rem">אילו אפשרויות משלבים?</div>
  <div class="pills">${D.options.map(o => `<button type="button" class="pill" data-mix="${prefix}" data-v="${o.id}" aria-pressed="${(c.mix||[]).includes(o.id)}">${o.letter}</button>`).join("")}</div></div>`;
}

/* ---------------- Validation & deepening ---------------- */
const nudged = {};
function deepenMsg(v, min) {
  for (const r of D.deepen) if (r.re.test(v) && v.length <= r.max) return r.msg;
  if (v.length < min) return D.shortMsg;
  return "";
}
/* list: [{p, min=8, deep=true}] */
function checkFields(list) { return ""; }
function checkFieldsOld(list) {
  for (const f of list) {
    const v = String(val(f.p)).trim();
    if (!v) { const el = document.getElementById(fid(f.p)); el?.focus(); return "יש עוד שדה שמחכה לכם."; }
  }
  for (const f of list) {
    if (f.deep === false) continue;
    const v = String(val(f.p)).trim(), m = deepenMsg(v, f.min ?? 8);
    if (m && nudged[f.p] !== v) {
      nudged[f.p] = v;
      const n = document.getElementById("n-" + fid(f.p));
      if (n) { n.textContent = m; n.hidden = false; n.scrollIntoView({ block:"center", behavior:"smooth" }); }
      return "שאלה קטנה שיכולה לחזק את התשובה – אפשר להוסיף, או ללחוץ שוב כדי להמשיך.";
    }
  }
  return "";
}

/* =========================================================
   SCREENS
   ========================================================= */
const S = {};

/* ---------- CLASS: cover ---------- */
S.cover = { stage:0, name:"פתיחה", next:"התחילו את הסיפור",
  render:() => `<section class="cover">
    <div><div class="stamp">תיק 30</div><h1>הצינור הסודי</h1><div class="sub">סיפורו של רועי</div>
    <p class="lead" style="font-size:1.15rem;color:var(--muted);max-width:30rem">רועי מצא משהו בוואדי שליד הבית. לפני שמחליטים מה לעשות – נקשיב לו.</p></div>
    <div class="cover-photo"><img src="${IMG("roi-wadi")}" alt="רועי עם אופני ההרים שלו בוואדי, ליד הנחל"></div></section>` };

/* ---------- CLASS: story ---------- */
S.story = { stage:0, name:"הסיפור של רועי",
  dots:() => ({ n:D.story.length, i:cls.seg }),
  render() {
    const seg = D.story[cls.seg];
    const paras = seg.p.map((t, i) => {
      if (seg.chat && t.startsWith("@")) { const [who, msg] = t.slice(1).split("|"); return `<p class="bubble ${who==="רועי"?"me":"them"}" style="animation-delay:${i*.12}s"><small>${esc(who)}</small>${esc(msg)}</p>`; }
      return `<p class="${seg.final && i===seg.p.length-1 ? "final":""}" style="animation-delay:${i*.12}s">${esc(t)}</p>`;
    }).join("");
    return `<section class="story">
      <div class="story-media"><div class="media-box" id="mediaBox"><img src="${IMG(seg.img)}" alt="">
      <button type="button" class="btn btn-accent play" data-act="play" id="playBtn" hidden>${I.play}<span>רועי מספר</span></button></div></div>
      <div><div class="seg-count">קטע ${cls.seg+1} מתוך ${D.story.length}</div><div class="story-text">${paras}</div></div></section>`;
  },
  mount() {
    const seg = D.story[cls.seg];
    if (!cls.narration) return;
    detectMedia(seg.id, kind => { const b = $("#playBtn"); if (b && kind !== "none" && D.story[cls.seg].id === seg.id) b.hidden = false; });
  },
  onNext() { if (cls.seg < D.story.length - 1) { cls.seg++; save(); render(); return true; } },
  onBack() { if (cls.seg > 0) { cls.seg--; save(); render(); return true; } },
  nextLabel:() => cls.seg < D.story.length - 1 ? "המשך" : "לעצור ולחשוב" };
function playNarration() {
  const seg = D.story[cls.seg], kind = probe[seg.id], box = $("#mediaBox"), btn = $("#playBtn");
  if (kind === "embed") { box.innerHTML = `<div class="embed">${MEDIA[seg.id]}</div>`; return; }
  if (kind === "video") { box.innerHTML = `<video src="assets/video/${seg.id}.mp4" controls autoplay playsinline></video>`; return; }
  if (kind === "audio") {
    if (player && !player.paused) { player.pause(); btn.innerHTML = `${I.play}<span>רועי מספר</span>`; return; }
    if (!player) { player = new Audio(`assets/audio/${seg.id}.mp3`); player.onended = () => { const b = $("#playBtn"); if (b) b.innerHTML = `${I.play}<span>שוב</span>`; player = null; }; }
    player.play(); btn.innerHTML = `${I.pause}<span>עצירה</span>`;
  }
}

/* ---------- CLASS: stop ---------- */
S.stop = { stage:0, name:"מה הייתם עושים?",
  render:() => head("מה הייתם עושים במקומו של רועי?", "לפני שממשיכים – עוצרים וחושבים יחד. אפשר לרשום כאן נקודות מהדיון.") +
    `<div class="grid-4">${D.stop.map((s, i) => `<div class="stop-q"><div class="n">${i+1}</div><h3>${esc(s.q)}</h3><div class="tip">${esc(s.tip)}</div>${field("stop."+i, "", { ph:"נקודות מהדיון (לא חובה)" })}</div>`).join("")}</div>` +
    insight(D.insights.stop) };

/* ---------- shared: small modal for optional notes ---------- */
function openDialog({ img, title, hint, fields, extraTop = "", del = null }) {
  const dlg = $("#dlg");
  dlg.innerHTML = `<button type="button" class="dlg-x" data-act="closeDlg" aria-label="סגירה">${I.x}</button>
    ${img ? `<div class="dlg-ph"><img src="${IMG(img)}" alt=""></div>` : ""}
    <div class="dlg-body"><h2>${esc(title)}</h2>${hint ? `<div class="hint">${esc(hint)}</div>` : ""}${extraTop}${fields.map(([p, l]) => field(p, l, { rows:2 })).join("")}
    <div class="dlg-note">אפשר למלא – ואפשר גם רק לדבר על זה בכיתה.</div></div>
    <div class="dlg-actions">${del ? `<button type="button" class="btn btn-ghost" data-act="delAff" data-id="${del}">הסרה</button>` : ""}<button type="button" class="btn btn-primary" data-act="closeDlg">סגירה</button></div>`;
  dlg.showModal();
  dlg.onclick = e => { if (e.target === dlg) dlg.close(); };
  dlg.onclose = () => render();
}
const dlgEl = () => `<dialog id="dlg" class="dlg"></dialog>`;

/* ---------- CLASS: who is affected ---------- */
const affFilled = id => { const a = cls.aff[id]; return a && ((a.who||"").trim() || (a.how||"").trim()); };
const allAff = () => [...D.affected, ...cls.extras.map(x => ({ id:x.id, title:x.title || "גורם נוסף", img:null, hint:"מי עוד עלול להיות מושפע, ואיך?", custom:true }))];
S.affected = { stage:1, name:"מי מושפע?",
  render() {
    const card = a => `<button type="button" class="aff ${affFilled(a.id)?"filled":""}" data-aff="${a.id}">
      <div class="ph"><img src="${IMG(a.img)}" alt=""></div>
      <div class="body"><h3>${esc(a.title)}</h3><span class="state">${affFilled(a.id)?I.check:""}</span></div></button>`;
    const n = allAff().filter(a => affFilled(a.id)).length;
    const [r1, r2] = [D.affected.slice(0, 3), D.affected.slice(3)];
    return head("מי מושפע מהמצב?", "לחצו על כרטיס כדי לפתוח אותו: מי עלול להיות מושפע – ואיך?", "החקירה") +
      `<div class="affmap"><div class="affcol">${r1.map(card).join("")}</div>
        <div class="affcenter"><div class="ring"><img src="${IMG("pipe-plastic")}" alt="הצינור שמזרים מים קוצפים לנחל"></div>
          <div class="more"><h3>מי עוד?</h3><div class="more-list">${cls.extras.map(x => `<button type="button" class="pill ${affFilled(x.id)?"on":""}" data-aff="${x.id}">${esc(x.title || "גורם נוסף")}</button>`).join("")}
          <button type="button" class="pill add" data-act="addAff">${I.plus} הוסיפו גורם</button></div></div>
          ${n >= 3 ? insight(n >= 5 ? D.insights.affectedMany : D.insights.affected) : ""}</div>
        <div class="affcol">${r2.map(card).join("")}</div></div>${dlgEl()}`;
  } };
function openAff(id) {
  const a = allAff().find(x => x.id === id);
  cls.aff[id] = cls.aff[id] || { who:"", how:"" };
  const top = a.custom ? `<div class="field"><label for="xt">מה הגורם?</label><input type="text" id="xt" value="${esc(cls.extras.find(x => x.id===id).title||"")}" placeholder="לדוגמה: חקלאים במורד הנחל"></div>` : "";
  openDialog({ img:a.img, title:a.title, hint:a.hint, extraTop:top, fields:[[`aff.${id}.who`,"מי עלול להיות מושפע?"],[`aff.${id}.how`,"איך?"]], del:a.custom ? id : null });
  if (a.custom) $("#xt").addEventListener("input", e => { cls.extras.find(x => x.id===id).title = e.target.value; save(); });
}

/* ---------- CLASS: know / don't know ---------- */
let selFact = null;
S.facts = { stage:1, name:"יודעים / לא יודעים",
  render() {
    const factBtn = f => {
      const place = cls.sort[f.id], mismatch = cls.sortChecked && place && place !== f.k;
      return `<button type="button" class="fact" draggable="true" data-fact="${f.id}" aria-pressed="${selFact===f.id}">${esc(f.t)}${mismatch?`<span class="q">${esc(place==="know"?D.factPromptKnow:D.factPromptUnknown)}</span>`:""}</button>`;
    };
    const inCol = c => D.facts.filter(f => cls.sort[f.id] === c).map(factBtn).join("");
    const any = D.facts.some(f => cls.sort[f.id]);
    return head("מה רועי יודע – ומה עדיין לא?", "גררו כל כרטיס לעמודה המתאימה. במסך מגע: לחצו על כרטיס ואז על העמודה.", "החקירה") +
      `<div class="sort-wrap"><div class="pool" data-drop="pool">${D.facts.filter(f => !cls.sort[f.id]).map(factBtn).join("")}</div>
      <div class="cols"><div class="col know" data-drop="know" tabindex="0" role="button" aria-label="עמודה: אני יודע"><h3>${I.check} אני יודע</h3><div class="items">${inCol("know")}</div></div>
      <div class="col unknown" data-drop="unknown" tabindex="0" role="button" aria-label="עמודה: אני עדיין לא יודע"><h3>${I.question} אני עדיין לא יודע</h3><div class="items">${inCol("unknown")}</div></div></div>
      <div class="sort-help">${any ? `<button type="button" class="btn btn-soft" data-act="checkFacts">${I.search} ${cls.sortChecked ? "הסתרת שאלות הבדיקה" : "בדיקה"}</button>` : ""}</div></div>
      ${cls.sortChecked ? insight(D.insights.facts) : ""}`;
  } };
function moveFact(id, to) { if (to === "pool") delete cls.sort[id]; else cls.sort[id] = to; selFact = null; save(); render(); }

/* ---------- CLASS: action options ---------- */
const optCount = id => { const f = cls.opt[id] || {}; return ["pro","con","check"].filter(k => (f[k]||"").trim()).length; };
S.options = { stage:1, name:"אפשרויות פעולה",
  render:() => head("מה רועי יכול לעשות?", "אין כאן תשובה נכונה אחת. לחצו על אפשרות: מה היתרון, מה הסיכון, ומה הייתם רוצים לבדוק קודם?", "החקירה") +
    `<div class="grid-4 opts4">${D.options.map(o => `<button type="button" class="opt" data-opt="${o.id}">
      <div class="ph"><img src="${IMG(o.img)}" alt=""><span class="letter">${o.letter}</span></div><div class="txt">${esc(o.t)}</div>
      <div class="opt-foot">${optCount(o.id) ? `${I.check} נשקלה` : "לשקול את האפשרות"}</div></button>`).join("")}</div>` + insight(D.insights.options) + dlgEl() };
function openOpt(id) {
  const o = optById(id);
  openDialog({ img:o.img, title:`אפשרות ${o.letter}`, hint:o.t, fields:[[`opt.${id}.pro`,"מה היתרון?"],[`opt.${id}.con`,"מה הסיכון או החיסרון?"],[`opt.${id}.check`,"מה הייתם רוצים לבדוק לפני שמחליטים?"]] });
}

/* ---------- compact choice pills ---------- */
function choicePills(prefix, c) {
  const all = [...D.options.map(o => ({ id:o.id, t:`${o.letter} – ${o.short}` })), ...D.leaningExtra.map(e => ({ id:e.id, t:e.t }))];
  return `<div class="pills">${all.map(o => `<button type="button" class="pill" data-choice="${prefix}" data-v="${o.id}" aria-pressed="${c.choice===o.id}">${esc(o.t)}</button>`).join("")}</div>
    ${c.choice==="MIX" ? `<div class="pills mixrow"><span class="mixlbl">משלבים:</span>${D.options.map(o => `<button type="button" class="pill" data-mix="${prefix}" data-v="${o.id}" aria-pressed="${(c.mix||[]).includes(o.id)}">${o.letter}</button>`).join("")}</div>` : ""}`;
}

/* ---------- CLASS: initial leaning ---------- */
S.leaning = { stage:1, name:"החלטה ראשונית",
  render:() => head("לאן אתם נוטים כרגע?", "זו החלטה ראשונית. מותר – ואפילו צפוי – שהיא תשתנה בהמשך.", "החקירה") +
    `<div class="grid-2"><div class="card">${choicePicker("initial", cls.initial)}</div>
    <div class="card">${field("initial.why","למה?",{ tall:true, sub:"מה גורם לכם לחשוב שזו הבחירה המתאימה במצב הזה? (לא חובה)" })}</div></div>`,
  after() { if (!Object.keys(cls.log).length) cls.current = { choice:cls.initial.choice, mix:[...(cls.initial.mix||[])] }; } };

/* ---------- CLASS: surprise cards ---------- */
const cardById = id => D.surprise.find(c => c.id === id);
const doneCards = () => cls.drawn.filter(id => cls.log[id]?.done);
function drawCard() {
  const left = D.surprise.filter(c => !cls.drawn.includes(c.id));
  if (!left.length) return;
  const c = shuffle(left); cls.drawn.push(c.id); cls.active = c.id;
  cls.log[c.id] = { impact:"", status:"", newChoice:{ choice:"", mix:[] }, reason:"", done:false };
  save(); render(); window.scrollTo({ top:0 });
}
function finishCard() {
  const id = cls.active, L = id && cls.log[id]; if (!L) return;
  L.done = true; L.from = { ...(cls.current||{}), mix:[...((cls.current||{}).mix||[])] };
  if (L.status === "change" && L.newChoice.choice) cls.current = { choice:L.newChoice.choice, mix:[...L.newChoice.mix] };
  cls.lastInsight = L.status === "stay" ? D.insights.cardStay : D.insights.card;
  cls.active = null; save(); render(); window.scrollTo({ top:0 });
}
S.surprise = { stage:2, name:"כרטיסי הפתעה",
  dots:() => ({ n:D.surprise.length, i:doneCards().length - 1 }),
  render() {
    if (!cls.current) cls.current = { choice:cls.initial.choice, mix:[...(cls.initial.mix||[])] };
    const a = cls.active && !cls.log[cls.active]?.done ? cardById(cls.active) : null;
    if (!a) {
      const n = doneCards().length, left = D.surprise.length - cls.drawn.length;
      return head("כרטיסי הפתעה", "בחיים האמיתיים מידע חדש מגיע באמצע. כל כרטיס מביא עובדה חדשה על המקרה של רועי.", "מידע חדש") +
        `<div class="card draw-zone"><div class="deck"><span></span><span></span><span></span><span>?</span></div>
        <div class="current-choice">ההחלטה שלנו עכשיו: <b>${esc(choiceText(cls.current))}</b></div>
        <div style="display:flex;gap:.8rem;flex-wrap:wrap;justify-content:center">
          ${left ? `<button type="button" class="btn btn-accent btn-big" data-act="draw">${I.dice} ${n ? "עוד כרטיס" : "הגרל כרטיס הפתעה"}</button>` : ""}
          ${n ? `<button type="button" class="btn btn-primary btn-big" data-act="toFull">לתמונה המלאה</button>` : ""}</div>
        ${n ? `<div class="drawn-count">${n} ${n===1?"כרטיס נבדק":"כרטיסים נבדקו"}. אפשר להמשיך – או להגריל עוד.</div>` : ""}</div>
        ${cls.lastInsight ? insight(cls.lastInsight) : ""}`;
    }
    const L = cls.log[a.id], changed = L.status === "change";
    return `<div class="sc compact">
      <div class="sc-card" style="--c:${a.color}"><div class="ph"><img src="${IMG(a.img)}" alt=""></div><div class="bd"><h2>${esc(a.title)}</h2><p>${esc(a.text)}</p><div class="q">${esc(a.q)}</div></div></div>
      <div class="card steps2">
        <div class="current-choice">ההחלטה שלנו עד עכשיו: <b>${esc(choiceText(cls.current))}</b></div>
        <div class="s2"><div class="sh"><i>1</i>מה זה משנה?</div>${field(`log.${a.id}.impact`,"",{ rows:2, ph:"אפשר לרשום נקודות מהדיון (לא חובה)" })}</div>
        <div class="s2"><div class="sh"><i>2</i>האם ההחלטה שלכם השתנתה?</div>
          <div class="pills">${D.statusOpts.map(s => `<button type="button" class="pill" data-status="${s.id}" aria-pressed="${L.status===s.id}">${esc(s.t)}</button>`).join("")}</div>
          ${changed ? `<div class="newchoice"><div class="mixlbl">הבחירה החדשה:</div>${choicePills("newChoice", L.newChoice)}</div>` : ""}</div>
        <div class="s2"><div class="sh"><i>3</i>${changed ? "מה השתנה בחשיבה שלכם?" : "למה?"}</div>${field(`log.${a.id}.reason`,"",{ rows:2 })}</div>
      </div></div>`;
  },
  nextLabel:() => (cls.active && !cls.log[cls.active]?.done) ? "סיימנו עם הכרטיס" : "לתמונה המלאה",
  validate() { if (cls.active && !cls.log[cls.active]?.done) { finishCard(); return "stay"; } return ""; } };

/* ---------- CLASS: full picture ---------- */
S.full = { stage:2, name:"התמונה המלאה",
  render() {
    const tagOf = L => L.status==="change" ? `<span class="tag change">שינינו</span>` : L.status==="stay" ? `<span class="tag">נשארנו</span>` : L.status==="unsure" ? `<span class="tag">מתלבטים</span>` : "";
    const node = (cls_, lbl, val, why, tag = "") => `<div class="jr ${cls_}"><div class="lbl">${lbl} ${tag}</div>${val?`<div class="val">${esc(val)}</div>`:""}${why?`<div class="why answer-text">${esc(why)}</div>`:""}</div>`;
    const cards = doneCards().map(id => { const c = cardById(id), L = cls.log[id];
      return node("mid", `מידע חדש: ${esc(c.title)}`, L.status==="change" && L.newChoice.choice ? "עברנו ל: " + choiceText(L.newChoice) : "", L.reason, tagOf(L)); });
    const items = [node("start", "בהתחלה חשבנו", choiceText(cls.initial), cls.initial.why), ...cards, node("end", "עכשיו אנחנו חושבים", choiceText(cls.current), "")];
    return head("כך השתנתה החשיבה שלנו", "מההחלטה הראשונה – דרך המידע החדש – עד ההחלטה של עכשיו.", "התמונה המלאה") +
      `<div class="jrow">${items.join('<div class="jarr">←</div>')}</div>` + insight(D.insights.card + "\n" + D.insights.full);
  } };

/* ---------- CLASS: tool reveal (horizontal) ---------- */
const toolIc = [I.eye, I.think, I.search, I.split, I.gear];
S.tool = { stage:3, name:"חשיפת הכלי",
  dots:() => ({ n:5, i:cls.toolShown - 1 }),
  render() {
    return head("מה בעצם עשינו?", "עברנו יחד חמישה שלבים – בלי לתת להם שם. עכשיו נחשוף אותם.", "הכלי") +
      `<div class="tool-row">${D.tool.map((t, i) => `${i?`<div class="tool-arrow ${i<cls.toolShown?"":"off"}">←</div>`:""}
        <div class="tool-card ${i<cls.toolShown?"on":""}">${i<cls.toolShown ? `<div class="ic">${toolIc[i]}</div><h3>${t.t}</h3><div class="q">${esc(t.q)}</div><div class="did">${esc(t.did)}</div>` : `<div class="ic ghost">${i+1}</div>`}</div>`).join("")}</div>
      ${cls.toolShown >= 5 ? insight(D.insights.tool) : ""}`;
  },
  nextLabel:() => cls.toolShown < 5 ? (cls.toolShown ? "השלב הבא" : "חשיפה") : "המשך",
  validate() { if (cls.toolShown < 5) { cls.toolShown++; save(); render(); return "stay"; } return ""; },
  onBack() { if (cls.toolShown > 0 && cls.toolShown < 5) { cls.toolShown--; save(); render(); return true; } } };

const toolNames = ["רואה","חושב","בודק","בוחר","פועל"];
const flowLine = (on = -1) => `<div class="flow-line">${toolNames.map((t, i) => `<span class="${i===on?"fl-on":""}">${t}</span>`).join('<span class="arr">←</span>')}</div>`;
const sheetBadge = (page, part) => `<div class="sheet-badge">${I.pen}<span>כותבים בדף – עמוד ${page}, חלק <b>${esc(part)}</b></span></div>`;
const problemTitle = () => D.problems.find(p => p.id === cls.turnProblem)?.t || "";

S.turn = { stage:4, name:"עכשיו תורכם",
  render:() => `<div class="turn">${head("עכשיו תורכם – בבית הספר שלכם", "רועי השתמש בכלי כדי לחשוב על הנחל. עכשיו כל אחד ואחת מכם ישתמשו באותו כלי – על בעיה אמיתית שאתם רואים בבית הספר.")}
    ${flowLine()}
    <div class="grid-2" style="margin-top:1.6rem">
      <div class="card how"><div class="how-row"><span class="ic">${I.teacher}</span><div><b>על הלוח</b><p>השאלות, דוגמה מהסיפור של רועי ושאלות העמקה.</p></div></div>
        <div class="how-row"><span class="ic">${I.pen}</span><div><b>בדף שלכם</b><p>התשובות שלכם. כל אחד כותב לבד – אין תשובה נכונה אחת.</p></div></div></div>
      <div class="card sheet-card"><div class="sheet-thumb">${I.sheet}</div><div><h3>דף העבודה</h3><p>A4 דו-צדדי. מחלקים עותק לכל תלמיד לפני שממשיכים.</p>
        <a class="btn btn-ghost" href="${WORKSHEET}" download>${I.print} הורדת דף העבודה</a></div></div>
    </div>${insight("לא צריך לפתור את העולם. בוחרים דבר אחד שאפשר לשפר.")}</div>`,
  nextLabel:() => "כולם קיבלו דף – ממשיכים" };

S.hproblem = { stage:4, name:"בחירת בעיה",
  render:() => head("בחרו בעיה אחת", "בחרו כרטיס – או בעיה אחרת שאתם רואים. כתבו אותה בראש הדף, בשורה \"הבעיה שבחרתי\".") +
    sheetBadge(1, "הבעיה שבחרתי") +
    `<div class="probs">${D.problems.map(p => `<button type="button" class="prob" data-prob="${p.id}" aria-pressed="${cls.turnProblem===p.id}">${I[p.icon]}<span>${esc(p.t)}</span></button>`).join("")}</div>
    <p class="muted-note">לחיצה על כרטיס מסמנת אותו כדוגמה לדיון. אין צורך שכל הכיתה תבחר אותה בעיה.</p>` };

function stepScreen(key, idx, stage) {
  const d = D.steps[key];
  return { stage, name:toolNames[idx],
    render() {
      const open = !!cls.deep[key];
      const ideas = key === "choose" ? ideasPanel() : "";
      return `<div class="pstep"><div class="ic">${toolIcons[idx]}</div><div><h2>${toolNames[idx]}</h2><div class="q">${esc(D.tool[idx].q)}</div></div>
        <div class="mini-flow">${toolNames.map((t, j) => `<span class="${j===idx?"on":j<idx?"done":""}">${t}</span>`).join("")}</div></div>
        ${sheetBadge(d.page, toolNames[idx])}
        <div class="step-grid"><div class="card qcard"><ol class="qlist">${d.q.map(q => `<li>${esc(q)}</li>`).join("")}</ol></div>
        <div class="side">
          ${d.roi ? `<div class="card roi-card"><div class="roi-head"><img src="${IMG("roi-portrait")}" alt=""><b>אצל רועי</b></div><p>${esc(d.roi)}</p></div>` : ""}
          <div class="card deep-card"><button type="button" class="btn btn-soft" data-deep="${key}" aria-expanded="${open}">${I.question} ${open ? "הסתרת שאלות העמקה" : "שאלות העמקה"}</button>
          ${open ? `<ul class="deep-list">${d.deepen.map(q => `<li>${esc(q)}</li>`).join("")}</ul>` : ""}</div>
        </div></div>${ideas}${insight(D.insights[key])}`;
    } };
}
function ideasPanel() {
  return `<div class="ideas-btn-row"><button type="button" class="btn btn-ghost" data-act="ideas">${I.bulb} רעיונות לחשיבה</button></div>${dlgEl()}`;
}
function openIdeas() {
  const dlg = $("#dlg"), list = D.ideas[cls.turnProblem] || D.ideas.other;
  dlg.innerHTML = `<button type="button" class="dlg-x" data-act="closeDlg" aria-label="סגירה">${I.x}</button>
    <div class="dlg-body"><h2>רעיונות לחשיבה</h2><div class="hint">בחרו סוג בעיה. אלה רעיונות לחשיבה – הבחירה עדיין שלכם.</div>
    <div class="pills" style="margin-bottom:.9rem">${D.problems.map(p => `<button type="button" class="pill" data-ideafor="${p.id}" aria-pressed="${(cls.turnProblem||"other")===p.id}">${esc(p.t)}</button>`).join("")}</div>
    <div class="ideas" style="margin-top:0">${list.map(t => `<div class="idea"><span>${esc(t)}</span></div>`).join("")}</div></div>
    <div class="dlg-actions"><button type="button" class="btn btn-primary" data-act="closeDlg">סגירה</button></div>`;
  if (!dlg.open) dlg.showModal();
  dlg.onclick = e => { if (e.target === dlg) dlg.close(); };
  dlg.onclose = null;
}
const toolIcons = [I.eye, I.think, I.search, I.split, I.gear];
S.hsee = stepScreen("see", 0, 4);
S.hthink = stepScreen("think", 1, 4);
S.hcheck = stepScreen("check", 2, 4);
S.hchoose = stepScreen("choose", 3, 5);

S.htest = { stage:5, name:"רגע של בדיקה",
  render() {
    const c = D.personalSurprise.find(x => x.id === cls.pcard), d = D.steps.test;
    const top = `<div class="pstep"><div class="ic">${I.dice}</div><div><h2>רגע של בדיקה</h2><div class="q">גם בחיים האמיתיים מגיע מידע חדש באמצע.</div></div></div>${sheetBadge(2, "רגע של בדיקה")}`;
    if (!c) return top + `<div class="card draw-zone"><p style="font-size:1.2rem;max-width:36rem">כמו אצל רועי – עכשיו מגיע מידע חדש. נגריל כרטיס אחד לכל הכיתה, וכל אחד יבדוק מה הוא משנה בתוכנית <b>שלו</b>.</p>
      <button type="button" class="btn btn-accent btn-big" data-act="pdraw">${I.dice} הגרל כרטיס</button></div>`;
    return top + `<div class="sc"><div class="sc-card" style="--c:var(--amber)"><div class="bd"><h2>${esc(c.title)}</h2><p style="font-size:1.4rem">${esc(c.text)}</p>
      <button type="button" class="btn btn-ghost" style="margin-top:.6rem" data-act="pdraw">${I.refresh} כרטיס אחר</button></div></div>
      <div class="card qcard"><ol class="qlist">${d.q.map(q => `<li>${esc(q)}</li>`).join("")}</ol>
      <div class="status-row"><span>☐ נשאר/ת עם הבחירה</span><span>☐ משנה את הבחירה</span><span>☐ עדיין מתלבט/ת</span></div></div></div>` + insight(D.insights.card);
  },
  validate:() => cls.pcard ? "" : "הגרילו כרטיס לפני שממשיכים." };

S.hact = stepScreen("act", 4, 5);

S.hshare = { stage:5, name:"שיתוף בזוגות",
  render:() => `<div class="pstep"><div class="ic">${I.people}</div><div><h2>שיתוף בזוגות</h2><div class="q">שלוש דקות. כל אחד בתורו.</div></div></div>
    <div class="card qcard" style="max-width:52rem"><ol class="qlist">${D.share.map(q => `<li>${esc(q)}</li>`).join("")}</ol></div>
    <div style="margin-top:1.6rem">${flowLine()}</div>${insight(D.insights.full)}` };

/* ---------- Game: class discussion ---------- */
S.game = { stage:6, name:"מי אחראי?",
  dots:() => ({ n:D.game.length, i:Math.min(cls.gi, D.game.length - 1) }),
  render() {
    if (cls.gi >= D.game.length) return `<div class="game">${head("מה גילינו במשחק?", "", "משחק אחריות")}${insight(D.insights.gameEnd)}</div>`;
    const g = D.game[cls.gi], shown = !!cls.game[cls.gi];
    return `<div class="game">${head("מי אחראי?", "אין כאן נכון ולא נכון. חושבים, מצביעים ומסבירים.", "משחק אחריות")}
      <div class="situation"><div class="num">סיטואציה ${cls.gi+1} מתוך ${D.game.length}</div><p>${esc(g.t)}</p></div>
      <div class="card"><ol class="qlist small">${D.gameDiscuss.map(q => `<li>${esc(q)}</li>`).join("")}</ol>
      <div class="field" style="margin-top:1rem"><span class="label">למי יש אחריות?<span class="sub">הצביעו בכיתה: המורה מקריאה כל אפשרות, ומי שחושב שהיא נכונה מרים יד. אפשר להרים יד יותר מפעם אחת.</span></span><div class="pills">${D.gameResp.map(r => `<span class="pill static">${esc(r)}</span>`).join("")}</div></div>
      ${shown ? insight(g.insight) : ""}</div>
      <div class="skip-row"><button type="button" class="btn btn-ghost" data-act="skipGame">דילוג לסיכום המשחק</button></div></div>`;
  },
  nextLabel() { if (cls.gi >= D.game.length) return "לסיכום הקורס"; return cls.game[cls.gi] ? (cls.gi < D.game.length - 1 ? "לסיטואציה הבאה" : "לסיכום המשחק") : "תובנה"; },
  validate() {
    if (cls.gi >= D.game.length) return "";
    if (!cls.game[cls.gi]) { cls.game[cls.gi] = true; save(); render(); setTimeout(() => $(".insight")?.scrollIntoView({ block:"center", behavior:"smooth" }), 60); return "stay"; }
    cls.gi++; save(); render(); window.scrollTo({ top:0 }); return "stay";
  },
  onBack() { if (cls.gi > 0) { cls.gi--; save(); render(); return true; } } };

S.course = { stage:7, name:"מה למדנו השנה?",
  render:() => `<div style="text-align:center">${head("מה בעצם למדנו השנה?")}
    <div class="skills ${cls.commonShown?"static":""}">${D.courseSkills.map((s, i) => `<span class="skill ${i===D.courseSkills.length-1?"last":""}" style="animation-delay:${i*.12}s">${esc(s)}</span>`).join("")}</div>
    ${cls.commonShown ? `<h2 style="margin-top:2rem">מה משותף לכולן?</h2><div class="common">${D.common.map((w, i) => `${i?`<span class="sep" style="animation-delay:${i*.35}s">←</span>`:""}<span style="animation-delay:${i*.35}s">${w}</span>`).join("")}</div>`
      : `<button type="button" class="btn btn-primary btn-big" style="margin-top:1.4rem" data-act="common">מה משותף לכולן?</button>`}</div>`,
  nextLabel:() => "לסיום", validate:() => cls.commonShown ? "" : "לחצו על \"מה משותף לכולן?\"" };

S.end = { stage:7, name:"סיום", noNav:true,
  render:() => `<div class="end"><div class="end-in">
    <p>חיים טובים הם לא חיים שבהם אין בעיות.<br>הם חיים שבהם אנחנו יודעים לעצור,<br>לחשוב,<br>לבחור<br>ולפעול.</p>
    <p class="q" style="animation-delay:1.3s">השאלה היא לא רק איזה עולם אנחנו מקבלים.<br>השאלה היא איזה עולם אנחנו עוזרים ליצור.</p>
    <div class="back" style="display:flex;gap:.8rem;justify-content:center;flex-wrap:wrap"><button type="button" class="btn btn-ghost" data-act="back">${I.prev} חזרה</button><button type="button" class="btn btn-ghost" data-act="restart">${I.home} חזרה להתחלה</button></div></div></div>` };

const FLOW = ["cover","story","stop","affected","facts","options","leaning","surprise","full","tool",
  "turn","hproblem","hsee","hthink","hcheck","hchoose","htest","hact","hshare","game","course","end"];

/* =========================================================
   RENDER
   ========================================================= */
const app = $("#app");
function render() {
  stopAudio();
  const id = FLOW[cls.at] || FLOW[0], scr = S[id];
  document.body.classList.toggle("no-insights", !cls.showInsights);
  const tabs = D.stages.map((t, i) => `<div class="tab ${i===scr.stage?"now":i<scr.stage?"done":""}"><i>${i<scr.stage?"✓":i+1}</i>${t}</div>`).join("");
  let dots = scr.dots ? scr.dots() : null;
  if (!dots) { const same = FLOW.filter(f => S[f].stage === scr.stage); dots = same.length > 1 ? { n:same.length, i:same.indexOf(id) } : null; }
  const backDisabled = cls.at === 0;
  app.innerHTML = `
    <header class="top"><div class="top-row"><div class="case-id"><b>תיק 30</b><span>הצינור הסודי</span></div>
      <div class="top-tools"><a class="chip-btn" href="${WORKSHEET}" download>${I.sheet}<span class="lbl">דף עבודה</span></a>
      <button type="button" class="chip-btn" data-act="panel">${I.gear}<span class="lbl">כלי מורה</span></button></div></div>
      <nav class="tabs" aria-label="שלבי הפעילות">${tabs}</nav></header>
    <div class="here" aria-live="polite">אתם כאן: <b style="color:var(--ink)">${esc(D.stages[scr.stage])}</b>${dots ? `<span class="dots">${Array.from({ length:dots.n }, (_, k) => `<span class="${k<=dots.i?"on":""}"></span>`).join("")}</span>` : ""}</div>
    <main id="main" class="${cls.blur ? "blur-answers" : ""}"><section class="screen ${scr.noNav?"static":""}" id="scr">${scr.render()}</section></main>
    ${scr.noNav ? "" : `<footer class="nav"><div class="nav-in">
      <button type="button" class="btn btn-ghost" data-act="back" ${backDisabled ? "disabled":""}>${I.prev} חזרה</button>
      <div class="msg" id="msg" role="status" aria-live="polite"></div>
      <button type="button" class="btn btn-primary" data-act="next">${esc(scr.nextLabel ? scr.nextLabel() : (scr.next || "המשך"))} ${I.next}</button></div></footer>`}
    ${panelHTML()}`;
  scr.mount && scr.mount();
  scr.onInput && scr.onInput({ target:{ dataset:{} } });
}
function msg(t, warn = true) { const m = $("#msg"); if (m) { m.textContent = t; m.classList.toggle("warn", warn); } }
function go(delta) {
  const scr = S[FLOW[cls.at]];
  if (delta > 0) {
    if (scr.onNext && scr.onNext()) return;
    if (scr.validate) { const r = scr.validate(); if (r === "stay") return; if (r) return msg(r); }
    scr.after && scr.after();
    if (cls.at < FLOW.length - 1) { cls.at++; saveNow(); render(); window.scrollTo({ top:0 }); }
  } else {
    if (scr.onBack && scr.onBack()) return;
    if (cls.at > 0) { cls.at--; saveNow(); render(); window.scrollTo({ top:0 }); }
  }
}
function jump(id) { const i = FLOW.indexOf(id); if (i >= 0) { cls.at = i; saveNow(); panelOpen = false; render(); window.scrollTo({ top:0 }); } }

/* ---------- Teacher panel ---------- */
let panelOpen = false;
function panelHTML() {
  const tg = (k, l) => `<button type="button" class="toggle" role="switch" data-toggle="${k}" aria-checked="${!!cls[k]}"><span>${l}</span><span class="sw"></span></button>`;
  const groups = [...new Set(FLOW.map(f => S[f].stage))];
  return `${panelOpen ? `<div class="scrim" data-act="closePanel"></div>` : ""}
  <aside class="panel ${panelOpen?"open":""}" aria-label="כלי מורה" ${panelOpen?"":"inert"}>
    <h2>כלי מורה <button type="button" class="chip-btn" style="color:var(--ink);border-color:var(--line)" data-act="closePanel" aria-label="סגירה">${I.x}</button></h2>
    <h4>מעבר בין שלבים</h4>${groups.map(g => `<div class="jump-group"><div class="jg">${esc(D.stages[g])}</div>${FLOW.filter(f => S[f].stage === g).map(id => `<button type="button" class="jump ${FLOW[cls.at]===id?"cur":""}" data-jump="${id}">${esc(S[id].name)}</button>`).join("")}</div>`).join("")}
    <h4>תצוגה</h4>${tg("showInsights","הצגת תובנות")}${tg("blur","הסתרת התשובות שנכתבו")}${tg("narration","כפתור \"רועי מספר\"")}
    <h4>כרטיסי הפתעה</h4>
    <button type="button" class="btn btn-ghost act" data-act="skipCard">דילוג על הכרטיס הנוכחי</button>
    <button type="button" class="btn btn-ghost act" data-act="resetCards">הפעלה מחדש של הכרטיסים</button>
    <h4>דף העבודה</h4><a class="btn btn-ghost act" href="${WORKSHEET}" download>${I.print} הורדת דף העבודה (PDF)</a>
    <h4>הפעילות</h4>
    <button type="button" class="btn btn-ghost act" data-act="restart">חזרה להתחלה (התשובות נשמרות)</button>
    <button type="button" class="btn btn-ghost act" data-act="resetAll" style="color:#A33">איפוס מלא של הפעילות</button>
  </aside>`;
}

/* =========================================================
   EVENTS
   ========================================================= */
document.addEventListener("input", e => {
  const b = e.target.dataset?.bind; if (!b) return;
  setP(cls, b, e.target.value); save();
  const scr = S[FLOW[cls.at]]; scr.onInput && scr.onInput(e);
  msg("", false);
});

document.addEventListener("click", e => {
  const t = e.target.closest("button, [data-drop]"); if (!t) return;
  const d = t.dataset;
  if (d.act) {
    switch (d.act) {
      case "next": return go(1);
      case "back": return go(-1);
      case "panel": panelOpen = true; return render();
      case "closePanel": panelOpen = false; return render();
      case "play": return playNarration();
      case "addAff": { const id = "x" + Date.now().toString(36); cls.extras.push({ id, title:"" }); cls.aff[id] = { who:"", how:"" }; save(); render(); return openAff(id); }
      case "closeDlg": return $("#dlg")?.close();
      case "checkFacts": cls.sortChecked = !cls.sortChecked; save(); return render();
      case "skipGame": cls.gi = D.game.length; save(); render(); return window.scrollTo({ top:0 });
      case "delAff": { const id = d.id; cls.extras = cls.extras.filter(x => x.id !== id); delete cls.aff[id]; save(); $("#dlg").close(); return; }
      case "draw": return drawCard();
      case "toFull": return jump("full");
      case "skipCard": { if (cls.active && !cls.log[cls.active]?.done) { const old = cls.active; cls.drawn = cls.drawn.filter(x => x !== old); delete cls.log[old]; cls.active = null; drawCard(); } return jump("surprise"); }
      case "resetCards": { if (!confirm("להפעיל מחדש את כרטיסי ההפתעה? ההחלטות שנרשמו בכרטיסים יימחקו.")) return; cls.drawn = []; cls.log = {}; cls.active = null; cls.lastInsight = ""; cls.current = { choice:cls.initial.choice, mix:[...(cls.initial.mix||[])] }; save(); return jump("surprise"); }
      case "restart": cls.seg = 0; cls.toolShown = 0; cls.gi = 0; return jump("cover");
      case "resetAll": { if (!confirm("לאפס את כל הפעילות? כל מה שנכתב בכלי יימחק.")) return; const keep = { showInsights:cls.showInsights, narration:cls.narration }; cls = Object.assign(freshClass(), keep); saveNow(); panelOpen = false; return render(); }
      case "ideas": return openIdeas();
      case "pdraw": { const pool = D.personalSurprise.filter(c => c.id !== cls.pcard); cls.pcard = shuffle(pool).id; save(); return render(); }
      case "common": cls.commonShown = true; save(); return render();
    }
  }
  if (d.jump) return jump(d.jump);
  if (d.toggle) { cls[d.toggle] = !cls[d.toggle]; save(); return render(); }
  if (d.deep) { cls.deep[d.deep] = !cls.deep[d.deep]; save(); return render(); }
  if (d.ideafor) { cls.turnProblem = d.ideafor; save(); return openIdeas(); }
  if (d.aff) return openAff(d.aff);
  if (d.opt) return openOpt(d.opt);
  if (d.fact) { selFact = selFact === d.fact ? null : d.fact; $$(".fact").forEach(f => f.setAttribute("aria-pressed", f.dataset.fact === selFact)); return; }
  if (d.drop && selFact) return moveFact(selFact, d.drop);
  if (d.choice) {
    const target = d.choice === "initial" ? cls.initial : cls.log[cls.active].newChoice;
    target.choice = d.v; if (d.v !== "MIX") target.mix = [];
    if (d.choice === "initial" && !Object.keys(cls.log).length) cls.current = { choice:target.choice, mix:[...target.mix] };
    save(); return render();
  }
  if (d.mix) {
    const target = d.mix === "initial" ? cls.initial : cls.log[cls.active].newChoice;
    target.mix = target.mix.includes(d.v) ? target.mix.filter(x => x !== d.v) : [...target.mix, d.v].sort();
    t.setAttribute("aria-pressed", target.mix.includes(d.v)); save(); return;
  }
  if (d.status) { cls.log[cls.active].status = d.status; if (d.status !== "change") cls.log[cls.active].newChoice = { choice:"", mix:[] }; save(); return render(); }
  if (d.prob) { cls.turnProblem = cls.turnProblem === d.prob ? "" : d.prob; save(); $$("[data-prob]").forEach(b => b.setAttribute("aria-pressed", b.dataset.prob === cls.turnProblem)); return; }
});

document.addEventListener("keydown", e => {
  const c = e.target.closest?.("[data-drop]");
  if (c && selFact && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); moveFact(selFact, c.dataset.drop); }
  if (e.key === "Escape" && panelOpen) { panelOpen = false; render(); }
});
document.addEventListener("dragstart", e => { const f = e.target.closest?.("[data-fact]"); if (!f) return; e.dataTransfer.setData("text/plain", f.dataset.fact); f.classList.add("dragging"); });
document.addEventListener("dragend", e => { e.target.classList?.remove("dragging"); $$(".over").forEach(x => x.classList.remove("over")); });
document.addEventListener("dragover", e => { const z = e.target.closest?.("[data-drop]"); if (!z) return; e.preventDefault(); $$(".over").forEach(x => x !== z && x.classList.remove("over")); z.classList.add("over"); });
document.addEventListener("drop", e => { const z = e.target.closest?.("[data-drop]"); if (!z) return; e.preventDefault(); const id = e.dataTransfer.getData("text/plain"); if (id) moveFact(id, z.dataset.drop); });

let rT; window.addEventListener("resize", () => { clearTimeout(rT); rT = setTimeout(() => {  }, 200); });

if (cls.at >= FLOW.length) cls.at = 0;
render();
})();
