(() => {
const RMQ = matchMedia("(prefers-reduced-motion: reduce)");
let reduce = RMQ.matches;
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);
const mix = (a, b, t) => a + (b - a) * t;
const smooth = (a, b, x) => { const t = clamp((x - a) / (b - a), 0, 1); return t * t * (3 - 2 * t); };
const hash = (x, y) => { const s = Math.sin(x * 127.1 + y * 311.7) * 43758.5453; return s - Math.floor(s); };
function vnoise(x, y) {
  const i = Math.floor(x), j = Math.floor(y), fx = x - i, fy = y - j;
  const u = fx * fx * (3 - 2 * fx), v = fy * fy * (3 - 2 * fy);
  return mix(mix(hash(i, j), hash(i + 1, j), u), mix(hash(i, j + 1), hash(i + 1, j + 1), u), v);
}
const fbm = (x, y) => vnoise(x, y) * 0.6 + vnoise(x * 2.13 + 3.3, y * 2.13 + 7.7) * 0.4;
const desk = () => innerWidth >= 900;
const CELL = () => (desk() ? 6 : 4);
const padPxNow = () => parseFloat(getComputedStyle(document.querySelector(".bar")).paddingLeft) || 20;

/* ---------- icons: Simple Icons (brands) + Lucide ---------- */
const SI = {
  tiktok: "M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z",
  youtube: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z",
  x: "M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z",
  github: "M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12",
};
SI.instagram = "M7.0301.084c-1.2768.0602-2.1487.264-2.911.5634-.7888.3075-1.4575.72-2.1228 1.3877-.6652.6677-1.075 1.3368-1.3802 2.127-.2954.7638-.4956 1.6365-.552 2.914-.0564 1.2775-.0689 1.6882-.0626 4.947.0062 3.2586.0206 3.6671.0825 4.9473.061 1.2765.264 2.1482.5635 2.9107.308.7889.72 1.4573 1.388 2.1228.6679.6655 1.3365 1.0743 2.1285 1.38.7632.295 1.6361.4961 2.9134.552 1.2773.056 1.6884.069 4.9462.0627 3.2578-.0062 3.668-.0207 4.9478-.0814 1.28-.0607 2.147-.2652 2.9098-.5633.7889-.3086 1.4578-.72 2.1228-1.3881.665-.6682 1.0745-1.3378 1.3795-2.1284.2957-.7632.4966-1.636.552-2.9124.056-1.2809.0692-1.6898.063-4.948-.0063-3.2583-.021-3.6668-.0817-4.9465-.0607-1.2797-.264-2.1487-.5633-2.9117-.3084-.7889-.72-1.4568-1.3876-2.1228C21.2982 1.33 20.628.9208 19.8378.6165 19.074.321 18.2017.1197 16.9244.0645 15.6471.0093 15.236-.005 11.977.0014 8.718.0076 8.31.0215 7.0301.0839m.1402 21.6932c-1.17-.0509-1.8053-.2453-2.2287-.408-.5606-.216-.96-.4771-1.3819-.895-.422-.4178-.6811-.8186-.9-1.378-.1644-.4234-.3624-1.058-.4171-2.228-.0595-1.2645-.072-1.6442-.079-4.848-.007-3.2037.0053-3.583.0607-4.848.05-1.169.2456-1.805.408-2.2282.216-.5613.4762-.96.895-1.3816.4188-.4217.8184-.6814 1.3783-.9003.423-.1651 1.0575-.3614 2.227-.4171 1.2655-.06 1.6447-.072 4.848-.079 3.2033-.007 3.5835.005 4.8495.0608 1.169.0508 1.8053.2445 2.228.408.5608.216.96.4754 1.3816.895.4217.4194.6816.8176.9005 1.3787.1653.4217.3617 1.056.4169 2.2263.0602 1.2655.0739 1.645.0796 4.848.0058 3.203-.0055 3.5834-.061 4.848-.051 1.17-.245 1.8055-.408 2.2294-.216.5604-.4763.96-.8954 1.3814-.419.4215-.8181.6811-1.3783.9-.4224.1649-1.0577.3617-2.2262.4174-1.2656.0595-1.6448.072-4.8493.079-3.2045.007-3.5825-.006-4.848-.0608M16.953 5.5864A1.44 1.44 0 1 0 18.39 4.144a1.44 1.44 0 0 0-1.437 1.4424M5.8385 12.012c.0067 3.4032 2.7706 6.1557 6.173 6.1493 3.4026-.0065 6.157-2.7701 6.1506-6.1733-.0065-3.4032-2.771-6.1565-6.174-6.1498-3.403.0067-6.156 2.771-6.1496 6.1738M8 12.0077a4 4 0 1 1 4.008 3.9921A3.9996 3.9996 0 0 1 8 12.0077";
SI.linkedin = "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125zM7.119 20.452H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z";
const LU = {
  download: '<path d="M12 15V3"/><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5"/>',
  star: '<path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/>',
  eye: '<path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/><circle cx="12" cy="12" r="3"/>',
  arrow: '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
  ext: '<path d="M7 7h10v10"/><path d="M7 17 17 7"/>',
  mail: '<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',
  menu: '<path d="M4 7h16"/><path d="M4 12h16"/><path d="M4 17h16"/>',
  close: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
  copy: '<rect width="14" height="14" x="8" y="8" rx="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
  press: '<path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"/><path d="M18 14h-8"/><path d="M15 18h-5"/><path d="M10 6h8v4h-8V6Z"/>',
  play: '<path d="M6 4l14 8-14 8z"/>',
};
const icon = n => SI[n]
  ? `<svg class="ico" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="${SI[n]}"/></svg>`
  : `<svg class="ico s" viewBox="0 0 24 24" aria-hidden="true">${LU[n]}</svg>`;
$$("i[data-icon]").forEach(el => { el.outerHTML = icon(el.dataset.icon); });

/* ---------- menu (phone) ---------- */
const menu = $(".menu"), menuBtn = $(".menu-btn");
if (menu && menuBtn) {
  const set = open => {
    menu.classList.toggle("open", open);
    menuBtn.setAttribute("aria-expanded", open);
    document.documentElement.style.overflow = open ? "hidden" : "";
    for (const el of $$("main, .bar, .rail")) el.inert = open;
    if (open) { $(".menu-close", menu).focus(); relayout(); } else menuBtn.focus();
  };
  menuBtn.addEventListener("click", () => set(true));
  $(".menu-close", menu).addEventListener("click", () => set(false));
  $$("a", menu).forEach(a => a.addEventListener("click", () => set(false)));
  addEventListener("keydown", e => { if (e.key === "Escape" && menu.classList.contains("open")) set(false); });
}

/* ---------- pointer: mouse anywhere, touch on type and grids ---------- */
const P = { x: -1e5, y: -1e5 };
let touching = false;
addEventListener("pointermove", e => {
  if (e.pointerType !== "touch" || touching) { P.x = e.clientX; P.y = e.clientY; }
}, { passive: true });
document.documentElement.addEventListener("pointerleave", e => { if (e.pointerType !== "touch") P.x = P.y = -1e5; });
addEventListener("pointerdown", e => {
  if (e.pointerType === "touch" && e.target.closest("[data-kt],[data-touch]")) { touching = true; P.x = e.clientX; P.y = e.clientY; }
}, { passive: true });
let lingerT = 0;
addEventListener("pointerup", e => {
  if (e.pointerType !== "touch") return;
  touching = false; clearTimeout(lingerT);
  lingerT = setTimeout(() => { if (!touching) P.x = P.y = -1e5; }, 650);
}, { passive: true });
addEventListener("pointercancel", e => { if (e.pointerType === "touch") { touching = false; P.x = P.y = -1e5; } }, { passive: true });
addEventListener("touchstart", e => {
  const t = e.touches[0];
  if (t && e.target.closest && e.target.closest("[data-kt],[data-touch]")) { touching = true; clearTimeout(lingerT); P.x = t.clientX; P.y = t.clientY; }
}, { passive: true });
addEventListener("touchend", () => {
  if (!touching) return;
  touching = false; clearTimeout(lingerT);
  lingerT = setTimeout(() => { if (!touching) P.x = P.y = -1e5; }, 650);
}, { passive: true });

/* ---------- kinetic type: each letter's weight and width follow the cursor ---------- */
class KT {
  constructor(el) {
    this.el = el;
    const d = el.dataset;
    this.rw = +d.w; this.rs = !desk() && d.sp ? +d.sp : +d.s;
    this.hw = d.hw ? +d.hw : (this.rw > 500 ? 200 : 900);
    this.hs = d.hs ? +d.hs : (this.rw > 500 ? 150 : 80);
    this.R = d.r ? +d.r : 0.75;
    this.mw = this.rw; this.ms = this.rs;
    const text = el.textContent.replace(/\s+/g, " ").trim();
    el.textContent = "";
    const sr = document.createElement("span"); sr.className = "sr"; sr.textContent = text; el.append(sr);
    this.ch = [];
    text.split(/( )/).forEach(part => {
      if (!part) return;
      if (part === " ") { el.append(" "); return; }
      const w = document.createElement("span"); w.className = "kw"; w.setAttribute("aria-hidden", "true");
      for (const c of part) {
        const s = document.createElement("span"); s.className = "kc"; s.textContent = c; w.append(s);
        this.ch.push({ el: s, w: this.rw, s: this.rs, lw: -1, ls: -1 });
      }
      el.append(w);
    });
    el.style.fontWeight = this.rw; el.style.fontStretch = this.rs + "%";
  }
  reset() {
    for (const c of this.ch) { c.el.style.width = ""; c.el.style.fontWeight = ""; c.el.style.fontStretch = ""; c.w = this.mw; c.s = this.ms; c.lw = c.ls = -1; }
  }
  measure() {
    const er = this.el.getBoundingClientRect();
    this.fs = parseFloat(getComputedStyle(this.el).fontSize);
    const rects = this.ch.map(c => c.el.getBoundingClientRect());
    this.ch.forEach((c, i) => {
      const r = rects[i];
      c.cx = r.left + r.width / 2 - er.left; c.cy = r.top + r.height / 2 - er.top;
      c.el.style.width = r.width.toFixed(2) + "px";
    });
  }
  frame(er) {
    if (er.bottom < -80 || er.top > innerHeight + 80 || !this.fs) return;
    const R = this.R * this.fs, R2 = R * R;
    for (const c of this.ch) {
      const dx = er.left + c.cx - P.x, dy = er.top + c.cy - P.y;
      const t = reduce ? 0 : Math.exp(-(dx * dx + dy * dy) / R2);
      const tw = mix(this.mw, this.hw, t), ts = mix(this.ms, this.hs, t);
      c.w += (tw - c.w) * 0.18; c.s += (ts - c.s) * 0.18;
      if (Math.abs(tw - c.w) < 0.6) c.w = tw;
      if (Math.abs(ts - c.s) < 0.3) c.s = ts;
      const rw = Math.round(c.w), rs = Math.round(c.s * 2) / 2;
      if (rw !== c.lw) { c.el.style.fontWeight = rw; c.lw = rw; }
      if (rs !== c.ls) { c.el.style.fontStretch = rs + "%"; c.ls = rs; }
    }
  }
}
const kts = $$("[data-kt]").map(el => new KT(el));
const ktOf = el => kts.find(k => k.el === el);

/* fit an element's ink width to a target width by font-size */
function fitTo(el, width, min = 10) {
  let size = 100;
  for (let i = 0; i < 3; i++) {
    el.style.fontSize = size.toFixed(2) + "px";
    const w = el.getBoundingClientRect().width;
    if (!w || Math.abs(w - width) < 0.5) break;
    size = Math.max(min, size * width / w);
  }
  el.style.fontSize = size.toFixed(2) + "px";
}

/* ---------- squircle grid: WebGL1, one quad, per-cell field texture ---------- */
const VS = "precision highp float;attribute vec2 a;void main(){gl_Position=vec4(a,0.,1.);}";
const FS = `precision highp float;
uniform sampler2D uF;uniform vec2 uGrid;uniform float uPitch;uniform vec2 uRes;uniform vec2 uMouse;
uniform float uTime;uniform float uMotion;uniform float uDpr;uniform vec3 uSock;
void main(){
  vec2 frag=vec2(gl_FragCoord.x,uRes.y-gl_FragCoord.y)/uDpr;
  vec2 g=frag/uPitch;vec2 cell=floor(g);
  if(cell.x>=uGrid.x||cell.y>=uGrid.y){gl_FragColor=vec4(0.);return;}
  vec4 f=texture2D(uF,(cell+.5)/uGrid);
  vec2 p=fract(g)-.5;
  float lum=max(f.r,max(f.g,f.b));
  float lit=step(.035,lum);
  vec2 dm=(frag-uMouse)/(uPitch*9.);
  float near=exp(-dot(dm,dm));
  float wave=sin(uTime*1.1+cell.x*.21+cell.y*.13)*.5+sin(uTime*.7-cell.y*.19+cell.x*.05)*.5;
  float size=mix(.15,.47,sqrt(lum));
  size*=1.+uMotion*.07*wave+.24*near*lit;
  size=min(size,.49);
  vec2 a=abs(p)/size;a*=a;a*=a;
  float d=pow(a.x+a.y+1e-6,.25);
  float aa=.9/(uPitch*size*uDpr)+.02;
  float sh=(1.-smoothstep(1.-aa,1.+aa,d))*lit;
  vec2 b=abs(p)/.37;b*=b;b*=b;
  float db=pow(b.x+b.y+1e-6,.25);
  float ab=.9/(uPitch*.37*uDpr)+.02;
  float sa=(1.-smoothstep(1.-ab,1.+ab,db))*f.a;
  vec3 hue=lum>.001?f.rgb/lum:vec3(0.);
  vec3 col=hue*clamp(lum*(1.+.4*near),0.,1.);
  vec3 sc=uSock*(1.+1.4*near);
  vec3 rgb=col*sh+sc*sa*(1.-sh);
  float al=sh+sa*(1.-sh);
  gl_FragColor=vec4(rgb,al);
}`;
class Grid {
  constructor(canvas, opt = {}) {
    this.cv = canvas; this.opt = opt; this.vis = false; this.t0 = performance.now(); this.mode = "gl";
    this.io = new IntersectionObserver(es => { this.vis = es[0].isIntersecting; }, { rootMargin: "120px" });
    this.io.observe(canvas);
    canvas.addEventListener("webglcontextlost", e => {
      e.preventDefault(); this.lost = true; this.ready = false;
      clearTimeout(this.lostT); this.lostT = setTimeout(() => { if (this.lost) this.to2d(); }, 1500);
    });
    canvas.addEventListener("webglcontextrestored", () => {
      clearTimeout(this.lostT); this.lost = false;
      if (this.initGL() && this.data) this.upload(); else this.to2d();
    });
    if (!this.initGL()) this.to2d();
  }
  initGL() {
    const gl = this.cv.getContext("webgl", { alpha: true, premultipliedAlpha: true, antialias: false });
    if (!gl || gl.isContextLost()) return false;
    this.gl = gl;
    const sh = (type, src) => { const s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s); return s; };
    const pr = gl.createProgram();
    gl.attachShader(pr, sh(gl.VERTEX_SHADER, VS)); gl.attachShader(pr, sh(gl.FRAGMENT_SHADER, FS)); gl.linkProgram(pr);
    if (!gl.getProgramParameter(pr, gl.LINK_STATUS)) return false;
    gl.useProgram(pr); this.pr = pr;
    const buf = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(pr, "a"); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    this.tex = gl.createTexture(); gl.bindTexture(gl.TEXTURE_2D, this.tex);
    for (const [k, v] of [[gl.TEXTURE_MIN_FILTER, gl.NEAREST], [gl.TEXTURE_MAG_FILTER, gl.NEAREST], [gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE], [gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE]]) gl.texParameteri(gl.TEXTURE_2D, k, v);
    this.u = {};
    for (const n of ["uF", "uGrid", "uPitch", "uRes", "uMouse", "uTime", "uMotion", "uDpr", "uSock"]) this.u[n] = gl.getUniformLocation(pr, n);
    gl.uniform1i(this.u.uF, 0);
    return true;
  }
  to2d() {
    if (this.mode === "2d") return;
    this.mode = "2d"; this.lost = false;
    const old = this.cv, c = document.createElement("canvas");
    for (const at of old.attributes) c.setAttribute(at.name, at.value);
    c.style.cssText = old.style.cssText;
    old.replaceWith(c); this.cv = c; this.gl = null;
    this.io.disconnect(); this.io.observe(c);
    if (this.data) { const p = this.pitch, d = this.data, cols = this.cols, rows = this.rows; this.size(p); if (this.cols === cols && this.rows === rows) this.data = d; this.upload(true); }
    if (this.onFallback) this.onFallback();
  }
  size(pitch) {
    const r = this.cv.getBoundingClientRect();
    this.w = r.width; this.h = r.height; this.dpr = Math.min(devicePixelRatio || 1, 2);
    this.cv.width = Math.max(1, Math.round(this.w * this.dpr)); this.cv.height = Math.max(1, Math.round(this.h * this.dpr));
    this.pitch = pitch;
    this.cols = Math.ceil(this.w / pitch); this.rows = Math.ceil(this.h / pitch);
    this.data = new Uint8Array(this.cols * this.rows * 4);
  }
  put(x, y, r, g, b, a) {
    if (x < 0 || y < 0 || x >= this.cols || y >= this.rows) return;
    const k = (y * this.cols + x) * 4;
    this.data[k] = clamp(r, 0, 1) * 255; this.data[k + 1] = clamp(g, 0, 1) * 255; this.data[k + 2] = clamp(b, 0, 1) * 255; this.data[k + 3] = clamp(a, 0, 1) * 255;
  }
  upload(force) {
    if (this.mode === "2d") {
      const now = performance.now();
      if (!force && now - (this.t2d || 0) < 60) return;
      this.t2d = now; this.draw2d(); this.ready = true; return;
    }
    const gl = this.gl; if (!gl || this.lost) return;
    gl.bindTexture(gl.TEXTURE_2D, this.tex);
    gl.pixelStorei(gl.UNPACK_ALIGNMENT, 1);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, this.cols, this.rows, 0, gl.RGBA, gl.UNSIGNED_BYTE, this.data);
    this.ready = true;
  }
  draw2d() {
    const g = this.cv.getContext("2d"), p = this.pitch, d = this.data, k = this.dpr;
    g.setTransform(k, 0, 0, k, 0, 0); g.clearRect(0, 0, this.w, this.h);
    const sk = this.opt.sock || [0.13, 0.125, 0.117];
    for (let y = 0; y < this.rows; y++) for (let x = 0; x < this.cols; x++) {
      const i = (y * this.cols + x) * 4, lum = Math.max(d[i], d[i + 1], d[i + 2]) / 255, a = d[i + 3] / 255;
      if (lum >= 0.035) {
        const w = p * 2 * mix(0.15, 0.47, Math.sqrt(lum));
        sq(g, x * p + (p - w) / 2, y * p + (p - w) / 2, w, `rgb(${d[i]},${d[i + 1]},${d[i + 2]})`);
      } else if (a > 0.02) {
        const w = p * 0.74;
        sq(g, x * p + (p - w) / 2, y * p + (p - w) / 2, w, `rgba(${sk[0] * 255 | 0},${sk[1] * 255 | 0},${sk[2] * 255 | 0},${a.toFixed(2)})`);
      }
    }
  }
  draw(now) {
    if (this.mode !== "gl" || this.lost || !this.ready || !this.gl) return;
    const gl = this.gl, u = this.u, r = this.cv.getBoundingClientRect();
    gl.viewport(0, 0, this.cv.width, this.cv.height);
    gl.clearColor(0, 0, 0, 0); gl.clear(gl.COLOR_BUFFER_BIT);
    gl.uniform2f(u.uGrid, this.cols, this.rows); gl.uniform1f(u.uPitch, this.pitch);
    gl.uniform2f(u.uRes, this.cv.width, this.cv.height); gl.uniform1f(u.uDpr, this.cv.width / this.w);
    gl.uniform2f(u.uMouse, reduce ? -1e5 : P.x - r.left, reduce ? -1e5 : P.y - r.top);
    gl.uniform1f(u.uTime, (now - this.t0) / 1000); gl.uniform1f(u.uMotion, reduce ? 0 : 1);
    const s = this.opt.sock || [0.13, 0.125, 0.117]; gl.uniform3f(u.uSock, s[0], s[1], s[2]);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  }
}

/* text -> per-cell coverage, using the real web font */
function rasterText(str, font, fs, cols, rows, x0, baseline, ss = 4) {
  const c = document.createElement("canvas"); c.width = cols * ss; c.height = rows * ss;
  const g = c.getContext("2d");
  g.font = font(fs * ss); g.fillStyle = "#fff"; g.textBaseline = "alphabetic";
  g.fillText(str, x0 * ss, baseline * ss);
  const d = g.getImageData(0, 0, c.width, c.height).data, out = new Float32Array(cols * rows);
  for (let y = 0; y < rows; y++) for (let x = 0; x < cols; x++) {
    let s = 0;
    for (let j = 0; j < ss; j++) for (let i = 0; i < ss; i++) s += d[((y * ss + j) * c.width + x * ss + i) * 4 + 3];
    out[y * cols + x] = s / (ss * ss * 255);
  }
  return out;
}
function inkBox(str, font) {
  const g = document.createElement("canvas").getContext("2d"); g.font = font;
  const m = g.measureText(str);
  return { l: m.actualBoundingBoxLeft, r: m.actualBoundingBoxRight, a: m.actualBoundingBoxAscent, d: m.actualBoundingBoxDescent };
}
function loadImg(src) { return new Promise(res => { const i = new Image(); i.onload = () => res(i); i.onerror = () => res(null); i.src = src; }); }

/* ---------- 2D squircle helpers: inline LED words, sprite, mini grids ---------- */
const FONT5 = {
  A: ["..#..", ".#.#.", "#...#", "#...#", "#####", "#...#", "#...#"],
  I: ["###", ".#.", ".#.", ".#.", ".#.", ".#.", "###"],
};
function sq(g, x, y, s, rgb) {
  g.fillStyle = rgb; g.beginPath();
  if (g.roundRect) g.roundRect(x, y, s, s, s * 0.34); else g.rect(x, y, s, s);
  g.fill();
}
function ledWord(cv) {
  const str = cv.dataset.led, host = cv.parentElement;
  const fs = parseFloat(getComputedStyle(host).fontSize);
  const k = +(cv.dataset.k || 0.15);
  const cell = Math.max(3, fs * k), gap = cell * 0.2, sz = cell - gap;
  let cols = 0; for (const ch of str) cols += FONT5[ch][0].length + 1; cols -= 1;
  const W = cols * cell, H = 7 * cell, dpr = Math.min(devicePixelRatio || 1, 2);
  cv.style.width = W + "px"; cv.style.height = H + "px"; cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
  const g = cv.getContext("2d"); g.setTransform(dpr, 0, 0, dpr, 0, 0);
  const color = cv.dataset.c || "#f3efe7";
  const draw = t => {
    g.clearRect(0, 0, W, H);
    let x0 = 0;
    for (const ch of str) {
      const f = FONT5[ch];
      f.forEach((row, y) => [...row].forEach((v, x) => {
        const gx = x0 + x;
        if (v === "#") {
          const tw = reduce ? 1 : 0.88 + 0.12 * Math.sin(t * 2.2 - gx * 0.7 + y * 0.4);
          g.globalAlpha = tw; sq(g, gx * cell + gap / 2, y * cell + gap / 2, sz, color);
        } else { g.globalAlpha = 0.5; sq(g, gx * cell + gap / 2 + sz * 0.3, y * cell + gap / 2 + sz * 0.3, sz * 0.4, "#2a2824"); }
      }));
      x0 += f[0].length + 1;
    }
    g.globalAlpha = 1;
  };
  return { cv, draw };
}
/* pixel Olle: an original goofy dance loop, plus a spin on tap or hover */
const PAL = { H: "#e9c27c", S: "#efae8e", e: "#0b0b0c", B: "#5f7d9c", P: "#454a57", K: "#b9b4aa", m: "#c07466" };
const HEADS = {
  front: ["..HHHH..", ".HHHHHH.", ".HHHSSH.", ".SeSSeS.", ".SSSSSS.", "..SSSS.."],
  open: ["..HHHH..", ".HHHHHH.", ".HHHSSH.", ".SeSSeS.", ".SmSSmS.", "..SmmS.."],
  side: ["..HHHH..", ".HHHHHH.", ".HHHHSS.", ".HHSSeS.", ".HSSSSSS", "..SSSS.."],
  back: ["..HHHH..", ".HHHHHH.", ".HHHHHH.", ".HHHHHH.", ".HHHHHH.", "..SSSS.."],
};
const ARMS = {
  down: [[0, 6, "B"], [0, 7, "B"], [0, 8, "S"]],
  out: [[0, 6, "B"], [-1, 6, "B"], [-2, 6, "S"]],
  up: [[0, 6, "B"], [0, 5, "B"], [-1, 4, "B"], [-1, 3, "S"]],
  hip: [[0, 6, "B"], [-1, 7, "B"], [0, 8, "S"]],
  wave: [[0, 6, "B"], [-1, 5, "B"], [-2, 4, "S"]],
  point: [[0, 6, "B"], [-1, 5, "B"], [-2, 4, "S"]],
};
const LEGS = {
  stand: ["..P..P..", "..K..K.."],
  wide: [".P....P.", "KK....KK"],
  kickL: [".PP..P..", "K....K.."],
  kickR: ["..P..PP.", "..K....K"],
  tuck: ["..P..P..", ".K....K."],
};
const DANCE = [
  { arms: ["up", "up"], legs: "wide", head: "open" },
  { arms: ["out", "out"], legs: "stand", hy: 1 },
  { arms: ["up", "hip"], legs: "kickL", bx: -1 },
  { arms: ["point", "down"], legs: "kickL", bx: -1, hy: 1, head: "open" },
  { arms: ["down", "down"], legs: "tuck", hop: 1 },
  { arms: ["hip", "up"], legs: "kickR", bx: 1 },
  { arms: ["down", "point"], legs: "kickR", bx: 1, hy: 1, head: "open" },
  { arms: ["wave", "down"], legs: "wide" },
  { arms: ["down", "wave"], legs: "wide", hy: 1 },
  { arms: ["up", "up"], legs: "tuck", hop: 1, head: "open" },
];
const SPIN = [
  { arms: ["down", "down"], legs: "stand", head: "side", hop: 1 },
  { arms: ["down", "down"], legs: "stand", head: "back", hop: 2 },
  { arms: ["down", "down"], legs: "stand", head: "side", flip: 1, hop: 1 },
  { arms: ["down", "down"], legs: "stand", head: "front" },
  { arms: ["up", "up"], legs: "wide", head: "open" },
  { arms: ["up", "up"], legs: "wide", head: "open" },
];
const STILL = { arms: ["down", "down"], legs: "stand", head: "front" };
function sprite(cv) {
  const GW = 12, GH = 14;
  let cell = 6, dpr = 1, last = "", spinAt = -1, vis = true;
  const g = cv.getContext("2d");
  const size = () => {
    cell = +(cv.dataset[desk() ? "cd" : "cm"] || (desk() ? 4 : 3));
    dpr = devicePixelRatio || 1;
    cv.style.width = GW * cell + "px"; cv.style.height = GH * cell + "px";
    cv.width = Math.round(GW * cell * dpr); cv.height = Math.round(GH * cell * dpr);
    last = "";
  };
  size();
  new IntersectionObserver(es => { vis = es[0].isIntersecting; }).observe(cv);
  const spin = () => { if (!reduce) spinAt = performance.now() / 1000; };
  cv.addEventListener("pointerenter", e => { if (e.pointerType === "mouse") spin(); });
  cv.addEventListener("pointerdown", spin);
  const px = (x, y, ch) => {
    const x0 = Math.round(x * cell * dpr), y0 = Math.round(y * cell * dpr);
    g.fillStyle = PAL[ch]; g.fillRect(x0, y0, Math.round((x + 1) * cell * dpr) - x0, Math.round((y + 1) * cell * dpr) - y0);
  };
  const pose = f => {
    g.clearRect(0, 0, cv.width, cv.height);
    const ox = 2 + (f.bx || 0), oy = 2 - (f.hop || 0), flip = !!f.flip;
    const at = (x, y, ch) => px(ox + (flip ? 7 - x : x), oy + y, ch);
    const body = [".BBBBBB.", ".BBBBBB.", ".BBBBBB.", "..PPPP.."];
    body.forEach((r, y) => [...r].forEach((ch, x) => ch !== "." && at(x, 6 + y, ch)));
    LEGS[f.legs].forEach((r, y) => [...r].forEach((ch, x) => ch !== "." && at(x, 10 + y, ch)));
    const [aL, aR] = f.arms;
    for (const [x, y, ch] of ARMS[aL]) at(x, y, ch);
    for (const [x, y, ch] of ARMS[aR]) at(7 - x, y, ch);
    let head = HEADS[f.head || "front"];
    if (f.head === "side" && !flip) head = head.map(r => [...r].reverse().join(""));
    head.forEach((r, y) => [...r].forEach((ch, x) => ch !== "." && at(x, y + (f.hy || 0), ch)));
  };
  const draw = t => {
    if (!vis && last) return;
    let f, key;
    if (reduce) { f = STILL; key = "still"; }
    else if (spinAt >= 0 && t - spinAt < SPIN.length / 12) { const i = clamp(Math.floor((t - spinAt) * 12), 0, SPIN.length - 1); f = SPIN[i]; key = "s" + i; }
    else { spinAt = -1; const i = Math.floor(t * 8) % DANCE.length; f = DANCE[i]; key = "d" + i; }
    if (key === last) return;
    last = key; pose(f);
  };
  return { cv, draw, size };
}
const BEAM = window.E_DATA && window.E_DATA.beam;
const heat = v => { v = Math.pow(clamp((v - 0.035) / 0.965, 0, 1), 0.75); return [clamp(v * 3, 0, 1) * 0.96 + 0.04 * v, clamp(v * 3 - 1, 0, 1), clamp(v * 3 - 2, 0, 1)]; };

/* ---------- scenes ---------- */
const grids = [];
const leds = $$("canvas[data-led]").map(ledWord);
const sprites = $$("canvas.sprite").map(sprite);

/* hero: a clean cutout of the real photo, shown in one of ten treatments (?hero=1..10) */
const heroArt = $(".hero-art"), heroCv = heroArt && $(".hero-cv", heroArt), heroPhoto = heroArt && $(".hero-photo", heroArt);
const HERO_V = document.documentElement.dataset.hero || "1";
const HERO_GPU = /^(8|9|10)$/.test(HERO_V);
let heroSrc = null, heroImg = null, heroDots = null;
if (heroPhoto) {
  const shown = () => heroPhoto.classList.add("on");
  if (heroPhoto.complete && heroPhoto.naturalWidth) heroPhoto.decode().then(shown, shown); else heroPhoto.addEventListener("load", () => heroPhoto.decode().then(shown, shown), { once: true });
}
const heroSrcReady = HERO_V === "1" || HERO_GPU ? Promise.resolve(null) : loadImg("img/hero-soft-640-g3.webp").then(img => {
  heroImg = img;
  if (!img) return null;
  const c = document.createElement("canvas"); c.width = img.width; c.height = img.height;
  const g = c.getContext("2d"); g.drawImage(img, 0, 0);
  const halo = document.createElement("canvas"); halo.width = 160; halo.height = 200;
  const hg = halo.getContext("2d"); hg.filter = "blur(9px)"; hg.drawImage(img, 0, 0, 160, 200);
  heroSrc = { w: c.width, h: c.height, d: g.getImageData(0, 0, c.width, c.height).data, halo: hg.getImageData(0, 0, 160, 200).data };
  return heroSrc;
});
const GLYPHS = " .:-=+*cs#%@";
function heroSample(u, v, span) {
  const S = heroSrc, x0 = Math.max(0, Math.floor(u * S.w)), y0 = Math.max(0, Math.floor(v * S.h));
  let r = 0, g = 0, b = 0, a = 0, n = 0;
  for (let j = 0; j < span; j++) for (let i = 0; i < span; i++) {
    const x = Math.min(S.w - 1, x0 + i), y = Math.min(S.h - 1, y0 + j), k = (y * S.w + x) * 4, al = S.d[k + 3] / 255;
    r += S.d[k] * al; g += S.d[k + 1] * al; b += S.d[k + 2] * al; a += al; n++;
  }
  return a > 0 ? [r / a, g / a, b / a, a / n] : [0, 0, 0, 0];
}
function heroHalo(u, v) { const S = heroSrc, x = Math.min(159, Math.max(0, u * 160 | 0)), y = Math.min(199, Math.max(0, v * 200 | 0)); return S.halo[(y * 160 + x) * 4 + 3] / 255; }
const faceW = (u, v) => 1 - smooth(0.55, 1.0, Math.hypot((u - 0.52) / 0.27, (v - 0.40) / 0.30));
function buildHeroArt() {
  if (!heroArt || !heroCv || HERO_V === "1") return;
  if (HERO_GPU) { buildHeroGpu(); return; }
  if (!heroSrc) { heroSrcReady.then(s => s && buildHeroArt()); return; }
  const r = heroArt.getBoundingClientRect(), W = r.width, H = r.height, dpr = Math.min(devicePixelRatio || 1, 2);
  heroCv.width = Math.round(W * dpr); heroCv.height = Math.round(H * dpr);
  const g = heroCv.getContext("2d"); g.setTransform(dpr, 0, 0, dpr, 0, 0); g.clearRect(0, 0, W, H);
  const D = desk(), S = heroSrc;
  if (HERO_V === "6" || HERO_V === "7") {
    const p = HERO_V === "6" ? (D ? 3 : 2.2) : (D ? 4 : 3.2);
    const cols = Math.ceil(W / p), rows = Math.ceil(H / p);
    const c = document.createElement("canvas"); c.width = cols; c.height = rows;
    const cg = c.getContext("2d"); cg.imageSmoothingQuality = "high"; cg.drawImage(heroImg, 0, 0, cols, rows);
    const d = cg.getImageData(0, 0, cols, rows).data;
    heroDots = { p, cols, rows, d, W, H, dpr, last: -1, off: 0 };
    if (HERO_V === "6") { heroDots.img = g.createImageData(cols, rows); heroDots.tmp = c; }
    heroDraw(performance.now() / 1000, true);
    heroCv.classList.add("on");
    return;
  }
  if (HERO_V === "5") {
    const p = D ? 6 : 4.5, cols = Math.ceil(W / p), rows = Math.ceil(H / p), span = Math.max(1, Math.round(p / W * S.w));
    for (let y = 0; y < rows; y++) for (let x = 0; x < cols; x++) {
      const u = (x + 0.5) / cols, v = (y + 0.5) / rows, [R, G, B, A] = heroSample(u - span / S.w / 2, v - span / S.h / 2, span);
      if (A < 0.04) continue;
      const lum = (0.299 * R + 0.587 * G + 0.114 * B) / 255, s = p * Math.min(0.97, (0.55 + 0.45 * Math.sqrt(lum)) * Math.sqrt(A));
      const lf = c => 255 * Math.pow(c / 255, 0.8);
      sq(g, x * p + (p - s) / 2, y * p + (p - s) / 2, s, `rgb(${lf(R) | 0},${lf(G) | 0},${lf(B) | 0})`);
    }
  } else {
    const cw = D ? 4.4 : 3.4, ch = cw * 1.55, cols = Math.ceil(W / cw), rows = Math.ceil(H / ch), span = Math.max(1, Math.round(cw / W * S.w));
    g.font = `800 ${(ch * 1.04).toFixed(2)}px "Geist Mono", ui-monospace, monospace`; g.textAlign = "center"; g.textBaseline = "middle";
    const n = GLYPHS.length;
    for (let y = 0; y < rows; y++) for (let x = 0; x < cols; x++) {
      const u = (x + 0.5) / cols, v = (y + 0.5) / rows;
      const [R, G, B, A] = heroSample(u - span / S.w / 2, v - span / S.h / 2, span);
      let w = A;
      if (HERO_V === "3") w *= 1 - faceW(u, v) * 0.98;
      if (w >= 0.05) {
        const lum = (0.299 * R + 0.587 * G + 0.114 * B) / 255;
        const ci = clamp(Math.round(Math.pow(lum, 0.55) * (n - 1)), 1, n - 1), lift = c => 255 * Math.pow(c / 255, 0.62);
        const col = `rgb(${lift(R) | 0},${lift(G) | 0},${lift(B) | 0})`;
        g.fillStyle = col; g.globalAlpha = Math.min(1, w) * 0.34; g.fillRect(x * cw, y * ch, cw + 0.4, ch + 0.4);
        g.globalAlpha = Math.min(1, w * 1.15);
        g.fillText(GLYPHS[ci], (x + 0.5) * cw, (y + 0.5) * ch);
      } else if (HERO_V === "3") {
        const h = heroHalo(u, v) * (A < 0.05 ? 1 : 0);
        if (h > 0.04 && hash(x, y) < h * 1.4) { g.globalAlpha = Math.min(0.75, h * 1.6); g.fillStyle = "#b9764f"; g.fillText(h > 0.3 ? ":" : ".", (x + 0.5) * cw, (y + 0.5) * ch); }
      }
    }
    g.globalAlpha = 1;
  }
  heroCv.classList.add("on");
}

/* variants 6 and 7: full-body dither portraits, alive with a slow shimmer and a ripple under the cursor */
function heroDraw(t, force) {
  const Q = heroDots; if (!Q || !heroCv) return;
  const r = heroCv.getBoundingClientRect();
  if (r.bottom < 0 || r.top > innerHeight) return;
  const mx = P.x - r.left, my = P.y - r.top, near = !reduce && mx > -80 && my > -80 && mx < r.width + 80 && my < r.height + 80;
  const step = reduce ? 0 : Math.floor(t * (HERO_V === "6" ? 5 : 2));
  if (!force && step === Q.last && !near && !Q.hot) return;
  if (!force && near && t - (Q.tl || 0) < 1 / 30) return;
  Q.last = step; Q.tl = t; Q.hot = near;
  const { p, cols, rows, d } = Q, g = heroCv.getContext("2d"), R2 = 120 * 120;
  const ripple = (x, y) => { if (!near) return 0; const dx = (x + 0.5) * p - mx, dy = (y + 0.5) * p - my, dd = dx * dx + dy * dy; if (dd > R2 * 4) return 0; return (HERO_V === "7" ? 0.1 : 0.2) * Math.sin(Math.sqrt(dd) / 11 - t * 4) * Math.exp(-dd / R2); };
  if (HERO_V === "6") {
    const o = Q.img.data, sx = step * 7 & 63, sy = step * 13 & 63;
    for (let y = 0; y < rows; y++) for (let x = 0; x < cols; x++) {
      const i = (y * cols + x) * 4, a = d[i + 3] / 255;
      const bn = BN ? BN[((y + sy) & 63) * 64 + ((x + sx) & 63)] : 0.5, rp = ripple(x, y);
      if (a < 0.02 || a < bn * 0.9 + rp * 0.5) { o[i + 3] = 0; continue; }
      const lum = (0.299 * d[i] + 0.587 * d[i + 1] + 0.114 * d[i + 2]) / 255;
      const b2 = BN ? BN[((y + sy + 31) & 63) * 64 + ((x + sx + 23) & 63)] : 0.5;
      const on = Math.pow(lum, 0.6) * 1.18 + rp > b2;
      const k = on ? 1 : 0.32, lf = c => 255 * Math.pow(d[i + c] / 255, on ? 0.72 : 1) * k;
      o[i] = lf(0); o[i + 1] = lf(1); o[i + 2] = lf(2);
      o[i + 3] = 255;
    }
    Q.tmp.getContext("2d").putImageData(Q.img, 0, 0);
    g.setTransform(1, 0, 0, 1, 0, 0); g.clearRect(0, 0, heroCv.width, heroCv.height);
    g.imageSmoothingEnabled = false; g.drawImage(Q.tmp, 0, 0, heroCv.width, heroCv.height);
  } else {
    g.setTransform(Q.dpr, 0, 0, Q.dpr, 0, 0); g.clearRect(0, 0, Q.W, Q.H);
    const lo = [96, 52, 36], hi = [243, 239, 231], br = reduce ? 0 : 0.04 * Math.sin(t * 0.9);
    for (let y = 0; y < rows; y++) for (let x = 0; x < cols; x++) {
      const i = (y * cols + x) * 4, a = d[i + 3] / 255; if (a < 0.03) continue;
      const lum = (0.299 * d[i] + 0.587 * d[i + 1] + 0.114 * d[i + 2]) / 255, k = Math.pow(lum, 0.9);
      const s = p * Math.min(1.12, (0.18 + 0.95 * Math.sqrt(lum) + br + ripple(x, y)) * Math.sqrt(a));
      if (s < 0.5) continue;
      const cx = (x + 0.5) * p + (y & 1 ? p / 2 : 0), cy = (y + 0.5) * p;
      g.fillStyle = `rgb(${mix(lo[0], hi[0], k) | 0},${mix(lo[1], hi[1], k) | 0},${mix(lo[2], hi[2], k) | 0})`;
      g.beginPath(); g.arc(cx, cy, s / 2, 0, 6.2832); g.fill();
    }
  }
}

/* variant 4: the photo resolves into ASCII under the cursor and as you scroll away */
if (heroArt && HERO_V === "4") {
  const setLens = (x, y, r) => { heroArt.style.setProperty("--mx", x + "px"); heroArt.style.setProperty("--my", y + "px"); heroArt.style.setProperty("--lr", r + "px"); };
  setLens(-999, -999, 0);
  addEventListener("pointermove", e => {
    if (reduce) return;
    const r = heroArt.getBoundingClientRect(), x = e.clientX - r.left, y = e.clientY - r.top;
    const inside = x > -60 && y > -60 && x < r.width + 60 && y < r.height + 60;
    setLens(x, y, inside ? (desk() ? 110 : 80) : 0);
  }, { passive: true });
  const sc = () => { const h = $(".hero").getBoundingClientRect(); heroArt.style.setProperty("--sp", clamp(-h.top / (h.height * 0.6), 0, 1).toFixed(3)); };
  addEventListener("scroll", sc, { passive: true }); sc();
}

/* variants 8-10: the clean cutout redrawn on the GPU at device pixels.
   8 colour ASCII, glyphs picked by their measured ink; 9 ASCII with edges drawn as / \ | _; 10 Atkinson dither in a palette taken from the photo */
const heroGpuImg = HERO_GPU ? loadImg(matchMedia("(min-width:900px), (min-resolution:2.5dppx)").matches ? "img/hero-src-1200-g6.webp" : "img/hero-src-720-g6.webp") : null;
const HT = Object.assign({ cell: [5, 3], weight: 560, lh: 1.0, glow: [0.4, 0.9], flick: 0.05, dpx: [2, 1.34], tone: [1.4, 0.8, 0.3, 5, 1.0], tone10: [0.5, 1.6, 0.3, 5, 0.85], cg: 0.9, ig: 0.7, ink0: 0.1,
  ramp8: " .:-=+*cs#%@", pool8: " .,:;-~=+*cosxzaeuv#%@", ramp9: " .:-=+*#", w9: [0.8, 1.1], pool9: " .,:;-~=+*cos#%@", edgeInk: [0.98, 0.93, 0.85], fade: [0.66, 0.97, 0.78, 1.04], spot: [0.45, 0.3, 0.62], sat: 1.12,
  edge: [0.4, 2.0, 0.02, 0.07, 0.3, 0.45], hyst: 0.35, glow9: 0.25, dk: 5, dx: ["#73849a", "#b3a49a", "#efe6da"], dsat: 0.95 }, window.__heroTune || {});
let HG = null;
const HG_VS = "attribute vec2 a;void main(){gl_Position=vec4(a,0.,1.);}";
const HG_HEAD = `#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif
uniform vec2 uRes,uOrg,uGrid,uCell;uniform float uT,uLive;uniform vec3 uPtr;
float h21(vec2 p){p=fract(p*vec2(123.34,456.21));p+=dot(p,p+45.32);return fract(p.x*p.y);}
vec2 px(){return vec2(gl_FragCoord.x,uRes.y-gl_FragCoord.y)-uOrg;}
float sweep(vec2 uv,float w){float s=uv.x*.4+uv.y-mod(uT*.04,1.)*3.2+.45;return uLive*exp(-s*s*w);}
float nearP(vec2 q){vec2 d=q-uPtr.xy;return uLive*exp(-dot(d,d)/(uPtr.z*uPtr.z+1.));}
`;
const HG_ASCII = HG_HEAD + `uniform sampler2D uInk,uAux,uGlow,uAtlas;uniform float uN,uGlowK,uFlick;
void main(){
  vec2 p=px(),c=floor(p/uCell);
  if(c.x<0.||c.y<0.||c.x>=uGrid.x||c.y>=uGrid.y){gl_FragColor=vec4(0.);return;}
  vec2 uv=(c+.5)/uGrid;
  vec4 ink=texture2D(uInk,uv),aux=texture2D(uAux,uv);
  float near=nearP((c+.5)*uCell),band=sweep(uv,70.);
  float slot=floor(uT*1.1+aux.a*17.),r=h21(c*.731+slot*1.618);
  float g=floor(ink.a*255.+.5),pf=uLive*uFlick+near*.3+band*.08;
  if(r<pf)g=floor(aux.r*255.+.5);else if(r<pf*1.7)g=floor(aux.g*255.+.5);
  vec2 l=p-c*uCell;
  float m=texture2D(uAtlas,vec2((g*uCell.x+l.x)/(uN*uCell.x),l.y/uCell.y)).r*aux.b;
  vec3 col=min(ink.rgb*(1.+.25*near+.12*band),1.);
  vec3 gw=texture2D(uGlow,p/(uGrid*uCell)).rgb*uGlowK*(1.+.4*near+.15*band);
  vec3 o=col*m+gw*(1.-m);
  gl_FragColor=vec4(o,max(m,max(o.r,max(o.g,o.b))));
}`;
const HG_DITHER = HG_HEAD + `uniform sampler2D uIdx,uPal,uBN;uniform float uK;
void main(){
  vec2 p=px(),c=floor(p/uCell);
  if(c.x<0.||c.y<0.||c.x>=uGrid.x||c.y>=uGrid.y){gl_FragColor=vec4(0.);return;}
  vec2 uv=(c+.5)/uGrid;
  float i=floor(texture2D(uIdx,uv).r*255.+.5);
  if(i<.5){gl_FragColor=vec4(0.);return;}
  float bn=texture2D(uBN,(c+.5)/64.).r;
  float lift=sweep(uv,26.)*.35+nearP((c+.5)*uCell)*.6;
  vec3 c3=texture2D(uPal,vec2((i+.5)/uK,.5)).rgb;
  if(bn<lift)c3=min(c3*1.18+.03,1.);
  gl_FragColor=vec4(c3,1.);
}`;

function heroBox(W, H, ia) { let w = W, h = W / ia; if (h > H) { h = H; w = H * ia; } return { x: (W - w) / 2, y: H - h, w, h }; }
function heroRaster(img, w, h, x0 = 0, y0 = 0, dw = w, dh = h) {
  const c = document.createElement("canvas"); c.width = w; c.height = h;
  const g = c.getContext("2d", { willReadFrequently: true }); g.imageSmoothingQuality = "high"; g.drawImage(img, x0, y0, dw, dh);
  const d = g.getImageData(0, 0, w, h).data, n = w * h, R = new Float32Array(n), G = new Float32Array(n), B = new Float32Array(n), A = new Float32Array(n), Y = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const k = i * 4; R[i] = d[k] / 255; G[i] = d[k + 1] / 255; B[i] = d[k + 2] / 255; A[i] = d[k + 3] / 255;
    Y[i] = 0.2126 * R[i] + 0.7152 * G[i] + 0.0722 * B[i];
  }
  return { w, h, R, G, B, A, Y };
}
function boxBlur(src, w, h, r) {
  const S = new Float64Array((w + 1) * (h + 1)), out = new Float32Array(w * h);
  for (let y = 0; y < h; y++) { let row = 0; for (let x = 0; x < w; x++) { row += src[y * w + x]; S[(y + 1) * (w + 1) + x + 1] = S[y * (w + 1) + x + 1] + row; } }
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
    const x0 = Math.max(0, x - r), x1 = Math.min(w, x + r + 1), y0 = Math.max(0, y - r), y1 = Math.min(h, y + r + 1);
    out[y * w + x] = (S[y1 * (w + 1) + x1] - S[y0 * (w + 1) + x1] - S[y1 * (w + 1) + x0] + S[y0 * (w + 1) + x0]) / ((x1 - x0) * (y1 - y0));
  }
  return out;
}
const gauss = (src, w, h, r) => boxBlur(boxBlur(boxBlur(src, w, h, r), w, h, r), w, h, r);
/* tone: local contrast so eyes, brows and the smile read, then levels over the cutout only */
function heroTone(Rs, cell, c1, r1, c2, r2, gam) {
  const { w, h, A, Y } = Rs, n = w * h, ya = new Float32Array(n);
  for (let i = 0; i < n; i++) ya[i] = Y[i] * A[i];
  const loc = r => { const by = gauss(ya, w, h, Math.max(1, Math.round(cell * r))), ba = gauss(A, w, h, Math.max(1, Math.round(cell * r))); for (let i = 0; i < n; i++) by[i] /= Math.max(ba[i], 1e-3); return by; };
  const l1 = loc(r1), l2 = c2 ? loc(r2) : l1, T = new Float32Array(n), vals = [];
  for (let i = 0; i < n; i++) { T[i] = Y[i] + c1 * (Y[i] - l1[i]) + c2 * (Y[i] - l2[i]); if (A[i] > 0.9 && (i & 3) === 0) vals.push(T[i]); }
  vals.sort((a, b) => a - b);
  const lo = vals[Math.floor(vals.length * 0.015)] || 0, hi = vals[Math.floor(vals.length * 0.985)] || 1;
  for (let i = 0; i < n; i++) T[i] = Math.pow(clamp((T[i] - lo) / (hi - lo), 0, 1), gam);
  return T;
}
const heroSpot = (u, v) => 1 - HT.spot[0] * smooth(HT.spot[1], HT.spot[2], Math.hypot((u - 0.53) / 0.85, v - 0.4));
const heroFade = (u, v) => Math.min(1 - smooth(HT.fade[0], HT.fade[1], v), 1 - smooth(HT.fade[2], HT.fade[3], Math.hypot((u - 0.5) / 0.58, (v - 0.4) / 0.62)));

/* glyphs from the site's own mono font, measured, never a hand-written ramp */
const HG_CHARS = Array.from({ length: 95 }, (_, i) => String.fromCharCode(32 + i));
function glyphSheet(cw, ch, fs, weight) {
  const c = document.createElement("canvas"); c.width = cw * HG_CHARS.length; c.height = ch;
  const g = c.getContext("2d", { willReadFrequently: true }); g.font = `${weight} ${fs}px "Geist Mono"`;
  const m = g.measureText("Mdg|"), top = m.actualBoundingBoxAscent, bot = m.actualBoundingBoxDescent;
  g.fillStyle = "#fff"; g.textAlign = "center"; g.textBaseline = "alphabetic";
  const base = Math.round((ch - (top + bot)) / 2 + top);
  HG_CHARS.forEach((s, i) => g.fillText(s, i * cw + cw / 2, base));
  return c;
}
function glyphCoverage(ratio, weight) {
  const mw = 30, mh = Math.round(mw * ratio), c = glyphSheet(mw, mh, mw / HG.adv, weight), d = c.getContext("2d").getImageData(0, 0, c.width, mh).data, cov = new Float32Array(HG_CHARS.length);
  for (let i = 0; i < d.length; i += 4) cov[Math.floor((i / 4 % c.width) / mw)] += d[i + 3] / 255;
  for (let k = 0; k < cov.length; k++) cov[k] /= mw * mh;
  return cov;
}
const gi = s => [...s].map(c => c.charCodeAt(0) - 32);
/* per tone: the glyph whose measured ink matches it, plus same-ink stand-ins for the shimmer */
function glyphRamp(cov, ramp, pool) {
  const R = gi(ramp).sort((a, b) => cov[a] - cov[b]), P = gi(pool), mx = cov[R[R.length - 1]];
  const alts = R.map(i => { if (!i) return [0, 0]; const near = P.filter(j => j !== i && j && Math.abs(cov[j] - cov[i]) < cov[i] * 0.16).sort((a, b) => Math.abs(cov[a] - cov[i]) - Math.abs(cov[b] - cov[i])); return [near[0] ?? i, near[1] ?? near[0] ?? i]; });
  return { R, alts, pick(t, out) { const x = t * mx; let k = 0, bd = 9; R.forEach((i, j) => { const d = Math.abs(cov[i] - x); if (d < bd) { bd = d; k = j; } }); out[0] = R[k]; out[1] = alts[k][0]; out[2] = alts[k][1]; } };
}
function inkFor(c, t, sat) {
  const Y = Math.max(0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2], 0.04), b = mix(HT.ink0, 1, Math.pow(t, HT.ig));
  const o = c.map(v => clamp(Y + (v - Y) * sat, 0, 1)), m = Math.max(...o, 1e-3), k = Math.min(b / Y, 1 / m), w = clamp((b - Y * k) / Math.max(1 - Y * k, 1e-3), 0, 1);
  return o.map(v => mix(v * k, 1, w));
}
const WARM = [[0.3, 0.09, 0.05], [0.7, 0.24, 0.1], [0.95, 0.5, 0.25], [1, 0.78, 0.56], [0.97, 0.94, 0.89]];
const warm = t => { t = clamp(t, 0, 1) * (WARM.length - 1); const i = Math.min(WARM.length - 2, Math.floor(t)), f = t - i; return [0, 1, 2].map(k => mix(WARM[i][k], WARM[i + 1][k], f)); };

const heroCellPx = dpr => Math.max(5, Math.round(HT.cell[desk() ? 0 : 1] * (dpr < 1.5 ? 1.2 : 1) * dpr));
function heroAscii(img, box, dpr, edges) {
  const cw = heroCellPx(dpr), fs = cw / HG.adv, ch = Math.round(fs * HT.lh);
  const bw = box.w * dpr, bh = box.h * dpr, cols = Math.floor(bw / cw), rows = Math.floor(bh / ch);
  const org = [Math.round(box.x * dpr + (bw - cols * cw) / 2), Math.round(box.y * dpr + bh - rows * ch)];
  const gw = 6, gh = Math.max(6, Math.round(gw * ch / cw)), sx = gw / cw, sy = gh / ch;
  const Rs = heroRaster(img, cols * gw, rows * gh, (box.x * dpr - org[0]) * sx, (box.y * dpr - org[1]) * sy, bw * sx, bh * sy);
  const T = heroTone(Rs, cols * gw / 132, ...HT.tone), { w, A, R, G, B } = Rs, nc = cols * rows, col = new Float32Array(nc * 5);
  for (let cy = 0; cy < rows; cy++) for (let cx = 0; cx < cols; cx++) {
    let r = 0, g = 0, b = 0, a = 0, t = 0;
    for (let y = 0; y < gh; y++) for (let x = 0; x < gw; x++) { const i = (cy * gh + y) * w + cx * gw + x, al = A[i]; r += R[i] * al; g += G[i] * al; b += B[i] * al; a += al; t += T[i] * al; }
    const o = (cy * cols + cx) * 5; col[o] = a ? r / a : 0; col[o + 1] = a ? g / a : 0; col[o + 2] = a ? b / a : 0; col[o + 3] = a / (gw * gh); col[o + 4] = t / (gw * gh);
  }
  const ramp = glyphRamp(HG.cov, edges ? HT.ramp9 : HT.ramp8, edges ? HT.pool9 : HT.pool8), E = edges ? heroEdges(Rs, T, cols, rows, gw, gh) : null;
  const ink = new Uint8Array(nc * 4), aux = new Uint8Array(nc * 4), glow = new Uint8Array(nc * 4), top = [0, 0, 0];
  for (let cy = 0; cy < rows; cy++) for (let cx = 0; cx < cols; cx++) {
    const ci = cy * cols + cx, o = ci * 4, q = ci * 5, a = col[q + 3]; let t = col[q + 4]; const pres = a * heroFade((cx + 0.5) / cols, (cy + 0.5) / rows);
    const bn = BN ? BN[(cy & 63) * 64 + (cx & 63)] : 0.5, e = E ? E[ci] : -1, on = pres > 0.06 + bn * 0.5 || (e >= 0 && a > 0.1);
    const sp = heroSpot((cx + 0.5) / cols, (cy + 0.5) / rows), tt = t / Math.max(a, 0.05) * sp;
    t *= sp;
    let rgb;
    if (e >= 0) { top[0] = top[1] = top[2] = e; rgb = HT.edgeInk; }
    else { ramp.pick(Math.pow(t, HT.cg), top); rgb = edges ? warm(Math.pow(tt, HT.w9[0]) * HT.w9[1]) : inkFor([col[q], col[q + 1], col[q + 2]], tt, HT.sat); }
    ink[o] = rgb[0] * 255; ink[o + 1] = rgb[1] * 255; ink[o + 2] = rgb[2] * 255; ink[o + 3] = top[0];
    aux[o] = top[1]; aux[o + 1] = top[2]; aux[o + 2] = on ? 255 * smooth(0.04, 0.45, pres) : 0; aux[o + 3] = hash(cx * 1.7, cy * 3.1) * 255;
    const gc = edges ? warm(tt * HT.w9[1] * 0.85) : inkFor([col[q], col[q + 1], col[q + 2]], tt, HT.sat), gk = smooth(0.02, 0.9, pres) * Math.pow(tt, 1.3);
    glow[o] = gc[0] * gk * 255; glow[o + 1] = gc[1] * gk * 255; glow[o + 2] = gc[2] * gk * 255; glow[o + 3] = 255;
  }
  return { kind: "ascii", cols, rows, org, cw, ch, fs, ink, aux, glow };
}
/* Acerola-style edges: difference of Gaussians finds the lines, a structure tensor per cell finds their direction */
function heroEdges(Rs, T, cols, rows, gw, gh) {
  const { w, h, A } = Rs, n = w * h, v = new Float32Array(n), [s1, k, lo, hi, fr0, ch] = HT.edge, fr = fr0 * Math.min(1, cols / 132);
  for (let i = 0; i < n; i++) v[i] = T[i] * A[i];
  const ref = w / 132, r1 = Math.max(1, Math.round(ref * s1)), g1 = gauss(v, w, h, r1), g2 = gauss(v, w, h, Math.max(r1 + 1, Math.round(ref * s1 * k))), out = new Int16Array(cols * rows).fill(-1);
  const gx = new Float32Array(n), gy = new Float32Array(n), line = new Float32Array(n);
  for (let y = 1; y < h - 1; y++) for (let x = 1; x < w - 1; x++) {
    const i = y * w + x, q = (dx, dy) => g2[i + dy * w + dx];
    gx[i] = (q(1, -1) + 2 * q(1, 0) + q(1, 1)) - (q(-1, -1) + 2 * q(-1, 0) + q(-1, 1));
    gy[i] = (q(-1, 1) + 2 * q(0, 1) + q(1, 1)) - (q(-1, -1) + 2 * q(0, -1) + q(1, -1));
    line[i] = smooth(lo, hi, g2[i] - g1[i]);
  }
  const C = c => HG_CHARS.indexOf(c), score = new Float32Array(cols * rows), dir = new Int16Array(cols * rows);
  for (let cy = 0; cy < rows; cy++) for (let cx = 0; cx < cols; cx++) {
    const sp = heroSpot((cx + 0.5) / cols, (cy + 0.5) / rows) * heroFade((cx + 0.5) / cols, (cy + 0.5) / rows);
    let jxx = 0, jxy = 0, jyy = 0, s = 0, my = 0;
    for (let y = 0; y < gh; y++) for (let x = 0; x < gw; x++) {
      const i = (cy * gh + y) * w + cx * gw + x, l = line[i];
      if (l <= 0) continue;
      jxx += gx[i] * gx[i] * l; jxy += gx[i] * gy[i] * l; jyy += gy[i] * gy[i] * l; s += l; my += l * y;
    }
    const ci = cy * cols + cx, tr = jxx + jyy, coh = tr > 0 ? Math.sqrt((jxx - jyy) ** 2 + 4 * jxy * jxy) / tr : 0;
    if (coh < ch || !s) continue;
    score[ci] = s / (gw * gh) * sp;
    let phi = 0.5 * Math.atan2(2 * jxy, jxx - jyy) + Math.PI / 2;
    phi = ((phi % Math.PI) + Math.PI) % Math.PI;
    const b = Math.round(phi / (Math.PI / 4)) % 4;
    dir[ci] = b === 0 ? (my / s > gh * 0.6 ? C("_") : C("-")) : b === 1 ? C("\\") : b === 2 ? C("|") : C("/");
  }
  for (let i = 0; i < score.length; i++) if (score[i] >= fr) out[i] = dir[i];
  for (let pass = 0; pass < 2; pass++) for (let cy = 0; cy < rows; cy++) for (let cx = 0; cx < cols; cx++) {
    const ci = cy * cols + cx; if (out[ci] >= 0 || score[ci] < fr * HT.hyst) continue;
    for (let dy = -1; dy <= 1 && out[ci] < 0; dy++) for (let dx = -1; dx <= 1; dx++) { const x = cx + dx, y = cy + dy; if ((dx || dy) && x >= 0 && y >= 0 && x < cols && y < rows && out[y * cols + x] >= 0) { out[ci] = dir[ci]; break; } }
  }
  return out;
}

const lin = v => Math.pow(v, 2.2), gam = v => Math.pow(clamp(v, 0, 1), 1 / 2.2);
function kmeans(pts, k, iters) {
  const n = pts.length / 3, C = [];
  for (let j = 0; j < k; j++) { const i = Math.floor(((j + 0.5) / k) * n) * 3; C.push([pts[i], pts[i + 1], pts[i + 2]]); }
  for (let it = 0; it < iters; it++) {
    const S = C.map(() => [0, 0, 0, 0]);
    for (let i = 0; i < n; i++) { let b = 0, bd = 9; for (let j = 0; j < k; j++) { const d = (pts[i * 3] - C[j][0]) ** 2 + (pts[i * 3 + 1] - C[j][1]) ** 2 + (pts[i * 3 + 2] - C[j][2]) ** 2; if (d < bd) { bd = d; b = j; } } S[b][0] += pts[i * 3]; S[b][1] += pts[i * 3 + 1]; S[b][2] += pts[i * 3 + 2]; S[b][3]++; }
    S.forEach((s, j) => { if (s[3]) C[j] = [s[0] / s[3], s[1] / s[3], s[2] / s[3]]; });
  }
  return C;
}
/* his own colours: k-means over the lit face, plus iris blue and two shirt whites; index 0 is empty */
function heroDither(img, box, dpr) {
  const px = Math.max(1, Math.round(HT.dpx[desk() ? 0 : 1] * dpr)), bw = box.w * dpr, bh = box.h * dpr;
  const cols = Math.floor(bw / px), rows = Math.floor(bh / px), org = [Math.round(box.x * dpr + (bw - cols * px) / 2), Math.round(box.y * dpr + bh - rows * px)];
  const Rs = heroRaster(img, cols, rows, (box.x * dpr - org[0]) / px, (box.y * dpr - org[1]) / px, bw / px, bh / px);
  const T = heroTone(Rs, cols / 132, ...HT.tone10), n = cols * rows, V = new Float32Array(n * 3), wt = new Float32Array(n);
  for (let y = 0; y < rows; y++) for (let x = 0; x < cols; x++) {
    const i = y * cols + x, u = (x + 0.5) / cols, v = (y + 0.5) / rows, w = Rs.A[i] * heroFade(u, v) * heroSpot(u, v), t = T[i] * w, Y = Math.max(Rs.Y[i], 0.02);
    wt[i] = w;
    const c = [Rs.R[i], Rs.G[i], Rs.B[i]].map(ch => clamp((Y + (ch - Y) * HT.dsat) * t / Y, 0, 1));
    V[i * 3] = lin(c[0]); V[i * 3 + 1] = lin(c[1]); V[i * 3 + 2] = lin(c[2]);
  }
  const pts = []; for (let i = 0; i < n; i += 7) if (wt[i] > 0.85) pts.push(V[i * 3], V[i * 3 + 1], V[i * 3 + 2]);
  const pal = [[0, 0, 0]].concat(kmeans(pts, HT.dk, 12).map(c => c.map(v => Math.round(gam(v) * 255))), HT.dx.map(hexRGB));
  const K = pal.length, P = pal.map(c => c.map(v => lin(v / 255))), idx = new Uint8Array(n);
  const near = (r, g, b) => { let bi = 0, bd = 9; for (let k = 0; k < K; k++) { const p = P[k], d = (p[0] - r) ** 2 + (p[1] - g) ** 2 * 1.4 + (p[2] - b) ** 2 * 0.6; if (d < bd) { bd = d; bi = k; } } return bi; };
  const W = [[1, 0], [2, 0], [-1, 1], [0, 1], [1, 1], [0, 2]];
  for (let y = 0; y < rows; y++) {
    const rev = y & 1;
    for (let j = 0; j < cols; j++) {
      const x = rev ? cols - 1 - j : j, i = y * cols + x;
      for (let c = 0; c < 3; c++) V[i * 3 + c] = clamp(V[i * 3 + c], -0.08, 1.08);
      const k = wt[i] < 0.02 ? 0 : near(V[i * 3], V[i * 3 + 1], V[i * 3 + 2]), p = P[k], e = [0, 1, 2].map(c => (V[i * 3 + c] - p[c]) / 8);
      idx[i] = k;
      for (const [dx, dy] of W) { const xx = x + (rev ? -dx : dx), yy = y + dy; if (xx >= 0 && xx < cols && yy < rows) { const q = (yy * cols + xx) * 3; V[q] += e[0]; V[q + 1] += e[1]; V[q + 2] += e[2]; } }
    }
  }
  const palT = new Uint8Array(K * 4); pal.forEach((c, k) => { palT.set([c[0], c[1], c[2], k ? 255 : 0], k * 4); });
  return { kind: "dither", cols, rows, org, cw: px, ch: px, idx, pal: palT, K };
}

function heroGL(cv) {
  const gl = cv.getContext("webgl", { alpha: true, premultipliedAlpha: true, antialias: false });
  if (!gl) return null;
  const mk = fs => {
    const sh = (t, s) => { const o = gl.createShader(t); gl.shaderSource(o, s); gl.compileShader(o); return o; };
    const p = gl.createProgram(); gl.attachShader(p, sh(gl.VERTEX_SHADER, HG_VS)); gl.attachShader(p, sh(gl.FRAGMENT_SHADER, fs)); gl.linkProgram(p);
    return gl.getProgramParameter(p, gl.LINK_STATUS) ? p : null;
  };
  const pr = mk(HERO_V === "10" ? HG_DITHER : HG_ASCII); if (!pr) return null;
  gl.useProgram(pr);
  const buf = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  const loc = gl.getAttribLocation(pr, "a"); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
  const U = n => gl.getUniformLocation(pr, n);
  return { gl, pr, U, tex: {} };
}
function hgTex(G, unit, name, w, h, data, fmt, linear, wrap) {
  const gl = G.gl; let t = G.tex[name];
  if (!t) { t = G.tex[name] = gl.createTexture(); }
  gl.activeTexture(gl.TEXTURE0 + unit); gl.bindTexture(gl.TEXTURE_2D, t);
  gl.pixelStorei(gl.UNPACK_ALIGNMENT, 1);
  if (data instanceof HTMLCanvasElement) gl.texImage2D(gl.TEXTURE_2D, 0, fmt, fmt, gl.UNSIGNED_BYTE, data);
  else gl.texImage2D(gl.TEXTURE_2D, 0, fmt, w, h, 0, fmt, gl.UNSIGNED_BYTE, data);
  const f = linear ? gl.LINEAR : gl.NEAREST, wr = wrap ? gl.REPEAT : gl.CLAMP_TO_EDGE;
  for (const [k, v] of [[gl.TEXTURE_MIN_FILTER, f], [gl.TEXTURE_MAG_FILTER, f], [gl.TEXTURE_WRAP_S, wr], [gl.TEXTURE_WRAP_T, wr]]) gl.texParameteri(gl.TEXTURE_2D, k, v);
  gl.uniform1i(G.U(name), unit);
}
async function buildHeroGpu() {
  const img = await heroGpuImg; if (!img || !heroCv) return;
  const r = heroArt.getBoundingClientRect(), dpr = Math.min(devicePixelRatio || 1, 3), W = r.width, H = r.height;
  if (W < 10 || H < 10) return;
  heroCv.width = Math.round(W * dpr); heroCv.height = Math.round(H * dpr);
  const box = heroBox(W, H, img.width / img.height);
  if (!HG) {
    const m = document.createElement("canvas").getContext("2d"); m.font = `${HT.weight} 100px "Geist Mono"`;
    HG = { adv: m.measureText("M").width / 100, G: heroGL(heroCv), last: -1, vis: true };
    if (HG.G) {
      heroCv.addEventListener("webglcontextlost", e => { e.preventDefault(); HG.lost = true; });
      heroCv.addEventListener("webglcontextrestored", () => { HG.G = heroGL(heroCv); HG.lost = false; if (HG.G) buildHeroGpu(); });
    }
    new IntersectionObserver(es => { HG.vis = es[0].isIntersecting; }, { rootMargin: "80px" }).observe(heroCv);
  }
  const t0 = performance.now();
  if (HERO_V === "10") HG.data = heroDither(img, box, dpr);
  else {
    const cw = heroCellPx(dpr), ratio = Math.round(cw / HG.adv * HT.lh) / cw;
    if (!HG.cov || HG.ratio !== ratio) { HG.cov = glyphCoverage(ratio, HT.weight); HG.ratio = ratio; }
    HG.data = heroAscii(img, box, dpr, HERO_V === "9");
  }
  HG.ms = performance.now() - t0; heroCv.dataset.ms = HG.ms.toFixed(0); heroCv.dataset.gl = HG.G ? "1" : "0";
  const Q = HG.data, G = HG.G;
  if (G) {
    const gl = G.gl;
    if (Q.kind === "dither") {
      hgTex(G, 0, "uIdx", Q.cols, Q.rows, Q.idx, gl.LUMINANCE);
      hgTex(G, 1, "uPal", Q.K, 1, Q.pal, gl.RGBA);
      const bn = new Uint8Array(4096); for (let i = 0; i < 4096; i++) bn[i] = BN ? BN[i] * 255 : hash(i & 63, i >> 6) * 255;
      hgTex(G, 2, "uBN", 64, 64, bn, gl.LUMINANCE, false, true);
      gl.uniform1f(G.U("uK"), Q.K);
    } else {
      hgTex(G, 0, "uInk", Q.cols, Q.rows, Q.ink, gl.RGBA);
      hgTex(G, 1, "uAux", Q.cols, Q.rows, Q.aux, gl.RGBA);
      hgTex(G, 2, "uGlow", Q.cols, Q.rows, Q.glow, gl.RGBA, true);
      hgTex(G, 3, "uAtlas", 0, 0, glyphSheet(Q.cw, Q.ch, Q.fs, HT.weight), gl.RGBA);
      gl.uniform1f(G.U("uN"), HG_CHARS.length); gl.uniform1f(G.U("uGlowK"), HERO_V === "9" ? HT.glow9 : HT.glow[desk() ? 0 : 1]); gl.uniform1f(G.U("uFlick"), HT.flick);
    }
    gl.uniform2f(G.U("uGrid"), Q.cols, Q.rows); gl.uniform2f(G.U("uCell"), Q.cw, Q.ch); gl.uniform2f(G.U("uOrg"), Q.org[0], Q.org[1]);
  } else hero2d(Q);
  HG.last = -1; HG.pw = 0;
  heroGpuFrame(performance.now() / 1000, true);
  heroCv.classList.add("on");
}
function heroGpuFrame(t, force) {
  if (!HG || !HG.data || !HG.G || HG.lost || (!HG.vis && !force)) return;
  const live = reduce ? 0 : 1, r = heroCv.getBoundingClientRect(), k = heroCv.width / r.width;
  const mx = (P.x - r.left) * k - HG.data.org[0], my = (P.y - r.top) * k - HG.data.org[1];
  const inside = P.x - r.left > -40 && P.y - r.top > -40 && P.x - r.left < r.width + 40 && P.y - r.top < r.height + 40;
  HG.pw = mix(HG.pw || 0, inside && live ? 1 : 0, 0.12);
  const hot = HG.pw > 0.01;
  if (!force && (!live || (!hot && t - HG.last < 1 / 30))) return;
  if (!force && hot && t - HG.last < 1 / 60) return;
  HG.last = t;
  const { gl, U } = HG.G;
  gl.viewport(0, 0, heroCv.width, heroCv.height); gl.clearColor(0, 0, 0, 0); gl.clear(gl.COLOR_BUFFER_BIT);
  gl.uniform2f(U("uRes"), heroCv.width, heroCv.height); gl.uniform1f(U("uT"), t); gl.uniform1f(U("uLive"), live);
  gl.uniform3f(U("uPtr"), mx, my, (desk() ? 95 : 70) * k * HG.pw);
  gl.drawArrays(gl.TRIANGLES, 0, 3);
}
function hero2d(Q) {
  const g = heroCv.getContext("2d"); if (!g) return;
  g.clearRect(0, 0, heroCv.width, heroCv.height);
  if (Q.kind === "dither") {
    const c = document.createElement("canvas"); c.width = Q.cols; c.height = Q.rows;
    const cg = c.getContext("2d"), im = cg.createImageData(Q.cols, Q.rows);
    for (let i = 0; i < Q.idx.length; i++) if (Q.idx[i]) im.data.set(Q.pal.subarray(Q.idx[i] * 4, Q.idx[i] * 4 + 4), i * 4);
    cg.putImageData(im, 0, 0); g.imageSmoothingEnabled = false; g.drawImage(c, Q.org[0], Q.org[1], Q.cols * Q.cw, Q.rows * Q.ch); return;
  }
  g.font = `${HT.weight} ${Q.fs}px "Geist Mono"`; g.textAlign = "center"; g.textBaseline = "middle";
  for (let y = 0; y < Q.rows; y++) for (let x = 0; x < Q.cols; x++) {
    const o = (y * Q.cols + x) * 4; if (!Q.aux[o + 2] || !Q.ink[o + 3]) continue;
    g.fillStyle = `rgb(${Q.ink[o]},${Q.ink[o + 1]},${Q.ink[o + 2]})`; g.globalAlpha = Q.aux[o + 2] / 255;
    g.fillText(HG_CHARS[Q.ink[o + 3]], Q.org[0] + (x + 0.5) * Q.cw, Q.org[1] + (y + 0.5) * Q.ch);
  }
  g.globalAlpha = 1;
}

/* place words: the letters are filled with that place's photo, run through its own treatment */
const BAYER8 = (() => { const m = [[0, 32, 8, 40, 2, 34, 10, 42], [48, 16, 56, 24, 50, 18, 58, 26], [12, 44, 4, 36, 14, 46, 6, 38], [60, 28, 52, 20, 62, 30, 54, 22], [3, 35, 11, 43, 1, 33, 9, 41], [51, 19, 59, 27, 49, 17, 57, 25], [15, 47, 7, 39, 13, 45, 5, 37], [63, 31, 55, 23, 61, 29, 53, 21]]; return (x, y) => (m[y & 7][x & 7] + 0.5) / 64; })();
function sampleCover(img, w, h) {
  w = Math.max(1, Math.round(w)); h = Math.max(1, Math.round(h));
  const c = document.createElement("canvas"); c.width = w; c.height = h;
  const g = c.getContext("2d"); const s = Math.max(w / img.width, h / img.height);
  g.imageSmoothingQuality = "high";
  g.drawImage(img, (w - img.width * s) / 2, (h - img.height * s) / 2, img.width * s, img.height * s);
  return { d: g.getImageData(0, 0, w, h).data, w, h };
}
const L = (d, k) => (0.299 * d[k] + 0.587 * d[k + 1] + 0.114 * d[k + 2]) / 255;
/* textured words: the word stays real white text; the texture is its own canvas layer,
   blended with darken and moved only by whole device pixels */
const DPR = () => Math.min(Math.round(devicePixelRatio || 1) || 1, 3);
const hexRGB = h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16));
function lumField(img, w, h) {
  const S = sampleCover(img, w, h), out = new Float32Array(S.w * S.h);
  for (let i = 0; i < out.length; i++) out[i] = clamp((L(S.d, i * 4) - 0.06) * 1.3, 0, 1);
  return out;
}
let BN = null;
async function blueNoise() {
  if (BN) return BN;
  const i = await loadImg("img/bluenoise64.png"); if (!i) return null;
  const c = document.createElement("canvas"); c.width = c.height = 64;
  const g = c.getContext("2d"); g.drawImage(i, 0, 0);
  const d = g.getImageData(0, 0, 64, 64).data; BN = new Float32Array(4096);
  for (let k = 0; k < 4096; k++) BN[k] = (d[k * 4] + 0.5) / 256;
  return BN;
}
const TREAT = {
  blue(img, cv) {
    const w = cv.width, h = cv.height, Lf = lumField(img, w, h), F = hexRGB("#eaf6ff"), B = hexRGB("#34424f");
    const g = cv.getContext("2d"), im = g.createImageData(w, h), o = im.data;
    for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
      const i = y * w + x, c = Lf[i] > BN[(y & 63) * 64 + (x & 63)] ? F : B;
      o[i * 4] = c[0]; o[i * 4 + 1] = c[1]; o[i * 4 + 2] = c[2]; o[i * 4 + 3] = 255;
    }
    g.putImageData(im, 0, 0);
  },
  halftone(img, cv) {
    const k = DPR(), p = CELL() * k, W = cv.width, H = cv.height, sw = Math.ceil(W / 2), sh = Math.ceil(H / 2), Lf = lumField(img, sw, sh);
    const g = cv.getContext("2d");
    g.fillStyle = "#3a2318"; g.fillRect(0, 0, W, H); g.fillStyle = "#ffc9ad";
    const a = Math.PI / 4, ca = Math.cos(a), sa = Math.sin(a), R = Math.hypot(W, H);
    g.beginPath();
    for (let v = -R; v < R; v += p) for (let u = -R; u < R; u += p) {
      const x = u * ca - v * sa + W / 2, y = u * sa + v * ca + H / 2;
      if (x < -p || y < -p || x > W + p || y > H + p) continue;
      const l = Lf[clamp(y / 2 | 0, 0, sh - 1) * sw + clamp(x / 2 | 0, 0, sw - 1)], r = p * 0.71 * Math.sqrt(Math.max(l, 0.16));
      g.moveTo(x + r, y); g.arc(x, y, r, 0, 7);
    }
    g.fill();
  },
  waves(img, cv) {
    const k = DPR(), cw = CELL() * k, ch = cw * 1.45, W = cv.width, H = cv.height, S = sampleCover(img, W / cw, H / ch);
    const chars = "·-~≈≋%#", g = cv.getContext("2d");
    g.fillStyle = "#101a22"; g.fillRect(0, 0, W, H);
    g.font = `600 ${ch * 0.95}px "Geist Mono", ui-monospace, monospace`; g.textAlign = "center"; g.textBaseline = "middle";
    for (let y = 0; y < S.h; y++) for (let x = 0; x < S.w; x++) {
      const q = (y * S.w + x) * 4, l = clamp((L(S.d, q) - 0.12) * 1.25, 0, 1);
      const i = Math.min(chars.length - 1, Math.floor(l * chars.length)), b = mix(0.72, 1, l);
      g.fillStyle = `rgb(${mix(S.d[q], 143, 0.6) * b | 0},${mix(S.d[q + 1], 214, 0.6) * b | 0},${mix(S.d[q + 2], 255, 0.65) * b | 0})`;
      g.fillText(chars[i], (x + 0.5) * cw, (y + 0.5) * ch);
    }
  },
};
const treated = $$("[data-treat]");
const photoCache = new Map();
async function buildTreats() {
  await blueNoise();
  const k = DPR();
  for (const el of treated) if (!photoCache.has(el.dataset.src)) photoCache.set(el.dataset.src, loadImg(el.dataset.src));
  let ww = 0;
  for (const el of treated) {
    const src = el.dataset.src;
    if (!photoCache.has(src)) photoCache.set(src, loadImg(src));
    const img = await photoCache.get(src);
    if (!img) continue;
    const hov = el.dataset.hover;
    if (hov) { el.style.transition = "none"; el.style.fontStretch = hov + "%"; }
    const wide = el.getBoundingClientRect().width;
    if (hov) { el.style.fontStretch = ""; void el.offsetWidth; el.style.transition = ""; }
    const h = el.getBoundingClientRect().height;
    const W = Math.ceil(wide), H = Math.ceil(h * 1.6);
    const cv = el._cv || document.createElement("canvas");
    cv.className = "tex"; cv.setAttribute("aria-hidden", "true");
    cv.width = W * k; cv.height = H * k; cv.style.width = W + "px"; cv.style.height = H + "px";
    let src2 = img;
    const ct = +(el.dataset.cropTop || 0);
    if (ct) { const c = document.createElement("canvas"); c.width = img.width; c.height = Math.round(img.height * (1 - ct)); c.getContext("2d").drawImage(img, 0, -img.height * ct); src2 = c; }
    try { TREAT[el.dataset.treat](src2, cv); } catch (e) { continue; }
    if (!el._cv) el.append(cv);
    el._cv = cv; el._H = H;
    if (el.matches(".pw")) ww = Math.max(ww, wide);
    requestAnimationFrame(() => cv.classList.add("on"));
    el.classList.add("tw-on");
  }
  if (ww) $(".places").style.setProperty("--ww", Math.ceil(ww) + "px");
  measureTex(); texFrame(); capAlign();
}
function measureTex() {
  for (const el of treated) { const r = el.getBoundingClientRect(); el._top = r.top + scrollY; el._h = r.height; }
}
let texTick = false;
function texFrame() {
  texTick = false;
  const y = scrollY, vh = innerHeight, k = DPR();
  for (const el of treated) {
    if (!el._cv) continue;
    const top = el._top - y; if (top > vh || top + el._h < 0) continue;
    const q = reduce ? 0.5 : clamp((top + el._h / 2) / vh, 0, 1);
    const oy = -(el._H - el._h) * (0.15 + q * 0.7), s = Math.round(oy * k) / k;
    el._cv.style.transform = `translate3d(0,${s}px,0)`;
  }
}
addEventListener("scroll", () => { if (!texTick) { texTick = true; requestAnimationFrame(texFrame); } }, { passive: true });

/* LED stat: the number is drawn in cells from the real font */
const statCv = $(".stats .cv[data-scene=stat]");
const statGrid = statCv ? new Grid(statCv) : null;
if (statGrid) grids.push(statGrid);
function buildStat() {
  if (!statGrid) return;
  const statCv = statGrid.cv;
  const D = desk(), pitch = CELL() * 2;
  const str = statCv.dataset.text;
  const padPx = padPxNow();
  const wrap = statCv.parentElement.getBoundingClientRect();
  const maxInk = D ? Math.min(wrap.width * 0.6, 900) : wrap.width - padPx * 2 - pitch * 2;
  const font = s => `900 ${s}px Anybody`;
  let fs = 100, box = inkBox(str, font(fs));
  fs = fs * (maxInk / pitch) / ((box.l + box.r));
  box = inkBox(str, font(fs));
  const topPad = D ? 13 : 9, botPad = D ? 10 : 7;
  const rows = Math.ceil((box.a) / 1) + topPad + botPad;
  statCv.style.height = (rows * pitch) + "px";
  statGrid.size(pitch);
  const cols = statGrid.cols;
  const x0 = Math.round(padPx / pitch) + box.l, base = topPad + box.a;
  const cov = rasterText(str, font, fs, cols, statGrid.rows, x0, base);
  const inkR = x0 - box.l + box.l + box.r;
  statGrid.ink = { x0: Math.round(padPx / pitch), x1: Math.ceil(x0 + box.r), y0: topPad, y1: Math.ceil(base) };
  for (let y = 0; y < statGrid.rows; y++) for (let x = 0; x < cols; x++) {
    const c = cov[y * cols + x];
    const lum = c > 0.5 ? 1 : c > 0.22 ? 0.3 : 0;
    const n = fbm(x * 0.12, y * 0.12);
    const ix = Math.max(statGrid.ink.x0 - x, 0, x - inkR), iy = Math.max(topPad - y, 0, y - base);
    const edge = Math.min(x, cols - 1 - x), fe = D ? 3 : 2;
    const pres = (1 - smooth(1.5, D ? 10 : 7, Math.hypot(ix * 0.8, iy * 1.4) + (n - 0.5) * 6)) * smooth(-0.5, fe + (n - 0.5) * 2, edge);
    statGrid.put(x, y, lum, lum * 0.955, lum * 0.9, pres);
  }
  statGrid.upload(true);
  statCv.closest(".stat-w").classList.add("led-on");
  const lab = $(".big-l");
  if (lab) {
    if (D) { lab.style.left = (inkR * pitch + 28) + "px"; lab.style.top = ""; lab.style.bottom = (botPad * pitch) + "px"; lab.style.position = "absolute"; }
    else { lab.style.position = "static"; lab.style.left = lab.style.bottom = ""; }
  }
}

/* beam scan: Olle's real 40x40 confocal scan, filled in snake raster order */
const beamCv = $(".beam .cv[data-scene=beam]");
const beamGrid = beamCv && BEAM ? new Grid(beamCv, { sock: [0.075, 0.07, 0.066] }) : null;
if (beamGrid) grids.push(beamGrid);
const beamOrder = [];
for (let y = 0; y < 40; y++) for (let i = 0; i < 40; i++) beamOrder.push([y % 2 ? 39 - i : i, y]);
function buildBeam() {
  if (!beamGrid || beamGrid.dead) return;
  const beamCv = beamGrid.cv, slot = $(".beam .slot"), cr0 = beamCv.getBoundingClientRect();
  const pitch = Math.min(CELL() * 2, Math.floor((document.documentElement.clientWidth - 2 * padPxNow()) / 40));
  slot.style.width = slot.style.maxWidth = (pitch * 40) + "px";
  const sr = slot.getBoundingClientRect(), cr = cr0;
  beamGrid.size(pitch);
  const ox = Math.round((sr.left - cr.left) / pitch), oy = Math.round((sr.top - cr.top) / pitch);
  const text = $$(".beam-in .txt").map(el => {
    const r = el.getBoundingClientRect();
    return { x0: (r.left - cr.left) / pitch, x1: (r.right - cr.left) / pitch, y0: (r.top - cr.top) / pitch, y1: (r.bottom - cr.top) / pitch };
  });
  const pres = new Float32Array(beamGrid.cols * beamGrid.rows);
  for (let y = 0; y < beamGrid.rows; y++) for (let x = 0; x < beamGrid.cols; x++) {
    const n = fbm(x * 0.08, y * 0.08);
    const dx = Math.max(ox - x, 0, x - (ox + 39)), dy = Math.max(oy - y, 0, y - (oy + 39));
    let p = 1 - smooth(2, 16, Math.hypot(dx, dy * 1.3) + (n - 0.5) * 14);
    let tm = 0;
    for (const r of text) { const ex = Math.max(r.x0 - x, 0, x - r.x1), ey = Math.max(r.y0 - y, 0, y - r.y1); tm = Math.max(tm, 1 - smooth(0.5, 3, Math.hypot(ex, ey))); }
    pres[y * beamGrid.cols + x] = p * (1 - tm);
  }
  beamGrid.beam = { ox, oy, pres, last: -2 };
  const sb = $(".beam .sbar"); if (sb) sb.style.width = (pitch * 10) + "px";
}
function beamFrame(t) {
  const G = beamGrid; if (!G || !G.beam || (!G.vis && G.beam.last !== -2)) return;
  G.beam.last = 0;
  if (G.vis && G.beam.t0 == null) G.beam.t0 = t;
  const total = 1600, fill = 7.5, hold = 4, fade = 1.6, gap = 0.6, cycle = fill + hold + fade + gap;
  const ph = reduce || G.beam.t0 == null ? fill + 0.5 : (t - G.beam.t0 + fill + 0.5) % cycle;
  const out = 1 - smooth(fill + hold, fill + hold + fade, ph);
  const { ox, oy, pres } = G.beam;
  for (let y = 0; y < G.rows; y++) for (let x = 0; x < G.cols; x++) G.put(x, y, 0, 0, 0, pres[y * G.cols + x]);
  for (let n = 0; n < total; n++) {
    const rt = n / total * fill;
    const a = 0.25 + 0.75 * smooth(rt, rt + 0.45, ph) * out;
    const [x, y] = beamOrder[n];
    const v = BEAM[y * 40 + x];
    if (v < 0.085) continue;
    const [r, g, b] = heat(v);
    G.put(ox + x, oy + y, r * a, g * a, b * a, 1);
  }
  if (ph < fill) {
    const n = Math.floor(ph / fill * total), [x, y] = beamOrder[n];
    const e = smooth(0, 0.3, ph) * (1 - smooth(fill - 0.3, fill, ph));
    G.put(ox + x, oy + y, e, e, e, 1);
  }
  G.upload();
}

/* photos dissolve into round halftone dots. A smooth presence field (edge distance bent by low-frequency
   noise, opened up around the subject) sets each dot's ink coverage; dots are drawn per device pixel with
   anti-aliasing into an alpha mask, so the photo itself shows through them */
const DOT = Object.assign({ p: [6, 5], wob: 0.55, bw: 0.85, feat: 0.3, lead: 0.22 }, window.__dot || {});
const DOT_B = [1, 0, 0.5, Math.sqrt(3) / 2];
/* hex lattice: the dot radius (in pitch units) that inks a given fraction of the plane, measured once */
const DOT_R = (() => {
  const n = 48, d = [];
  for (let t = 0; t < n; t++) for (let s = 0; s < n; s++) {
    const a = (s + 0.5) / n, b = (t + 0.5) / n, x = a + b * 0.5, y = b * DOT_B[3];
    let m = 9; for (const [i, j] of [[0, 0], [1, 0], [0, 1], [1, 1]]) m = Math.min(m, Math.hypot(x - i - j * 0.5, y - j * DOT_B[3]));
    d.push(m);
  }
  d.sort((p, q) => p - q);
  const R = new Float32Array(257);
  for (let k = 1; k <= 256; k++) R[k] = d[Math.min(d.length - 1, Math.round(k / 256 * d.length) - 1)];
  R[256] += 0.03;
  return R;
})();
/* where the subject sits inside the element, from image-space focus through object-fit: cover */
function dotFocus(img, W, H) {
  const f = (img.dataset.focus || "0.5 0.5").split(" ").map(Number), iw = img.naturalWidth || W, ih = img.naturalHeight || H;
  const st = getComputedStyle(img), s = st.objectFit === "cover" ? Math.max(W / iw, H / ih) : Math.min(W / iw, H / ih);
  const op = st.objectPosition.split(" ").map(v => parseFloat(v) / 100), dw = iw * s, dh = ih * s;
  return [(W - dw) * (op[0] || 0.5) + f[0] * dw, (H - dh) * (op[1] ?? 0.5) + f[1] * dh, +(img.dataset.core || 0) * Math.min(W, H)];
}
function dotField(img, W, H, p) {
  const kind = img.matches(".turn img") ? "blob" : img.matches(".press-photo") ? "foot" : "band";
  const [fx, fy, fr] = dotFocus(img, W, H), L = Math.max(W, H) * DOT.feat, sd = (img.currentSrc || img.src).length * 0.37;
  const nz = (x, y, k) => fbm(x / L + k * 7.1 + sd, y / L + k * 3.7) - 0.5, edge = (d, w) => smooth(0, w, d);
  if (kind === "blob") {
    const core = +(img.dataset.core || 0.5);
    return (x, y) => {
      const dx = x - fx, dy = y - fy, nx = dx / (dx < 0 ? fx : W - fx), ny = dy / (dy < 0 ? fy : H - fy) * (dy < 0 ? 0.85 : 1);
      const q = Math.hypot(nx, ny) + nz(x, y, 1) * DOT.wob * DOT.bw;
      return (1 - smooth(core, 1.02, q)) * edge(Math.min(x, W - x, y, H - y), p * 2);
    };
  }
  const T = kind === "foot" ? 0 : Math.min(H * 0.28, 250), Bb = kind === "foot" ? H * 0.27 : Math.min(H * 0.38, 320), S = kind === "foot" ? W * 0.14 : 0;
  const band = (d, w, k, x, y) => smooth(0, 1, (d - w * DOT.lead) / (w * (1 - DOT.lead)) + nz(x, y, k) * DOT.wob * 1.6) * edge(d, w * DOT.lead);
  return (x, y) => {
    let v = Bb ? band(H - y, Bb, 2, x, y) : 1;
    if (T) v = Math.min(v, band(y, T, 3, x, y));
    if (S) v = Math.min(v, band(x, S, 4, x, y), band(W - x, S, 5, x, y));
    if (fr) { const g = 1 - smooth(fr, fr * 1.9, Math.hypot(x - fx, (y - fy) * 1.15)); v = Math.max(v, g * Math.min(T ? band(y, T * 0.55, 6, x, y) : 1, band(H - y, Bb * 0.55, 7, x, y))); }
    return v;
  };
}
async function buildDots(img) {
  const r = img.getBoundingClientRect(), W = r.width, H = r.height;
  if (W < 4 || H < 4) return;
  const t0 = performance.now(), k = Math.min(devicePixelRatio || 1, 3), Wd = Math.round(W * k), Hd = Math.round(H * k);
  const p = DOT.p[desk() ? 0 : 1], B = DOT_B, R = DOT_R;
  const e1x = B[0] * p, e1y = B[1] * p, e2x = B[2] * p, e2y = B[3] * p, det = e1x * e2y - e2x * e1y;
  const ia = e2y / det, ib = -e2x / det, ic = -e1y / det, id = e1x / det, field = dotField(img, W, H, p);
  const corners = [[0, 0], [W, 0], [0, H], [W, H]].map(([x, y]) => [ia * x + ib * y, ic * x + id * y]);
  const i0 = Math.floor(Math.min(...corners.map(c => c[0]))) - 1, j0 = Math.floor(Math.min(...corners.map(c => c[1]))) - 1;
  const ni = Math.ceil(Math.max(...corners.map(c => c[0]))) - i0 + 2, nj = Math.ceil(Math.max(...corners.map(c => c[1]))) - j0 + 2;
  const CX = new Float32Array(ni * nj), CY = new Float32Array(ni * nj), RR = new Float32Array(ni * nj), full = R[256] * p;
  for (let j = 0; j < nj; j++) for (let i = 0; i < ni; i++) {
    const q = j * ni + i, x = (i + i0) * e1x + (j + j0) * e2x, y = (i + i0) * e1y + (j + j0) * e2y;
    CX[q] = x; CY[q] = y;
    if (x < -p || y < -p || x > W + p || y > H + p) continue;
    const v = clamp(field(clamp(x, 0, W), clamp(y, 0, H)), 0, 1);
    RR[q] = v >= 0.999 ? full : R[Math.round(v * 256)] * p;
  }
  const c = document.createElement("canvas"); c.width = Wd; c.height = Hd;
  const g = c.getContext("2d"), im = g.createImageData(Wd, Hd), o = new Uint32Array(im.data.buffer);
  const rowFull = new Uint8Array(nj);
  for (let j = 0; j < nj; j++) { let f = 1; for (let i = 0; i < ni && f; i++) { const x = CX[j * ni + i]; if (x > -p && x < W + p && RR[j * ni + i] < full) f = 0; } rowFull[j] = f; }
  const ink = (qq, rr, x, y) => { const dx = x - CX[qq], dy = y - CY[qq]; return (rr - Math.sqrt(dx * dx + dy * dy)) * k + 0.5; };
  let ts = performance.now();
  for (let Y = 0; Y < Hd; Y++) {
    if ((Y & 15) === 0 && performance.now() - ts > 8) { await new Promise(res => setTimeout(res)); ts = performance.now(); }
    const y = (Y + 0.5) / k, jr = (id * y - j0) | 0;
    if (rowFull[jr] && rowFull[jr + 1]) { o.fill(0xff000000, Y * Wd, Y * Wd + Wd); continue; }
    for (let X = 0; X < Wd; X++) {
      const x = (X + 0.5) / k, a = ia * x + ib * y - i0, b = ic * x + id * y - j0, i = a | 0, j = b | 0, q = j * ni + i;
      const r00 = RR[q], r10 = RR[q + 1], r01 = RR[q + ni], r11 = RR[q + ni + 1];
      if (r00 >= full && r10 >= full && r01 >= full && r11 >= full) { o[Y * Wd + X] = 0xff000000; continue; }
      if (!(r00 || r10 || r01 || r11)) continue;
      let m = r00 ? ink(q, r00, x, y) : 0;
      if (r10 && m < 1) m = Math.max(m, ink(q + 1, r10, x, y));
      if (r01 && m < 1) m = Math.max(m, ink(q + ni, r01, x, y));
      if (r11 && m < 1) m = Math.max(m, ink(q + ni + 1, r11, x, y));
      if (m > 0) o[Y * Wd + X] = ((m >= 1 ? 255 : m * 255) << 24) >>> 0;
    }
  }
  g.putImageData(im, 0, 0);
  const blob = await new Promise(res => c.toBlob(res, "image/png"));
  if (!blob) return;
  const url = URL.createObjectURL(blob), old = dotURLs.get(img);
  img.style.webkitMaskImage = img.style.maskImage = `url(${url})`;
  img.style.webkitMaskSize = img.style.maskSize = "100% 100%";
  img.style.webkitMaskRepeat = img.style.maskRepeat = "no-repeat";
  dotURLs.set(img, url); if (old) setTimeout(() => URL.revokeObjectURL(old), 1000);
  img.dataset.dm = Math.round(performance.now() - t0);
  const show = () => img.classList.add("masked");
  if (img.complete && img.naturalWidth) img.decode().then(show, show); else img.addEventListener("load", show, { once: true });
}
const dotURLs = new WeakMap(), dotQ = new Set();
let dotBusy = false;
const dotIO = "IntersectionObserver" in window ? new IntersectionObserver(es => {
  for (const e of es) if (e.isIntersecting) { dotIO.unobserve(e.target); dotQ.add(e.target); }
  dotRun();
}, { rootMargin: "150% 0px" }) : null;
function dotRun() {
  if (dotBusy || !dotQ.size) return;
  const img = dotQ.values().next().value; dotQ.delete(img); dotBusy = true;
  const go = () => buildDots(img).catch(() => img.classList.add("masked")).finally(() => { dotBusy = false; setTimeout(dotRun, 0); });
  img.decode().then(go, go);
}
function dotMask(img) {
  dotQ.delete(img);
  if (dotIO) { dotIO.unobserve(img); dotIO.observe(img); } else { dotQ.add(img); dotRun(); }
}

/* photos inside the place words pan as you scroll */
/* ---------- scroll rail ---------- */
const rail = $(".rail");
let railCells = [], railMarks = [];
function buildRail() {
  if (!rail) return;
  rail.innerHTML = "";
  const D = desk();
  rail.setAttribute("aria-hidden", D ? "false" : "true");
  const n = D ? Math.floor(innerHeight * 0.5 / 9) : Math.floor(innerHeight * 0.4 / 6);
  const secs = $$("[data-rail]");
  const max = Math.max(1, document.documentElement.scrollHeight - innerHeight);
  railMax = max;
  railCells = []; railMarks = [];
  const used = new Map();
  secs.forEach(s => {
    const top = s.getBoundingClientRect().top + scrollY;
    let i = Math.round(clamp(top / max, 0, 1) * (n - 1));
    while (used.has(i) && i < n - 1) i++;
    used.set(i, s);
  });
  for (let i = 0; i < n; i++) {
    const s = used.get(i);
    const el = document.createElement(s ? "button" : "span");
    el.className = "rc" + (s ? " mk" : "");
    if (s) {
      el.type = "button"; el.style.setProperty("--a", s.dataset.a || "var(--ink)");
      el.setAttribute("aria-label", s.dataset.rail);
      el.innerHTML = `<span>${s.dataset.rail}</span>`;
      el.addEventListener("click", () => s.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" }));
      if (!D) el.tabIndex = -1;
      railMarks.push({ el, s, i });
    } else el.setAttribute("aria-hidden", "true");
    rail.append(el); railCells.push(el);
  }
  railFrame(true);
}
let lastRail = -1;
let railMax = 1;
function railFrame(force) {
  if (!railCells.length) return;
  const max = railMax;
  const head = Math.round(clamp(scrollY / max, 0, 1) * (railCells.length - 1));
  if (head === lastRail && !force) return;
  const from = force || lastRail < 0 ? 0 : Math.min(head, lastRail), to = force || lastRail < 0 ? railCells.length - 1 : Math.max(head, lastRail);
  lastRail = head;
  for (let i = from; i <= to; i++) { const c = railCells[i]; c.classList.toggle("on", i <= head); c.classList.toggle("head", i === head && !c.classList.contains("mk")); }
  let cur = null;
  for (const m of railMarks) if (m.i <= head + 1) cur = m;
  railMarks.forEach(m => m.el.classList.toggle("cur", m === cur));
}

/* ---------- copy bio ---------- */
$$("[data-copy]").forEach(btn => {
  const lab = $(".lab", btn); let t = 0;
  btn.addEventListener("click", async () => {
    const src = $$(btn.dataset.copy).find(el => !el.hidden);
    if (!src) return;
    try { await navigator.clipboard.writeText(src.innerText.trim()); } catch (e) { return; }
    if (!lab.dataset.orig) lab.dataset.orig = lab.textContent;
    lab.textContent = lab.dataset.done || "Copied";
    clearTimeout(t); t = setTimeout(() => { lab.textContent = lab.dataset.orig; }, 1600);
  });
});
$$("[data-lang]").forEach(b => b.addEventListener("click", () => {
  const L = b.dataset.lang;
  $$("[data-lang]").forEach(x => x.setAttribute("aria-pressed", x === b));
  $$(".bio[lang]").forEach(p => { p.hidden = p.lang !== L; });
  const lab = $(".press .lab"); if (lab) { lab.dataset.orig = L === "sv" ? "Kopiera bio" : "Copy bio"; lab.dataset.done = L === "sv" ? "Kopierad" : "Copied"; lab.textContent = lab.dataset.orig; }
}));

/* timeline labels sit on the letters' cap centre, not the line box */
/* the timeline: one continuous spine through dithered markers that twinkle in each place's colour */
const marks = $$(".place .mk").map(cv => ({ cv, col: null, last: -1 }));
function spine() {
  const pl = $(".places"); if (!pl || marks.length < 2) return;
  const pr = pl.getBoundingClientRect(), c = r => [r.left + r.width / 2 - pr.left, r.top + r.height / 2 - pr.top];
  const [x0, y0] = c(marks[0].cv.getBoundingClientRect()), [, y1] = c(marks[marks.length - 1].cv.getBoundingClientRect());
  pl.style.setProperty("--sx", x0.toFixed(1) + "px"); pl.style.setProperty("--st", y0.toFixed(1) + "px"); pl.style.setProperty("--sh", (y1 - y0).toFixed(1) + "px");
  for (const m of marks) { const s = desk() ? 14 : 12, dpr = Math.min(devicePixelRatio || 1, 3); m.s = s; m.cv.width = m.cv.height = Math.round(s * dpr); m.dpr = dpr; m.col = getComputedStyle(m.cv).color; m.last = -1; }
  markFrame(performance.now() / 1000, true);
}
function markFrame(t, force) {
  for (const m of marks) {
    if (!m.s) continue;
    const r = m.cv.getBoundingClientRect(); if (!force && (r.bottom < 0 || r.top > innerHeight)) continue;
    const step = reduce ? 0 : Math.floor(t * 4); if (!force && step === m.last) continue; m.last = step;
    const g = m.cv.getContext("2d"), n = 7, cell = m.cv.width / n;
    g.clearRect(0, 0, m.cv.width, m.cv.height); g.fillStyle = m.col;
    const sh = step * 11 + marks.indexOf(m) * 23;
    for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
      const d = Math.hypot(x - 3, y - 3) / 3.4, v = 1 - d * d;
      if (v <= 0) continue;
      const bn = BN ? BN[((y + sh) & 63) * 64 + ((x + sh * 3) & 63)] : 0.5;
      if (v * 1.25 > bn) { const s = cell * (v > 0.75 ? 0.92 : 0.78); g.fillRect(x * cell + (cell - s) / 2, y * cell + (cell - s) / 2, s, s); }
    }
  }
}

function capAlign() {
  const g = document.createElement("canvas").getContext("2d");
  for (const pl of $$(".place")) {
    const pw = $(".pw", pl); if (!pw) continue;
    if (!desk()) { pl.style.removeProperty("--cs"); continue; }
    const cs = getComputedStyle(pw), fs = parseFloat(cs.fontSize);
    g.font = `${cs.fontWeight} ${fs}px Anybody`;
    const m = g.measureText(pw.textContent.trim());
    const A = m.fontBoundingBoxAscent, Dd = m.fontBoundingBoxDescent;
    const cap = g.measureText("H").actualBoundingBoxAscent;
    const r = pw.getBoundingClientRect(), pr = pl.getBoundingClientRect();
    const lineH = parseFloat(cs.lineHeight) || fs * 0.86, padT = parseFloat(cs.paddingTop);
    const base = r.top + padT + (lineH - (A + Dd)) / 2 + A;
    const capMid = base - cap / 2, rowMid = pr.top + pr.height / 2;
    pl.style.setProperty("--cs", (capMid - rowMid).toFixed(1) + "px");
  }
  spine();
}

/* land a hash link on the thing it names, after our layout has settled */
function landHash(smooth) {
  const id = decodeURIComponent(location.hash.slice(1)); if (!id) return;
  const t = document.getElementById(id); if (!t) return;
  holdBar = performance.now() + 900;
  if (bar) { barHidden = false; bar.classList.remove("hide"); }
  const word = t.matches(".chapter") ? $(".cw", t) : null;
  const barH = bar ? bar.getBoundingClientRect().height : 56;
  let y;
  if (word) { const r = word.getBoundingClientRect(); y = r.top + scrollY - Math.max(barH + 16, innerHeight * 0.45 - r.height / 2); }
  else y = t.getBoundingClientRect().top + scrollY - barH;
  scrollTo({ top: Math.max(0, y), behavior: smooth && !reduce ? "smooth" : "auto" });
}
addEventListener("hashchange", () => landHash(true));
document.addEventListener("click", e => {
  const a = e.target.closest && e.target.closest('a[href*="#"]');
  if (!a || a.origin !== location.origin || a.pathname !== location.pathname) return;
  if (a.hash === location.hash) { e.preventDefault(); landHash(true); }
});

/* closing horizon: Tjörn sea at dusk in the site's hex halftone. The scene (sky, low islands, sea, shore rock)
   is computed per dot; the GPU draws the dots at device pixels and drifts real Åstol sea ripples through them */
const HZ = Object.assign({ p: [5, 4], hor: 0.56, sun: [0.7, 0.66], gain: 0.95, gam: 1.15, amp: 0.6, glow: 0.5, gw: 0.16, rip: 1500, rock: 0.45, rd: 0.3, olle: [0.13, 0.2] }, window.__hz || {});
const hzEl = $(".horizon"), hzCv = hzEl && $(".hz-cv", hzEl), hzSprite = hzEl && $(".sprite", hzEl);
const hzRip = hzEl ? loadImg("img/tjorn-sea-g1.jpg") : null;
let HZS = null;
const HZ_SKY = [[0, [0.86, 0.6, 0.46]], [0.08, [0.7, 0.46, 0.42]], [0.24, [0.36, 0.34, 0.46]], [0.48, [0.16, 0.22, 0.34]], [0.75, [0.06, 0.08, 0.13]], [1, [0.02, 0.025, 0.04]]];
const hzSky = t => { let i = 0; while (i < HZ_SKY.length - 2 && t > HZ_SKY[i + 1][0]) i++; const [a, A] = HZ_SKY[i], [b, B] = HZ_SKY[i + 1], f = clamp((t - a) / (b - a), 0, 1); return A.map((v, k) => mix(v, B[k], f)); };
/* the shore: a low granite rock rising from the left edge, flat on top where pixel Olle stands */
const hzRock = (u, D) => { const e = D ? 0.32 : 0.46, s = clamp(u / e, 0, 1); return 0.7 + 0.015 * Math.sin(s * 19) * smooth(0.45, 0.7, s) + 0.32 * smooth(0.5, 1, s) - 0.06 * (1 - smooth(0, 0.35, s)); };
function hzScene(W, H, p) {
  const D = desk(), rh = p * Math.sqrt(3) / 2, cols = Math.ceil(W / p) + 2, rows = Math.ceil(H / rh) + 1, n = cols * rows;
  const vh = HZ.hor, us = HZ.sun[D ? 0 : 1], ink = new Uint8Array(n * 4), aux = new Uint8Array(n * 4), aa = rh / H;
  const isle = u => Math.max(0, 0.06 * smooth(0.04, 0.16, u) * (1 - smooth(0.26, 0.4, u)) * (0.7 + 0.6 * fbm(u * 14, 2.1)) + 0.028 * Math.exp(-(((u - 0.5) / 0.035) ** 2)) + 0.05 * smooth(0.84, 0.93, u) * (0.75 + 0.5 * fbm(u * 11, 5.3)));
  for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) {
    const x = (i + 0.5 * (j & 1)) * p, y = (j + 0.5) * rh, u = x / W, v = y / H, o = (j * cols + i) * 4, nz = fbm(u * 3.2 + 7, v * 2.4) - 0.5;
    const gx = (u - us) * W / (H * HZ.gw * 4), glow = Math.exp(-gx * gx) * HZ.glow;
    let c, water = 0, path = 0, depth = 0;
    if (v < vh) {
      const t = (vh - v) / vh;
      c = hzSky(t).map((k, m) => k * (0.75 + 0.25 * glow) + [1, 0.76, 0.52][m] * glow * Math.exp(-t * t * 14));
      const f = clamp((isle(u) - (vh - v)) / aa + 0.5, 0, 1), near = u < 0.45 ? 0.5 : 0.85;
      c = c.map((k, m) => mix(k, k * 0.28 * near + [0.03, 0.035, 0.06][m], f));
    } else {
      depth = (v - vh) / (1 - vh);
      const r = hzSky(Math.min(1, depth * 0.7 + 0.03)), fall = mix(0.55, 0.12, Math.pow(depth, 0.6));
      path = Math.exp(-gx * gx * (1.6 - depth)) * (1 - depth * 0.55);
      c = r.map((k, m) => k * fall + [1, 0.7, 0.45][m] * path * 0.45 * glow / HZ.glow);
      water = 1;
    }
    const rk = hzRock(u, D), fr = clamp((v - rk) / aa + 0.5, 0, 1);
    if (fr > 0) {
      const dd = (v - rk) * H, lit = Math.exp(-dd / (H * HZ.rd)) * (0.75 + 0.5 * fbm(u * 40, v * 18)) * (0.55 + 0.45 * smooth(0, 0.22, u)), rim = Math.exp(-((dd / 2.2) ** 2)) * 0.35;
      c = c.map((k, m) => mix(k, [0.66, 0.5, 0.44][m] * (lit * HZ.rock + rim), fr)); water *= 1 - fr; path *= 1 - fr;
    }
    const nt = fbm(u * 1.8 + 3.1, 0.7) - 0.5, pres = smooth(-0.04, 0.6, v + nt * 0.36 + nz * 0.12) * (1 - smooth(0.72, 0.95, v + nz * 0.14));
    const L = 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2], cov = clamp(Math.pow(L * HZ.gain, HZ.gam), 0, 1) * pres;
    const k = 1 / Math.max(0.4, Math.max(...c));
    ink[o] = clamp(c[0] * k, 0, 1) * 255; ink[o + 1] = clamp(c[1] * k, 0, 1) * 255; ink[o + 2] = clamp(c[2] * k, 0, 1) * 255; ink[o + 3] = cov * 255;
    aux[o] = water * 255; aux[o + 1] = clamp(path, 0, 1) * 255; aux[o + 2] = depth * 255; aux[o + 3] = pres * 255;
  }
  return { cols, rows, p, rh, ink, aux, vh, rock: u => hzRock(u, D) };
}
const HZ_VS = "attribute vec2 a;void main(){gl_Position=vec4(a,0.,1.);}";
const HZ_FS = `precision highp float;
uniform sampler2D uInk,uAux,uRip;uniform vec2 uRes,uGrid;uniform float uP,uRh,uK,uT,uAmp,uRs,uSeaH;
vec4 dotAt(vec2 q,vec2 px,out vec3 col){
  if(q.x<0.||q.y<0.||q.x>=uGrid.x||q.y>=uGrid.y){col=vec3(0.);return vec4(0.);}
  vec2 uv=(q+.5)/uGrid;vec4 ink=texture2D(uInk,uv),aux=texture2D(uAux,uv);
  vec2 c=vec2((q.x+.5*mod(q.y,2.))*uP,(q.y+.5)*uRh);
  float cov=ink.a;
  if(aux.r>.5){
    float d=aux.b,sx=c.x/(uRs*(.25+d*.9)),sy=.05+d*uSeaH/520.;
    float r1=texture2D(uRip,vec2(sx+uT*.006,sy)).r,r2=texture2D(uRip,vec2(sx*1.7-uT*.004+.37,fract(sy*1.3+.21))).r;
    float rip=(r1+r2)-1.;
    cov=clamp(cov*(1.+uAmp*rip*(.35+aux.g*1.6))+aux.g*max(rip,0.)*.35*aux.a,0.,1.);
  }
  float r=uP*mix(sqrt(cov*.2757),.585,smoothstep(.86,1.,cov));
  col=ink.rgb;
  return vec4(c,r,cov);
}
void main(){
  vec2 px=vec2(gl_FragCoord.x,uRes.y-gl_FragCoord.y)/uK;
  float j0=floor(px.y/uRh-.5);float best=0.;vec3 bc=vec3(0.);
  for(int a=0;a<2;a++){float j=j0+float(a);float off=.5*mod(j,2.);float i0=floor(px.x/uP-off);
    for(int b=0;b<2;b++){vec3 col;vec4 d=dotAt(vec2(i0+float(b),j),px,col);
      if(d.z<=0.)continue;float s=clamp((d.z-distance(px,d.xy))*uK+.5,0.,1.);if(s>best){best=s;bc=col;}}}
  gl_FragColor=vec4(bc*best,best);
}`;
function hzGL() {
  const gl = hzCv.getContext("webgl", { alpha: true, premultipliedAlpha: true, antialias: false });
  if (!gl) return null;
  const sh = (t, s) => { const o = gl.createShader(t); gl.shaderSource(o, s); gl.compileShader(o); return o; };
  const pr = gl.createProgram(); gl.attachShader(pr, sh(gl.VERTEX_SHADER, HZ_VS)); gl.attachShader(pr, sh(gl.FRAGMENT_SHADER, HZ_FS)); gl.linkProgram(pr);
  if (!gl.getProgramParameter(pr, gl.LINK_STATUS)) return null;
  gl.useProgram(pr);
  const buf = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buf); gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  const loc = gl.getAttribLocation(pr, "a"); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
  return { gl, pr, U: n => gl.getUniformLocation(pr, n), tex: {} };
}
function hzTex(G, unit, name, w, h, data, wrap) {
  const gl = G.gl, t = G.tex[name] || (G.tex[name] = gl.createTexture());
  gl.activeTexture(gl.TEXTURE0 + unit); gl.bindTexture(gl.TEXTURE_2D, t); gl.pixelStorei(gl.UNPACK_ALIGNMENT, 1);
  if (data instanceof HTMLImageElement) gl.texImage2D(gl.TEXTURE_2D, 0, gl.LUMINANCE, gl.LUMINANCE, gl.UNSIGNED_BYTE, data);
  else gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, w, h, 0, gl.RGBA, gl.UNSIGNED_BYTE, data);
  const f = wrap ? gl.LINEAR : gl.NEAREST, wr = wrap ? gl.REPEAT : gl.CLAMP_TO_EDGE;
  for (const [k, v] of [[gl.TEXTURE_MIN_FILTER, f], [gl.TEXTURE_MAG_FILTER, f], [gl.TEXTURE_WRAP_S, wr], [gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE]]) gl.texParameteri(gl.TEXTURE_2D, k, v);
  gl.uniform1i(G.U(name), unit);
}
async function buildHorizon() {
  if (!hzEl) return;
  const r = hzEl.getBoundingClientRect(), W = r.width, H = r.height; if (W < 10 || H < 10) return;
  const t0 = performance.now(), k = Math.min(devicePixelRatio || 1, 3), p = HZ.p[desk() ? 0 : 1], Q = hzScene(W, H, p);
  hzCv.width = Math.round(W * k); hzCv.height = Math.round(H * k);
  if (hzSprite) { const u = HZ.olle[desk() ? 0 : 1]; hzSprite.style.left = u * W + "px"; hzSprite.style.top = Q.rock(u) * H + "px"; }
  if (!HZS) {
    HZS = { G: hzGL(), vis: false, last: -1 };
    new IntersectionObserver(es => { HZS.vis = es[0].isIntersecting; }, { rootMargin: "100px" }).observe(hzEl);
    if (HZS.G) hzCv.addEventListener("webglcontextlost", e => { e.preventDefault(); HZS.G = null; hzStatic(); });
  }
  HZS.Q = Q; HZS.k = k; HZS.W = W; HZS.H = H;
  const G = HZS.G, rip = await hzRip;
  if (G && rip && HZS.Q === Q) {
    const gl = G.gl;
    hzTex(G, 0, "uInk", Q.cols, Q.rows, Q.ink); hzTex(G, 1, "uAux", Q.cols, Q.rows, Q.aux); if (!G.tex.uRip) hzTex(G, 2, "uRip", 0, 0, rip, true);
    gl.uniform2f(G.U("uGrid"), Q.cols, Q.rows); gl.uniform1f(G.U("uP"), Q.p); gl.uniform1f(G.U("uRh"), Q.rh); gl.uniform1f(G.U("uAmp"), HZ.amp); gl.uniform1f(G.U("uRs"), HZ.rip); gl.uniform1f(G.U("uSeaH"), H * (1 - Q.vh));
    hzFrame(performance.now() / 1000, true);
  } else hzStatic();
  hzEl.dataset.ms = Math.round(performance.now() - t0); hzEl.dataset.gl = G ? "1" : "0";
  hzEl.classList.add("on");
}
function hzFrame(t, force) {
  if (!HZS || !HZS.G || !HZS.Q || (!force && (!HZS.vis || reduce || t - HZS.last < 1 / 30))) return;
  HZS.last = t;
  const { gl, U } = HZS.G;
  gl.viewport(0, 0, hzCv.width, hzCv.height); gl.clearColor(0, 0, 0, 0); gl.clear(gl.COLOR_BUFFER_BIT);
  gl.uniform2f(U("uRes"), hzCv.width, hzCv.height); gl.uniform1f(U("uK"), HZS.k); gl.uniform1f(U("uT"), reduce ? 40 : t % 2000);
  gl.drawArrays(gl.TRIANGLES, 0, 3);
}
function hzStatic() {
  const Q = HZS && HZS.Q, g = Q && hzCv.getContext("2d"); if (!g) return;
  g.setTransform(HZS.k, 0, 0, HZS.k, 0, 0); g.clearRect(0, 0, HZS.W, HZS.H);
  for (let j = 0; j < Q.rows; j++) for (let i = 0; i < Q.cols; i++) {
    const o = (j * Q.cols + i) * 4, cov = Q.ink[o + 3] / 255; if (cov < 0.01) continue;
    const r = Q.p * mix(Math.sqrt(cov * 0.2757), 0.585, smooth(0.86, 1, cov));
    g.fillStyle = `rgb(${Q.ink[o]},${Q.ink[o + 1]},${Q.ink[o + 2]})`; g.beginPath(); g.arc((i + 0.5 * (j & 1)) * Q.p, (j + 0.5) * Q.rh, r, 0, 6.2832); g.fill();
  }
}

/* ---------- layout ---------- */
function fitAll() {
  const pad = padPxNow();
  const W = document.documentElement.clientWidth - pad * 2;
  const D = desk();
  $$("[data-fit]").forEach(el => {
    const f = el.dataset.fit.split(",").map(Number);
    const frac = D ? f[0] : (f[1] ?? f[0]);
    fitTo(el, W * frac);
  });
}
function relayout() {
  kts.forEach(k => k.reset());
  fitAll();
  kts.forEach(k => k.measure());
  $$(".photo img, .turn img, .press-photo").forEach(dotMask);
  capAlign();
  measureTex();
  buildHeroArt();
  leds.forEach(l => { const o = ledWord(l.cv); l.draw = o.draw; });
  sprites.forEach(sp => sp.size());
  buildHorizon();
  buildStat(); buildBeam(); treatsDone = buildTreats();
  buildRail();
  if (beamGrid) beamGrid.beam && (beamGrid.beam.last = -2);
}
let lastW = 0, treatsDone = Promise.resolve();
addEventListener("resize", () => {
  if (Math.abs(innerWidth - lastW) < 2) { buildRail(); return; }
  lastW = innerWidth; relayout();
});

/* ---------- loop ---------- */
let scrolling = false, scrollTimer = 0, lastY = scrollY, barHidden = false, holdBar = 0;
const bar = $(".bar");
addEventListener("scroll", () => {
  const y = scrollY, dy = y - lastY; lastY = y;
  const hide = y > 140 && dy > 0 && !(menu && menu.classList.contains("open")) && performance.now() > holdBar;
  if (Math.abs(dy) < 2 && y > 140) return;
  if (hide !== barHidden && bar) { barHidden = hide; bar.classList.toggle("hide", hide); }
}, { passive: true });
addEventListener("scroll", () => {
  if (!scrolling) document.documentElement.classList.add("is-scrolling");
  scrolling = true; clearTimeout(scrollTimer);
  scrollTimer = setTimeout(() => { scrolling = false; document.documentElement.classList.remove("is-scrolling"); }, 200);
}, { passive: true });
function loop(now) {
  const t = now / 1000;
  if (!scrolling) {
    const rects = kts.map(k => k.el.getBoundingClientRect());
    kts.forEach((k, i) => k.frame(rects[i]));
  }
  railFrame();
  beamFrame(t);
  if (!scrolling) markFrame(t);
  if (heroDots && !scrolling) heroDraw(t);
  if (HG && !scrolling) heroGpuFrame(t);
  for (const g of grids) if (g.vis || reduce) g.draw(now);
  for (const l of leds) l.draw(t);
  for (const s of sprites) s.draw(t);
  if (!scrolling) hzFrame(t);
  if (!reduce) requestAnimationFrame(loop);
}

const boot = async () => {
  await blueNoise();
  const fonts = Promise.all([
    document.fonts.load('900 100px "Anybody"', "Olle3.9M"),
    document.fonts.load('italic 900 100px "Anybody"', "Tjörn"),
    document.fonts.load('400 16px "Geist Mono"', "a"),
  ]).catch(() => {});
  await Promise.race([fonts, new Promise(r => setTimeout(r, 900))]);
  await document.fonts.ready;
  lastW = innerWidth;
  relayout();
  const userScrolled = scrollY > 4 && !location.hash;
  if (location.hash && !userScrolled) landHash(false);
  await Promise.race([treatsDone, new Promise(r => setTimeout(r, 700))]);
  document.documentElement.classList.add("ready");
  (async () => { for (const im of $$("img")) { try { await im.decode(); } catch (e) {} } })();
  requestAnimationFrame(loop);
  if (reduce) { setTimeout(() => requestAnimationFrame(loop), 50); }
};
addEventListener("load", () => { measureTex(); texFrame(); buildRail(); });
addEventListener("scroll", () => { if (reduce) requestAnimationFrame(loop); }, { passive: true });
RMQ.addEventListener("change", e => { reduce = e.matches; texFrame(); if (beamGrid && beamGrid.beam) beamGrid.beam.last = -2; requestAnimationFrame(loop); });
boot();
window.__e = { relayout, kts, P };
})();
