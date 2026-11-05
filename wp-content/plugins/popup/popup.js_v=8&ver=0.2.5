// פעם אחת בתחילת הקוד
(function patchRadioCheckedToFireChange(){
  const desc = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'checked');
  if (!desc || HTMLInputElement.prototype.__qsCheckedPatched) return;

  Object.defineProperty(HTMLInputElement.prototype, '__qsCheckedPatched', { value: true });
  Object.defineProperty(HTMLInputElement.prototype, 'checked', {
    get: desc.get,
    set: function(v){
      const was = desc.get.call(this);
      desc.set.call(this, v);
      // אם זה רדיו והערך אכן השתנה – נפיץ change טבעי, אבל רק בתוך הפופאפ
      if (this.type === 'radio' && v !== was && this.closest('#qs-popup')) {
        this.dispatchEvent(new Event('change', { bubbles: true }));
      }
    }
  });
})();

(function () {
  // פתיחה/סגירה
 /* function closePopup() {
    var ov = document.getElementById('qs-popup');
    if (ov) ov.setAttribute('data-open', '0');
    document.documentElement.classList.remove('qs-noscroll');
  }
  function openPopup() {
    var ov = document.getElementById('qs-popup');
	//  if (ov) wirePager(ov);

    if (ov) ov.setAttribute('data-open', '1');
    document.documentElement.classList.add('qs-noscroll');
  }*/
	function closePopup() {
  var ov = document.getElementById('qs-popup');
  if (ov) {
    ov.setAttribute('data-open', '0');
    ov.setAttribute('aria-hidden', 'true');
    ov.style.display = 'none';
    ov.style.top = '';  // reset inline top (backdrop-filter fix cleanup)
  }
  document.documentElement.classList.remove('qs-noscroll');
}

// Returns true if body has backdrop-filter which breaks position:fixed containing block
function qs_hasBodyBackdropFilter() {
  var s = window.getComputedStyle(document.body);
  var bdf = s.backdropFilter || s.webkitBackdropFilter || 'none';
  return bdf !== 'none';
}

function openPopup() {
  var ov = document.getElementById('qs-popup');
  if (ov) {
    // Fix: when body has backdrop-filter it becomes the containing block for
    // position:fixed elements. Offset by scrollY so the overlay covers the viewport.
    if (qs_hasBodyBackdropFilter()) {
      ov.style.top = window.scrollY + 'px';
    }

    ov.style.display = 'flex';
    ov.setAttribute('data-open', '1');
    ov.setAttribute('aria-hidden', 'false');
   requestAnimationFrame(function(){
      requestAnimationFrame(function(){
        qs_updateScrollIndicator(ov);
		      qs_debugOverflow(ov, 'after openPopup (2 rAF)');

      });
    });
  }
  document.documentElement.classList.add('qs-noscroll');
}

// Fix FAB button position when body has backdrop-filter (position:fixed is body-relative)
function qs_fixFabPosition() {
  var fab = document.getElementById('qs-fab');
  if (!fab || !qs_hasBodyBackdropFilter()) return;
  var h = fab.offsetHeight || 48;
  fab.style.setProperty('bottom', 'auto', 'important');
  fab.style.setProperty('top', (window.innerHeight - 20 - h) + 'px', 'important');
}
window.addEventListener('load', qs_fixFabPosition);
window.addEventListener('resize', qs_fixFabPosition);

window.closePopup = closePopup;
  window.openPopup  = openPopup;
 /* function wirePager(ov) {
    var pages = Array.from(ov.querySelectorAll('.qs-page'));
    if (!pages.length) return;

    var titleEl = ov.querySelector('#qs-title');
    var prevBtn = ov.querySelector('.qs-prev');
    var nextBtn = ov.querySelector('.qs-next');
    var dots    = Array.from(ov.querySelectorAll('.qs-dot'));
    var idx = 0;

    function sync(i) {
      idx = Math.max(0, Math.min(i, pages.length - 1));
      pages.forEach(function (p, k) {
        var active = k === idx;
        p.style.display = active ? '' : 'none';
        p.setAttribute('aria-hidden', active ? 'false' : 'true');
      });

      // עידכון כותרת לפי data-title של העמוד (אם קיים)
      var title = pages[idx].getAttribute('data-title') || '';
      if (titleEl && title) titleEl.textContent = title;

      // נקודות
      dots.forEach(function (d, k) { d.classList.toggle('is-active', k === idx); });

      // חיצים
      if (prevBtn) prevBtn.disabled = (idx === 0);
      if (nextBtn) nextBtn.disabled = (idx === pages.length - 1);
    }

    if (prevBtn) prevBtn.addEventListener('click', function(){ sync(idx - 1); });
    if (nextBtn) nextBtn.addEventListener('click', function(){ sync(idx + 1); });
    dots.forEach(function (d) {
      d.addEventListener('click', function () {
        var i = parseInt(d.getAttribute('data-index'), 10);
        if (!isNaN(i)) sync(i);
      });
    });

    sync(0);
  }*/

 function fixModalStableSize(ov) {
    var modal = ov.querySelector('.qs-modal');
    var pagesWrap = ov.querySelector('.qs-pages');
	 // פעיל רק אם Effect A קיים בדום

    var pages = Array.from(ov.querySelectorAll('.qs-page'));
	 // קשיחה ב-JS כדי שלא יידרס ע"י CSS אחר
if (pagesWrap) {
  pagesWrap.style.position = 'relative';
  pagesWrap.style.overflow = 'hidden';
  pagesWrap.style.height   = '400px';
}
pages.forEach(function(p){
  p.style.position = 'absolute';
  p.style.top = p.style.right = p.style.bottom = p.style.left = '0';
});

    if (!modal || !pages.length) return;

    var titleEl = ov.querySelector('#qs-title');
    var prevIdx = pages.findIndex(p => p.style.display !== 'none');
    if (prevIdx < 0) prevIdx = 0;

    // למנוע הבהוב בזמן המדידה
    var prevVis = modal.style.visibility;
    modal.style.visibility = 'hidden';

    var maxModalH = 0;
    var maxPagesH = 0;

    // נשמור כותרת מקורית
    var origTitle = titleEl ? titleEl.textContent : '';

    pages.forEach(function (p, i) {
      var prevDisplay = p.style.display;
      // מציגים רק את הדף הנוכחי למדידה
      pages.forEach(function(pp){ pp.style.display = 'none'; });
      p.style.display = '';

      // מעדכנים כותרת לדומה לתצוגה אמיתית
      var t = p.getAttribute('data-title') || '';
      if (titleEl && t) titleEl.textContent = t;

      // מודדים
      var modalH = modal.getBoundingClientRect().height;
      var pageH  = p.getBoundingClientRect().height;
      if (modalH > maxModalH) maxModalH = modalH;
      if (pageH  > maxPagesH) maxPagesH  = pageH;

      // משחזרים תצוגה קודמת
      p.style.display = prevDisplay;
    });

    // משחזרים עמוד מוצג וכותרת
    pages.forEach(function(pp, k){ pp.style.display = (k === prevIdx ? '' : 'none'); });
    if (titleEl) titleEl.textContent = origTitle;

    // קיבוע גובה
    modal.style.minHeight = Math.ceil(maxModalH) + 'px';
    if (pagesWrap) pagesWrap.style.minHeight = Math.ceil(maxPagesH) + 'px';

    modal.style.visibility = prevVis || '';
  }

  function wire() {
    var ov = document.getElementById('qs-popup');
    if (!ov) return;

    var modal = ov.querySelector('.qs-modal');
    var btnClose = ov.querySelector('.qs-close');

  //  openPopup();

 //   ov.addEventListener('mousedown', function (e) { if (e.target === ov) closePopup(); });
  //  if (btnClose) btnClose.addEventListener('click', closePopup);
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closePopup(); });
    if (modal) modal.addEventListener('mousedown', function (e) { e.stopPropagation(); });

    wirePager(ov);
//qs_wireAutoAdvance(ov); // ← מוסיף את הדפדוף האוטומטי

    // >>> קיבוע גובה אחרי הדפדוף הראשוני
  //  fixModalStableSize(ov);
    // וגם אחרי שינוי גודל חלון (debounce קטן)
    var t;
    window.addEventListener('resize', function () {
      clearTimeout(t);
   //   t = setTimeout(function () { fixModalStableSize(ov); }, 120);
    });

    var form = ov.querySelector('#qs-popup-form');
    if (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
       // closePopup();
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', wire);
  } else {
    wire();
  }
})();


jQuery(function ($) {
  var $root = $('#qs-popup');
  if (!$root.length) return;

  // לכל קבוצה (fieldset) נטפל בנפרד כדי לא להתנגש בין קבוצות
  $root.find('.qs-radio-switchC').each(function () {
    var $group = $(this);
    var $items = $group.find('.qs-switchC-item');
    var radios = $group.find('input[type="radio"]');

    // אתחול: מסנכרנים aria-checked + מצב ויזואלי לערך שנבחר מראש (אם יש)
    function syncFromChecked() {
      var anyChecked = false;
      radios.each(function (i, el) {
        var $r = $(el);
        var $it = $r.closest('.qs-switchC-item');
        var on = $r.is(':checked');
        $it.attr('aria-checked', on ? 'true' : 'false');
        $it.attr('data-state', on ? 'on' : 'off');
        if (on) {
          anyChecked = true;
          // להציב את הכפתור בקצה ימין (30px) מיידית בלי אנימציה ראשונית
          $it.find('.switchBtn').css('transform', 'translate3d(30px,-50%,0)');
        } else {
          $it.find('.switchBtn').css('transform', 'translate3d(0,-50%,0)');
        }
      });
      // אם אף אחד לא מסומן – נגדיר tabindex לראשון
      $items.attr('tabindex', '-1');
      ($items.filter('[aria-checked="true"]').first()[0] || $items[0])?.setAttribute('tabindex', '0');
    }

   function selectIndex(idx) {
  $items.each(function (i, el) {
    var $it = $(el);
    var r   = $it.find('input[type="radio"]')[0];
    var on  = i === idx;
    if (!r) return;

    var was = !!r.checked;
    r.checked = on; // עדכון הבחירה בפועל

    // אם באמת השתנה – יורים change "native" כדי שהמאזינים ב-addEventListener יעבדו
 /*   if (was !== on) {
      if (typeof r.dispatchEvent === 'function') {
        r.dispatchEvent(new Event('change', { bubbles: true }));
      } else {
        $(r).trigger('change'); // fallback
      }
    }*/

    $it.attr('aria-checked', on ? 'true' : 'false')
       .attr('data-state',   on ? 'on'   : 'off')
       .attr('tabindex',     on ? '0'    : '-1');
  });

  // דחיפה יזומה לאוטו-דפדוף (גם אם change לא נאסף מסיבה כלשהי)
/*  var ov = document.getElementById('qs-popup');
  if (ov && typeof window.qs_maybeAutoAdvance === 'function') {
    window.qs_maybeAutoAdvance(ov);
  }*/
}

    // קליקים על המתג או על התווית – בחירה
    $items.on('click', function (e) {
      var idx = $items.index(this);
      selectIndex(idx);
      this.focus();
      e.preventDefault();
      e.stopPropagation();
    });

    // תמיכה במקלדת: רווח/אנטר לבחירה; חצים לעבור בין האפשרויות
    $items.on('keydown', function (e) {
      var idx = $items.index(this);
      var key = e.key;
      if (key === ' ' || key === 'Enter') {
        e.preventDefault();
        selectIndex(idx);
        return;
      }
      if (key === 'ArrowDown' || key === 'ArrowRight') {
        e.preventDefault();
        var next = (idx + 1) % $items.length;
        selectIndex(next);
        $items.eq(next).focus();
        return;
      }
      if (key === 'ArrowUp' || key === 'ArrowLeft') {
        e.preventDefault();
        var prev = (idx - 1 + $items.length) % $items.length;
        selectIndex(prev);
        $items.eq(prev).focus();
        return;
      }
    });

    // סנכרון ראשוני (כולל במעבר עמודים בפופאפ)
    syncFromChecked();

    // אם יש שינוי חיצוני לרדיו (מבחוץ/ולידציה), נשמור עקביות
radios.on('change', function () {
  syncFromChecked();
/*  var ov = document.getElementById('qs-popup');
  if (ov && typeof window.qs_maybeAutoAdvance === 'function') {
    window.qs_maybeAutoAdvance(ov);
  }*/
});
  });
});



//אפרט מעבר עמוד
function wirePager(ov) {
	var pagesWrap = ov.querySelector('.qs-pages');  // חדש
var isPagerA = !!ov.querySelector('.qs-pager--a');

function syncExternalIndex(i){
    if (!isPagerA) return;
    if (pagesWrap) pagesWrap.setAttribute('data-active', String(i));
    if (window.jQuery) {
      jQuery(document).trigger('qs:setIndex', i);
    } else {
      document.dispatchEvent(new CustomEvent('qs:setIndex', { detail: i }));
    }
  }
  var pages = Array.from(ov.querySelectorAll('.qs-page'));
  if (!pages.length) return;

  var titleEl = ov.querySelector('#qs-title');
  var prevBtn = ov.querySelector('.qs-prev');
  var nextBtn = ov.querySelector('.qs-next');
  var dots    = Array.from(ov.querySelectorAll('.qs-dot'));
var form = ov.querySelector('#qs-popup-form');

  var idx = 0;
  var pageHistory = [];

  // חישוב הנתיב הדינאמי הצפוי לפי בחירות הרדיו הנוכחיות (מעמוד 0 עד הסוף)
  function computePath() {
    var path  = [];
    var seen  = new Set();
    var cur   = 0;
    var limit = pages.length + 5; // הגנה מפני לולאה אינסופית
    while (cur >= 0 && cur < pages.length && limit-- > 0) {
      if (seen.has(cur)) break;
      path.push(cur);
      seen.add(cur);
      var jump = qs_getCustomRadioTarget(pages[cur]);
      cur = (jump !== null && jump >= 0 && jump < pages.length) ? jump : cur + 1;
    }
    return path;
  }

  // מצב התחלתי: כל העמודים מוצגים (נשלטים ע"י transform), בלי display:none
  // העמודים בעבר = 180deg, עכשווי = 0deg, עתיד = -180deg
  function applyTransforms(immediate) {
    pages.forEach(function(p, i){
      p.classList.remove('qs-origin-right','qs-origin-left','qs-active');

      if (i < idx) {
        p.classList.add('qs-origin-right');
        setT(p, 'rotateY(180deg)', immediate);
        p.setAttribute('aria-hidden', 'true');
      } else if (i === idx) {
        setT(p, 'rotateY(0deg)', immediate);
        p.classList.add('qs-active');
        p.setAttribute('aria-hidden', 'false');
      } else {
        p.classList.add('qs-origin-left');
        setT(p, 'rotateY(-180deg)', immediate);
        p.setAttribute('aria-hidden', 'true');
      }
    });
  }
  function setT(el, val, immediate){
    if (immediate) {
      var prev = el.style.transition;
      el.style.transition = 'none';
      el.style.transform  = val;
      void el.offsetHeight; // force reflow
      el.style.transition = prev || '';
    } else {
      el.style.transform = val;
    }
  }

function updateUI(){
  var t = pages[idx].getAttribute('data-title') || '';
  if (titleEl) titleEl.textContent = (t || '');

  // חישוב הנתיב הדינאמי לפי בחירות הגולש
  var path      = computePath();
  var pathSet   = new Set(path);
  var posInPath = path.indexOf(idx); // מיקום נוכחי בנתיב (0-based)
  if (posInPath < 0) posInPath = 0;

  // עדכון נקודות דפדוף — מציגים רק עמודים בנתיב הצפוי
  dots.forEach(function(d) {
    var dotIdx = parseInt(d.getAttribute('data-index'), 10);
    d.style.display = pathSet.has(dotIdx) ? '' : 'none';
    d.classList.toggle('is-active', dotIdx === idx);
  });

  // מעדכן תכונות data לשימוש Effect A
  if (pagesWrap) {
    pagesWrap.setAttribute('data-path-len', String(path.length));
    pagesWrap.setAttribute('data-path-pos', String(posInPath));
  }

  if (prevBtn) prevBtn.disabled = (pageHistory.length === 0);

  var isLast = (posInPath === path.length - 1);
  if (nextBtn) {
    nextBtn.disabled = false;
    if (isLast) {
      nextBtn.textContent = 'שלח';
      nextBtn.setAttribute('aria-label', 'שלח');
      nextBtn.classList.add('qs-submit-mode');
    } else {
      nextBtn.textContent = '❯';
      nextBtn.setAttribute('aria-label', 'הבא');
      nextBtn.classList.remove('qs-submit-mode');
    }
  }

  // אם עדיין קיים עוטף כפתור שלח נפרד — ודא שהוא מוסתר
  var submitWrap = ov.querySelector('#qs-submit-wrap');
  if (submitWrap) submitWrap.style.setProperty('display', 'none', 'important');
}
/*
function goTo(next){
  next = Math.max(0, Math.min(next, pages.length - 1));
  if (next === idx) return;

  var prevIdx = idx;                 // ← שמירת העמוד הקודם
  var dir = (next > idx) ? 'forward' : 'back';
  var cur = pages[idx], tgt = pages[next];

  if (dir === 'forward') {
    cur && cur.classList.add('qs-origin-right');
    tgt && tgt.classList.add('qs-origin-left');
  } else {
    cur && cur.classList.add('qs-origin-left');
    tgt && tgt.classList.add('qs-origin-right');
  }

  idx = next;

  requestAnimationFrame(function(){
    applyTransforms(false);
    updateUI();
	  syncExternalIndex(idx); 
 const curPage = pages[idx];
  if (curPage) qs_listenPageCompletion(curPage);
    // נותן ל-DOM/values להתייצב רגע ואז מדפיס
    setTimeout(function(){
      // עמוד שעוזבים — עם הערכים המעודכנים
      qs_logFieldsInPage(pages[prevIdx], prevIdx, 'prev(leaving)');
      // העמוד שאליו נכנסנו
      qs_logFieldsInPage(pages[idx], idx, 'current');
    }, 0);
  });
}*/
function goTo(next){
  next = Math.max(0, Math.min(next, pages.length - 1));
  if (next === idx) return;

  // ↑↑ חדש: מסמנים “דור ניווט” חדש ומבטלים טיימרים ישנים
  ov.__navToken = (ov.__navToken || 0) + 1;
  clearTimeout(window.__qs_autoTimer); // אם הוגדר קודם

  var prevIdx = idx;
  var dir = (next > idx) ? 'forward' : 'back';
  if (dir === 'forward') {
    pageHistory.push(prevIdx);
  } else if (next === 0) {
    pageHistory = [];
  }
  var cur = pages[idx], tgt = pages[next];

  if (dir === 'forward') {
    cur && cur.classList.add('qs-origin-right');
    tgt && tgt.classList.add('qs-origin-left');
  } else {
    cur && cur.classList.add('qs-origin-left');
    tgt && tgt.classList.add('qs-origin-right');
  }

  idx = next;

  requestAnimationFrame(function(){
    applyTransforms(false);
    updateUI();
    syncExternalIndex(idx);
	    qs_debugOverflow(ov, 'after goTo idx=' + idx);

    const curPage = pages[idx];
    if (curPage) qs_listenPageCompletion(curPage);
  qs_updateScrollIndicator(ov);

    setTimeout(function(){
      qs_logFieldsInPage(pages[prevIdx], prevIdx, 'prev(leaving)');
      qs_logFieldsInPage(pages[idx], idx, 'current');
    }, 0);
  });
}


  // ייזום ראשוני
  // מבטלים כל display:none שהיה בעבר — נשלטים רק ע"י transforms
  pages.forEach(function(p){ p.style.display = ''; });
  applyTransforms(true);
  updateUI();
	syncExternalIndex(idx); 
	if (typeof window.qs_listenPageCompletion === 'function') {
  qs_listenPageCompletion(pages[idx]);      // לחבר מאזינים לעמוד הראשון
  // בדיקה מיידית (למקרה שכבר מלאים בערכי דיפולט)
 /* setTimeout(function () {
    const st = qs_isPageComplete(pages[idx]);
    if (st.complete) qs_clickNextOrSubmitIfPossible(ov);
  }, 0);*/
}

// הדפסת שדות של העמוד הראשון
setTimeout(function(){
  qs_logFieldsInPage(pages[idx], idx, 'current');
}, 0);

  // מאזינים
  if (prevBtn) prevBtn.addEventListener('click', function(){
    if (pageHistory.length > 0) {
      var dest = pageHistory.pop();
      goTo(dest);
    }
  });
if (nextBtn) nextBtn.addEventListener('click', function () {
  // בעמוד האחרון – שליחה במקום מעבר
  if (nextBtn.classList.contains('qs-submit-mode')) {
    var form = ov.querySelector('#qs-popup-form');
    if (form) {
      if (typeof form.requestSubmit === 'function') {
        form.requestSubmit();
      } else {
        form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
      }
    }
  } else {
    // לא בעמוד האחרון – ממשיכים לעמוד הבא
    goTo(idx + 1);
  }
});
  dots.forEach(function (d) {
    d.addEventListener('click', function () {
      var i = parseInt(d.getAttribute('data-index'), 10);
      if (!isNaN(i)) goTo(i);
    });
  });

  // עדכון דפדוף בזמן אמת כשגולש משנה בחירת רדיו (עשוי לשנות נתיב עתידי)
  if (form) {
    form.addEventListener('change', function(e) {
      if (e.target && e.target.type === 'radio') {
        updateUI();
        syncExternalIndex(idx);
      }
    });
  }
}
// --- Custom radio target resolver ---
function qs_getCustomRadioTarget(page){
  if (!page) return null;

  // 1) רדיו מסומן עם data-goto="N"
  var r1 = page.querySelector('input[type="radio"]:checked[data-goto]');
  if (r1) {
    var n1 = parseInt(r1.getAttribute('data-goto'), 10);
    if (!isNaN(n1)) return n1;
  }

  // 2) רדיו מסומן עם data-logic="goto:N"
  var r2 = page.querySelector('input[type="radio"]:checked[data-logic]');
  if (r2) {
    var logic = (r2.getAttribute('data-logic') || '').trim();
    var m = logic.match(/^goto\s*:\s*(\d+)$/i);
    if (m) {
      var n2 = parseInt(m[1], 10);
      if (!isNaN(n2)) return n2;
    }
  }

  // 3) מיפוי על fieldset: data-logic='{"value1":3,"value2":5}'
  //    או data-logic-map באותו פורמט
  var checked = page.querySelector('input[type="radio"]:checked');
  if (checked) {
    var fs = checked.closest('fieldset');
    if (fs) {
      var mapStr = fs.getAttribute('data-logic-map') || fs.getAttribute('data-logic');
      if (mapStr) {
        try {
          var map = JSON.parse(mapStr);
          var v = checked.value;
          if (map && map[v] != null) {
            var n3 = parseInt(map[v], 10);
            if (!isNaN(n3)) return n3;
          }
        } catch(e) {}
      }
    }
  }

  return null;
}

// --- navigation by dots (works with your existing wirePager) ---
function qs_goToIndexByDot(ov, targetIdx){
  if (!ov) return false;
  var dot = ov.querySelector('.qs-dot[data-index="'+ targetIdx +'"]');
  if (!dot) return false;

  // מבטל טיימרים ישנים (כמו שעשית ב-goTo)
  ov.__navToken = (ov.__navToken || 0) + 1;
  clearTimeout(window.__qs_autoTimer);

  dot.click();
  return true;
}

// --- optional: after jump, normalize scroll ---
function qs_scrollTopActive(ov){
  if (!ov) return;
  var page = qs_getActivePage(ov);
  if (!page) return;
  var scroller = qs_findScroller(page);
  if (scroller && typeof scroller.scrollTo === 'function') {
    scroller.scrollTo({ top: 0, behavior: 'smooth' });
  } else if (scroller) {
    scroller.scrollTop = 0;
  }
}

jQuery(function ($) {
  var $form = $('#qs-popup-form');
  if (!$form.length) return;

  function val($el){
    var t = ($el.attr('type')||'').toLowerCase();
    if (t==='radio')    return $el.prop('checked') ? $el.val() : undefined;
    if (t==='checkbox') return $el.prop('checked') ? ($el.val()||'1') : '0';
    return $el.val();
  }
function qs_extractContactStrict(formEl){
  const root = formEl || document;
  const pick = (sel) => {
    const list = Array.from(root.querySelectorAll(sel));
    for (const el of list) {
      const v = (el.value || '').trim();
      if (v) return v;
    }
    return '';
  };

  const email = pick('input[type="email"]');
  const phone = pick('input[type="tel"]');

  // ← חדש: שם מלא (כמה סלקטורים שכיחים אצלך)
  const full_name = pick([
    'input[autocomplete="name"]',
    'input[name="full-name"]',
    '.qs-field-full-name input[type="text"]',
    'input[name*="full"][name*="name"]',
    'input[name*="שם"][type="text"]'
  ].join(','));

  return { email, phone, full_name };
}

  // answers דו-ממדי (כמו שיש לך כבר ב-PHP)
  function buildAnswers(){
    var out=[];
    $('.qs-page').each(function(){
      var arr=[];
      $(this).children().each(function(){
        var $el=$(this);
        if($el.is('.qs-field-title')){ arr.push('__TITLE__'); return; }
        var $c=$el.find('input,select,textarea').not('[type=button],[type=submit],[type=reset]');
        if(!$c.length) return;
        if($c.filter('[type=radio]').length){
          arr.push($c.filter(':checked').val()||'');
        }else if($c.filter('[type=checkbox]').length){
          var $x=$c.filter('[type=checkbox]').first();
          arr.push($x.prop('checked')?($x.val()||'1'):'0');
        }else{
          arr.push(($c.first().val()||''));
        }
      });
      out.push(arr);
    });
    return out;
  }

function buildQA(){
  var qa=[];
  jQuery('.qs-page').each(function(){
    var $page=jQuery(this);

    // כותרות עמוד כ"שאלה" עם תשובה ריקה (שומר סדר)
    $page.children('.qs-field-title').each(function(){
      qa.push({ q: jQuery(this).text().trim(), a: '' });
    });

    // בלוקים של שדות
    $page.find('.qs-field,fieldset.qs-field,.qs-framed').each(function(){
      var $blk=jQuery(this);

      var q =
        $blk.find('label[for]').first().text().trim() ||
        $blk.find('legend').first().text().trim()      ||
        $blk.find('.qs-switchC-caption').first().text().trim() ||
        $blk.find('label').first().text().trim()       ||
        'שדה';

      var a = '';
      var $rad = $blk.find('input[type=radio]');
      var $chk = $blk.find('input[type=checkbox]');

if($rad.length){

  // לקחת את השאלה מהעמוד (data-title)
  var pageTitle = $blk.closest('.qs-page').attr('data-title') || '';
  if(pageTitle){
    q = pageTitle.trim();
  }

  // לקחת את הטקסט של האופציה שנבחרה
  var $checked = $rad.filter(':checked').first();

  if($checked.length){
    var id = $checked.attr('id');
    var labelText = '';

    if(id){
      labelText = $blk.find('label[for="'+id+'"]').text().trim();
    }

    if(!labelText){
      labelText = $checked.closest('label').text().trim();
    }

    a = labelText || ($checked.val()||'');
  }else{
    a = '';
  }

}else if($chk.length){
        var $x=$chk.first(); a = $x.prop('checked')?($x.val()||'1'):'0';
      }else if($blk.find('select').length){
        a = $blk.find('select').first().val()||'';
      }else if($blk.find('textarea').length){
        a = $blk.find('textarea').first().val()||'';
      }else{
        a = $blk.find('input').not('[type=radio],[type=checkbox],[type=button],[type=submit],[type=reset]').first().val()||'';
      }

      // אם אין כלום – דלג
      if(q!=='' || a!==''){ qa.push({ q:q, a:a }); }
    });
  });
  return qa;
}
$form.on('submit', function(e){
    e.preventDefault();
    if ($form.data('submitting')) return; // הגנה משליחה כפולה

    // ---- שדות חובה: שם, מייל, טלפון ----
    var $name  = $form.find('.qs-field-full-name input[type="text"], input[name*="full"][name*="name"]').first();
    var $email = $form.find('input[type="email"]').first();
    var $phone = $form.find('input[type="tel"]').first();

    var errors = [];

    function requireField($el, msg){
        if (!$el.length) return;
        var v = ($el.val() || '').trim();
        if (!v) {
            errors.push(msg);
            $el.addClass('qs-invalid');
        } else {
            $el.removeClass('qs-invalid');
        }
    }

    requireField($name,  'נא למלא שם מלא');
    requireField($email, 'נא למלא כתובת מייל');
    requireField($phone, 'נא למלא מספר טלפון');

    if (errors.length) {
        alert(errors.join('\n'));
        // פוקוס על השדה הראשון הריק
        if ($name.length && !($name.val()||'').trim())      $name.focus();
        else if ($email.length && !($email.val()||'').trim()) $email.focus();
        else if ($phone.length && !($phone.val()||'').trim()) $phone.focus();
        return; // לא שולחים AJAX
    }
    // ---- סוף שדות חובה ----

    // נעילת השליחה כדי למנוע double-submit (לחיצה חוזרת במהלך 3 שניות של ההמתנה)
    $form.data('submitting', true);
    var $submitBtn = $('.qs-next.qs-submit-mode');
    $submitBtn.prop('disabled', true);

    var qa = buildQA();
    var contact = qs_extractContactStrict($form[0]);

    var payload = {
        formId: $form.data().formId,
        answers: buildAnswers(),
        qa: qa,
        page_url: window.location.href.split('#')[0],
        email: contact.email,
        phone: contact.phone,
        full_name: contact.full_name,
        fp_hash: (window._QS_GET_FP_HASH ? window._QS_GET_FP_HASH() : (window._QS_FP_HASH || '')),
        fp_hash_base: (window._QS_GET_FP_HASH_BASE ? window._QS_GET_FP_HASH_BASE() : (window._QS_FP_HASH_BASE || ''))
    };
	         window.qsStartSendAnimation();

setTimeout(function () {
  var ov = document.getElementById('qs-popup');
  if (ov) qs_resetAfterSubmit(ov);
  if (window.closePopup) closePopup();
}, 3000);
    $.ajax({
      url: (window.MITZ_COLLECT_DATA && window.MITZ_COLLECT_DATA.submitUrl) || 'https://mitz.co.il/wp-json/contacts/forms/submit-data',
      method: 'POST',
      data: JSON.stringify(payload),
      contentType: 'application/json',
      success: function(){

       //   var ov = document.getElementById('qs-popup');
        //  if (ov) qs_resetAfterSubmit(ov);
         // if (window.closePopup) closePopup();
      },
      error: function(x){ alert('שגיאה: ' + (x.responseText||'')); },
      complete: function(){
        $form.data('submitting', false);
        $submitBtn.prop('disabled', false);
      }
    });
});

 /* $form.on('submit', function(e){
    e.preventDefault();
var qa = buildQA(); // אם את כבר משתמשת בזה – משאירים
var contact = qs_extractContactStrict($form[0]);

var payload = {
  formId: $form.data().formId, 
  answers: buildAnswers(),
  qa: qa,
  page_url: window.location.href.split('#')[0],
  email: contact.email,   // ← אך ורק מתוך input[type=email]
  phone: contact.phone ,   // ← אך ורק מתוך input[type=tel]
   full_name: contact.full_name   // ← חדש
};


    $.ajax({
      url: 'https://mitz.co.il/wp-json/contacts/forms/submit-data',
      method: 'POST',
      data: JSON.stringify(payload),
      contentType: 'application/json',
      success: function(){ var ov = document.getElementById('qs-popup');
 if (ov) qs_resetAfterSubmit(ov);   // ← איפוס שדות + חזרה לעמוד הראשון
 if (window.closePopup) closePopup(); },
      error:   function(x){ alert('שגיאה: ' + (x.responseText||'')); }
    });
  });*/
});
// === Auto-Advance helpers ===
function qs_pageHasCheckbox(page){
  return !!page.querySelector('input[type="checkbox"]');
}

// שדות שנספרים להשלמה (בלי כפתורים, בלי צ'קבוקסים)
function qs_collectAnswerables(page){
  const all = Array.from(page.querySelectorAll('input, select, textarea'))
    .filter(el => {
      const t = (el.getAttribute('type')||'').toLowerCase();
      if (t === 'button' || t === 'submit' || t === 'reset') return false;
      if (t === 'checkbox') return false; // לפי הדרישה — נוכחות צ'קבוקס מבטלת אוטומציה
      return true;
    });
  return all;
}

// האם קבוצת רדיו בשם X בעמוד מסומנת?
function qs_radioGroupAnswered(page, name){
  return !!page.querySelector('input[type="radio"][name="'+CSS.escape(name)+'"]:checked');
}

// בדיקת השלמת עמוד: כולם מלאים/נבחרים
function qs_isPageComplete(page){
  if (!page) return {complete:false, total:0};
  if (qs_pageHasCheckbox(page)) return {complete:false, total:0}; // ביטול אוטומציה

  const fields = qs_collectAnswerables(page);
  if (!fields.length) return {complete:false, total:0}; // אין מה לספור => לא לדפדף
  // נבדוק לפי סוג
  // לטקסט/אימייל/טל/תאריך/טקסטאריאה: ערך לא ריק
  // ל-select: ערך לא ריק
  // לרדיו: יש נבחר כלשהו בשם הקבוצה
  // (הימנעות מדאבל-ספירה של רדיו — נספור “שם קבוצה” פעם אחת)
  const radioGroups = new Set();
  let answered = 0, total = 0;

  fields.forEach(el => {
    const tag = el.tagName.toLowerCase();
    const type = (el.getAttribute('type')||'').toLowerCase();

    if (type === 'radio') {
      const name = el.getAttribute('name') || '';
      if (!name || radioGroups.has(name)) return; // נספר כל שם פעם אחת
      radioGroups.add(name);
      total += 1;
      if (qs_radioGroupAnswered(page, name)) answered += 1;
      return;
    }

    if (tag === 'select') {
      total += 1;
      if ((el.value || '').trim() !== '') answered += 1;
      return;
    }

    // input text/email/tel/date/... ו-textarea
    if (tag === 'textarea' || tag === 'input') {
      total += 1;
      if ((el.value || '').trim() !== '') answered += 1;
      return;
    }
  });

  return {complete: (answered === total && total > 0), total};
}

// איתור העמוד הפעיל (wirePager מוסיף qs-active)
function qs_getCurrentPage(ov){
  return ov.querySelector('.qs-page.qs-active') ||
         ov.querySelector('.qs-page[aria-hidden="false"]');
}

// לחיצה על “הבא” אם אפשר (לא בעמוד האחרון/מצב שליחה)
function qs_clickNextIfPossible(ov){
  const nextBtn = ov.querySelector('.qs-next');
  if (!nextBtn) return;
  if (nextBtn.disabled) return;
  if (nextBtn.classList.contains('qs-submit-mode')) return; // בעמוד אחרון – לא לדפדף אוטומטית
  nextBtn.click();
}

// בדיקת העמוד הנוכחי והתקדמות אם הושלם (עם debounce קל)
let __qs_autoTimer = null;
function qs_maybeAutoAdvance(ov){
  clearTimeout(__qs_autoTimer);
  __qs_autoTimer = setTimeout(function(){
    const page = qs_getCurrentPage(ov);
    if (!page) return;
    // אם יש צ'קבוקס בעמוד – לא מפעילים אוטומציה
    if (qs_pageHasCheckbox(page)) return;

    const st = qs_isPageComplete(page);
    if (st.complete) qs_clickNextOrSubmitIfPossible(ov);
  }, 60);
}

// חיבור מאזינים לשדות בכל עמוד – נשתדל לגעת מינימלית
function qs_wireAutoAdvance(ov){
  const pages = Array.from(ov.querySelectorAll('.qs-page'));
  if (!pages.length) return;

  pages.forEach(page => {
    const elements = page.querySelectorAll('input, select, textarea');

    elements.forEach(el => {
      const tag  = (el.tagName || '').toLowerCase();
      const type = (el.getAttribute('type') || '').toLowerCase();

      // לא מאזינים לכפתורים/ריסט/סבמיט
      if (type === 'button' || type === 'submit' || type === 'reset') return;

      // אם יש צ'קבוקס בעמוד – האוטומציה ממילא לא תפעל (qs_maybeAutoAdvance בודק),
      // אבל לא צריך להאזין כאן לצ'קבוקס עצמו.
      if (type === 'checkbox') return;

      // select או radio — מפעילים אוטומציה רק על change
      if (tag === 'select' || type === 'radio') {
        el.addEventListener('change', function(){ qs_maybeAutoAdvance(ov); });
        return;
      }

      // קלטי טקסט "יחידתיים"
      const textLike = (tag === 'input' && (
        type === 'text' || type === 'email' || type === 'tel' ||
        type === 'number' || type === 'search' || type === 'url' ||
        type === 'password'
      ));

      if (textLike) {
        // רק כשעוזבים את השדה
        el.addEventListener('blur', function(){ qs_maybeAutoAdvance(ov); });
        // או בלחיצה על Enter
        el.addEventListener('keydown', function(e){
          if (e.isComposing) return;
          if (e.key === 'Enter') {
            e.preventDefault();        // שלא יעשה סאבמיט אוטומטי
            qs_maybeAutoAdvance(ov);
          }
        });
        // שימי לב: אין 'input' כאן כדי לא לירות על כל תו
        return;
      }

      // textarea – רק כשעוזבים (Enter הוא ירידת שורה, לא דפדוף)
      if (tag === 'textarea') {
        el.addEventListener('blur', function(){ qs_maybeAutoAdvance(ov); });
        return;
      }

      // טיפוסים אחרים (date/time וכו') – מספיק change
      el.addEventListener('change', function(){ qs_maybeAutoAdvance(ov); });
    });
  });

  // אם יש שינוי עמוד – נריץ בדיקה מחדש
  const pagesWrap = ov.querySelector('.qs-pages');
  if (pagesWrap && window.MutationObserver) {
    const mo = new MutationObserver(() => qs_maybeAutoAdvance(ov));
    mo.observe(pagesWrap, { attributes:true, subtree:true, attributeFilter:['class','aria-hidden'] });
  }
}
function qs_isLastPage(ov){
  var nextBtn = ov.querySelector('.qs-next');
  return !!(nextBtn && nextBtn.classList.contains('qs-submit-mode'));
}

// שליחה תכנית של הטופס
function qs_submitForm(ov){
  var form = ov.querySelector('#qs-popup-form');
  if (!form) return;
  if (typeof form.requestSubmit === 'function') form.requestSubmit();
  else form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
}

// איפוס כל השדות והחזרה לעמוד הראשון
function qs_resetAfterSubmit(ov){
  var form = ov.querySelector('#qs-popup-form');
  if (form) form.reset();

  // ניקוי בחירות רדיו | צ׳קבוקסים (ליתר ביטחון)
  ov.querySelectorAll('input[type="radio"],input[type="checkbox"]').forEach(function(el){
    el.checked = false;
  });

  // חזרה לעמוד הראשון ע"י לחיצה על הנקודה הראשונה (wirePager כבר מאזין לזה)
  var firstDot = ov.querySelector('.qs-dots .qs-dot[data-index="0"]') || ov.querySelector('.qs-dots .qs-dot');
  if (firstDot) firstDot.click();

  // ודא שהכפתור הבא חזר למצב רגיל (למקרה שמישהו שינה ידנית)
  var nextBtn = ov.querySelector('.qs-next');
  if (nextBtn) nextBtn.classList.remove('qs-submit-mode');
}

// === עדכון קטן בלוגיקת האוטומציה: לדפדף או לשלוח בעמוד האחרון ===
/*function qs_clickNextOrSubmitIfPossible(ov){
  var nextBtn = ov.querySelector('.qs-next');
  if (!nextBtn || nextBtn.disabled) return;

   setTimeout(function(){
    if (qs_isLastPage(ov)) {
      // בעמוד האחרון – שולחים
      qs_submitForm(ov);
    } else {
      // עדיין לא אחרון – דפדוף קדימה
      nextBtn.click();
    }
  }, 500); // ← עיכוב של שנייה
}*/
function qs_clickNextOrSubmitIfPossible(ov){
  var nextBtn = ov.querySelector('.qs-next');
  if (!ov || !nextBtn || nextBtn.disabled) return;
  if (qs_isLastPage(ov)) return;

  // ↑↑ חדש: בדיקת יעד מתוך רדיו מותאם בעמוד הפעיל
  var page = qs_getActivePage(ov);
  var targetIdx = qs_getCustomRadioTarget(page);

  const token = ov.__navToken || 0;

  setTimeout(function(){
    if ((ov.__navToken || 0) !== token) return;
    if (qs_isLastPage(ov)) return;

    // אם נמצא יעד – קופצים אליו במקום next
    if (typeof targetIdx === 'number' && !isNaN(targetIdx)) {
      var ok = qs_goToIndexByDot(ov, targetIdx);
      if (ok) {
        // אופציונלי: ליישר גלילה אחרי המעבר
        setTimeout(function(){ qs_scrollTopActive(ov); }, 0);
        return;
      }
      // אם לא מצא dot מתאים – נופלים ל-next
    }

    nextBtn.click();
  }, 500);
}

function qs_logFieldsInPage(page, idx, label) {
  if (!page) return;

  // סטטוס השלמה של העמוד
  const st = qs_isPageComplete(page); // {complete, total, answered}
  const completeFlag = !!st.complete;
  const answered = st.answered || 0;
  const total = st.total || 0;

  // כותרת עם הפרמטר המבוקש
  console.log(
    `QS page ${idx} — ${label} — fields snapshot (complete=${completeFlag}, answered=${answered}/${total})`
  );

  // איסוף והדפסה של השדות (כמו שהיה אצלך)
  const fields = Array.from(page.querySelectorAll('input, select, textarea'));
  fields.forEach(el => {
    const tag = (el.tagName || '').toLowerCase();
    const type = (el.getAttribute('type') || '').toLowerCase();
    const id = el.id || '(no id)';

    // לייבל ע"י for או טקסט סמוך
    let labelTxt = '';
    const forLbl = el.ownerDocument.querySelector(`label[for="${CSS.escape(id)}"]`);
    if (forLbl) labelTxt = forLbl.textContent.trim();
    if (!labelTxt) {
      const near = el.closest('.qs-field, fieldset, .qs-framed') || el.parentElement;
      const firstLbl = near ? near.querySelector('label, legend, .qs-switchC-caption') : null;
      if (firstLbl) labelTxt = (firstLbl.textContent || '').trim();
    }

    // הצגה לפי סוג
    if (type === 'radio') {
      // נדלג על כל רדיו בודד, ונדפיס פר קבוצה
      // נשאיר את ההדפסה של קבוצות הרדיו כמו שכבר עשית:
      /* שום שינוי כאן — אם יש לך כבר קוד שמאגד לפי name תשאירי אותו */
      return;
    }

    if (type === 'checkbox') {
      console.log({
        id,
        label: labelTxt || 'צ׳קבוקס',
        type: 'checkbox',
        checked: el.checked,
        value: el.checked ? (el.value || '1') : '0',
      });
      return;
    }

    if (tag === 'select') {
      const opt = el.selectedOptions && el.selectedOptions[0];
      console.log({
        id,
        label: labelTxt || 'בחירה',
        type: 'select',
        value: el.value || '',
        text: opt ? (opt.textContent || '').trim() : '',
      });
      return;
    }

    if (tag === 'textarea') {
      console.log({
        id,
        label: labelTxt || 'טקסט ארוך',
        type: 'textarea',
        value: el.value || '',
      });
      return;
    }

    if (tag === 'input') {
      console.log({
        id,
        label: labelTxt || 'שדה',
        type: `input(${type || 'text'})`,
        value: el.value || '',
      });
      return;
    }
  });

  // וגם ריכוז לקבוצות רדיו (אם יש לך את הבלוק הזה – תשאירי; אם לא, הנה מימוש קצר)
  const radioNames = Array.from(new Set(
    Array.from(page.querySelectorAll('input[type="radio"]')).map(r => r.name || '')
  )).filter(Boolean);

  radioNames.forEach(name => {
    const checked = page.querySelector(`input[type="radio"][name="${CSS.escape(name)}"]:checked`);
    const selectedValue = checked ? checked.value : '(none selected)';
    const selectedId = checked ? (checked.id || '(no id)') : '(none)';
    // נסה למצוא לייבל סמוך לרדיו המסומן
    let labelTxt = '';
    if (checked) {
      const lbl = checked.closest('label') ||
                  page.querySelector(`label[for="${CSS.escape(checked.id)}"]`);
      if (lbl) labelTxt = (lbl.textContent || '').trim();
    }
    console.log({
      type: 'radio-group',
      name,
      selectedValue,
      selectedId,
      label: labelTxt || '',
    });
  });
}
// מאזין לשדות בעמוד נתון – אם כולם מולאו => alert
function qs_listenPageCompletion(page) {
  if (!page) return;

  function checkCompletion() {
    const st = qs_isPageComplete(page); // כבר יש לך את הפונקציה הזאת
    if (st.complete) {
	 const ov = page.closest('#qs-popup');
      if (ov) qs_clickNextOrSubmitIfPossible(ov);	
    }
  }

  const elements = page.querySelectorAll('input, select, textarea');
  elements.forEach(el => {
    const tag  = (el.tagName || '').toLowerCase();
    const type = (el.getAttribute('type') || '').toLowerCase();

    if (type === 'button' || type === 'submit' || type === 'reset') return;

    if (type === 'checkbox') return; // צ׳קבוקס לא מפעיל אוטומציה

    if (tag === 'select' || type === 'radio' || type === 'date') {
      el.addEventListener('change', checkCompletion);
      return;
    }

    if (tag === 'textarea') {
      el.addEventListener('blur', checkCompletion);
      return;
    }

    if (tag === 'input') {
      if (type === 'text' || type === 'email' || type === 'tel' ||
          type === 'number' || type === 'search' || type === 'url' || type === 'password') {
        el.addEventListener('blur', checkCompletion); // ← רק כשעוזבים
        return;
      }
    }
  });
}

document.addEventListener('DOMContentLoaded', function () {

    const popupOverlay = document.querySelector('#qs-popup');   // הפופאפ הגדול שלך
    const btnClose = document.querySelector('.qs-close');       // כפתור X
    const confirmPopup = document.querySelector('#qs-confirm-exit');
    const btnStay   = document.querySelector('.qs-stay');
    const btnExit   = document.querySelector('.qs-exit');

    // כשהיא לוחצת על X – לא נסגר, רק נפתח פופאפ אישור
   /* if (btnClose) {
        btnClose.addEventListener('click', function () {
            confirmPopup.setAttribute('aria-hidden', 'false');
        });
    }*/
	// כשהיא לוחצת על X – נסגר הפופאפ הראשי (ללא פופאפ אישור)
if (btnClose) {
    btnClose.addEventListener('click', function (e) {
        e.preventDefault();
        if (confirmPopup) confirmPopup.setAttribute('aria-hidden', 'true'); // ליתר ביטחון
        if (typeof closePopup === 'function') closePopup();
    });
}

/*
// (נשמר להמשך) כשהיא לוחצת על X – לא נסגר, רק נפתח פופאפ אישור
if (btnClose) {
    btnClose.addEventListener('click', function () {
        confirmPopup.setAttribute('aria-hidden', 'false');
    });
}
*/


    // "להישאר" – סוגר את פופאפ האישור ומשאיר את הגדול פתוח
    if (btnStay) {
        btnStay.addEventListener('click', function () {
            confirmPopup.setAttribute('aria-hidden', 'true');
        });
    }

    // "לצאת" – סוגר את הפופאפ הגדול באמת
    if (btnExit) {
        btnExit.addEventListener('click', function () {
            confirmPopup.setAttribute('aria-hidden', 'true');

         closePopup(); 
        });
    }

});
function qs_getActivePage(ov){
  return ov.querySelector('.qs-page.qs-active') || ov.querySelector('.qs-page[aria-hidden="false"]');
}

// מוצא את האלמנט שבאמת גולל (לפעמים זה לא ה-.qs-page עצמו)
function qs_findScroller(page){
  // אם יש לך עטיפה קבועה שיודעים שהיא הגוללת – הכי טוב לשים אותה כאן:
  // var known = page.querySelector('.qs-page-inner');
  // if (known) return known;

  var best = null;
  var bestOverflow = 0;

  var all = page.querySelectorAll('*');
  for (var i=0; i<all.length; i++){
    var el = all[i];
    var cs = getComputedStyle(el);
    var oy = cs.overflowY;

    // רק Y
    if (!(oy === 'auto' || oy === 'scroll' || oy === 'overlay')) continue;

    var ch = el.clientHeight;
    var sh = el.scrollHeight;

    // חייב להיות באמת overflow אנכי
    if (ch <= 0) continue;

    var overflowY = sh - ch;
if (overflowY <= 100) continue;  // סף 100px

    // נבחר את זה עם הכי הרבה overflowY
    if (overflowY > bestOverflow) {
      bestOverflow = overflowY;
      best = el;
    }
  }

  return best || page;
}


function qs_updateScrollIndicator(ov){
  if (!ov) return;

  // אם הפופאפ עדיין מוסתר — לא מודדים
  if (getComputedStyle(ov).display === 'none') {
    console.log('[qs] popup hidden -> skip measure');
    return;
  }

  var page = qs_getActivePage(ov);
  if (!page) return;

  // אם העמוד עצמו בגובה 0 — נחכה פריים
  if (page.getBoundingClientRect().height === 0) {
    requestAnimationFrame(function(){ qs_updateScrollIndicator(ov); });
    return;
  }

  var scroller = qs_findScroller(page);

var overflowY = scroller.scrollHeight - scroller.clientHeight;
var hasOverflow = (overflowY > 100); 

  // את יכולה לשים את הקלאס על page (מומלץ) או על ov
  page.classList.toggle('qs-has-overflow', hasOverflow);

  console.log('[qs] overflowY check', {
  activePage: page,
  scroller: scroller,
  hasOverflowY: hasOverflow,
  ch: scroller.clientHeight,
  sh: scroller.scrollHeight,
  overflowY: getComputedStyle(scroller).overflowY
});
}

function qs_debugOverflow(ov, reason){
  if (!ov) return;

  const disp = getComputedStyle(ov).display;
  const ovRect = ov.getBoundingClientRect();

  const page = ov.querySelector('.qs-page.qs-active') || ov.querySelector('.qs-page[aria-hidden="false"]');
  if (!page) {
    console.log('[qs][overflow] NO active page', { reason, popupDisplay: disp, popupRectH: ovRect.height });
    return;
  }

  const pageRect = page.getBoundingClientRect();
  const pageCS   = getComputedStyle(page);

  // נאתר "מי באמת גולל"
  let scroller = null;
  const candidates = page.querySelectorAll('*');
  for (let i=0; i<candidates.length; i++){
    const el = candidates[i];
    const cs = getComputedStyle(el);
    const r  = el.getBoundingClientRect();
    if (r.height > 0 && (cs.overflowY === 'auto' || cs.overflowY === 'scroll')) {
      scroller = el;
      break;
    }
  }
  if (!scroller) scroller = page;

  const scRect = scroller.getBoundingClientRect();
  const scCS   = getComputedStyle(scroller);

  const data = {
    reason,
    popup: {
      display: disp,
      rectH: ovRect.height,
      ariaHidden: ov.getAttribute('aria-hidden'),
      dataOpen: ov.getAttribute('data-open')
    },
    page: {
      el: page,
      rectH: pageRect.height,
      rectW: pageRect.width,
      clientH: page.clientHeight,
      scrollH: page.scrollHeight,
      display: pageCS.display,
      overflowY: pageCS.overflowY,
      position: pageCS.position
    },
    scroller: {
      el: scroller,
      rectH: scRect.height,
      rectW: scRect.width,
      clientH: scroller.clientHeight,
      scrollH: scroller.scrollHeight,
      clientW: scroller.clientWidth,
      scrollW: scroller.scrollWidth,
      overflowY: scCS.overflowY,
      overflowX: scCS.overflowX,
      hasV: scroller.scrollHeight > scroller.clientHeight + 1,
      hasH: scroller.scrollWidth  > scroller.clientWidth  + 1
    }
  };

  console.log('[qs][overflow] snapshot', data);

  // הסבר אנושי למה לא עובד
  if (disp === 'none') console.warn('[qs][overflow] popup is display:none -> cannot measure');
  if (pageRect.height === 0) console.warn('[qs][overflow] active page height is 0 -> hidden/transform/parent issue');
  if (scroller.clientHeight === 0) console.warn('[qs][overflow] scroller clientHeight is 0 -> wrong element or not laid out');
  if (!(data.scroller.hasV || data.scroller.hasH)) console.warn('[qs][overflow] no overflow detected for this page');
}

// ===== Cookie Consent Popup =====
(function () {
  var STORAGE_KEY = 'qs_cookie_consent';
  var SVG_ORIGINAL_HUE = 28; // הגוון הכתום של ה-SVG המקורי

  function hexToHue(hex) {
    var r = parseInt(hex.slice(1, 3), 16) / 255;
    var g = parseInt(hex.slice(3, 5), 16) / 255;
    var b = parseInt(hex.slice(5, 7), 16) / 255;
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var diff = max - min;
    if (diff === 0) return 0;
    var hue;
    if (max === r) hue = ((g - b) / diff) % 6;
    else if (max === g) hue = (b - r) / diff + 2;
    else hue = (r - g) / diff + 4;
    return Math.round(hue * 60);
  }

  function applySvgColor(color) {
    document.documentElement.style.setProperty('--mitz_coockie_color', color);
    var svg = document.querySelector('#qs-cookie-overlay .bc-modal__icon svg');
    if (!svg) return;
    var newHue = hexToHue(color);
    var shift = newHue - SVG_ORIGINAL_HUE;
    svg.style.filter = 'hue-rotate(' + shift + 'deg)';
  }

  function isCookieAccepted() {
    try { return localStorage.getItem(STORAGE_KEY) === '1'; } catch (e) { return false; }
  }

  function acceptCookie() {
    try { localStorage.setItem(STORAGE_KEY, '1'); } catch (e) {}
    hideCookiePopup();
  }

  function hideCookiePopup() {
    var el = document.getElementById('qs-cookie-overlay');
    if (el) { el.style.display = 'none'; el.setAttribute('aria-hidden', 'true'); }
  }

  function showCookiePopup() {
    var el = document.getElementById('qs-cookie-overlay');
    if (!el) return;
    var pos = (window.QS_COOKIE_POPUP && window.QS_COOKIE_POPUP.position) || 'right';
    el.classList.add(pos === 'left' ? 'bc-pos-left' : 'bc-pos-right');
    el.style.display = 'block';
    el.setAttribute('aria-hidden', 'false');
  }

  function init() {
    if (isCookieAccepted()) return;

    var overlay = document.getElementById('qs-cookie-overlay');
    if (!overlay) return;

    var color = (window.QS_COOKIE_POPUP && window.QS_COOKIE_POPUP.color) || '#3B82F6';
    applySvgColor(color);

    overlay.querySelectorAll('.bc-modal__close, .bc-modal__btn--primary').forEach(function(btn) {
      btn.addEventListener('click', acceptCookie);
    });
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) hideCookiePopup();
    });

    showCookiePopup();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

