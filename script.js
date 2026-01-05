document.addEventListener('DOMContentLoaded', () => {

    // ---------------------------------------------
    // 1. Mobile Menu Toggle
    // ---------------------------------------------
    const mobileMenuBtn = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenuBtn.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking a link
        document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
            mobileMenuBtn.classList.remove('active');
            navMenu.classList.remove('active');
        }));
    }

    // ---------------------------------------------
    // 2. Smooth Scroll (Native behavior is set in CSS, this adds offset if needed)
    // ---------------------------------------------
    // Simple polyfill-like behavior if browser doesn't support smooth scroll well or for custom offset logic
    // Keeping it simple with CSS scroll-behavior: smooth; for now.

    // ---------------------------------------------
    // 3. Scroll Animations (Intersection Observer)
    // ---------------------------------------------
    const observerOptions = {
        root: null, // viewport
        threshold: 0.1, // trigger when 10% of element is visible
        rootMargin: "0px"
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.fade-in, .fade-in-up, .fade-in-left, .fade-in-right');
    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // ---------------------------------------------
    // 4. Navbar Background on Scroll
    // ---------------------------------------------
    const navbar = document.querySelector('.navbar');

    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.style.boxShadow = "0 5px 20px rgba(0,0,0,0.1)";
            } else {
                navbar.style.boxShadow = "0 2px 10px rgba(0,0,0,0.05)";
            }
        });
    }

    // ---------------------------------------------
    // 5. Lead Form Submission (Formspree)
    // ---------------------------------------------
    const leadForm = document.getElementById('leadForm');
    if (leadForm) {
        leadForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const btn = leadForm.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;

            // Show loading state
            btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
            btn.disabled = true;

            const formData = new FormData(leadForm);

            try {
                const response = await fetch("https://formspree.io/f/mqeajrqa", {
                    method: "POST",
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    // Success! Redirect to thank you page for tracking
                    window.location.href = 'thank-you.html';
                } else {
                    // Error state
                    alert("Oops! There was a problem submitting your form. Please try calling us instead.");
                    btn.innerHTML = originalText;
                    btn.disabled = false;
                }
            } catch (error) {
                // Network error
                alert("Oops! There was a problem submitting your form. Please try calling us instead.");
                btn.innerHTML = originalText;
                btn.disabled = false;
            }
        });
    }

});
