/* =========================================================
   清明上河图 · 长卷入画
   ========================================================= */
(() => {
  'use strict';

  const TILE_W = 1959;
  const TILE_H = 1100;
  const TILES = 12;

  /* 题签：按展卷方向（自右向左）排列 */
  const SCENES = [
    {
      u: 0.928, v: 0.45, sub: '卷首 · 郊野', title: '疏林晨烟',
      text: '长卷从这里展开。雾还没有散尽，疏林间露出几间茅舍，一条土路一直伸向城里。赶早的人已经上路，脚步声把路边的露水惊落了。'
    },
    {
      u: 0.862, v: 0.40, sub: '郊野 · 汴河上游', title: '春柳人家',
      text: '出城十里，田垄新绿。老柳斜斜地探向水面，枝上刚抽出嫩条。清明前后，城里人出城扫墓、踏青，回来时担头插一枝柳，一路招摇。'
    },
    {
      u: 0.622, v: 0.40, sub: '汴河 · 中流', title: '漕船与纤',
      text: '汴河上往来的多是漕船，船身宽阔，舱顶覆着竹篷。逆水时要靠岸上的纤夫拉纤，一根纤绳绷得笔直，从船头一直扯到河滩上。'
    },
    {
      u: 0.5165, v: 0.135, sub: '虹桥', title: '无柱飞虹',
      text: '整座桥不用一根桥柱：木梁交叠，层层压拱，像一道长虹跨过汴河，所以叫虹桥。桥面两侧摆满摊子，行人、驴马、独轮车把桥挤得满满当当。'
    },
    {
      u: 0.4425, v: 0.485, sub: '虹桥东 · 脚店', title: '彩楼欢门',
      text: '桥头的脚店扎起彩楼欢门：竹木作骨，彩帛缠绕，高得压过屋檐，是宋代酒家的门面。棚下摊贩云集，卖饮子、卖胡饼、看相、说书，都挤在这一小片地上。'
    },
    {
      u: 0.399, v: 0.27, sub: '汴河 · 码头', title: '汴河卸粮',
      text: '漕船沿岸排开，船工把粮袋扛过跳板，岸上的人记账、过秤。汴河是北宋的粮道，东南漕粮由这里入京，一天也停不得。'
    },
    {
      u: 0.180, v: 0.43, sub: '城门', title: '东角子门',
      text: '夯土城门，门洞高拱，城楼重檐。一队骆驼正从门洞下穿过——那是汴京与西域往来的注脚。门外护城河上架着平桥，有人凭栏闲看。'
    },
    {
      u: 0.068, v: 0.56, sub: '城内街市', title: '十里长街',
      text: '卷末市声最盛。酒旗、香药、饮子、脚店沿街铺开，檐下多搭凉棚；牛车与轿子挤在土路中间，挑担的人侧身让道。张择端把汴京的日常，一并收进这半里长街。'
    }
  ];

  /* 画中故事 · 虹桥过船 */
  const STORY = [
    {
      title: '一 · 桥下', u: 0.515, v: 0.30, s: 1.45,
      text: '一艘漕船顺流而下，桅杆高过桥面。桥洞只有丈许宽，船工们的动作忽然快了起来。'
    },
    {
      title: '二 · 桥上', u: 0.501, v: 0.155, s: 1.78,
      text: '桥上的人先看见了。有人探身栏外，有人扬起手臂呼喊，桥面挤得水泄不通。'
    },
    {
      title: '三 · 船上', u: 0.5215, v: 0.375, s: 1.85,
      text: '篙师把竹篙抵住桥身，舵手扳住舵柄，船头的人抓起缆绳——众人一齐用力。'
    },
    {
      title: '四 · 接绳', u: 0.5115, v: 0.315, s: 1.66,
      text: '桥上抛下绳索，船工接住，套上桅杆。岸上的纤夫也把纤绳拉紧了。'
    },
    {
      title: '五 · 过桥', u: 0.514, v: 0.28, s: 1.32,
      text: '船身缓缓侧转，桅杆贴着水面掠过。桥洞一暗，又亮起来；市声重新涌上来。'
    }
  ];

  const SEAL_CHARS = ['一', '二', '三', '四', '五', '六', '七', '八'];
  const LAMPS = [
    [0.030, 0.56, .9], [0.052, 0.60, 1], [0.078, 0.52, .8], [0.108, 0.60, 1],
    [0.140, 0.54, .7], [0.172, 0.50, .95], [0.196, 0.58, .8], [0.238, 0.52, .7],
    [0.300, 0.54, .75], [0.352, 0.50, .85], [0.398, 0.46, .9], [0.442, 0.50, 1],
    [0.466, 0.44, .95], [0.492, 0.36, .8], [0.516, 0.46, 1], [0.545, 0.44, .9],
    [0.585, 0.48, .8], [0.625, 0.46, .9], [0.665, 0.50, .7], [0.720, 0.48, .6]
  ];

  const $ = (s, r = document) => r.querySelector(s);
  const el = {
    intro: $('#intro'), enter: $('#enter'), storyIntro: $('#storyIntro'),
    viewer: $('#viewer'), stage: $('#stage'), track: $('#track'),
    tiles: $('#tiles'), hotspots: $('#hotspots'), lights: $('#lights'),
    back: $('#back'), soundBtn: $('#soundBtn'), storyBtn: $('#storyBtn'),
    lightBtn: $('#lightBtn'), lightLabel: $('#lightLabel'),
    rainBtn: $('#rainBtn'), loupeBtn: $('#loupeBtn'), tourBtn: $('#tourBtn'), lifeBtn: $('#lifeBtn'),
    rain: $('#rain'), loupe: $('#loupe'), loupeCanvas: $('#loupe canvas'), life: $('#life'),
    where: $('#where'), hint: $('#hint'),
    mini: $('#mini'), miniView: $('#miniView'), railPlace: $('#railPlace'), railProgress: $('#railProgress'),
    panel: $('#panel'), panelStrip: $('#panelTitleV'), panelIndex: $('#panelIndex'),
    panelSub: $('#panelSub'), panelTitle: $('#panelTitle'), panelText: $('#panelText'),
    panelClose: $('#panelClose'), prevScene: $('#prevScene'), nextScene: $('#nextScene'),
    shareScene: $('#shareScene'),
    sealRow: $('#sealRow'),
    tourCap: $('#tourCap'), tourIdx: $('#tourIdx'), tourTitle: $('#tourTitle'), tourText: $('#tourText'),
    done: $('#done'), doneTour: $('#doneTour'), doneClose: $('#doneClose'),
    walk: $('#walk'), walkCanvas: $('#walkCanvas'), walkBack: $('#walkBack'),
    walkWhere: $('#walkWhere'), walkPrompt: $('#walkPrompt'), walkPromptText: $('#walkPromptText'),
    walkCap: $('#walkCap'), walkCapTitle: $('#walkCapTitle'), walkCapText: $('#walkCapText'),
    walkCapClose: $('#walkCapClose'), walkLeft: $('#walkLeft'), walkRight: $('#walkRight'),
    film: $('#film'), filmGrid: $('#filmGrid'), filmStage: $('#filmStage'),
    filmVideo: $('#filmVideo'), filmClose: $('#filmClose'), filmCap: $('#filmCap'),
    filmBack: $('#filmBack'), filmBtn: $('#filmBtn'), filmIntro: $('#filmIntro'),
    filmDots: $('#filmDots'),
    walkInteract: $('#walkInteract'), walkBtn: $('#walkBtn'), walkIntro: $('#walkIntro'),
    story: $('#story'), storyCard: $('.story-card'), storyTitle: $('#storyTitle'),
    storyText: $('#storyText'), storyPrev: $('#storyPrev'), storyNext: $('#storyNext'),
    storyExit: $('#storyExit'), storyDots: $('#storyDots'), ring: $('#storyRing')
  };

  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const SNAP = /[?&]snap/.test(location.search);
  if (SNAP) document.documentElement.classList.add('snap');

  /* ---------- 状态 ---------- */
  const cam = { x: 0, y: 0, s: 1 };
  let stageW = 0, stageH = 0, base = 1, trackW = 0;
  let current = -1;
  const visited = new Set();
  let built = false;
  let hintGone = false;
  let anim = 0;

  const clamp = (v, a, b) => v < a ? a : v > b ? b : v;
  const maxX = (s = cam.s) => Math.max(0, trackW * s - stageW);
  const maxY = (s = cam.s) => Math.max(0, stageH * s - stageH);

  /* ---------- 构建画心 ---------- */
  function tileSpecs() {
    const last = Math.round(TILE_W * (TILES - 1) + 1811);
    const arr = [];
    for (let i = 0; i < TILES; i++) arr.push(i === TILES - 1 ? 1811 : TILE_W);
    trackW = last * base;
    return arr;
  }


  /* 画中影像点：直接点在画上就播对应短片 */
  const FILM_SPOTS = [
    { i: 0, u: .5095, v: .345, n: '汴河舟楫' },
    { i: 1, u: .6050, v: .395, n: '河湾泊舟' },
    { i: 2, u: .8680, v: .500, n: '村市车马' },
    { i: 3, u: .1900, v: .560, n: '东角子门' },
    { i: 4, u: .4470, v: .640, n: '彩楼欢宴' },
    { i: 5, u: .4400, v: .305, n: '墨卷初开' },
    { i: 6, u: .5360, v: .180, n: '桥上市声' }
  ];

  function buildFilmDots() {
    if (!el.filmDots || el.filmDots.children.length) return;
    el.filmDots.innerHTML = FILM_SPOTS.map((f, k) => `
      <button class="film-hot" data-k="${k}" style="left:${f.u * 100}%;top:${f.v * 100}%"
        aria-label="播放短片：${f.n}" title="${f.n}">
        <i></i><span>${f.n}</span>
      </button>`).join('');
    el.filmDots.addEventListener('click', e => {
      const b = e.target.closest('.film-hot');
      if (!b) return;
      e.stopPropagation();
      const f = FILM_SPOTS[+b.dataset.k];
      if (!f) return;
      openFilmGallery();
      playFilm(f.i);
    });
  }

  function build() {
    if (built) return;
    built = true;
    buildFilmDots();
    el.lights.innerHTML = LAMPS.map(([u, v, k]) =>
      `<i class="lamp" style="left:${u * 100}%;top:${v * 100}%;transform:scale(${k})"></i>`
    ).join('');

    el.hotspots.innerHTML = SCENES.map((s, i) => `
      <button class="hot" data-i="${i}" style="left:${s.u * 100}%;top:${s.v * 100}%"
        aria-label="读题：${s.title}，${s.sub}" title="${s.title}">
        <span class="ring"><span class="dot"></span></span>
        <span class="name">${s.title}</span>
      </button>`).join('');

    el.sealRow.innerHTML = SCENES.map((s, i) =>
      `<button class="seal" data-i="${i}" aria-label="第${SEAL_CHARS[i]}景 ${s.title}" title="${s.title}">${SEAL_CHARS[i]}</button>`
    ).join('');

    el.hotspots.addEventListener('click', e => {
      const b = e.target.closest('.hot');
      if (b) { e.stopPropagation(); openScene(+b.dataset.i); }
    });
    el.sealRow.addEventListener('click', e => {
      const b = e.target.closest('.seal');
      if (b) openScene(+b.dataset.i);
    });
  }

  function layout() {
    const r = el.stage.getBoundingClientRect();
    stageW = r.width; stageH = r.height;
    base = stageH / TILE_H;
    const widths = tileSpecs();
    el.track.style.width = trackW + 'px';
    el.track.style.height = stageH + 'px';

    /* 结构只建一次，尺寸随窗口更新 */
    const frag = document.createDocumentFragment();
    let acc = 0;
    el.tiles.innerHTML = '';
    widths.forEach((w, i) => {
      const d = document.createElement('div');
      d.className = 'tile';
      d.style.left = (acc * base) + 'px';
      d.style.width = (w * base + 0.6) + 'px';
      d.dataset.src = `assets/scroll/t${String(i).padStart(2, '0')}.webp`;
      d.style.backgroundPosition = 'left top';
      frag.appendChild(d);
      acc += w;
    });
    el.tiles.appendChild(frag);
    lastPaint = 0;
    if (rainOn) startRain();
    sizeLife();
    buildLife();
  }

  /* ---------- 相机 ---------- */
  function render() {
    cam.x = clamp(cam.x, 0, maxX());
    cam.y = clamp(cam.y, 0, maxY());
    el.track.style.transform = `translate3d(${-cam.x}px,${-cam.y}px,0) scale(${cam.s})`;
    el.track.style.setProperty('--inv', (1 / cam.s).toFixed(4));
    paintTiles();
    syncUI();
  }

  let lastPaint = 0;
  function paintTiles() {
    const now = performance.now();
    if (now - lastPaint < 30) return;
    lastPaint = now;
    const viewW = stageW / cam.s;
    const from = cam.x / cam.s;
    const to = from + viewW;
    const tiles = el.tiles.children;
    let acc = 0;
    for (let i = 0; i < tiles.length; i++) {
      const w = (i === TILES - 1 ? 1811 : TILE_W) * base;
      const t = tiles[i];
      const near = acc + w > from - viewW * 0.9 && acc < to + viewW * 0.9;
      if (near && !t.dataset.loaded) {
        t.style.backgroundImage = `url("${t.dataset.src}")`;
        t.dataset.loaded = '1';
        const img = new Image();
        img.src = t.dataset.src;
        loupeImgs[i] = img;
      }
      acc += w;
    }
  }

  function target(u, v, s, offX = 0, offY = 0) {
    s = clamp(s, 1, 1.85);
    const x = trackW * u * s - stageW * (0.5 + offX);
    const y = stageH * v * s - stageH * (0.5 + offY);
    return {
      x: clamp(x, 0, Math.max(0, trackW * s - stageW)),
      y: clamp(y, 0, Math.max(0, stageH * s - stageH)),
      s
    };
  }

  const easeIO = t => t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

  function flyTo(dest, dur = 900) {
    cancelAnimationFrame(anim);
    const from = { x: cam.x, y: cam.y, s: cam.s };
    if (reduceMotion || SNAP || dur <= 0) {
      cam.x = dest.x; cam.y = dest.y; cam.s = dest.s;
      render(); return;
    }
    const t0 = performance.now();
    const step = now => {
      const k = Math.min(1, (now - t0) / dur);
      const e = easeIO(k);
      cam.x = from.x + (dest.x - from.x) * e;
      cam.y = from.y + (dest.y - from.y) * e;
      cam.s = from.s + (dest.s - from.s) * e;
      render();
      if (k < 1) anim = requestAnimationFrame(step);
    };
    anim = requestAnimationFrame(step);
  }

  function centerU() {
    return clamp((cam.x + stageW / 2) / (trackW * cam.s), 0, 1);
  }

  /* ---------- UI 同步 ---------- */
  const DISTRICTS = [
    [0, .16, '城内街市'], [.16, .26, '东角子门'], [.26, .46, '汴河码头'],
    [.46, .56, '虹桥'], [.56, .78, '汴河漕运'], [.78, 1, '郊野']
  ];
  function placeName(u) {
    for (const [a, b, n] of DISTRICTS) if (u >= a && u < b) return n;
    return '郊野';
  }

  function syncUI() {
    const u = centerU();
    el.where.textContent = placeName(u);
    const shown = stageW / (trackW * cam.s);
    const left = cam.x / (trackW * cam.s);
    el.miniView.style.left = (left * 100) + '%';
    el.miniView.style.width = Math.max(1.5, shown * 100) + '%';
    el.mini.setAttribute('aria-valuenow', Math.round(u * 100));
    el.railPlace.textContent = placeName(u);
    el.railProgress.textContent = `读过 ${visited.size} / 八`;
  }

  /* ---------- 拖拽 / 惯性 ---------- */
  let drag = null, velocity = 0, inertia = 0;
  const pointers = new Map();
  let pinch = null;

  function stopInertia() { cancelAnimationFrame(inertia); velocity = 0; }

  el.stage.addEventListener('pointerdown', e => {
    if (e.target.closest('.hot')) return;
    if (document.body.classList.contains('story-on')) return;
    endTour(true);
    try { el.stage.setPointerCapture(e.pointerId); } catch { /* 合成事件 */ }
    pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
    stopInertia();
    cancelAnimationFrame(anim);

    if (pointers.size === 2) {
      const [a, b] = [...pointers.values()];
      pinch = { d: Math.hypot(a.x - b.x, a.y - b.y), s: cam.s };
      drag = null;
      return;
    }
    drag = { x: e.clientX, y: e.clientY, cx: cam.x, cy: cam.y, t: performance.now(), moved: 0 };
    el.stage.classList.add('dragging');
    hideHint();
  });

  el.stage.addEventListener('pointermove', e => {
    if (!pointers.has(e.pointerId)) return;
    pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });

    if (pinch && pointers.size === 2) {
      const [a, b] = [...pointers.values()];
      const d = Math.hypot(a.x - b.x, a.y - b.y);
      const ratio = d / (pinch.d || 1);
      zoomAt((a.x + b.x) / 2, (a.y + b.y) / 2, clamp(pinch.s * ratio / cam.s, .9, 1.1));
      return;
    }
    if (!drag) return;

    const dx = e.clientX - drag.x;
    const dy = e.clientY - drag.y;
    drag.moved = Math.max(drag.moved, Math.abs(dx) + Math.abs(dy));
    const now = performance.now();
    const dt = Math.max(1, now - drag.t);
    velocity = (-dx / dt) * 16;
    drag.t = now;
    cam.x = clamp(drag.cx - dx, 0, maxX());
    cam.y = clamp(drag.cy - dy, 0, maxY());
    render();
  });

  function endPointer(e) {
    pointers.delete(e.pointerId);
    if (pinch && pointers.size < 2) pinch = null;
    if (!drag) return;
    el.stage.classList.remove('dragging');
    const moved = drag.moved;
    drag = null;
    if (moved > 4) {
      if (reduceMotion) { velocity = 0; return; }
      const glide = () => {
        cam.x = clamp(cam.x + velocity, 0, maxX());
        velocity *= 0.93;
        render();
        if (Math.abs(velocity) > 0.25) inertia = requestAnimationFrame(glide);
      };
      inertia = requestAnimationFrame(glide);
    }
  }
  el.stage.addEventListener('pointerup', endPointer);
  el.stage.addEventListener('pointercancel', endPointer);

  /* ---------- 滚轮 ---------- */
  el.stage.addEventListener('wheel', e => {
    e.preventDefault();
    hideHint();
    endTour(true);
    cancelAnimationFrame(anim);
    if (e.ctrlKey || e.metaKey) {
      zoomAt(e.clientX, e.clientY, e.deltaY > 0 ? 0.93 : 1.075);
      return;
    }
    const d = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
    cam.x = clamp(cam.x + d * 1.15, 0, maxX());
    render();
  }, { passive: false });

  function zoomAt(px, py, factor) {
    const rect = el.stage.getBoundingClientRect();
    const cx = (px - rect.left + cam.x) / cam.s;
    const cy = (py - rect.top + cam.y) / cam.s;
    const ns = clamp(cam.s * factor, 1, 1.85);
    cam.s = ns;
    cam.x = clamp(cx * ns - (px - rect.left), 0, maxX(ns));
    cam.y = clamp(cy * ns - (py - rect.top), 0, maxY(ns));
    render();
  }

  el.stage.addEventListener('dblclick', e => {
    const rect = el.stage.getBoundingClientRect();
    if (cam.s > 1.15) {
      const u = (e.clientX - rect.left + cam.x) / (trackW * cam.s);
      flyTo(target(u, 0.5, 1), 700);
    } else zoomAt(e.clientX, e.clientY, 1.9);
  });

  /* ---------- 键盘 ---------- */
  addEventListener('keydown', e => {
    if (el.viewer.hidden) return;
    const tag = document.activeElement && document.activeElement.tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA') return;

    if (e.key === 'Escape') {
      if (!el.done.hidden) { el.done.hidden = true; return; }
      if (el.story.classList.contains('on')) { endStory(); return; }
      if (el.panel.classList.contains('open')) { closePanel(); return; }
      if (!el.viewer.hidden) exitViewer();
      return;
    }
    if (e.key === 'ArrowRight') { endTour(true); cam.x = clamp(cam.x + 110, 0, maxX()); render(); hideHint(); e.preventDefault(); }
    if (e.key === 'ArrowLeft') { endTour(true); cam.x = clamp(cam.x - 110, 0, maxX()); render(); hideHint(); e.preventDefault(); }
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      if (cam.s <= 1) return;
      cam.y = clamp(cam.y + (e.key === 'ArrowDown' ? 90 : -90), 0, maxY());
      render(); e.preventDefault();
    }
    if (e.key === '+' || e.key === '=') zoomAt(stageW / 2, stageH / 2, 1.12);
    if (e.key === '-' || e.key === '_') zoomAt(stageW / 2, stageH / 2, 0.89);
  });

  function hideHint() {
    if (hintGone) return;
    hintGone = true;
    el.hint.classList.add('gone');
  }

  /* ---------- 缩略图 ---------- */
  let scrubbing = false;
  function scrubTo(clientX) {
    const r = el.mini.getBoundingClientRect();
    const u = clamp((clientX - r.left) / r.width, 0, 1);
    cam.x = clamp(trackW * u * cam.s - stageW / 2, 0, maxX());
    render();
  }
  el.mini.addEventListener('pointerdown', e => {
    scrubbing = true;
    endTour(true);
    try { el.mini.setPointerCapture(e.pointerId); } catch { /* 合成事件 */ }
    stopInertia(); cancelAnimationFrame(anim);
    scrubTo(e.clientX);
    hideHint();
  });
  el.mini.addEventListener('pointermove', e => { if (scrubbing) scrubTo(e.clientX); });
  el.mini.addEventListener('pointerup', () => { scrubbing = false; });
  el.mini.addEventListener('pointercancel', () => { scrubbing = false; });
  el.mini.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
      const dir = e.key === 'ArrowRight' ? 1 : -1;
      cam.x = clamp(cam.x + dir * stageW * 0.3, 0, maxX());
      render(); e.preventDefault();
    }
  });
  document.querySelectorAll('.mini-ticks button').forEach(b => {
    b.addEventListener('click', () => {
      const u = parseFloat(b.dataset.u);
      flyTo(target(u, 0.5, 1), 900);
    });
  });

  /* ---------- 题签 ---------- */
  function openScene(i) {
    const s = SCENES[i];
    if (!s) return;
    current = i;
    visited.add(i);
    el.panel.hidden = false;
    el.panelStrip.textContent = s.title;
    el.panelIndex.textContent = SEAL_CHARS[i];
    el.panelSub.textContent = s.sub;
    el.panelTitle.textContent = s.title;
    el.panelText.textContent = s.text;
    el.panel.classList.add('open');
    el.panel.setAttribute('aria-hidden', 'false');
    document.body.classList.add('panel-open');
    el.prevScene.disabled = i <= 0;
    el.nextScene.disabled = i >= SCENES.length - 1;
    [...el.sealRow.children].forEach((b, k) => b.classList.toggle('on', visited.has(k)));
    syncUI();
    endTour(true);

    const offX = stageW > 760 ? -0.13 : 0;
    const offY = stageW > 760 ? 0.02 : -0.2;
    flyTo(target(s.u, s.v, Math.max(cam.s, 1.28), offX, offY), 950);
    if (visited.size === SCENES.length) setTimeout(showDone, 900);
  }

  function closePanel() {
    el.panel.classList.remove('open');
    el.panel.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('panel-open');
    current = -1;
  }

  el.panelClose.addEventListener('click', closePanel);
  el.prevScene.addEventListener('click', () => { if (current > 0) openScene(current - 1); });
  el.nextScene.addEventListener('click', () => { if (current >= 0 && current < SCENES.length - 1) openScene(current + 1); });
  el.shareScene.addEventListener('click', () => {
    const i = current >= 0 ? current : 0;
    const link = location.origin + location.pathname + '#s=' + i;
    toast('此景链接已复制');
    copyText(link).then(ok => { if (!ok) toast(link); });
  });

  /* ---------- 光色：昼 / 暮 / 夜 ---------- */
  const LIGHTS = ['day', 'dusk', 'night'];
  const LIGHT_NAME = { day: '昼', dusk: '暮', night: '夜' };
  const LIGHT_NOTE = { day: '天光', dusk: '暮色', night: '夜色' };
  let lightIdx = 0;

  function setLight(name) {
    lightIdx = Math.max(0, LIGHTS.indexOf(name));
    document.body.dataset.light = name;
    el.lightLabel.textContent = LIGHT_NAME[name];
    el.lightBtn.setAttribute('aria-pressed', String(name !== 'day'));
    el.lightBtn.setAttribute('aria-label', '光线：' + LIGHT_NOTE[name] + '，点击切换昼、暮、夜');
    el.lightBtn.title = '光线 · ' + LIGHT_NAME[name];
  }
  el.lightBtn.addEventListener('click', () => {
    setLight(LIGHTS[(lightIdx + 1) % LIGHTS.length]);
    hideHint();
  });

  /* ---------- 时雨 ---------- */
  let rainOn = false, rainRAF = 0, rainLast = 0, drops = [];
  const rctx = el.rain.getContext('2d');

  function sizeRain() {
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    el.rain.width = Math.round(stageW * dpr);
    el.rain.height = Math.round(stageH * dpr);
    el.rain.style.width = stageW + 'px';
    el.rain.style.height = stageH + 'px';
    rctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  function newDrop(anywhere) {
    return {
      x: Math.random() * (stageW + 140) - 70,
      y: anywhere ? Math.random() * stageH : -60,
      len: 12 + Math.random() * 30,
      v: 820 + Math.random() * 720,
      a: .08 + Math.random() * .26,
      w: Math.random() < .22 ? 1.4 : .8
    };
  }
  function seedRain() {
    const n = reduceMotion ? 0 : Math.round(stageW * stageH / 11000);
    drops = Array.from({ length: n }, () => newDrop(true));
  }
  function rainStep(t) {
    const dt = rainLast ? Math.min(64, t - rainLast) / 1000 : .016;
    rainLast = t;
    rctx.clearRect(0, 0, stageW, stageH);
    rctx.lineCap = 'round';
    for (const d of drops) {
      d.y += d.v * dt;
      d.x -= d.v * dt * .14;
      if (d.y - d.len > stageH || d.x < -40) Object.assign(d, newDrop(false));
      rctx.strokeStyle = 'rgba(212,228,238,' + d.a.toFixed(3) + ')';
      rctx.lineWidth = d.w;
      rctx.beginPath();
      rctx.moveTo(d.x, d.y);
      rctx.lineTo(d.x - d.len * .14, d.y - d.len);
      rctx.stroke();
    }
    rainRAF = requestAnimationFrame(rainStep);
  }
  function startRain() {
    if (!stageW) return;
    sizeRain(); seedRain();
    cancelAnimationFrame(rainRAF); rainLast = 0;
    if (!reduceMotion) rainRAF = requestAnimationFrame(rainStep);
  }
  function stopRain() {
    cancelAnimationFrame(rainRAF); rainRAF = 0;
    rctx.clearRect(0, 0, stageW, stageH);
  }
  el.rainBtn.addEventListener('click', () => {
    rainOn = !rainOn;
    document.body.dataset.rain = rainOn ? '1' : '0';
    el.rainBtn.setAttribute('aria-pressed', String(rainOn));
    if (rainOn) startRain(); else stopRain();
    mixAudio();
    hideHint();
  });

  /* ---------- 活画：画中人 ----------
     画里的人和船是像素，不能凭空重画。做法是：整块取出画上的那一块，
     先把它原本的位置用「补地」盖住，再把人物按位移画回去——
     于是动的仍是张择端画的那几笔，不是我另画的剪影。 */
  const ACTS = [
    {
      /* 街市上挑担的脚夫：只动他一个，动的是原画的墨迹 */
      name: 'porter',
      r: { u0: .05946, v0: .61636, u1: .06648, v1: .77091 },
      ax: 13, ay: 1.2, period: 7.2, phase: .6
    }
  ];

  const RIVER_SPARKS = [
    [.404, .300, .6], [.418, .345, .5], [.432, .390, .6], [.446, .430, .5],
    [.512, .330, .55], [.532, .380, .6], [.548, .410, .5], [.566, .300, .45],
    [.588, .445, .55], [.612, .360, .6], [.636, .420, .5], [.660, .340, .45]
  ];
  const BIRDS = [
    [.470, .100, .026], [.498, .075, .032], [.524, .115, .022],
    [.548, .085, .028], [.492, .045, .030]
  ];

  const lctx = el.life.getContext('2d');
  let lifeOn = false, lifeRAF = 0, lifeLast = 0, lifeT = 0, lifeReady = false;
  const actImgs = {}, birds = [];

  function sizeLife() {
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    el.life.width = Math.round(stageW * dpr);
    el.life.height = Math.round(stageH * dpr);
    el.life.style.width = stageW + 'px';
    el.life.style.height = stageH + 'px';
    lctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function buildLife() {
    birds.length = 0;
    BIRDS.forEach(([u, v, r]) => birds.push({
      u, v, r,
      phase: Math.random() * 6.283,
      speed: .1 + Math.random() * .1,
      flap: 5 + Math.random() * 3
    }));
    ACTS.forEach(a => {
      if (actImgs[a.name]) return;
      const img = new Image();
      img.src = 'assets/act/' + a.name + '.webp';
      const bg = new Image();
      bg.src = 'assets/act/' + a.name + '_bg.webp';
      actImgs[a.name] = { img, bg };
    });
    lifeReady = true;
  }

  function lifeFrame(ts) {
    const dt = lifeLast ? Math.min(64, ts - lifeLast) / 1000 : .016;
    lifeLast = ts;
    drawLifeFrame(dt);
    lifeRAF = requestAnimationFrame(lifeFrame);
  }

  function drawLifeFrame(dt) {
    lifeT += dt;
    const s = cam.s;
    const c = lctx;
    c.clearRect(0, 0, stageW, stageH);

    /* 画中人（原像素整块移动） */
    for (const a of ACTS) {
      const im = actImgs[a.name];
      if (!im || !im.bg.complete || !im.bg.naturalWidth) continue;
      const bx = a.r.u0 * trackW * s - cam.x;
      const by = a.r.v0 * stageH * s - cam.y;
      const bw = (a.r.u1 - a.r.u0) * trackW * s;
      const bh = (a.r.v1 - a.r.v0) * stageH * s;
      if (bx > stageW || bx + bw < 0) continue;
      c.drawImage(im.bg, bx, by, bw, bh);
      if (!im.img.complete || !im.img.naturalWidth) continue;
      const t = lifeT * Math.PI * 2 / a.period + a.phase;
      const dx = Math.sin(t) * a.ax * base * s;
      const dy = Math.sin(t * 2) * a.ay * base * s;
      c.drawImage(im.img, bx + dx, by + dy, bw, bh);
    }

    /* 水光 */
    for (let i = 0; i < RIVER_SPARKS.length; i++) {
      const [u, v, len] = RIVER_SPARKS[i];
      const x = u * trackW * s - cam.x + Math.sin(lifeT * .8 + i * 1.3) * 9;
      const y = v * stageH * s - cam.y + Math.cos(lifeT * .6 + i) * 2;
      if (x < -90 || x > stageW + 90) continue;
      const alpha = .10 + .07 * Math.sin(lifeT * 1.4 + i * 2.1);
      c.strokeStyle = 'rgba(252,240,214,' + Math.max(0, alpha).toFixed(3) + ')';
      c.lineWidth = Math.max(1, s * .9);
      c.beginPath();
      c.moveTo(x, y);
      c.lineTo(x + len * stageH * s * .09, y);
      c.stroke();
    }

    /* 飞鸟 */
    for (const b of birds) {
      b.phase += dt * b.speed;
      const x = (b.u + Math.cos(b.phase) * b.r) * trackW * s - cam.x;
      const y = (b.v + Math.sin(b.phase) * b.r * .55) * stageH * s - cam.y;
      if (x < -60 || x > stageW + 60) continue;
      const size = clamp(7 * s, 4, 11);
      const f = Math.sin(lifeT * b.flap + b.phase * 4) * .5 + .5;
      c.strokeStyle = 'rgba(48,35,24,.45)';
      c.lineWidth = Math.max(.8, size * .13);
      c.beginPath();
      c.moveTo(x - size, y - size * .25 * f);
      c.quadraticCurveTo(x - size * .35, y - size * .75 * f, x, y);
      c.quadraticCurveTo(x + size * .35, y - size * .75 * f, x + size, y - size * .25 * f);
      c.stroke();
    }
  }

  function startLife() {
    if (lifeRAF || !lifeOn || !stageW) return;
    if (!lifeReady) buildLife();
    lifeLast = 0;
    lifeRAF = requestAnimationFrame(lifeFrame);
  }
  function stopLife() {
    cancelAnimationFrame(lifeRAF);
    lifeRAF = 0;
    if (stageW) lctx.clearRect(0, 0, stageW, stageH);
  }
  el.lifeBtn.addEventListener('click', () => {
    lifeOn = !lifeOn;
    document.body.dataset.life = lifeOn ? '1' : '0';
    el.lifeBtn.setAttribute('aria-pressed', String(lifeOn));
    if (lifeOn) startLife(); else stopLife();
    hideHint();
  });

  /* ---------- 画眼（放大镜） ---------- */
  const loupeImgs = [];
  let loupeOn = false;

  function paintLoupe(px, py) {
    const k = TILE_H / stageH;                    // 源像素 / 屏幕像素
    const sx = (px + cam.x) / cam.s * k;
    const sy = (py + cam.y) / cam.s * k;
    const span = 184 * k / 2.2;                   // 放大 2.2 倍所覆盖的源像素
    const scale = 360 / span;
    const c2 = el.loupeCanvas.getContext('2d');
    c2.fillStyle = '#d9c49c';
    c2.fillRect(0, 0, 360, 360);
    let acc = 0;
    for (let i = 0; i < TILES; i++) {
      const wSrc = i === TILES - 1 ? 1811 : TILE_W;
      if (acc + wSrc > sx - span / 2 && acc < sx + span / 2) {
        const img = loupeImgs[i];
        if (img && img.complete && img.naturalWidth) {
          c2.drawImage(img,
            (acc - (sx - span / 2)) * scale,
            -(sy - span / 2) * scale,
            wSrc * scale, TILE_H * scale);
        }
      }
      acc += wSrc;
    }
    el.loupe.style.left = px + 'px';
    el.loupe.style.top = py + 'px';
  }

  function setLoupe(on) {
    loupeOn = on;
    el.loupeBtn.setAttribute('aria-pressed', String(on));
    el.loupe.classList.toggle('on', on);
    el.stage.style.cursor = on ? 'crosshair' : '';
    if (on) el.loupe.style.opacity = '';
  }
  el.loupeBtn.addEventListener('click', () => { setLoupe(!loupeOn); hideHint(); });
  el.stage.addEventListener('pointermove', e => {
    if (!loupeOn) return;
    const r = el.stage.getBoundingClientRect();
    paintLoupe(e.clientX - r.left, e.clientY - r.top);
  });

  /* ---------- 自动展卷 ---------- */
  let tourOn = false, tourRAF = 0, tourLast = 0, capTimer = 0;
  const tourShown = new Set();

  function showCap(i) {
    const s = SCENES[i];
    el.tourIdx.textContent = SEAL_CHARS[i];
    el.tourTitle.textContent = s.title;
    el.tourText.textContent = s.text.split('。')[0] + '。';
    el.tourCap.classList.add('on');
    clearTimeout(capTimer);
    capTimer = setTimeout(() => el.tourCap.classList.remove('on'), 5400);
  }

  function startTour() {
    if (tourOn) return;
    if (document.body.classList.contains('story-on')) endStory();
    closePanel();
    cancelAnimationFrame(anim);
    tourOn = true; tourShown.clear();
    el.tourBtn.setAttribute('aria-pressed', 'true');
    flyTo(target(.975, .42, 1), 1200);
    setTimeout(() => {
      if (!tourOn) return;
      tourLast = 0;
      tourRAF = requestAnimationFrame(tourStep);
    }, 1260);
  }

  function tourStep(t) {
    if (!tourOn) return;
    const dt = tourLast ? Math.min(64, t - tourLast) / 1000 : .016;
    tourLast = t;
    const speed = Math.max(90, stageW * .17);
    cam.x = Math.max(0, cam.x - speed * dt);
    render();
    const u = centerU();
    for (let i = 0; i < SCENES.length; i++) {
      if (!tourShown.has(i) && Math.abs(u - SCENES[i].u) < .014) { tourShown.add(i); showCap(i); }
    }
    if (cam.x <= .5) { endTour(); return; }
    tourRAF = requestAnimationFrame(tourStep);
  }

  function endTour(quiet) {
    if (!tourOn) return;
    tourOn = false;
    cancelAnimationFrame(tourRAF);
    el.tourBtn.setAttribute('aria-pressed', 'false');
    if (quiet) el.tourCap.classList.remove('on');
    else setTimeout(() => el.tourCap.classList.remove('on'), 4200);
  }

  el.tourBtn.addEventListener('click', () => { tourOn ? endTour() : startTour(); hideHint(); });

  /* ---------- 八景阅毕 ---------- */
  function showDone() {
    if (!el.done.hidden) return;
    el.done.hidden = false;
    endTour(true);
  }
  el.doneClose.addEventListener('click', () => { el.done.hidden = true; });
  el.doneTour.addEventListener('click', () => { el.done.hidden = true; startTour(); });
  el.done.addEventListener('click', e => { if (e.target === el.done) el.done.hidden = true; });

  /* ---------- 复制 / 提示 ---------- */
  let toastEl = null, toastTimer = 0;
  function toast(msg) {
    if (!toastEl) {
      toastEl = document.createElement('div');
      toastEl.className = 'toast';
      toastEl.setAttribute('role', 'status');
      el.viewer.appendChild(toastEl);
    }
    toastEl.textContent = msg;
    toastEl.classList.add('on');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove('on'), 2400);
  }
  async function copyText(text) {
    const nav = navigator.clipboard;
    if (nav && nav.writeText) {
      try {
        const ok = await Promise.race([
          nav.writeText(text).then(() => true),
          new Promise(r => setTimeout(() => r(false), 900))
        ]);
        if (ok) return true;
      } catch { /* 继续用兜底方案 */ }
    }
    try {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.cssText = 'position:fixed;opacity:0;pointer-events:none';
      document.body.appendChild(ta);
      ta.select();
      const ok = document.execCommand('copy');
      ta.remove();
      return ok;
    } catch { return false; }
  }

  /* ---------- 环境声（河水 + 雨） ---------- */
  let audio = null, soundOn = false;

  function initAudio() {
    if (!audio) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return null;
      const ctx = new AC();
      const gain = ctx.createGain();
      gain.gain.value = 0;
      gain.connect(ctx.destination);

      const len = ctx.sampleRate * 4;
      const buf = ctx.createBuffer(1, len, ctx.sampleRate);
      const d = buf.getChannelData(0);
      let last = 0;
      for (let i = 0; i < len; i++) {
        const w = Math.random() * 2 - 1;
        last = (last + .02 * w) / 1.02;
        d[i] = last * 3.2;
      }
      const src = ctx.createBufferSource();
      src.buffer = buf; src.loop = true;
      const lp = ctx.createBiquadFilter();
      lp.type = 'lowpass'; lp.frequency.value = 620; lp.Q.value = .4;
      const hp = ctx.createBiquadFilter();
      hp.type = 'highpass'; hp.frequency.value = 90;
      src.connect(hp).connect(lp).connect(gain);
      src.start();
      const lfo = ctx.createOscillator(), lg = ctx.createGain();
      lfo.frequency.value = .07; lg.gain.value = 180;
      lfo.connect(lg).connect(lp.frequency); lfo.start();

      const rb = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate);
      const rd = rb.getChannelData(0);
      for (let i = 0; i < rd.length; i++) rd[i] = (Math.random() * 2 - 1) * .5;
      const rsrc = ctx.createBufferSource();
      rsrc.buffer = rb; rsrc.loop = true;
      const bp = ctx.createBiquadFilter();
      bp.type = 'bandpass'; bp.frequency.value = 2600; bp.Q.value = .6;
      const rg = ctx.createGain();
      rg.gain.value = 0;
      rsrc.connect(bp).connect(rg).connect(ctx.destination);
      rsrc.start();

      audio = { ctx, gain, rg };
    }
    if (audio.ctx.state === 'suspended') audio.ctx.resume();
    return audio;
  }

  function mixAudio() {
    if (!audio) return;
    const t = audio.ctx.currentTime;
    audio.gain.gain.cancelScheduledValues(t);
    audio.gain.gain.linearRampToValueAtTime(soundOn ? .05 : 0, t + 1.1);
    audio.rg.gain.cancelScheduledValues(t);
    audio.rg.gain.linearRampToValueAtTime(soundOn && rainOn ? .028 : 0, t + 1.1);
  }

  el.soundBtn.addEventListener('click', () => {
    initAudio();
    soundOn = !soundOn;
    el.soundBtn.setAttribute('aria-pressed', String(soundOn));
    mixAudio();
  });

  /* ---------- 故事 ---------- */
  let beat = 0;
  function startStory(i = 0) {
    beat = i;
    el.story.hidden = false;
    el.story.classList.add('on');
    el.ring.hidden = false;
    el.storyBtn.setAttribute('aria-pressed', 'true');
    document.body.classList.add('story-on');
    el.storyDots.innerHTML = STORY.map(() => '<i></i>').join('');
    paintBeat(true);
  }
  function paintBeat(instant) {
    const s = STORY[beat];
    el.storyTitle.textContent = s.title;
    el.storyText.textContent = s.text;
    el.storyPrev.disabled = beat === 0;
    el.storyNext.textContent = beat === STORY.length - 1 ? '收卷' : '下一景';
    [...el.storyDots.children].forEach((d, i) => d.classList.toggle('on', i === beat));
    el.ring.style.left = (s.u * 100) + '%';
    el.ring.style.top = (s.v * 100) + '%';
    el.ring.style.transform = `scale(${(1 / s.s).toFixed(3)})`;
    flyTo(target(s.u, s.v, s.s, stageW > 760 ? 0.1 : 0, stageW > 760 ? 0.02 : -0.16), instant ? 0 : 1150);
  }
  function nextBeat() {
    if (beat < STORY.length - 1) { beat++; paintBeat(false); }
    else endStory();
  }
  function endStory() {
    el.story.classList.remove('on');
    el.story.hidden = true;
    el.ring.hidden = true;
    el.storyBtn.setAttribute('aria-pressed', 'false');
    document.body.classList.remove('story-on');
    flyTo(target(0.509, 0.33, 1.05), 1100);
  }

  el.storyBtn.addEventListener('click', () => startStory(0));
  el.storyIntro.addEventListener('click', () => {
    enterViewer();
    setTimeout(() => startStory(0), 1100);
  });
  el.storyNext.addEventListener('click', nextBeat);
  el.storyPrev.addEventListener('click', () => { if (beat > 0) { beat--; paintBeat(false); } });
  el.storyExit.addEventListener('click', endStory);
  el.storyDots.addEventListener('click', e => {
    const i = [...el.storyDots.children].indexOf(e.target);
    if (i >= 0) { beat = i; paintBeat(false); }
  });

  /* ---------- 入画：走进街市 ---------- */
  const WK = {
    on: false, raf: 0, last: 0, t: 0,
    u: .12, target: .12, v: .5, zoom: 1,
    kl: false, kr: false, bob: 0, spot: -1, act: null, drag: null,
    spots: [
      {
        u: .20, name: '茶棚', label: '坐下吃茶',
        text: '茶博士从大壶里续了第二盏。棚下的人不急着走，把盏沿在手里来回转，看街上车马。'
      },
      {
        u: .50, name: '门楼', label: '进院看看',
        text: '脚店门前的彩楼欢门缠满彩帛，竹骨扎得比屋檐还高。风一过，绸子一齐轻响。'
      },
      {
        u: .79, name: '铺面', label: '看铺子',
        text: '漕船压着水线过来。船工把篙子往桥墩上一点，船头就偏过去半尺——桥上的人跟着往前探身。'
      }
    ],
    walkers: []
  };
  const wctx = el.walkCanvas.getContext('2d');
  const heroImg = new Image();
  heroImg.src = 'assets/walk/painter.webp';
  WK.face = 1;
  let wW = 0, wH = 0;

  function sizeWalk() {
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    wW = innerWidth;
    wH = innerHeight;
    el.walkCanvas.style.width = wW + 'px';
    el.walkCanvas.style.height = wH + 'px';
    el.walkCanvas.width = Math.round(wW * dpr);
    el.walkCanvas.height = Math.round(wH * dpr);
    wctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function tileImg(i) {
    if (!loupeImgs[i]) {
      const m = new Image();
      m.src = 'assets/scroll/t' + String(i).padStart(2, '0') + '.webp';
      loupeImgs[i] = m;
    }
    return loupeImgs[i];
  }

  function seedWalkers() {
    WK.walkers = [];
    for (let i = 0; i < 9; i++) {
      WK.walkers.push({
        u: .026 + Math.random() * .108,
        v: .578 + Math.random() * .048,
        sp: .0045 + Math.random() * .0055,
        dir: Math.random() < .5 ? -1 : 1,
        ph: Math.random() * 6.283,
        h: 17 + Math.random() * 5,
        kind: Math.random() < .22 ? 'porter' : 'walk'
      });
    }
  }

  function drawFigure(c, x, y, h, dir, ph, kind) {
    const sw = Math.sin(ph);
    c.save();
    c.translate(x, y - Math.abs(sw) * h * .03);
    c.scale(dir, 1);
    c.lineCap = 'round';
    c.strokeStyle = 'rgba(62,44,27,.80)';
    c.fillStyle = 'rgba(58,41,25,.86)';
    c.shadowColor = 'rgba(60,42,26,.45)';
    c.shadowBlur = h * .22;
    c.lineWidth = Math.max(1, h * .05);
    /* 腿 */
    c.beginPath();
    c.moveTo(0, -h * .42); c.lineTo(h * .12 * sw, 0);
    c.moveTo(0, -h * .42); c.lineTo(-h * .12 * sw, 0);
    c.stroke();
    /* 袍 */
    c.beginPath();
    c.moveTo(-h * .20, -h * .38);
    c.lineTo(h * .20, -h * .38);
    c.lineTo(h * .12, -h * .79);
    c.lineTo(-h * .12, -h * .79);
    c.closePath(); c.fill();
    /* 臂 / 担 */
    if (kind === 'porter') {
      c.beginPath();
      c.moveTo(-h * .40, -h * .74); c.lineTo(h * .40, -h * .74);
      c.stroke();
      c.beginPath(); c.arc(-h * .40, -h * .56, h * .085, 0, 6.283); c.stroke();
      c.beginPath(); c.arc(h * .40, -h * .56, h * .085, 0, 6.283); c.stroke();
    } else {
      c.beginPath();
      c.moveTo(0, -h * .72);
      c.lineTo(h * .18, -h * .54 - h * .05 * sw);
      c.stroke();
    }
    /* 头 + 幞头 */
    c.beginPath(); c.arc(0, -h * .86, h * .082, 0, 6.283); c.fill();
    c.beginPath();
    c.moveTo(-h * .12, -h * .925); c.lineTo(h * .12, -h * .925);
    c.stroke();
    c.restore();
  }

  function drawBoat(c, x, y, w, t) {
    c.save();
    c.translate(x, y + Math.sin(t * 1.1) * 1.5);
    c.strokeStyle = 'rgba(34,25,16,.85)';
    c.fillStyle = 'rgba(34,25,16,.5)';
    c.lineWidth = 1.6;
    c.beginPath();
    c.moveTo(-w / 2, 0);
    c.quadraticCurveTo(0, w * .16, w / 2, 0);
    c.quadraticCurveTo(0, -w * .10, -w / 2, 0);
    c.closePath(); c.fill();
    c.beginPath();
    c.moveTo(-w * .22, 0); c.quadraticCurveTo(0, -w * .30, w * .22, 0);
    c.stroke();
    c.restore();
  }

  function nearestSpot(u) {
    let best = -1, d = .075;
    WK.spots.forEach((s, i) => {
      const dd = Math.abs(s.u - u);
      if (dd < d) { d = dd; best = i; }
    });
    return best;
  }

  function openAct(i) {
    if (i < 0) return;
    const s = WK.spots[i];
    WK.act = { i, t: 0 };
    WK.target = s.u;
    el.walkCapTitle.textContent = s.name;
    el.walkCapText.textContent = s.text;
    el.walkCap.hidden = false;
    el.walkPrompt.classList.remove('on');
  }

  function closeAct() {
    WK.act = null;
    el.walkCap.hidden = true;
  }

  function drawWalk(dt) {
    WK.t += dt;
    const ctx = wctx;
    const img = walkBg();
    const iw = 1672, ih = 941;
    const breathe = 1 + Math.sin(WK.t * .17) * .006;
    const scale = Math.max(wW / iw, wH / ih) * 1.06 * breathe;
    const drawW = iw * scale, drawH = ih * scale;
    const maxX = Math.max(0, drawW - wW);

    const dir = (WK.kr ? 1 : 0) - (WK.kl ? 1 : 0);
    if (dir && !WK.act) WK.target = clamp(WK.target + dir * .16 * dt, 0, 1);
    WK.u += (WK.target - WK.u) * Math.min(1, dt * 5.5);

    const camX = WK.u * maxX;
    const camY = (drawH - wH) * .5 + Math.sin(WK.t * .11) * (drawH - wH) * .04;
    const px = f => f * drawW - camX;
    const py = f => f * drawH - camY;

    ctx.clearRect(0, 0, wW, wH);
    if (img.complete && img.naturalWidth) {
      ctx.drawImage(img, -camX, -camY, drawW, drawH);
    } else {
      ctx.fillStyle = '#e6ddc6';
      ctx.fillRect(0, 0, wW, wH);
    }

    /* 河面水光（画面左侧的河与桥） */
    ctx.save();
    ctx.lineCap = 'round';
    for (let i = 0; i < 14; i++) {
      const fy = .575 + (i % 5) * .022;
      const fx = .015 + ((i * 37) % 150) / 1000;
      const x = px(fx) + Math.sin(WK.t * .9 + i) * 6;
      const y = py(fy);
      if (x < -80 || x > wW + 80) continue;
      const a = .10 + .10 * Math.sin(WK.t * 1.3 + i * 1.7);
      ctx.strokeStyle = 'rgba(255,252,238,' + Math.max(0, a).toFixed(3) + ')';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + 30 + (i % 4) * 12, y);
      ctx.stroke();
    }
    ctx.restore();

    /* 雾带 */
    for (let i = 0; i < 3; i++) {
      const off = ((WK.t * (5 + i * 3)) % (wW + 620)) - 320;
      const y = wH * (.30 + i * .09);
      const g = ctx.createLinearGradient(off - 300, y, off + 300, y);
      g.addColorStop(0, 'rgba(246,240,224,0)');
      g.addColorStop(.5, 'rgba(246,240,224,' + (0.07 - i * .015) + ')');
      g.addColorStop(1, 'rgba(246,240,224,0)');
      ctx.fillStyle = g;
      ctx.fillRect(off - 300, y - 60, 600, 120);
    }

    /* 浮尘 */
    for (let i = 0; i < 22; i++) {
      const p = (WK.t * .04 + i * .137) % 1;
      const x = ((i * 173.3) % wW) - camX * .06;
      const y = wH * (.2 + p * .7);
      const a = .08 + .08 * Math.sin(WK.t * .8 + i);
      ctx.fillStyle = 'rgba(255,248,226,' + Math.max(0, a).toFixed(3) + ')';
      ctx.beginPath();
      ctx.arc(x + Math.sin(WK.t * .6 + i) * 14, y, 1.2 + (i % 3), 0, 6.283);
      ctx.fill();
    }

    /* 互动时的小动静 */
    if (WK.act) {
      const a = WK.act;
      a.t += dt;
      if (a.i === 0) {
        for (let k = 0; k < 5; k++) {
          const p = (a.t * .5 + k * .2) % 1;
          const x = px(.225) + Math.sin((p + k) * 6) * 10;
          const y = py(.665) - p * 90;
          ctx.fillStyle = 'rgba(252,248,236,' + (0.20 * (1 - p)).toFixed(3) + ')';
          ctx.beginPath();
          ctx.arc(x, y, 2 + p * 9, 0, 6.283);
          ctx.fill();
        }
      }
      if (a.i === 1) {
        const g = ctx.createRadialGradient(px(.53), py(.52), 0, px(.53), py(.52), 170);
        g.addColorStop(0, 'rgba(255,214,150,' + (0.20 + 0.06 * Math.sin(a.t * 2)).toFixed(3) + ')');
        g.addColorStop(1, 'rgba(255,190,120,0)');
        ctx.fillStyle = g;
        ctx.beginPath(); ctx.arc(px(.53), py(.52), 170, 0, 6.283); ctx.fill();
      }
      if (a.i === 2) {
        for (let k = 0; k < 3; k++) {
          const x = px(.80 + k * .035), y = py(.53 + (k % 2) * .02);
          const r = 26 + Math.sin(a.t * 2 + k) * 3;
          const g = ctx.createRadialGradient(x, y, 0, x, y, r);
          g.addColorStop(0, 'rgba(255,206,140,.42)');
          g.addColorStop(1, 'rgba(255,180,100,0)');
          ctx.fillStyle = g;
          ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); ctx.fill();
        }
      }
    }

    /* 主角：画师（站姿，走动时轻微起伏、朝向随行进方向） */
    if (heroImg.complete && heroImg.naturalWidth) {
      const moving2 = Math.abs(WK.target - WK.u) > .0006;
      const dir2 = WK.target > WK.u ? 1 : -1;
      WK.face += ((WK.act ? (WK.spots[WK.act.i].u > WK.u ? 1 : -1) : (moving2 ? dir2 : WK.face)) - WK.face) * Math.min(1, dt * 6);
      const heroH = Math.min(wH * .56, 640);
      const heroW = heroH * (1024 / 1536);
      const bob = Math.sin(WK.t * (moving2 ? 9 : 2.2)) * (moving2 ? 5 : 1.6);
      const hx = wW * .5 + Math.sin(WK.t * (moving2 ? 4.5 : 1.1)) * (moving2 ? 3 : 1);
      ctx.save();
      ctx.fillStyle = 'rgba(40,30,18,.18)';
      ctx.beginPath();
      ctx.ellipse(hx, wH - wH * .055, heroW * .26, heroH * .022, 0, 0, 6.283);
      ctx.fill();
      ctx.translate(hx, wH - wH * .05 + bob);
      ctx.scale(WK.face >= 0 ? 1 : -1, 1);
      ctx.globalAlpha = .97;
      ctx.drawImage(heroImg, -heroW / 2, -heroH, heroW, heroH);
      ctx.restore();
    }

    /* 互动提示 */
    const centerFrac = (camX + wW / 2) / drawW;
    const near = WK.act ? -1 : nearestSpot(centerFrac);
    if (near !== WK.spot) {
      WK.spot = near;
      if (near >= 0) {
        el.walkPromptText.textContent = WK.spots[near].label;
        el.walkPrompt.classList.add('on');
      } else {
        el.walkPrompt.classList.remove('on');
      }
    }

    const place = centerFrac > .68 ? '街东 · 铺面' : centerFrac > .4 ? '门楼前' : '街西 · 茶棚';
    if (el.walkWhere.textContent !== place) el.walkWhere.textContent = place;
  }

  function walkBg() {
    if (!WK.bg) {
      WK.bg = new Image();
      WK.bg.src = 'assets/walk/courtyard.webp';
    }
    return WK.bg;
  }

  function walkLoop(ts) {
    if (!WK.on) return;
    const dt = WK.last ? Math.min(64, ts - WK.last) / 1000 : .016;
    WK.last = ts;
    drawWalk(dt);
    WK.raf = requestAnimationFrame(walkLoop);
  }

  function enterWalk() {
    if (WK.on) return;
    if (document.body.classList.contains('story-on')) endStory();
    closePanel();
    el.walk.hidden = false;
    requestAnimationFrame(() => {
      el.walk.classList.add('on');
      sizeWalk();
      if (!WK.walkers.length) seedWalkers();
      WK.u = WK.target = .12;
      WK.on = true; WK.last = 0; WK.spot = -1;
      stopLife();
      cancelAnimationFrame(WK.raf);
      WK.raf = requestAnimationFrame(walkLoop);
    });
  }

  function exitWalk() {
    if (!WK.on) return;
    WK.on = false;
    closeAct();
    cancelAnimationFrame(WK.raf);
    el.walk.classList.remove('on');
    el.walkPrompt.classList.remove('on');
    setTimeout(() => { el.walk.hidden = true; }, 520);
    if (!el.viewer.hidden) startLife();
  }

  el.walkBtn.addEventListener('click', enterWalk);
  el.walkIntro.addEventListener('click', enterWalk);
  el.walkBack.addEventListener('click', exitWalk);
  el.walkPrompt.addEventListener('click', () => openAct(WK.spot));
  el.walkCapClose.addEventListener('click', closeAct);

  const holdMove = (btn, prop) => {
    const on = e => { e.preventDefault(); WK[prop] = true; };
    const off = () => { WK[prop] = false; };
    btn.addEventListener('pointerdown', on);
    btn.addEventListener('pointerup', off);
    btn.addEventListener('pointerleave', off);
    btn.addEventListener('pointercancel', off);
  };
  holdMove(el.walkLeft, 'kl');
  holdMove(el.walkRight, 'kr');
  el.walkInteract.addEventListener('click', () => {
    if (WK.act) closeAct(); else openAct(WK.spot);
  });

  el.walkCanvas.addEventListener('pointerdown', e => {
    WK.drag = { x: e.clientX, u: WK.target };
    try { el.walkCanvas.setPointerCapture(e.pointerId); } catch { /* ignore */ }
  });
  el.walkCanvas.addEventListener('pointermove', e => {
    if (!WK.drag) return;
    WK.target = clamp(WK.drag.u - (e.clientX - WK.drag.x) / (wW * .9), 0, 1);
  });
  el.walkCanvas.addEventListener('pointerup', () => { WK.drag = null; });
  el.walkCanvas.addEventListener('pointercancel', () => { WK.drag = null; });
  el.walkCanvas.addEventListener('wheel', e => {
    e.preventDefault();
    WK.target = clamp(WK.target + e.deltaY * .0006, 0, 1);
  }, { passive: false });

  addEventListener('keydown', e => {
    if (!WK.on) return;
    if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') { WK.kl = true; e.preventDefault(); }
    if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') { WK.kr = true; e.preventDefault(); }
    if (e.key === 'e' || e.key === 'E' || e.key === 'Enter') {
      if (WK.act) closeAct(); else openAct(nearestSpot(WK.u));
      e.preventDefault();
    }
    if (e.key === 'Escape') { exitWalk(); e.preventDefault(); }
  });
  addEventListener('keyup', e => {
    if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') WK.kl = false;
    if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') WK.kr = false;
  });
  addEventListener('resize', () => { if (WK.on) sizeWalk(); });

  /* ---------- 影像 · 七段 ---------- */
  const FILMS = [
    { f: 'film1', t: '汴河舟楫', sub: '鸟瞰虹桥 · 粮船入京', d: '0:02' },
    { f: 'film2', t: '河湾泊舟', sub: '柳岸 · 漕运', d: '0:12' },
    { f: 'film3', t: '村市车马', sub: '郊野 · 牛车', d: '0:13' },
    { f: 'film4', t: '东角子门', sub: '城门 · 驼队', d: '0:12' },
    { f: 'film5', t: '彩楼欢宴', sub: '正店 · 街市', d: '0:12' },
    { f: 'film6', t: '墨卷初开', sub: '水墨 · 虹桥', d: '0:08' },
    { f: 'film7', t: '桥上市声', sub: '虹桥 · 人流', d: '0:08' }
  ];

  function buildFilms() {
    if (el.filmGrid.children.length) return;
    el.filmGrid.innerHTML = FILMS.map((f, i) => `
      <button class="film-card" data-i="${i}" aria-label="播放 ${f.t}">
        <img src="assets/film/${f.f}.jpg" alt="${f.t} · ${f.sub}" loading="lazy">
        <span class="film-play"><i></i></span>
        <span class="film-meta"><b>${f.t}</b><span>${f.d}</span></span>
      </button>`).join('');
  }

  function openFilmGallery() {
    buildFilms();
    el.film.hidden = false;
    requestAnimationFrame(() => el.film.classList.add('on'));
    document.body.classList.add('film-on');
  }

  function closeFilmGallery() {
    closeFilmPlayer();
    el.film.classList.remove('on');
    document.body.classList.remove('film-on');
    setTimeout(() => { el.film.hidden = true; }, 450);
  }

  function playFilm(i) {
    const f = FILMS[i];
    if (!f) return;
    el.filmVideo.src = 'assets/film/' + f.f + '.mp4';
    el.filmCap.textContent = f.t + ' · ' + f.sub;
    el.filmStage.hidden = false;
    el.filmVideo.currentTime = 0;
    el.filmVideo.play().catch(() => { /* 用户再点一次即可 */ });
  }

  function closeFilmPlayer() {
    if (el.filmStage.hidden) return;
    el.filmVideo.pause();
    el.filmVideo.removeAttribute('src');
    el.filmVideo.load();
    el.filmStage.hidden = true;
  }

  el.filmGrid.addEventListener('click', e => {
    const card = e.target.closest('.film-card');
    if (card) playFilm(+card.dataset.i);
  });
  el.filmClose.addEventListener('click', closeFilmPlayer);
  el.filmStage.addEventListener('click', e => { if (e.target === el.filmStage) closeFilmPlayer(); });
  el.filmBack.addEventListener('click', closeFilmGallery);
  el.filmBtn.addEventListener('click', openFilmGallery);
  el.filmIntro.addEventListener('click', openFilmGallery);
  addEventListener('keydown', e => {
    if (el.film.hidden) return;
    if (e.key === 'Escape') {
      if (!el.filmStage.hidden) closeFilmPlayer();
      else closeFilmGallery();
      e.preventDefault();
    }
  });

  /* ---------- 场景切换 ---------- */
  function enterViewer() {
    if (!el.viewer.hidden) return;
    el.intro.classList.add('leaving');
    el.viewer.hidden = false;
    document.body.classList.remove('is-intro');
    document.body.classList.add('in-scroll');

    build();
    requestAnimationFrame(() => {
      layout();
      const start = target(0.509, 0.42, SNAP ? 1 : 1.1);
      cam.x = start.x; cam.y = start.y; cam.s = start.s;
      render();
      el.viewer.classList.add('ready');
      flyTo(target(0.509, 0.36, 1), 1500);
      startLife();
      el.stage.focus({ preventScroll: true });
      setTimeout(() => {
        el.intro.hidden = true;
        /* 兜底：过渡若被浏览器挂起，强制收束到不透明 */
        el.viewer.classList.add('settled');
      }, 900);
    });
  }

  function exitViewer() {
    if (el.viewer.hidden) return;
    closePanel();
    stopLife();
    if (el.story.classList.contains('on')) endStory();
    el.viewer.classList.remove('ready');
    el.viewer.classList.remove('settled');
    el.intro.hidden = false;
    el.intro.classList.remove('leaving');
    document.body.classList.add('is-intro');
    document.body.classList.remove('in-scroll');
    setTimeout(() => {
      if (!document.body.classList.contains('is-intro')) return;
      el.viewer.hidden = true;
    }, 700);
  }

  el.enter.addEventListener('click', enterViewer);
  el.back.addEventListener('click', exitViewer);

  /* ---------- 尺寸 ---------- */
  let rz;
  addEventListener('resize', () => {
    clearTimeout(rz);
    rz = setTimeout(() => {
      if (el.viewer.hidden) return;
      const u = centerU() || 0.509;
      layout();
      cam.x = clamp(trackW * u * cam.s - stageW / 2, 0, maxX());
      cam.y = clamp(cam.y, 0, maxY());
      render();
      if (lifeOn) { stopLife(); startLife(); }
    }, 160);
  });

  /* ---------- 首次提示自动淡出 ---------- */
  setTimeout(() => hideHint(), 9000);

  /* 入场动画兜底：动画若未执行，强制收束到最终状态 */
  setTimeout(() => document.documentElement.classList.add('played'), 2800);

  /* ---------- 深链：#view / #story / #s=3 ---------- */
  function bootFromHash() {
    const h = decodeURIComponent(location.hash.replace(/^#/, ''));
    if (!h) return;
    enterViewer();
    setTimeout(() => {
      if (h === 'story') startStory(0);
      else if (h === 'night') setLight('night');
      else if (h === 'dusk') setLight('dusk');
      else if (h === 'rain') { setLight('night'); el.rainBtn.click(); }
      else if (h === 'loupe') { setLoupe(true); paintLoupe(stageW * .58, stageH * .46); }
      else if (h === 'life' || /^life@[\d.]+$/.test(h)) {
        lifeOn = true;
        document.body.dataset.life = '1';
        el.lifeBtn.setAttribute('aria-pressed', 'true');
        if (!lifeReady) buildLife();
        const lm = h.match(/^life@([\d.]+)$/);
        if (lm) {
          const t = target(parseFloat(lm[1]), .55, 1);
          cam.x = t.x; cam.y = t.y; cam.s = t.s;
          render();
        }
        drawLifeFrame(.35);
      }
      else if (h === 'tour') startTour();
      else if (h === 'film') openFilmGallery();
      else if (/^film=\d$/.test(h)) { openFilmGallery(); playFilm(+h.slice(5)); }
      else if (h === 'walk') {
        enterWalk();
        setTimeout(() => { sizeWalk(); drawWalk(.8); }, 420);
      }
      else {
        const st = h.match(/^story=(\d)$/);
        if (st && STORY[+st[1]]) startStory(+st[1]);
        else {
          const m = h.match(/^s=(\d)$/);
          if (m && SCENES[+m[1]]) openScene(+m[1]);
        }
      }
    }, 1250);
  }

  /* 初始化：面板隐藏态准备 */
  el.panel.hidden = false;
  el.panel.setAttribute('aria-hidden', 'true');
  el.story.hidden = true;
  el.done.hidden = true;
  setLight('day');
  document.body.dataset.rain = '0';
  document.body.dataset.life = lifeOn ? '1' : '0';
  el.lifeBtn.setAttribute('aria-pressed', String(lifeOn));
  bootFromHash();
})();
