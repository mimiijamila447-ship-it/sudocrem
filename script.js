document.addEventListener('DOMContentLoaded', () => {

    /* =======================================
       1. VARIABLES & STATE
    ======================================== */
    let state = {
        price: 89.00,
        quantity: 1,
        type: 'كريم معالج',
        size: '60غ / 2oz'
    };

    /* =======================================
       2. SCROLL ANIMATIONS (Intersection Observer)
    ======================================== */
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');

                // Trigger counter animation if it's a stat block
                if (entry.target.classList.contains('stats-section')) {
                    animateCounters();
                }

                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    animatedElements.forEach(el => observer.observe(el));

    /* =======================================
       3. NAVBAR & MOBILE MENU
    ======================================== */
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
            navbar.style.height = window.innerWidth <= 768 ? '70px' : '70px';
        } else {
            navbar.style.boxShadow = '0 1px 10px rgba(0,0,0,0.05)';
            navbar.style.height = window.innerWidth <= 768 ? '70px' : '80px';
        }
    });

    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenu) {
        mobileMenu.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            const icon = mobileMenu.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.add('fa-bars');
                icon.classList.remove('fa-times');
            }
        });

        // Close menu on link click
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                mobileMenu.classList.remove('active');
                mobileMenu.querySelector('i').classList.add('fa-bars');
                mobileMenu.querySelector('i').classList.remove('fa-times');
            });
        });
    }

    /* =======================================
       4. GLOW FOLLOW EFFECT
    ======================================== */
    const glowCards = document.querySelectorAll('.magic-glow-card');
    glowCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--x', `${x}px`);
            card.style.setProperty('--y', `${y}px`);
        });
    });

    /* =======================================
       5. STATS COUNTER ANIMATION
    ======================================== */
    let countersAnimated = false;
    function animateCounters() {
        if (countersAnimated) return;
        const counters = document.querySelectorAll('.stat-number');
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const duration = 2000; // ms
            const step = target / (duration / 16); // 60fps
            const isPlus = counter.getAttribute('data-plus') === 'true';
            const isPercent = counter.getAttribute('data-percent') === 'true';
            let current = 0;

            const updateCounter = () => {
                current += step;
                if (current < target) {
                    counter.innerText = Math.ceil(current);
                    if (isPlus) counter.setAttribute('data-suffix', '+');
                    if (isPercent) counter.setAttribute('data-suffix', '%');
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.innerText = target;
                    if (isPlus) counter.setAttribute('data-suffix', '+');
                    if (isPercent) counter.setAttribute('data-suffix', '%');
                }
            };
            updateCounter();
        });
        countersAnimated = true;
    }

    /* =======================================
       6. FAQ ACCORDION
    ======================================== */
    const accordionItems = document.querySelectorAll('.accordion-item');
    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        header.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            // Close all
            accordionItems.forEach(i => i.classList.remove('active'));
            // Toggle clicked
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    /* =======================================
       7. FAKE LIVE SALES NOTIFICATIONS (TOASTS)
    ======================================== */
    const notifications = [
        { name: 'سناء', location: 'صفاقس', time: 'هوما توا' },
        { name: 'محمد', location: 'تونس', time: 'منذ دقيقتين' },
        { name: 'ألفة', location: 'سوسة', time: 'منذ 5 دقائق' },
        { name: 'ياسين', location: 'نابل', time: 'منذ 12 دقيقة' }
    ];

    function createToast() {
        const container = document.getElementById('toast-container');
        const randomNotif = notifications[Math.floor(Math.random() * notifications.length)];

        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.innerHTML = `
            <img src="images/sudocrem.png" alt="Sudocrem" class="toast-img">
            <div>
                <strong style="color:var(--text-main); font-size:0.9rem;">${randomNotif.name} من ${randomNotif.location}</strong>
                <p style="color:var(--text-muted); font-size:0.8rem; margin-top:2px;">شرات Sudocrem (60غ) - <i>${randomNotif.time}</i></p>
            </div>
        `;

        container.appendChild(toast);

        // Trigger animation
        requestAnimationFrame(() => {
            toast.classList.add('show');
        });

        // Remove after 5 seconds
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 400);
        }, 5000);
    }

    // Start toaster interval (every 12 seconds)
    setInterval(createToast, 12000);

    /* =======================================
       8. PDP INTERACTIONS
    ======================================== */

    // Thumbnails Gallery
    const mainImage = document.getElementById('mainImage');
    const thumbnails = document.querySelectorAll('.thumb-img');
    thumbnails.forEach(thumb => {
        thumb.addEventListener('click', () => {
            thumbnails.forEach(t => t.classList.remove('active'));
            thumb.classList.add('active');
            mainImage.src = thumb.getAttribute('data-main');
        });
    });

    // Option Buttons Group (Size / Type)
    const optionGroups = document.querySelectorAll('.pdp-options-group');
    optionGroups.forEach(group => {
        const btns = group.querySelectorAll('.option-btn');
        btns.forEach(btn => {
            btn.addEventListener('click', () => {
                btns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                // Update State
                if (btn.hasAttribute('data-price')) {
                    state.price = parseFloat(btn.getAttribute('data-price'));
                    state.size = btn.innerText;
                    updatePriceDisplay();
                }
                if (btn.hasAttribute('data-type')) {
                    state.type = btn.innerText;

                    const docStyle = document.documentElement.style;
                    const typeVal = btn.getAttribute('data-type');

                    // Add smooth transition for the body background and text
                    document.body.style.transition = 'background-color 0.5s ease';

                    if (typeVal === 'protect') {
                        // Care & Protect Theme (Teal & Orange)
                        docStyle.setProperty('--primary-gold', '#4A90E2');
                        docStyle.setProperty('--hover-gold', '#357ABD');
                        docStyle.setProperty('--primary-red', '#FFB703');

                        document.getElementById('mainImage').src = 'images/care_protect.png';
                        document.querySelector('.pdp-brand').style.color = '#4A90E2';
                    } else {
                        // Healing Cream Theme (Gold & Red)
                        docStyle.setProperty('--primary-gold', '#cfaa6b');
                        docStyle.setProperty('--hover-gold', '#b8955b');
                        docStyle.setProperty('--primary-red', '#E63946');

                        document.getElementById('mainImage').src = 'images/sudocrem.png';
                        document.querySelector('.pdp-brand').style.color = '#111';
                    }
                }
            });
        });
    });

    // Quantity Counter
    const qtyInput = document.getElementById('pdp-qty-input');
    const qtyUp = document.getElementById('pdp-qty-up');
    const qtyDown = document.getElementById('pdp-qty-down');

    qtyUp.addEventListener('click', () => {
        let val = parseInt(qtyInput.value);
        if (val < 10) { qtyInput.value = val + 1; state.quantity = val + 1; updatePriceDisplay(); }
    });
    qtyDown.addEventListener('click', () => {
        let val = parseInt(qtyInput.value);
        if (val > 1) { qtyInput.value = val - 1; state.quantity = val - 1; updatePriceDisplay(); }
    });

    function updatePriceDisplay() {
        const currentPriceEl = document.querySelector('.current-price');
        // Simple mock calc
        currentPriceEl.innerText = (state.price * state.quantity).toFixed(2) + ' د.ت';
    }

    /* =======================================
       9. NEW BEFORE & AFTER TABS LOGIC
    ======================================== */
    const baTabs = document.querySelectorAll('.ba-tab-btn');
    const baContainers = document.querySelectorAll('.ba-container');

    baTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active from all tabs
            baTabs.forEach(t => t.classList.remove('active'));
            // Remove active from all containers
            baContainers.forEach(c => c.classList.remove('active'));

            // Add active to clicked tab
            tab.classList.add('active');
            // Show corresponding container
            const targetId = tab.getAttribute('data-target');
            document.getElementById(targetId).classList.add('active');
        });
    });

    /* =======================================
       10. 3D TILT EFFECT
    ======================================== */
    const pdpMainImageDiv = document.querySelector('.pdp-main-image');
    const tiltWrapper = document.getElementById('tiltMain');

    pdpMainImageDiv.addEventListener('mousemove', (e) => {
        const rect = pdpMainImageDiv.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -15; // Max 15 degree tilt
        const rotateY = ((x - centerX) / centerX) * 15;

        tiltWrapper.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    pdpMainImageDiv.addEventListener('mouseleave', () => {
        tiltWrapper.style.transform = `rotateX(0deg) rotateY(0deg)`;
        tiltWrapper.style.transition = `transform 0.5s ease-out`;
    });

    pdpMainImageDiv.addEventListener('mouseenter', () => {
        tiltWrapper.style.transition = `transform 0.1s ease-out`; // snap back to follow speed
    });

    /* =======================================
       11. LIVE VIEWERS COUNTER
    ======================================== */
    const viewerCountElement = document.getElementById('viewer-count');
    setInterval(() => {
        // Randomly adjust viewers between 15 and 45. Try to make it float around 22-30.
        let current = parseInt(viewerCountElement.innerText);
        let move = Math.random() > 0.5 ? 1 : -1;

        // bias it to stay between 18 and 38
        if (current > 38) move = -Math.floor(Math.random() * 3);
        if (current < 18) move = Math.floor(Math.random() * 3);

        viewerCountElement.innerText = current + move;
    }, 4500);

    /* =======================================
       12. COUNTDOWN TIMER
    ======================================== */
    function startCountdown() {
        // Set a dummy end time explicitly for demonstration (4 hours from load)
        let endTime = new Date().getTime() + (4 * 60 * 60 * 1000) + (12 * 60 * 1000) + (35 * 1000);

        const timerEl = document.getElementById('countdown-timer');

        setInterval(() => {
            let now = new Date().getTime();
            let distance = endTime - now;

            if (distance < 0) {
                // reset to another 4 hours if hit zero to keep urgency
                endTime = new Date().getTime() + (4 * 60 * 60 * 1000);
                distance = endTime - now;
            }

            let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            let seconds = Math.floor((distance % (1000 * 60)) / 1000);

            // Format with leading zeros
            hours = hours < 10 ? "0" + hours : hours;
            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;

            timerEl.innerText = `${hours}:${minutes}:${seconds}`;
        }, 1000);
    }
    startCountdown();

    /* =======================================
       13. HEART WISHLIST BUTTON
    ======================================== */
    const wishlistBtn = document.getElementById('wishlistBtn');
    wishlistBtn.addEventListener('click', function () {
        this.classList.toggle('active');
        const icon = this.querySelector('i');
        if (this.classList.contains('active')) {
            icon.classList.remove('fa-regular');
            icon.classList.add('fa-solid');
            // little bump animation
            this.style.transform = 'scale(1.2)';
            setTimeout(() => this.style.transform = 'scale(1)', 150);
        } else {
            icon.classList.add('fa-regular');
            icon.classList.remove('fa-solid');
        }
    });

    /* =======================================
       14. MODAL INTERACTIONS
    ======================================== */
    const checkoutModal = document.getElementById('checkoutModal');
    const successModal = document.getElementById('successModal');
    const openCheckoutBtn = document.getElementById('openCheckoutBtn');
    const closeCheckout = document.getElementById('closeCheckout');
    const closeSuccess = document.getElementById('closeSuccess');
    const orderForm = document.getElementById('orderForm');

    // Display values in modal
    function populateModal() {
        document.getElementById('checkout-title').innerText = `${state.type} (${state.size})`;
        document.getElementById('checkout-qty').innerText = state.quantity;
        document.getElementById('checkout-total').innerText = (state.price * state.quantity).toFixed(2) + ' د.ت';
    }

    openCheckoutBtn.addEventListener('click', () => {
        populateModal();
        checkoutModal.classList.remove('hidden');
    });

    closeCheckout.addEventListener('click', () => {
        checkoutModal.classList.add('hidden');
    });

    orderForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // 🔹 Step 2: Prepare data
        const data = {
            fullName: document.getElementById('fullName').value,
            phone: document.getElementById('phone').value,
            location_state: document.getElementById('state').value,
            address: document.getElementById('address').value,
            product: `${state.type} (${state.size})`,
            quantity: state.quantity,
            totalPrice: (state.price * state.quantity).toFixed(2) + ' د.ت'
        };

        // Show Loading state
        const submitBtn = document.getElementById('submitOrderBtn');
        const btnText = submitBtn.querySelector('.btn-text');
        const loader = submitBtn.querySelector('.loader');

        btnText.classList.add('hidden');
        loader.classList.remove('hidden');

        try {
            // 🔹 Step 3: Send data to Google Sheets
            // Using text/plain prevents CORS options preflight errors and successfully sends the data string
            const response = await fetch("https://script.google.com/macros/s/AKfycbx73uqReBrKj0MzSbs1_nZOR1VigcFy62OyUAk0c4LnLUzC2Mamkh3zzdhpRLHMGVnevA/exec", {
                method: "POST",
                mode: "no-cors",
                headers: {
                    "Content-Type": "text/plain;charset=utf-8"
                },
                body: JSON.stringify(data)
            });

            // 🔹 Step 4: Feedback to user
            checkoutModal.classList.add('hidden');
            successModal.classList.remove('hidden');

            // Reset Button
            btnText.classList.remove('hidden');
            loader.classList.add('hidden');
            orderForm.reset();
        } catch (error) {
            alert("⚠️ حدث خطأ: " + error.message);
            btnText.classList.remove('hidden');
            loader.classList.add('hidden');
        }
    });

    closeSuccess.addEventListener('click', () => {
        successModal.classList.add('hidden');
    });

    /* =======================================
       15. FLOATING CONTACT BUTTON
    ======================================== */
    const contactToggleContainer = document.getElementById('contactToggleContainer');
    const contactOptions = document.getElementById('contactOptions');
    const contactButton = document.getElementById('contactButton');
    const closeButton = document.getElementById('closeButton');

    function toggleContact() {
        contactToggleContainer.classList.toggle('active');
        contactOptions.classList.toggle('show');
    }

    if (contactButton && closeButton) {
        contactButton.addEventListener('click', toggleContact);
        closeButton.addEventListener('click', toggleContact);
    }

});
