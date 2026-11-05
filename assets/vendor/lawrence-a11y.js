/*!
 * Lawrence Boutique Events — Interactive Draggable Accessibility Widget
 * Supports Israeli Standard 5568 / WCAG 2.1 AA + Full Mouse & Touch Dragging
 */
(function () {
  'use strict';

  var STORAGE_STATE_KEY = 'lawrence_a11y_state_v1';
  var STORAGE_POS_KEY = 'lawrence_a11y_pos_v1';

  var defaultState = {
    fontLevel: 0, // -1, 0, 1, 2, 3
    grayscale: false,
    contrastDark: false,
    contrastLight: false,
    highlightLinks: false,
    highlightHeadings: false,
    readableFont: false,
    stopAnimations: false,
    bigCursor: false
  };

  function loadState() {
    try {
      var raw = localStorage.getItem(STORAGE_STATE_KEY);
      if (!raw) return Object.assign({}, defaultState);
      return Object.assign({}, defaultState, JSON.parse(raw));
    } catch (e) {
      return Object.assign({}, defaultState);
    }
  }

  function saveState(st) {
    try {
      localStorage.setItem(STORAGE_STATE_KEY, JSON.stringify(st));
    } catch (e) {}
  }

  function loadPos() {
    try {
      var raw = localStorage.getItem(STORAGE_POS_KEY);
      if (!raw) return null;
      return JSON.parse(raw);
    } catch (e) {
      return null;
    }
  }

  function savePos(pos) {
    try {
      if (!pos) {
        localStorage.removeItem(STORAGE_POS_KEY);
      } else {
        localStorage.setItem(STORAGE_POS_KEY, JSON.stringify(pos));
      }
    } catch (e) {}
  }

  function injectStyles() {
    if (document.getElementById('lawrence-a11y-styles')) return;
    var style = document.createElement('style');
    style.id = 'lawrence-a11y-styles';
    style.textContent = [
      '/* Lawrence Draggable Accessibility Widget */',
      '#lawrence-a11y-btn {',
      '  position: fixed;',
      '  left: 22px;',
      '  bottom: 22px;',
      '  width: 56px;',
      '  height: 56px;',
      '  border-radius: 50%;',
      '  padding: 0;',
      '  margin: 0;',
      '  border: none;',
      '  background: transparent;',
      '  cursor: grab;',
      '  z-index: 100000;',
      '  box-shadow: 0 8px 24px rgba(90, 29, 43, 0.32);',
      '  transition: transform 0.2s ease, box-shadow 0.2s ease;',
      '  user-select: none;',
      '  -webkit-user-select: none;',
      '  touch-action: none;',
      '  display: flex;',
      '  align-items: center;',
      '  justify-content: center;',
      '}',
      '#lawrence-a11y-btn:hover {',
      '  transform: scale(1.06);',
      '  box-shadow: 0 12px 28px rgba(90, 29, 43, 0.42);',
      '}',
      '#lawrence-a11y-btn.is-dragging {',
      '  cursor: grabbing !important;',
      '  transform: scale(1.08);',
      '  transition: none !important;',
      '}',
      '#lawrence-a11y-btn img {',
      '  width: 100%;',
      '  height: 100%;',
      '  object-fit: contain;',
      '  border-radius: 50%;',
      '  pointer-events: none;',
      '  display: block;',
      '}',
      '#lawrence-a11y-btn .a11y-active-dot {',
      '  position: absolute;',
      '  top: 2px;',
      '  right: 2px;',
      '  width: 13px;',
      '  height: 13px;',
      '  border-radius: 50%;',
      '  background: #2ecc71;',
      '  border: 2px solid #ffffff;',
      '  display: none;',
      '  pointer-events: none;',
      '}',
      '#lawrence-a11y-btn.has-active-a11y .a11y-active-dot {',
      '  display: block;',
      '}',
      '#lawrence-a11y-panel {',
      '  position: fixed;',
      '  z-index: 100001;',
      '  width: 340px;',
      '  max-width: calc(100vw - 24px);',
      '  max-height: calc(100vh - 100px);',
      '  background: #F8F4EE;',
      '  border: 1.5px solid rgba(90, 29, 43, 0.28);',
      '  border-radius: 22px;',
      '  box-shadow: 0 18px 48px rgba(31, 23, 24, 0.26);',
      '  direction: rtl;',
      '  text-align: right;',
      '  font-family: "talent", "Heebo", sans-serif !important;',
      '  color: #1F1718;',
      '  display: none;',
      '  flex-direction: column;',
      '  overflow: hidden;',
      '}',
      '#lawrence-a11y-panel.is-open {',
      '  display: flex;',
      '}',
      '.lawrence-a11y-header {',
      '  background: #5A1D2B;',
      '  color: #ffffff;',
      '  padding: 14px 18px;',
      '  display: flex;',
      '  align-items: center;',
      '  justify-content: space-between;',
      '  cursor: move;',
      '  user-select: none;',
      '}',
      '.lawrence-a11y-header-title {',
      '  display: flex;',
      '  align-items: center;',
      '  gap: 10px;',
      '  font-size: 18px;',
      '  font-weight: 700;',
      '  color: #ffffff;',
      '  margin: 0;',
      '}',
      '.lawrence-a11y-header-title img {',
      '  width: 28px;',
      '  height: 28px;',
      '  border-radius: 50%;',
      '}',
      '.lawrence-a11y-drag-hint {',
      '  font-size: 11.5px;',
      '  color: #EFE5DC;',
      '  font-weight: 400;',
      '  display: block;',
      '  margin-top: 1px;',
      '}',
      '.lawrence-a11y-close {',
      '  background: rgba(255,255,255,0.16);',
      '  border: none;',
      '  color: #ffffff;',
      '  width: 32px;',
      '  height: 32px;',
      '  border-radius: 50%;',
      '  font-size: 20px;',
      '  line-height: 1;',
      '  cursor: pointer;',
      '  display: inline-flex;',
      '  align-items: center;',
      '  justify-content: center;',
      '  transition: background 0.2s ease;',
      '}',
      '.lawrence-a11y-close:hover {',
      '  background: rgba(255,255,255,0.3);',
      '}',
      '.lawrence-a11y-body {',
      '  padding: 14px;',
      '  overflow-y: auto;',
      '  display: grid;',
      '  grid-template-columns: repeat(2, 1fr);',
      '  gap: 9px;',
      '}',
      '.lawrence-a11y-option {',
      '  background: #ffffff;',
      '  border: 1.5px solid rgba(181, 124, 126, 0.35);',
      '  border-radius: 14px;',
      '  padding: 10px 10px;',
      '  font-size: 14px;',
      '  font-weight: 600;',
      '  color: #1F1718;',
      '  cursor: pointer;',
      '  display: flex;',
      '  flex-direction: column;',
      '  align-items: center;',
      '  justify-content: center;',
      '  gap: 5px;',
      '  text-align: center;',
      '  transition: all 0.2s ease;',
      '  min-height: 64px;',
      '}',
      '.lawrence-a11y-option:hover {',
      '  border-color: #5A1D2B;',
      '  background: #EFE5DC;',
      '}',
      '.lawrence-a11y-option.is-active {',
      '  background: #5A1D2B !important;',
      '  color: #ffffff !important;',
      '  border-color: #5A1D2B !important;',
      '}',
      '.lawrence-a11y-option .a11y-opt-icon {',
      '  font-size: 18px;',
      '  font-weight: 700;',
      '  line-height: 1;',
      '}',
      '.lawrence-a11y-footer {',
      '  padding: 10px 14px 14px;',
      '  border-top: 1px solid rgba(181, 124, 126, 0.28);',
      '  display: flex;',
      '  flex-direction: column;',
      '  gap: 8px;',
      '  background: #EFE5DC;',
      '}',
      '.lawrence-a11y-footer-row {',
      '  display: flex;',
      '  gap: 8px;',
      '}',
      '.lawrence-a11y-reset-btn, .lawrence-a11y-pos-btn {',
      '  flex: 1;',
      '  background: #ffffff;',
      '  color: #5A1D2B;',
      '  border: 1px solid #5A1D2B;',
      '  border-radius: 50px;',
      '  padding: 7px 10px;',
      '  font-size: 13px;',
      '  font-weight: 700;',
      '  cursor: pointer;',
      '  transition: all 0.2s ease;',
      '}',
      '.lawrence-a11y-reset-btn:hover, .lawrence-a11y-pos-btn:hover {',
      '  background: #5A1D2B;',
      '  color: #ffffff;',
      '}',
      '.lawrence-a11y-decl-link {',
      '  text-align: center;',
      '  font-size: 13px;',
      '  color: #5A1D2B !important;',
      '  text-decoration: underline !important;',
      '  font-weight: 600;',
      '}',
      '@media (max-width: 767px) {',
      '  #lawrence-a11y-btn {',
      '    width: 50px;',
      '    height: 50px;',
      '    left: 16px;',
      '    bottom: 16px;',
      '  }',
      '  #lawrence-a11y-panel {',
      '    width: 310px;',
      '  }',
      '}',
      '/* Accessibility Mode Overrides */',
      'html.a11y-grayscale #SiteContainer {',
      '  filter: grayscale(100%) !important;',
      '}',
      'html.a11y-contrast-dark body,',
      'html.a11y-contrast-dark #SiteContainer,',
      'html.a11y-contrast-dark .sections,',
      'html.a11y-contrast-dark .section,',
      'html.a11y-contrast-dark .grid-row,',
      'html.a11y-contrast-dark .grid-row-cell-text,',
      'html.a11y-contrast-dark .filledSec,',
      'html.a11y-contrast-dark header #header,',
      'html.a11y-contrast-dark footer #SiteFooter {',
      '  background: #0d0d0d !important;',
      '  background-color: #0d0d0d !important;',
      '  color: #ffffff !important;',
      '}',
      'html.a11y-contrast-dark h1, html.a11y-contrast-dark h2, html.a11y-contrast-dark h3, html.a11y-contrast-dark h4,',
      'html.a11y-contrast-dark p, html.a11y-contrast-dark span, html.a11y-contrast-dark li {',
      '  color: #ffffff !important;',
      '}',
      'html.a11y-contrast-dark a {',
      '  color: #ffd700 !important;',
      '}',
      'html.a11y-contrast-light body,',
      'html.a11y-contrast-light #SiteContainer,',
      'html.a11y-contrast-light .sections,',
      'html.a11y-contrast-light .section,',
      'html.a11y-contrast-light .grid-row,',
      'html.a11y-contrast-light .grid-row-cell-text,',
      'html.a11y-contrast-light .filledSec,',
      'html.a11y-contrast-light header #header,',
      'html.a11y-contrast-light footer #SiteFooter {',
      '  background: #ffffff !important;',
      '  background-color: #ffffff !important;',
      '  color: #000000 !important;',
      '}',
      'html.a11y-contrast-light h1, html.a11y-contrast-light h2, html.a11y-contrast-light h3, html.a11y-contrast-light h4,',
      'html.a11y-contrast-light p, html.a11y-contrast-light span, html.a11y-contrast-light li, html.a11y-contrast-light a {',
      '  color: #000000 !important;',
      '}',
      'html.a11y-highlight-links #SiteContainer a {',
      '  text-decoration: underline !important;',
      '  text-decoration-thickness: 2px !important;',
      '  outline: 2px solid #5A1D2B !important;',
      '  outline-offset: 2px !important;',
      '}',
      'html.a11y-highlight-headings #SiteContainer h1,',
      'html.a11y-highlight-headings #SiteContainer h2,',
      'html.a11y-highlight-headings #SiteContainer h3,',
      'html.a11y-highlight-headings #SiteContainer h4 {',
      '  background: rgba(90, 29, 43, 0.14) !important;',
      '  border-right: 5px solid #5A1D2B !important;',
      '  padding-right: 10px !important;',
      '  border-radius: 6px !important;',
      '}',
      'html.a11y-readable-font #SiteContainer * {',
      '  font-family: Arial, "Heebo", sans-serif !important;',
      '  letter-spacing: 0.3px !important;',
      '}',
      'html.a11y-stop-animations .section-animation-item { opacity: 1 !important; margin-top: 0 !important; }',
      'html.a11y-stop-animations *, html.a11y-stop-animations *::before, html.a11y-stop-animations *::after {',
      '  animation: none !important;',
      '  transition: none !important;',
      '}',
      'html.a11y-big-cursor, html.a11y-big-cursor * {',
      '  cursor: url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'44\' height=\'44\' viewBox=\'0 0 44 44\'><path d=\'M8 4 L8 36 L17 27 L24 40 L29 37 L22 24 L34 24 Z\' fill=\'%235A1D2B\' stroke=\'%23ffffff\' stroke-width=\'2.5\'/></svg>") 8 4, auto !important;',
      '}',
      'html.a11y-font-1 #SiteContainer p, html.a11y-font-1 #SiteContainer li, html.a11y-font-1 #SiteContainer a { font-size: 112% !important; }',
      'html.a11y-font-2 #SiteContainer p, html.a11y-font-2 #SiteContainer li, html.a11y-font-2 #SiteContainer a { font-size: 124% !important; }',
      'html.a11y-font-3 #SiteContainer p, html.a11y-font-3 #SiteContainer li, html.a11y-font-3 #SiteContainer a { font-size: 136% !important; }',
      'html.a11y-font--1 #SiteContainer p, html.a11y-font--1 #SiteContainer li, html.a11y-font--1 #SiteContainer a { font-size: 92% !important; }'
    ].join('\n');
    document.head.appendChild(style);
  }

  function applyState(state, btn, panel) {
    var root = document.documentElement;
    root.classList.remove(
      'a11y-grayscale',
      'a11y-contrast-dark',
      'a11y-contrast-light',
      'a11y-highlight-links',
      'a11y-highlight-headings',
      'a11y-readable-font',
      'a11y-stop-animations',
      'a11y-big-cursor',
      'a11y-font--1',
      'a11y-font-1',
      'a11y-font-2',
      'a11y-font-3'
    );

    if (state.fontLevel !== 0) {
      root.classList.add('a11y-font-' + state.fontLevel);
    }
    if (state.grayscale) root.classList.add('a11y-grayscale');
    if (state.contrastDark) root.classList.add('a11y-contrast-dark');
    if (state.contrastLight) root.classList.add('a11y-contrast-light');
    if (state.highlightLinks) root.classList.add('a11y-highlight-links');
    if (state.highlightHeadings) root.classList.add('a11y-highlight-headings');
    if (state.readableFont) root.classList.add('a11y-readable-font');
    if (state.stopAnimations) root.classList.add('a11y-stop-animations');
    if (state.bigCursor) root.classList.add('a11y-big-cursor');

    var videos = document.querySelectorAll('video');
    for (var i = 0; i < videos.length; i++) {
      try {
        if (state.stopAnimations) {
          videos[i].pause();
        } else if (videos[i].hasAttribute('autoplay')) {
          videos[i].muted = true;
          var p = videos[i].play();
          if (p && typeof p.catch === 'function') p.catch(function () {});
        }
      } catch (e) {}
    }

    var anyActive =
      state.fontLevel !== 0 ||
      state.grayscale ||
      state.contrastDark ||
      state.contrastLight ||
      state.highlightLinks ||
      state.highlightHeadings ||
      state.readableFont ||
      state.stopAnimations ||
      state.bigCursor;

    if (btn) {
      btn.classList.toggle('has-active-a11y', anyActive);
    }

    if (panel) {
      var opts = panel.querySelectorAll('[data-a11y-action]');
      for (var j = 0; j < opts.length; j++) {
        var act = opts[j].getAttribute('data-a11y-action');
        var active = false;
        if (act === 'fontInc') active = state.fontLevel > 0;
        else if (act === 'fontDec') active = state.fontLevel < 0;
        else active = !!state[act];
        opts[j].classList.toggle('is-active', active);
        opts[j].setAttribute('aria-pressed', active ? 'true' : 'false');
      }
    }
  }

  function clampCoords(left, top, width, height) {
    var maxL = Math.max(8, window.innerWidth - width - 8);
    var maxT = Math.max(8, window.innerHeight - height - 8);
    return {
      left: Math.min(Math.max(8, left), maxL),
      top: Math.min(Math.max(8, top), maxT)
    };
  }

  function positionPanelNearButton(btn, panel) {
    if (!panel.classList.contains('is-open')) return;
    var rect = btn.getBoundingClientRect();
    var pWidth = panel.offsetWidth || 340;
    var pHeight = panel.offsetHeight || 440;

    var left = rect.left;
    if (left + pWidth > window.innerWidth - 12) {
      left = window.innerWidth - pWidth - 12;
    }
    if (left < 12) left = 12;

    var top = rect.top - pHeight - 12;
    if (top < 12) {
      top = Math.min(window.innerHeight - pHeight - 12, rect.bottom + 12);
    }
    if (top < 12) top = 12;

    panel.style.left = left + 'px';
    panel.style.top = top + 'px';
  }

  function initWidget() {
    if (document.getElementById('lawrence-a11y-btn')) return;
    injectStyles();

    var state = loadState();

    var btn = document.createElement('button');
    btn.id = 'lawrence-a11y-btn';
    btn.type = 'button';
    btn.setAttribute('aria-label', 'תפריט נגישות (ניתן לגרירה)');
    btn.setAttribute('title', 'תפריט נגישות — לחץ לפתיחה או גרור להזזה');
    btn.innerHTML =
      '<img src="Accessibility%20icon.png" alt="נגישות" draggable="false" />' +
      '<span class="a11y-active-dot" aria-hidden="true"></span>';

    var panel = document.createElement('div');
    panel.id = 'lawrence-a11y-panel';
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-label', 'תפריט התאמות נגישות');
    panel.innerHTML = [
      '<div class="lawrence-a11y-header" id="lawrence-a11y-drag-header">',
      '  <div>',
      '    <h3 class="lawrence-a11y-header-title">',
      '      <img src="Accessibility%20icon.png" alt="" draggable="false" />',
      '      <span>התאמות נגישות</span>',
      '    </h3>',
      '    <span class="lawrence-a11y-drag-hint">ניתן לגרור את כפתור הנגישות לכל מקום במסך</span>',
      '  </div>',
      '  <button type="button" class="lawrence-a11y-close" aria-label="סגור תפריט נגישות">&times;</button>',
      '</div>',
      '<div class="lawrence-a11y-body">',
      '  <button type="button" class="lawrence-a11y-option" data-a11y-action="fontInc">',
      '    <span class="a11y-opt-icon">A+</span>',
      '    <span>הגדלת טקסט</span>',
      '  </button>',
      '  <button type="button" class="lawrence-a11y-option" data-a11y-action="fontDec">',
      '    <span class="a11y-opt-icon">A-</span>',
      '    <span>הקטנת טקסט</span>',
      '  </button>',
      '  <button type="button" class="lawrence-a11y-option" data-a11y-action="contrastDark">',
      '    <span class="a11y-opt-icon">&#9680;</span>',
      '    <span>ניגודיות כהה</span>',
      '  </button>',
      '  <button type="button" class="lawrence-a11y-option" data-a11y-action="contrastLight">',
      '    <span class="a11y-opt-icon">&#9728;</span>',
      '    <span>ניגודיות בהירה</span>',
      '  </button>',
      '  <button type="button" class="lawrence-a11y-option" data-a11y-action="grayscale">',
      '    <span class="a11y-opt-icon">&#9681;</span>',
      '    <span>גווני אפור</span>',
      '  </button>',
      '  <button type="button" class="lawrence-a11y-option" data-a11y-action="highlightLinks">',
      '    <span class="a11y-opt-icon">&#128279;</span>',
      '    <span>הדגשת קישורים</span>',
      '  </button>',
      '  <button type="button" class="lawrence-a11y-option" data-a11y-action="highlightHeadings">',
      '    <span class="a11y-opt-icon">H</span>',
      '    <span>הדגשת כותרות</span>',
      '  </button>',
      '  <button type="button" class="lawrence-a11y-option" data-a11y-action="readableFont">',
      '    <span class="a11y-opt-icon">Aa</span>',
      '    <span>פונט קריא</span>',
      '  </button>',
      '  <button type="button" class="lawrence-a11y-option" data-a11y-action="stopAnimations">',
      '    <span class="a11y-opt-icon">&#9208;</span>',
      '    <span>עצירת אנימציות</span>',
      '  </button>',
      '  <button type="button" class="lawrence-a11y-option" data-a11y-action="bigCursor">',
      '    <span class="a11y-opt-icon">&#10148;</span>',
      '    <span>סמן גדול</span>',
      '  </button>',
      '</div>',
      '<div class="lawrence-a11y-footer">',
      '  <div class="lawrence-a11y-footer-row">',
      '    <button type="button" class="lawrence-a11y-reset-btn" id="lawrence-a11y-reset">איפוס נגישות</button>',
      '    <button type="button" class="lawrence-a11y-pos-btn" id="lawrence-a11y-reset-pos">איפוס מיקום</button>',
      '  </div>',
      '  <a href="AccessabilityDeclaration.html" class="lawrence-a11y-decl-link">הצהרת נגישות</a>',
      '</div>'
    ].join('\n');

    document.body.appendChild(btn);
    document.body.appendChild(panel);

    // Restore saved button position if dragged previously
    var savedPos = loadPos();
    if (savedPos && typeof savedPos.left === 'number' && typeof savedPos.top === 'number') {
      var c = clampCoords(savedPos.left, savedPos.top, btn.offsetWidth || 56, btn.offsetHeight || 56);
      btn.style.left = c.left + 'px';
      btn.style.top = c.top + 'px';
      btn.style.bottom = 'auto';
      btn.style.right = 'auto';
    }

    applyState(state, btn, panel);

    // Drag & Click Logic for Button
    var isDragging = false;
    var hasMoved = false;
    var startX = 0;
    var startY = 0;
    var origLeft = 0;
    var origTop = 0;

    function onDragStart(clientX, clientY) {
      var rect = btn.getBoundingClientRect();
      isDragging = true;
      hasMoved = false;
      startX = clientX;
      startY = clientY;
      origLeft = rect.left;
      origTop = rect.top;
    }

    function onDragMove(clientX, clientY, ev) {
      if (!isDragging) return;
      var dx = clientX - startX;
      var dy = clientY - startY;
      if (!hasMoved && Math.hypot(dx, dy) < 6) {
        return;
      }
      hasMoved = true;
      btn.classList.add('is-dragging');
      if (ev && ev.cancelable) ev.preventDefault();

      var next = clampCoords(origLeft + dx, origTop + dy, btn.offsetWidth || 56, btn.offsetHeight || 56);
      btn.style.left = next.left + 'px';
      btn.style.top = next.top + 'px';
      btn.style.bottom = 'auto';
      btn.style.right = 'auto';
      positionPanelNearButton(btn, panel);
    }

    function onDragEnd() {
      if (!isDragging) return;
      isDragging = false;
      btn.classList.remove('is-dragging');
      if (hasMoved) {
        var rect = btn.getBoundingClientRect();
        savePos({ left: rect.left, top: rect.top });
      } else {
        togglePanel();
      }
    }

    function togglePanel() {
      var open = panel.classList.toggle('is-open');
      if (open) {
        positionPanelNearButton(btn, panel);
      }
    }

    btn.addEventListener('mousedown', function (e) {
      if (e.button !== 0) return;
      e.preventDefault();
      onDragStart(e.clientX, e.clientY);
    });
    window.addEventListener('mousemove', function (e) {
      onDragMove(e.clientX, e.clientY, e);
    });
    window.addEventListener('mouseup', function () {
      onDragEnd();
    });

    btn.addEventListener(
      'touchstart',
      function (e) {
        if (!e.touches || !e.touches[0]) return;
        onDragStart(e.touches[0].clientX, e.touches[0].clientY);
      },
      { passive: true }
    );
    window.addEventListener(
      'touchmove',
      function (e) {
        if (!isDragging || !e.touches || !e.touches[0]) return;
        onDragMove(e.touches[0].clientX, e.touches[0].clientY, e);
      },
      { passive: false }
    );
    window.addEventListener('touchend', function () {
      onDragEnd();
    });

    // Also allow dragging the open panel directly by its header
    var headerEl = document.getElementById('lawrence-a11y-drag-header');
    var panelDragging = false;
    var pStartX = 0;
    var pStartY = 0;
    var pOrigL = 0;
    var pOrigT = 0;

    function onPanelDragStart(cx, cy, target) {
      if (target && target.closest('.lawrence-a11y-close')) return;
      var pr = panel.getBoundingClientRect();
      panelDragging = true;
      pStartX = cx;
      pStartY = cy;
      pOrigL = pr.left;
      pOrigT = pr.top;
    }
    function onPanelDragMove(cx, cy, ev) {
      if (!panelDragging) return;
      if (ev && ev.cancelable) ev.preventDefault();
      var dx = cx - pStartX;
      var dy = cy - pStartY;
      var next = clampCoords(pOrigL + dx, pOrigT + dy, panel.offsetWidth || 340, panel.offsetHeight || 440);
      panel.style.left = next.left + 'px';
      panel.style.top = next.top + 'px';
    }
    function onPanelDragEnd() {
      panelDragging = false;
    }

    headerEl.addEventListener('mousedown', function (e) {
      if (e.button !== 0) return;
      onPanelDragStart(e.clientX, e.clientY, e.target);
    });
    window.addEventListener('mousemove', function (e) {
      onPanelDragMove(e.clientX, e.clientY, e);
    });
    window.addEventListener('mouseup', onPanelDragEnd);

    headerEl.addEventListener('touchstart', function (e) {
      if (!e.touches || !e.touches[0]) return;
      onPanelDragStart(e.touches[0].clientX, e.touches[0].clientY, e.target);
    }, { passive: true });
    window.addEventListener('touchmove', function (e) {
      if (!panelDragging || !e.touches || !e.touches[0]) return;
      onPanelDragMove(e.touches[0].clientX, e.touches[0].clientY, e);
    }, { passive: false });
    window.addEventListener('touchend', onPanelDragEnd);

    // Keyboard activation on button
    btn.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        togglePanel();
      }
    });

    // Option buttons click handler
    panel.addEventListener('click', function (e) {
      var opt = e.target.closest('[data-a11y-action]');
      if (!opt) return;
      var act = opt.getAttribute('data-a11y-action');
      if (act === 'fontInc') {
        state.fontLevel = Math.min(3, state.fontLevel + 1);
      } else if (act === 'fontDec') {
        state.fontLevel = Math.max(-1, state.fontLevel - 1);
      } else if (act === 'contrastDark') {
        state.contrastDark = !state.contrastDark;
        if (state.contrastDark) state.contrastLight = false;
      } else if (act === 'contrastLight') {
        state.contrastLight = !state.contrastLight;
        if (state.contrastLight) state.contrastDark = false;
      } else if (act in state) {
        state[act] = !state[act];
      }
      saveState(state);
      applyState(state, btn, panel);
    });

    panel.querySelector('.lawrence-a11y-close').addEventListener('click', function () {
      panel.classList.remove('is-open');
    });

    document.getElementById('lawrence-a11y-reset').addEventListener('click', function () {
      state = Object.assign({}, defaultState);
      saveState(state);
      applyState(state, btn, panel);
    });

    document.getElementById('lawrence-a11y-reset-pos').addEventListener('click', function () {
      savePos(null);
      btn.style.top = 'auto';
      btn.style.right = 'auto';
      btn.style.left = window.innerWidth <= 767 ? '16px' : '22px';
      btn.style.bottom = window.innerWidth <= 767 ? '16px' : '22px';
      positionPanelNearButton(btn, panel);
    });

    window.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && panel.classList.contains('is-open')) {
        panel.classList.remove('is-open');
        btn.focus();
      }
    });

    window.addEventListener('resize', function () {
      if (btn.style.top && btn.style.top !== 'auto') {
        var r = btn.getBoundingClientRect();
        var c = clampCoords(r.left, r.top, btn.offsetWidth || 56, btn.offsetHeight || 56);
        btn.style.left = c.left + 'px';
        btn.style.top = c.top + 'px';
      }
      positionPanelNearButton(btn, panel);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initWidget);
  } else {
    initWidget();
  }
})();
