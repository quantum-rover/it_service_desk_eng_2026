// JavaScript to handle the popup and form submission
document.addEventListener('DOMContentLoaded', function () {
    // Initialize EmailJS
    (function() {
        emailjs.init("f8XNDClNWjhbyD7FG"); // Your EmailJS user ID
    })();

    // Popup functionality
    const contactBtn = document.getElementById('contactBtn');
    const contactPopup = document.getElementById('contactPopup');
    const closeBtn = document.querySelector('.close-btn');
    const contactForm = document.getElementById('contact-form');

    // Show the popup when the contact button is clicked
    if (contactBtn) {
        contactBtn.addEventListener('click', (e) => {
            e.preventDefault();
            contactPopup.style.display = 'block';
        });
    }

    // Hide the popup when the close button is clicked
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            contactPopup.style.display = 'none';
        });
    }

    // Hide the popup when clicking outside of the popup content
    window.addEventListener('click', (e) => {
        if (e.target === contactPopup) {
            contactPopup.style.display = 'none';
        }
    });

    // Handle form submission with EmailJS
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent page reload

            // Show sending state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            // Send email using EmailJS
            emailjs.sendForm('service_dwdptsh', 'template_koreks3', this)
                .then(function() {
                    alert('Message sent successfully! I will get back to you soon.');
                    contactForm.reset(); // Clear the form
                    contactPopup.style.display = 'none'; // Close the popup
                }, function(error) {
                    alert('Failed to send message. Please try again or email me directly at eduard.popov@email.com');
                    console.error('EmailJS Error:', error);
                })
                .finally(function() {
                    // Restore button state
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                });
        });
    }

    // Smooth scrolling for sidebar links
    const sidebarLinks = document.querySelectorAll('.sidebar a[href^="#"]');
    
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add active state to sidebar links based on scroll position
    const sections = document.querySelectorAll('.cv-content section');
    
    function updateActiveSidebarLink() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        sidebarLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveSidebarLink);
    
    // Update copyright year automatically
    const footerYear = document.querySelector('footer p');
    if (footerYear) {
        const currentYear = new Date().getFullYear();
        footerYear.innerHTML = `Eduard Popov &copy; ${currentYear}`;
    }
});

// Add some CSS for active sidebar link (add to your styles.css if desired)
const style = document.createElement('style');
style.textContent = `
    .sidebar ul li a.active {
        color: #2c3e50;
        font-weight: bold;
        border-left: 3px solid #4a90e2;
        padding-left: 10px;
    }
`;
document.head.appendChild(style);
