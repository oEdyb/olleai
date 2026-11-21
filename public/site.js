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
    cell = desk() ? 4 : 3;
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

/* hero: a clean cutout of the real photo, shown in one of five treatments (?hero=1..5) */
const heroArt = $(".hero-art"), heroCv = heroArt && $(".hero-cv", heroArt), heroPhoto = heroArt && $(".hero-photo", heroArt);
const HERO_V = document.documentElement.dataset.hero || "1";
let heroSrc = null;
if (heroPhoto) {
  const shown = () => heroPhoto.classList.add("on");
  if (heroPhoto.complete && heroPhoto.naturalWidth) heroPhoto.decode().then(shown, shown); else heroPhoto.addEventListener("load", () => heroPhoto.decode().then(shown, shown), { once: true });
}
const heroSrcReady = HERO_V === "1" ? Promise.resolve(null) : loadImg("img/hero-soft-640.webp").then(img => {
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
  if (!heroSrc) { heroSrcReady.then(s => s && buildHeroArt()); return; }
  const r = heroArt.getBoundingClientRect(), W = r.width, H = r.height, dpr = Math.min(devicePixelRatio || 1, 2);
  heroCv.width = Math.round(W * dpr); heroCv.height = Math.round(H * dpr);
  const g = heroCv.getContext("2d"); g.setTransform(dpr, 0, 0, dpr, 0, 0); g.clearRect(0, 0, W, H);
  const D = desk(), S = heroSrc;
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

/* photos dissolve into halftone squircle dots at their top and bottom edges */
function dotMask(img) {
  const r = img.getBoundingClientRect(), W = Math.round(r.width), H = Math.round(r.height);
  if (!W || !H) return;
  const p = CELL() * 2, c = document.createElement("canvas"); c.width = W; c.height = H;
  const g = c.getContext("2d"); g.fillStyle = "#fff";
  const T = Math.min(H * 0.22, p * 15), Bz = Math.min(H * 0.36, p * 26), side = img.closest(".turn") || img.matches(".me-portrait") ? Math.min(W * 0.16, p * 9) : 0;
  const small = img.matches(".me-portrait"), blob = img.matches(".turn img, .press-photo"); const Tt = small ? side * 0.9 : T, Bb = small ? side * 0.9 : Bz;
  const cols = Math.ceil(W / p), rows = Math.ceil(H / p);
  for (let y = 0; y < rows; y++) for (let x = 0; x < cols; x++) {
    const cy = (y + 0.5) * p, n = fbm(x * 0.11 + 3, y * 0.11);
    const cx = (x + 0.5) * p, n2 = fbm(x * 0.13 + 9, y * 0.13 + 4);
    let v = Math.min(smooth(0, Tt, cy - p + (n - 0.5) * Tt * 0.9), smooth(0, Bb, H - cy - p + (n - 0.5) * Bb * 0.9));
    if (side) v = Math.min(v, smooth(0, side, cx - p + (n2 - 0.5) * side * 0.9), smooth(0, side, W - cx - p + (n2 - 0.5) * side * 0.9));
    if (blob) { const nx = (cx - W / 2) / (W / 2), ny = (cy - H / 2) / (H / 2); v = 1 - smooth(0.5, 1.0, Math.pow(Math.pow(Math.abs(nx), 2.6) + Math.pow(Math.abs(ny), 2.6), 1 / 2.6) + (n - 0.5) * 0.34); }
    if (v <= 0.02) continue;
    if (v >= 0.97) { g.fillRect(x * p, y * p, p + 0.5, p + 0.5); continue; }
    const s = p * Math.min(1, Math.sqrt(v) * 1.08);
    g.beginPath();
    if (g.roundRect) g.roundRect(x * p + (p - s) / 2, y * p + (p - s) / 2, s, s, s * 0.34); else g.rect(x * p + (p - s) / 2, y * p + (p - s) / 2, s, s);
    g.fill();
  }
  const url = c.toDataURL("image/png");
  img.style.webkitMaskImage = img.style.maskImage = `url(${url})`;
  img.style.webkitMaskSize = img.style.maskSize = "100% 100%";
  img.style.webkitMaskRepeat = img.style.maskRepeat = "no-repeat";
  const show = () => img.classList.add("masked");
  if (img.complete && img.naturalWidth) img.decode().then(show, show); else img.addEventListener("load", show, { once: true });
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
  for (const g of grids) if (g.vis || reduce) g.draw(now);
  for (const l of leds) l.draw(t);
  for (const s of sprites) s.draw(t);
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
