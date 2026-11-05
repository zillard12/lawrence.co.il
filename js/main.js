/**
 * לורנס - בית לאירועי בוטיק | JavaScript Interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initMobileDrawer();
  initFAQ();
  initVideoModal();
  initContactForm();
  initAudioPlayer();
  initAccessibility();
  initReelsHover();
  initCookieConsent();
});

/* Header Scroll Class */
function initHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/* Mobile Drawer Menu */
function initMobileDrawer() {
  const toggleBtn = document.querySelector('.mobile-toggle');
  const drawer = document.querySelector('.mobile-drawer');
  const overlay = document.querySelector('.drawer-overlay');
  const closeBtn = document.querySelector('.drawer-close');
  const drawerLinks = document.querySelectorAll('.drawer-nav a');

  if (!drawer || !toggleBtn) return;

  const openDrawer = () => {
    drawer.classList.add('open');
    if (overlay) overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    drawer.classList.remove('open');
    if (overlay) overlay.classList.remove('active');
    document.body.style.overflow = '';
  };

  toggleBtn.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  if (overlay) overlay.addEventListener('click', closeDrawer);

  drawerLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) {
      closeDrawer();
    }
  });
}

/* FAQ Accordion */
function initFAQ() {
  const faqItems = document.querySelectorAll('.faq-item');
  if (!faqItems.length) return;

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (!questionBtn) return;

    questionBtn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // Close other items
      faqItems.forEach(other => {
        if (other !== item) other.classList.remove('active');
      });

      // Toggle current
      if (isActive) {
        item.classList.remove('active');
      } else {
        item.classList.add('active');
      }
    });
  });
}

/* Video Lightbox Modal */
function initVideoModal() {
  const modal = document.getElementById('videoModal');
  const modalVideo = document.getElementById('modalVideo');
  const closeBtn = document.querySelector('.video-modal-close');
  const triggers = document.querySelectorAll('[data-video-src]');

  if (!modal || !modalVideo) return;

  const openModal = (src) => {
    modalVideo.src = src;
    modal.classList.add('active');
    modalVideo.play().catch(() => {});
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    modal.classList.remove('active');
    modalVideo.pause();
    modalVideo.src = '';
    document.body.style.overflow = '';
  };

  triggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const videoSrc = trigger.getAttribute('data-video-src');
      if (videoSrc) openModal(videoSrc);
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}

/* Video Reels Hover Preview */
function initReelsHover() {
  const reels = document.querySelectorAll('.reel-card video');
  reels.forEach(video => {
    video.parentElement.addEventListener('mouseenter', () => {
      video.play().catch(() => {});
    });
    video.parentElement.addEventListener('mouseleave', () => {
      video.pause();
    });
  });
}

/* Contact Form to WhatsApp & Confirmation */
function initContactForm() {
  const form = document.getElementById('eventInquiryForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.querySelector('[name="name"]')?.value || '';
    const phone = form.querySelector('[name="phone"]')?.value || '';
    const email = form.querySelector('[name="email"]')?.value || '';
    const eventType = form.querySelector('[name="eventType"]')?.value || '';
    const guests = form.querySelector('[name="guests"]')?.value || '';
    const date = form.querySelector('[name="date"]')?.value || '';
    const notes = form.querySelector('[name="notes"]')?.value || '';

    // Validate essential
    if (!name || !phone) {
      alert('אנא מלאו שם מלא ומספר טלפון');
      return;
    }

    // Construct WhatsApp message
    const message = `שלום לורנס - בית לאירועי בוטיק! 
הייתי רוצה לבדוק זמינות ותיאום סיור:
*שם מלא:* ${name}
*טלפון:* ${phone}
*אימייל:* ${email || 'לא צוין'}
*סוג אירוע:* ${eventType || 'חתונה קטנה בוטיק'}
*מספר מוזמנים:* ${guests || 'עד 200'}
*תאריך מבוקש:* ${date || 'גמיש'}
*הערות:* ${notes || 'נשמח לקבל פרטים נוספים'}`;

    const waUrl = `https://wa.me/972502600340?text=${encodeURIComponent(message)}`;

    // Show success feedback
    const statusMsg = document.getElementById('formStatusMsg');
    if (statusMsg) {
      statusMsg.className = 'form-status-msg success';
      statusMsg.textContent = 'תודה רבה! פנייתכם התקבלה בהצלחה, מועברים לוואטסאפ לתיאום מיידי...';
      statusMsg.style.display = 'block';
    }

    // Open WhatsApp after short delay
    setTimeout(() => {
      window.open(waUrl, '_blank');
      form.reset();
    }, 800);
  });
}

/* Ambient Audio Player Toggle */
function initAudioPlayer() {
  const audioBtn = document.getElementById('audioToggleBtn');
  if (!audioBtn) return;

  let audio = null;
  let isPlaying = false;

  audioBtn.addEventListener('click', () => {
    if (!audio) {
      audio = new Audio('wp-content/uploads/2026/03/onetent-water-drop-relaxing-176976.mp3');
      audio.loop = true;
      audio.volume = 0.35;
    }

    if (isPlaying) {
      audio.pause();
      isPlaying = false;
      audioBtn.style.color = 'var(--color-olive)';
      audioBtn.title = 'הפעל מוזיקת אווירה';
    } else {
      audio.play().then(() => {
        isPlaying = true;
        audioBtn.style.color = 'var(--color-burgundy)';
        audioBtn.title = 'השהה מוזיקת אווירה';
      }).catch(err => {
        console.log('Audio autoplay blocked', err);
      });
    }
  });
}

/* Accessibility Tools */
function initAccessibility() {
  const a11yToggle = document.getElementById('a11yToggleBtn');
  const toolbar = document.getElementById('a11yToolbar');
  if (!a11yToggle || !toolbar) return;

  a11yToggle.addEventListener('click', () => {
    toolbar.classList.toggle('active');
  });

  const btnContrast = document.getElementById('btnA11yContrast');
  const btnFont = document.getElementById('btnA11yFont');
  const btnUnderline = document.getElementById('btnA11yUnderline');
  const btnReset = document.getElementById('btnA11yReset');

  if (btnContrast) {
    btnContrast.addEventListener('click', () => {
      document.body.classList.toggle('a11y-contrast');
    });
  }

  if (btnFont) {
    btnFont.addEventListener('click', () => {
      document.body.classList.toggle('a11y-font-large');
    });
  }

  if (btnUnderline) {
    btnUnderline.addEventListener('click', () => {
      document.body.classList.toggle('a11y-underline');
    });
  }

  if (btnReset) {
    btnReset.addEventListener('click', () => {
      document.body.classList.remove('a11y-contrast', 'a11y-font-large', 'a11y-underline');
    });
  }
}

/* Slim Bottom Cookie Consent Strip */
function initCookieConsent() {
  const STORAGE_KEY = 'lawrence_cookie_accepted';
  try {
    if (localStorage.getItem(STORAGE_KEY) === '1' || localStorage.getItem('qs_cookie_consent') === '1') {
      return;
    }
  } catch (e) {}

  let bar = document.querySelector('.lawrence-cookie-bar');
  if (!bar) {
    // Inject clean cookie strip into DOM
    bar = document.createElement('aside');
    bar.className = 'lawrence-cookie-bar';
    bar.setAttribute('aria-label', 'הודעת עוגיות ופרטיות');
    bar.innerHTML = `
      <div class="cookie-bar-container">
        <p class="cookie-bar-text">
          באתר זה נעשה שימוש בקבצי cookies. המשך גלישתך באתר מהווה הסכמה לשימוש זה. למידע נוסף עיין <a href="privacy.html" class="cookie-bar-link">במדיניות הפרטיות</a>.
        </p>
        <button type="button" class="cookie-bar-btn-primary" id="btnCookieAccept">אישור</button>
      </div>
    `;
    document.body.appendChild(bar);
  }

  // Display bar smoothly
  bar.style.display = 'block';

  const closeBar = () => {
    try {
      localStorage.setItem(STORAGE_KEY, '1');
      localStorage.setItem('qs_cookie_consent', '1');
    } catch (e) {}
    bar.classList.add('closing');
    setTimeout(() => {
      bar.style.display = 'none';
      bar.remove();
    }, 320);
  };

  const btnAccept = bar.querySelector('#btnCookieAccept') || bar.querySelector('.cookie-bar-btn-primary');
  if (btnAccept) btnAccept.addEventListener('click', closeBar);
}
