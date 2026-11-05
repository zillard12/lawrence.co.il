(() => {
  "use strict";

  // ----- קונפיג שמוזרק מ-PHP (wp_localize_script) -----
  const CFG = window.MITZ_COLLECT_DATA || {};
  if (!CFG.siteId) return;

  // localBufferUrl — שמור מקומית, Mitz שואב בלילה.
  // fallback: שלח ישירות ל-Mitz (התנהגות ישנה, אם localBufferUrl לא מוגדר).
  const LOCAL_BUFFER = CFG.localBufferUrl || null;

  /** שולח אירוע: אם יש localBufferUrl → שמור מקומית; אחרת → Mitz ישירות */
  async function sendEvent(mitzEndpoint, payload, eventType) {
    if (LOCAL_BUFFER) {
      try {
        await fetch(LOCAL_BUFFER, {
          method:    "POST",
          headers:   { "Content-Type": "application/json" },
          body:      JSON.stringify({ ...payload, event_type: eventType }),
          keepalive: true,
        });
      } catch (err) {
        console.warn("[collect-data] local buffer error:", err);
      }
    } else if (mitzEndpoint && CFG.endpoint) {
      // fallback — שליחה ישירה ל-Mitz (התנהגות המקורית)
      try {
        const res = await fetch(mitzEndpoint, {
          method:      "POST",
          headers:     { "Content-Type": "application/json" },
          body:        JSON.stringify(payload),
          keepalive:   true,
          mode:        "cors",
          credentials: "omit",
        });
        if (!res.ok) console.warn("[collect-data] HTTP error:", res.status);
      } catch (err) {
        console.warn("[collect-data] network error:", err);
      }
    }
  }

  const FORM_SELECTOR     = "#qs-popup form#qs-popup-form"; // טופס הפופאפ
  const POPUP_SELECTOR    = "#qs-popup";                    // האלמנט של הפופאפ
  const SESSION_KEY_SENT  = `mitz_sent_${CFG.siteId}`;      // דגל "נשלח" לסשן
  const SESSION_KEY_ID    = "mpl_session";                  // מזהה סשן

  // ===== Fingerprint: איסוף נתוני הדפדפן (זהה ל-popup-loader.js) =====
  function _qsCollectFp() {
    const d = {};
    try {
      d.ua     = navigator.userAgent || '';
      d.lang   = navigator.language  || '';
      d.tz     = '';
      try { d.tz = Intl.DateTimeFormat().resolvedOptions().timeZone; } catch(e) {}
      d.screen = (screen.width || 0) + 'x' + (screen.height || 0) + 'x' + (screen.colorDepth || 0);
      d.cores  = navigator.hardwareConcurrency || 0;
      d.touch  = navigator.maxTouchPoints || 0;
      d.cv     = '';
      try {
        const c = document.createElement('canvas'), cx = c.getContext('2d');
        cx.textBaseline = 'top'; cx.font = '14px Arial';
        cx.fillStyle = '#f97316'; cx.fillRect(125, 1, 62, 20);
        cx.fillStyle = '#1e3a8a'; cx.fillText('mitz-fp', 2, 15);
        cx.fillStyle = 'rgba(30,58,138,0.7)'; cx.fillText('mitz-fp', 4, 17);
        d.cv = c.toDataURL();
      } catch(e) {}
    } catch(e) {}
    return d;
  }

  // ===== Fingerprint: קריאה ל-track-visit, שמירת fp_hash =====
  async function _qsTrackAndStoreFpHash() {
    if (!CFG.trackVisitUrl || !CFG.siteId) return;
    const storageKey = '_qs_fp_' + CFG.siteId;
    // אם כבר שמור ב-localStorage — לא צריך לשלוח שוב
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored) { window._QS_FP_HASH = stored; return; }
    } catch(e) {}
    // קריאה לendpoint המקומי
    try {
      const res = await fetch(CFG.trackVisitUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ api_key: CFG.siteId, fp_data: _qsCollectFp(), page_url: location.href }),
        keepalive: true,
      });
      if (res.ok) {
        const data = await res.json();
        if (data && data.fp_hash) {
          window._QS_FP_HASH = data.fp_hash;
          try { localStorage.setItem(storageKey, data.fp_hash); } catch(e) {}
        }
      }
    } catch(e) {}
  }

  // ===== עזר: UUID v4 קצר וברור =====
  function uuid() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
      (c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16)
    );
  }

  // ===== עזר: זיהוי מכשיר =====
  function detectDevice() {
    const ua = navigator.userAgent || "";
    const w  = Math.min(screen.width || 0, innerWidth || 0) || 0;
    if (/iPad|Tablet|Nexus 7|Nexus 10|SM-T|Lenovo Tab|Fire HD|Silk/i.test(ua)) return "tablet";
    if (/Mobi|Android(?!.*Tablet)|iPhone|iPod/i.test(ua))                      return "phone";
    if (w >= 1025) return "desktop";
    if (w >= 600)  return "tablet";
    return "phone";
  }

  // ===== עזר: sessionId יציב לכל הסשן =====
  function getSessionId() {
    let id = sessionStorage.getItem(SESSION_KEY_ID);
    if (!id) {
      id = uuid();
      sessionStorage.setItem(SESSION_KEY_ID, id);
    }
    return id;
  }

  // ===== בניית המטען ל-API (page_view פעם אחת בסשן) =====
  function buildPayload() {
    return {
      siteId:        CFG.siteId,
      pluginVersion: CFG.pluginVersion || "1.0.0",
      clientTime:    new Date().toISOString(),
      domain:        location.hostname,
      path:          location.pathname + location.search,
      referrer:      document.referrer || null,
      device:        detectDevice(),
      sessionId:     getSessionId(),
      fp_hash:       CFG.fpHash || '',
      events: [ { t: Date.now(), type: "page_view", data: {} } ]
    };
  }

  // ===== שליחה ל-API (פעם אחת בסשן) =====
  async function sendOncePerSession() {
    if (sessionStorage.getItem(SESSION_KEY_SENT)) return; // כבר נשלח בסשן
    sessionStorage.setItem(SESSION_KEY_SENT, "1");
    await sendEvent(CFG.endpoint, buildPayload(), "page_view");
  }

  // ====== שליחת קליקים לטופס ======
  const CLICK_ENDPOINT = "https://mitz.co.il/wp-json/contacts/collect_clicks"; // fallback
  const boundForms = new WeakSet(); // כדי שלא נחבר מאזין פעמיים

  function buildClickPayload(targetEl) {
    const interesting = targetEl.closest?.('button, input, select, textarea, a, label') || targetEl;
    const meta = {
      tag: (interesting.tagName || '').toLowerCase(),
      id: interesting.id || null,
      name: interesting.getAttribute?.('name') || null,
      class: interesting.className || null,
      type: interesting.getAttribute?.('type') || null,
      text: (interesting.tagName === 'BUTTON' || interesting.tagName === 'A')
              ? (interesting.textContent || '').trim().slice(0,120)
              : null
    };

    return {
      siteId:        CFG.siteId,
      pluginVersion: CFG.pluginVersion || "1.0.0",
      clientTime:    new Date().toISOString(),
      domain:        location.hostname,
      path:          location.pathname + location.search,
      referrer:      document.referrer || null,
      device:        detectDevice(),
      sessionId:     getSessionId(),
      events: [ { t: Date.now(), type: "form_click", data: meta } ]
    };
  }

  async function sendClickEvent(targetEl) {
    await sendEvent(CLICK_ENDPOINT, buildClickPayload(targetEl), "form_click");
  }

  // ====== שליחת אירוע פתיחת פופאפ ======
  const OPEN_ENDPOINT = "https://mitz.co.il/wp-json/contacts/collect_form_opens"; // fallback
  let popupObserverBound = false;

  function buildOpenPayload() {
    return {
      siteId:        CFG.siteId,
      pluginVersion: CFG.pluginVersion || "1.0.0",
      clientTime:    new Date().toISOString(),
      domain:        location.hostname,
      path:          location.pathname + location.search,
      referrer:      document.referrer || null,
      device:        detectDevice(),
      sessionId:     getSessionId(),
      events: [ { t: Date.now(), type: "form_open", data: {} } ]
    };
  }

  async function sendOpenEvent() {
    await sendEvent(OPEN_ENDPOINT, buildOpenPayload(), "form_open");
  }

  function bindPopupOpenObserver() {
    if (popupObserverBound) return;
    const popup = document.querySelector(POPUP_SELECTOR);
    if (!popup) return;

    // אם הפופאפ כבר פתוח בעת הטעינה – נשלח מיידית
    if (popup.getAttribute("data-open") === "1" || popup.getAttribute("aria-hidden") === "false") {
      sendOpenEvent();
    }

    const obs = new MutationObserver((muts) => {
      for (const m of muts) {
        if (m.type === "attributes" && (m.attributeName === "data-open" || m.attributeName === "aria-hidden")) {
          const isOpen = popup.getAttribute("data-open") === "1" || popup.getAttribute("aria-hidden") === "false";
          if (isOpen) sendOpenEvent(); // שולח בכל פתיחה
        }
      }
    });
    obs.observe(popup, { attributes: true, attributeFilter: ["data-open", "aria-hidden"] });
    popupObserverBound = true;
  }

  // ===== טריגר: כשהטופס קיים בדום =====
  function trySendWhenFormExists() {
    const form = document.querySelector(FORM_SELECTOR);
    if (!form) return;

    // שולח "פעם אחת בסשן" את page_view
    sendOncePerSession();

    // מחבר מאזין קליקים אם עוד לא חיברנו לטופס הזה
    if (!boundForms.has(form)) {
      form.addEventListener('click', (e) => {
        sendClickEvent(e.target);
      }, { capture: true });
      boundForms.add(form);
    }

    // מחבר מאזין לפתיחת הפופאפ
    bindPopupOpenObserver();
  }

  // Fingerprint: קריאה מיידית — fire & forget, לא תלוי בקיום הטופס
  _qsTrackAndStoreFpHash();

  // 1) בדיקה מיד עם טעינת הדף
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", trySendWhenFormExists);
  } else {
    trySendWhenFormExists();
  }

  // 2) תמיכה במקרה שהטופס/הפופאפ מתווספים דינאמית לאחר מכן
  const mo = new MutationObserver(() => {
    trySendWhenFormExists();
    bindPopupOpenObserver();
  });
  mo.observe(document.documentElement, { childList: true, subtree: true });
})();
