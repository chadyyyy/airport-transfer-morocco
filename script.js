document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================================================
    // 1. CONSTANTS & DOM ELEMENTS
    // ==========================================================================
    const WHATSAPP_NUMBER = "212645589342";
    
    // Hero Calculator
    const heroDirection = document.getElementById('hero-direction');
    const heroPax = document.getElementById('hero-pax');
    const heroPrice = document.getElementById('hero-price');
    
    // Booking Form
    const formDirection = document.getElementById('form-direction');
    const formPax = document.getElementById('form-pax');
    const formDirectionDisplay = document.getElementById('form-direction-display');
    const formPriceDisplay = document.getElementById('form-price-display');
    const reservationForm = document.getElementById('reservation-form');
    
    // Mobile Sticky CTA
    const mobileStickyCta = document.getElementById('mobile-sticky-cta');
    const stickyPriceValue = document.getElementById('sticky-price-value');
    
    // ==========================================================================
    // DATE QUICK-SELECT BUTTONS
    // ==========================================================================
    const dateInput = document.getElementById('form-date');
    const todayDate = new Date();

    if (dateInput) {
        dateInput.min = todayDate.toISOString().split('T')[0];

        document.querySelectorAll('.qd-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const offset = parseInt(btn.dataset.offset);
                const target = new Date();
                target.setDate(todayDate.getDate() + offset);
                const yyyy = target.getFullYear();
                const mm = String(target.getMonth() + 1).padStart(2, '0');
                const dd = String(target.getDate()).padStart(2, '0');
                dateInput.value = `${yyyy}-${mm}-${dd}`;
                document.querySelectorAll('.qd-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            });
        });

        dateInput.addEventListener('change', () => {
            document.querySelectorAll('.qd-btn').forEach(b => b.classList.remove('active'));
        });
    }
    
    // ==========================================================================
    // 2. PRICE CALCULATOR & TWO-PHASE SYNC
    // ==========================================================================
    function calculatePrice(direction, pax) {
        // EUR prices (1 EUR ≈ 11 MAD)
        // Minivan (4-7): 45€ | Berline (1-3): 59€
        // Aller-retour Minivan: 77€ | Aller-retour Berline: 105€
        if (direction === 'Aller-retour') {
            return (pax === '4-7') ? 77 : 105;
        }
        return (pax === '4-7') ? 45 : 59;
    }

    function updatePrices() {
        const direction = heroDirection.value;
        const pax = heroPax.value;
        const price = calculatePrice(direction, pax);
        const formattedPrice = price + '€';

        // Update Hero
        heroPrice.textContent = formattedPrice;
        
        // Sync to Form (Phase 2)
        formDirection.value = direction;
        formPax.value = pax;
        formDirectionDisplay.textContent = direction;
        formPriceDisplay.textContent = formattedPrice;
        
        // Update Sticky Mobile CTA
        if (stickyPriceValue) stickyPriceValue.textContent = formattedPrice;
    }

    heroDirection.addEventListener('change', updatePrices);
    heroPax.addEventListener('change', updatePrices);

    // Vehicle Cards pre-selection
    document.querySelectorAll('.vehicle-select-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const pax = e.target.getAttribute('data-pax');
            const type = e.target.getAttribute('data-type');
            
            heroPax.value = pax;
            heroDirection.value = type;
            updatePrices();
            
            // Scroll to form
            document.querySelector('#booking-form').scrollIntoView({ behavior: 'smooth' });
        });
    });

    // ==========================================================================
    // 3. (Removed Optional Toggle)
    // ==========================================================================

    // ==========================================================================
    // 4. FORM SUBMIT & WHATSAPP BUILDER
    // ==========================================================================
    function buildWhatsAppMessage(data) {
        let msg = `Bonjour Airport Transfer Morocco 👋\n\n`;
        msg += `Je souhaite réserver un transfert :\n\n`;
        msg += `🚗 Trajet : ${data.direction}\n`;
        msg += `👥 Passagers : ${data.pax}\n`;
        msg += `📅 Date : ${data.date}\n`;
        msg += `📱 WhatsApp : ${data.phone}\n`;
        msg += `\n💶 Prix estimé : ${calculatePrice(data.direction, data.pax)}€\n`;
        msg += `Merci de confirmer ma disponibilité.`;
        
        return encodeURIComponent(msg);
    }

    // ==========================================================================
    // 4. SECURE NOTIFICATION — Routed via Vercel Serverless Function /api/notify
    // (Telegram token lives in Vercel env vars, never in this file)
    // ==========================================================================

    if (reservationForm) {
        reservationForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // ── Validate required fields ──────────────────────────────────
            const requiredFields = [
                { id: 'form-phone',      label: 'Numéro WhatsApp' },
                { id: 'form-date',       label: 'Date' },
                { id: 'form-pax-select', label: 'Nombre de passagers' }
            ];

            for (const field of requiredFields) {
                const el = document.getElementById(field.id);
                if (!el || !el.value.trim()) {
                    el && el.focus();
                    el && el.classList.add('field-error');
                    setTimeout(() => el && el.classList.remove('field-error'), 3000);
                    alert(`Veuillez remplir le champ : ${field.label}`);
                    return;
                }
            }

            // ── Gather form data ──────────────────────────────────────────
            const paxSelectEl = document.getElementById('form-pax-select');
            const paxValue    = paxSelectEl ? paxSelectEl.value : document.getElementById('form-pax').value;
            const paxBucket   = (parseInt(paxValue) >= 4 || paxValue === '5-7') ? '4-7' : '1-3';
            const dirValue    = document.getElementById('form-direction').value;

            const formData = {
                direction: dirValue,
                pax:       paxValue,
                date:      document.getElementById('form-date').value,
                phone:     document.getElementById('form-phone').value,
                price:     calculatePrice(dirValue, paxBucket) + '€'
            };

            // ── Build WhatsApp URL & open directly ────────────────────────
            const waMessage   = buildWhatsAppMessage(formData);
            const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${waMessage}`;

            window.open(whatsappUrl, '_blank');

            // ── Show inline success state on button ───────────────────────
            const submitBtn = reservationForm.querySelector('button[type="submit"]');
            const originalHTML = submitBtn.innerHTML;
            submitBtn.innerHTML = `
                <span style="font-size:1.1rem; font-weight:700; display:flex; align-items:center; justify-content:center; gap:0.5rem;">
                    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    WhatsApp ouvert — continuez la conversation
                </span>
                <span style="font-size:0.8rem; opacity:0.85; margin-top:0.25rem;">Vous ne voyez pas la fenêtre ? <a id="wa-fallback-link" style="color:inherit; text-decoration:underline;" target="_blank" rel="noopener">Cliquez ici</a></span>`;
            submitBtn.style.background = '#1DA851';
            submitBtn.disabled = false;

            // Set fallback link href
            const fallbackLink = document.getElementById('wa-fallback-link');
            if (fallbackLink) fallbackLink.href = whatsappUrl;

            // Reset button after 8 seconds
            setTimeout(() => {
                submitBtn.innerHTML = originalHTML;
                submitBtn.style.background = '';
            }, 8000);
        });
    }


    // ==========================================================================
    // 5. UI INTERACTIONS
    // ==========================================================================
    
    // Sticky Header & Mobile CTA Reveal
    const header = document.getElementById('main-header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 60) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Show Mobile Sticky CTA after scrolling past hero (approx 400px)
        if (mobileStickyCta) {
            if (window.scrollY > 400) {
                mobileStickyCta.classList.add('visible');
            } else {
                mobileStickyCta.classList.remove('visible');
            }
        }
    });

    // Smooth Scroll for anchor links
    document.querySelectorAll('.scroll-to').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId && targetId !== '#') {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    // Adjust for sticky header height (~70px)
                    const headerOffset = 80;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: "smooth"
                    });
                }
            }
        });
    });

    // FAQ Accordion
    document.querySelectorAll('.faq-question').forEach(button => {
        button.addEventListener('click', () => {
            const faqItem = button.parentElement;
            const answer = button.nextElementSibling;
            
            // Close all others
            document.querySelectorAll('.faq-item').forEach(item => {
                if (item !== faqItem) {
                    item.classList.remove('active');
                    item.querySelector('.faq-answer').style.maxHeight = null;
                }
            });

            // Toggle current
            faqItem.classList.toggle('active');
            if (faqItem.classList.contains('active')) {
                answer.style.maxHeight = answer.scrollHeight + "px";
            } else {
                answer.style.maxHeight = null;
            }
        });
    });

    // Scroll Reveal Elements
    const revealElements = document.querySelectorAll('.hero-stats, .booking-card, .feature-card, .vehicle-card, .route-row, .step-card, .review-card, .faq-item');
    revealElements.forEach(el => el.classList.add('reveal'));

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { rootMargin: '0px 0px -50px 0px' });

    revealElements.forEach(el => revealObserver.observe(el));


    // ==========================================================================
    // 6. COOKIE CONSENT (CNIL COMPLIANCE)
    // ==========================================================================

    // Cookie Consent Logic
    const cookieBanner = document.getElementById('cookie-banner');
    const btnAccept = document.getElementById('btn-accept-cookies');
    const btnRefuse = document.getElementById('btn-refuse-cookies');
    const linkManageCookies = document.getElementById('link-manage-cookies');

    function loadGoogleAnalytics() {
        // Place your actual GA tag here. It will only execute if consent is given.
        /*
        const script1 = document.createElement('script');
        script1.async = true;
        script1.src = 'https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX';
        document.head.appendChild(script1);

        const script2 = document.createElement('script');
        script2.innerHTML = `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-XXXXXXXXXX');
        `;
        document.head.appendChild(script2);
        */
        console.log("Google Analytics loaded (Consent Given)");
    }

    function handleCookieConsent() {
        const consent = localStorage.getItem('atm_cookie_consent');
        if (!consent) {
            // No choice made yet, show banner
            cookieBanner.classList.remove('hidden');
        } else if (consent === 'accepted') {
            // Already accepted, load tracking
            loadGoogleAnalytics();
        }
    }

    if (btnAccept && btnRefuse && cookieBanner) {
        btnAccept.addEventListener('click', () => {
            localStorage.setItem('atm_cookie_consent', 'accepted');
            cookieBanner.classList.add('hidden');
            loadGoogleAnalytics();
        });

        btnRefuse.addEventListener('click', () => {
            localStorage.setItem('atm_cookie_consent', 'refused');
            cookieBanner.classList.add('hidden');
        });
    }

    if (linkManageCookies) {
        linkManageCookies.addEventListener('click', (e) => {
            e.preventDefault();
            cookieBanner.classList.remove('hidden');
        });
    }

    // Initialize Cookie check
    handleCookieConsent();
    
    // Initialize prices on load
    updatePrices();

});
