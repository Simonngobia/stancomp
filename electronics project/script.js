document.addEventListener('DOMContentLoaded', () => {
    const navButtons = document.querySelectorAll('.nav-button');
    const sections = document.querySelectorAll('.section'); // Assuming all main content sections have this class

    // Function to handle smooth scroll
    function scrollToSection(sectionId) {
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            // Remove 'active' class from all buttons
            navButtons.forEach(btn => btn.classList.remove('active'));

            // Add 'active' class to the clicked button
            const activeButton = document.querySelector(`.nav-button[data-target="${sectionId}"]`);
            if (activeButton) {
                activeButton.classList.add('active');
            }

            // Scroll to the section
            window.scrollTo({
                top: targetSection.offsetTop - document.querySelector('header').offsetHeight, // Adjust for sticky header
                behavior: 'smooth'
            });
            console.log(`Scrolled to ${sectionId}`);
        } else {
            console.log(`Section with id "${sectionId}" not found.`);
        }
    }

    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetId = button.getAttribute('data-target');
            console.log(`Button clicked: ${button.textContent}, Target: ${targetId}`);

            // For this example, we'll scroll to the section
            // In a more complex site, you might load new content or navigate to a new page
            if (targetId) {
                scrollToSection(targetId);
            }
        });
    });

    // Optional: Highlight nav button based on scroll position
    window.addEventListener('scroll', () => {
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - document.querySelector('header').offsetHeight - 50; // Offset a bit
            if (pageYOffset >= sectionTop) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navButtons.forEach(button => {
            button.classList.remove('active');
            if (button.getAttribute('data-target') === currentSectionId) {
                button.classList.add('active');
            }
        });
         // If scrolled to the very top, make "Home" active
        if (pageYOffset < sections[0].offsetTop - document.querySelector('header').offsetHeight) {
            navButtons.forEach(btn => btn.classList.remove('active'));
            const homeButton = document.querySelector('.nav-button[data-target="home"]');
            if (homeButton) homeButton.classList.add('active');
        }
    });

    // Set "Home" as active by default on page load
    const homeButton = document.querySelector('.nav-button[data-target="home"]');
    if (homeButton) {
        homeButton.classList.add('active');
    }

    // Auto-scroll for right-to-left container
    const autoScroll = document.querySelector('.product-scroll-container.auto-scroll');
    if (autoScroll) {
        let scrollStep = 1; // pixels per frame
        let scrollInterval = 20; // ms
        setInterval(() => {
            // Scroll right-to-left (rtl)
            autoScroll.scrollLeft -= scrollStep;
            // Loop back to end when reaching the start
            if (autoScroll.scrollLeft <= 0) {
                autoScroll.scrollLeft = autoScroll.scrollWidth;
            }
        }, scrollInterval);
    }

    // Contact info toggle
    document.getElementById('show-contact-btn').addEventListener('click', function() {
        var info = document.getElementById('support-contact-info');
        if (info.style.display === "none") {
            info.style.display = "block";
            this.textContent = "Hide Contact Info";
        } else {
            info.style.display = "none";
            this.textContent = "Contact Support";
        }
    });

    // For each product card, cycle through images with class 'accessory-slide'
    document.querySelectorAll('.product-card').forEach(card => {
        const slides = card.querySelectorAll('.accessory-slide');
        if (slides.length > 1) {
            let idx = 0;
            slides.forEach((img, i) => {
                img.classList.toggle('active', i === 0);
            });
            setInterval(() => {
                slides[idx].classList.remove('active');
                idx = (idx + 1) % slides.length;
                slides[idx].classList.add('active');
            }, 2000); // Change image every 2 seconds
        }
    });

    document.querySelectorAll('.nav-button').forEach(btn => {
        btn.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            const section = document.getElementById(targetId);
            if (section) {
                section.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Simple FAQ dropdown logic
    document.querySelectorAll('.faq-question').forEach(btn => {
        btn.addEventListener('click', function() {
            this.classList.toggle('active');
            const answer = this.nextElementSibling;
            if (answer.style.maxHeight) {
                answer.style.maxHeight = null;
            } else {
                answer.style.maxHeight = answer.scrollHeight + "px";
            }
        });
    });

    // Show/hide buying guides info
    document.getElementById('buying-guides-card').addEventListener('click', function(event) {
        event.preventDefault(); // Prevent default link behavior
        const info = document.getElementById('buying-guides-info');
        if (info.style.display === "none" || info.style.display === "") {
            info.style.display = "block";
        } else {
            info.style.display = "none";
        }
    });
});
