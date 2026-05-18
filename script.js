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
        // Minivan (4-7) is Standard: 480 MAD
        // Berline VIP (1-3) is Premium: 650 MAD
        let basePrice = (pax === '4-7') ? 480 : 650;
        if (direction === 'Aller-retour') {
            basePrice = Math.round((basePrice * 1.8) / 10) * 10;
        }
        return basePrice;
    }

    function updatePrices() {
        const direction = heroDirection.value;
        const pax = heroPax.value;
        const price = calculatePrice(direction, pax);
        const formattedPrice = price + ' MAD';

        // Update Hero
        heroPrice.textContent = formattedPrice;
        
        // Sync to Form (Phase 2)
        formDirection.value = direction;
        formPax.value = pax;
        formDirectionDisplay.textContent = direction;
        formPriceDisplay.textContent = formattedPrice;
        
        // Dynamic Label for Hotel/Address
        const hotelLabel = document.querySelector('label[for="form-hotel"]');
        if (hotelLabel) {
            const iconSvg = '<svg class="icon" viewBox="0 0 24 24"><path d="M3 21h18M5 21V7l7-4 7 4v14"/><path d="M9 21v-4h6v4"/><path d="M9 9h.01M15 9h.01M9 13h.01M15 13h.01"/></svg> ';
            if (direction === 'Hôtel → Aéroport') {
                hotelLabel.innerHTML = iconSvg + 'Lieu de prise en charge (Hôtel)';
            } else {
                hotelLabel.innerHTML = iconSvg + 'Destination (Hôtel ou Adresse)';
            }
        }
        
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
        msg += `🚗 Type : ${data.direction}\n`;
        msg += `👥 Passagers : ${data.pax}\n`;
        msg += `📅 Date : ${data.date}\n`;
        msg += `🕐 Heure du vol : ${data.time}\n`;
        if (data.flight) msg += `✈️ Numéro de vol : ${data.flight}\n`;
        msg += `🏨 Destination : ${data.hotel}\n\n`;
        msg += `👤 Nom : ${data.name}\n`;
        msg += `📱 Téléphone : ${data.phone}\n`;
        if (data.notes) msg += `\n💬 Remarques : ${data.notes}\n`;
        
        msg += `\nPrix estimé : ${calculatePrice(data.direction, data.pax)} MAD\n`;
        msg += `Merci de confirmer ma réservation.`;
        
        return encodeURIComponent(msg);
    }

    // ==========================================================================
    // 4. SECURE NOTIFICATION — Routed via Vercel Serverless Function /api/notify
    // (Telegram token lives in Vercel env vars, never in this file)
    // ==========================================================================

    if (reservationForm) {
        reservationForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            // ── Validate required fields ─────────────────────────────────
            const requiredFields = [
                { id: 'form-direction', label: 'Trajet' },
                { id: 'form-pax',       label: 'Nombre de passagers' },
                { id: 'form-date',      label: 'Date' },
                { id: 'form-time',      label: 'Heure' },
                { id: 'form-hotel',     label: 'Destination' },
                { id: 'form-name',      label: 'Nom' },
                { id: 'form-phone',     label: 'Téléphone' }
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

            const gdprChecked = document.getElementById('form-gdpr').checked;
            if (!gdprChecked) {
                alert("Veuillez accepter la politique de confidentialité.");
                return;
            }

            const submitBtn = reservationForm.querySelector('button[type="submit"]');

            // Inject spin animation
            if (!document.getElementById('spin-style')) {
                const style = document.createElement('style');
                style.id = 'spin-style';
                style.innerHTML = '@keyframes spin { 100% { transform: rotate(360deg); } }';
                document.head.appendChild(style);
            }

            const originalBtnText = submitBtn.innerHTML;
            submitBtn.innerHTML = `<span style="font-size:1.15rem;font-weight:700;display:flex;align-items:center;justify-content:center;gap:0.5rem;"><svg style="animation:spin 1s linear infinite;width:22px;height:22px;fill:none;stroke:currentColor;stroke-width:2.5;stroke-linecap:round;" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke-opacity="0.25"/><path d="M12 2a10 10 0 0 1 10 10"/></svg> Sécurisation en cours...</span>`;
            submitBtn.disabled = true;

            // ── Gather form data ─────────────────────────────────────────
            const formData = {
                direction: document.getElementById('form-direction').value,
                pax:       document.getElementById('form-pax').value,
                date:      document.getElementById('form-date').value,
                time:      document.getElementById('form-time').value,
                hotel:     document.getElementById('form-hotel').value,
                name:      document.getElementById('form-name').value,
                phone:     document.getElementById('form-phone').value,
                flight:    document.getElementById('form-flight') ? document.getElementById('form-flight').value : '',
                notes:     document.getElementById('form-notes')  ? document.getElementById('form-notes').value  : '',
                price:     calculatePrice(
                               document.getElementById('form-direction').value,
                               document.getElementById('form-pax').value
                           ) + ' MAD'
            };

            // ── Build WhatsApp URL & save to sessionStorage ───────────────
            const waMessage  = buildWhatsAppMessage(formData);
            const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${waMessage}`;
            sessionStorage.setItem('pendingWhatsAppReservation', whatsappUrl);
            sessionStorage.setItem('bookingSummary', JSON.stringify({
                direction: formData.direction,
                date:      formData.date,
                time:      formData.time,
                hotel:     formData.hotel,
                price:     calculatePrice(formData.direction, formData.pax)
            }));

            // ── Send notification (with 4s safety timeout) ────────────────
            const notifyRequest = fetch('/api/notify', {
                method:  'POST',
                headers: { 'Content-Type': 'application/json' },
                body:    JSON.stringify(formData)
            }).catch(err => console.error('Notify error:', err));

            // Labor illusion: minimum 1.5s + max 4s total wait
            const minWait   = new Promise(resolve => setTimeout(resolve, 1500));
            const maxWait   = new Promise(resolve => setTimeout(resolve, 4000));

            await Promise.race([
                Promise.all([minWait, notifyRequest]),
                maxWait  // Always redirect after 4s even if API is slow
            ]);

            // ── Always redirect to thank-you page ────────────────────────
            window.location.href = 'merci.html';
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
