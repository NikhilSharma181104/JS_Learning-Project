// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
        target.scrollIntoView({
        behavior: "smooth",
        block: "start",
        });
    }
    });
});

// Contact form handling
document.querySelector(".contact-form").addEventListener("submit", function (e) {
    e.preventDefault();
    alert("Thank you for your message! I'll get back to you soon.");
    this.reset();
});

// Add scroll effect to navbar
window.addEventListener("scroll", function () {
    const header = document.querySelector("header");
    if (window.scrollY > 100) {
    header.style.backdropFilter = "blur(10px)";
    } else {
    header.style.backgroundColor = "var(--bg-primary)";
    header.style.backdropFilter = "none";
    }
});

// Add animation on scroll for project cards
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
    if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
    }
    });
}, observerOptions);

// Observe project cards for animation
document.querySelectorAll(".project-card").forEach((card) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(30px)";
    card.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(card);
});

let toggleIcon = document.getElementById("icon");

toggleIcon.addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");
    if (document.body.classList.contains("dark-mode")) {
        toggleIcon.classList.remove("fa-moon");
        toggleIcon.classList.add("fa-sun");
    } else {
        toggleIcon.classList.remove("fa-sun");
        toggleIcon.classList.add("fa-moon");
    }
});
