<script>
// 1. Define the Header Layout
const globalHeader = `
<header>
    <div class="logo">Ochiba <span>Emmanuel</span></div>
    <nav>
        <ul>
            <li><a href="index.html" class="nav-link" data-page="index">About</a></li>
            <li><a href="index.html#skills" class="nav-link" data-page="index">Skills</a></li>
            <li><a href="projects.html" class="nav-link" data-page="projects">Projects</a></li>
            <li><a href="index.html#contact" class="nav-link" data-page="index">Contact</a></li>
        </ul>
    </nav>
</header>
`;

// 2. Define the Footer Layout (Update this with your actual footer HTML)
const globalFooter = `
<footer style="text-align: center; padding: 2rem; border-top: 1px solid #eaeaea; margin-top: 3rem;">
    <p style="font-weight: bold; color: #666;">© 2026 Ochiba Emmanuel. All rights reserved.</p>
    <div style="display: flex; justify-content: center; gap: 1rem; margin-top: 1rem; font-size: 1.5rem;">
        <a href="#" style="color: #000;"><i class="fab fa-linkedin"></i></a>
        <a href="#" style="color: #000;"><i class="fab fa-github"></i></a>
        <a href="#" style="color: #000;"><i class="fab fa-twitter"></i></a>
    </div>
</footer>
`;

// 3. Inject them into the page
document.addEventListener("DOMContentLoaded", () => {
    // Inject Header
    const headerEl = document.getElementById("header-placeholder");
    if (headerEl) {
        headerEl.innerHTML = globalHeader;
        
        // Bonus: Automatically highlight the current active page in yellow
        const currentPath = window.location.pathname;
        const navLinks = headerEl.querySelectorAll(".nav-link");
        
        navLinks.forEach(link => {
            // If the URL contains 'projects.html' and the link is the projects link
            if (currentPath.includes("projects.html") && link.getAttribute("data-page") === "projects") {
                link.style.color = "#FFD700"; 
            }
            // Or if we are on the homepage
            else if (!currentPath.includes("projects.html") && link.getAttribute("data-page") === "index") {
                // You can add logic here if you want 'About' highlighted on the homepage
            }
        });
    }

    // Inject Footer
    const footerEl = document.getElementById("footer-placeholder");
    if (footerEl) {
        footerEl.innerHTML = globalFooter;
    }
});
  
  document.addEventListener("DOMContentLoaded", function () {
    
    // 1. MOBILE NAVIGATION
    const nav = document.querySelector("nav");
    const navLinks = document.querySelector(".nav-links");

    // Create and insert hamburger icon
    const hamburger = document.createElement("div");
    hamburger.classList.add("hamburger");
    hamburger.innerHTML = '<i class="fas fa-bars"></i>';
    nav.insertBefore(hamburger, navLinks);

    hamburger.addEventListener("click", () => {
      navLinks.classList.toggle("active");
      const icon = hamburger.querySelector("i");
      icon.classList.toggle("fa-bars");
      icon.classList.toggle("fa-times");
    });

    // 2. SCROLL SPY – Highlights active section in navbar (includes hero/about logic)
    const sections = document.querySelectorAll("section, header#hero");
    const navItems = document.querySelectorAll(".nav-links a");

    window.addEventListener("scroll", () => {
      let current = "";

      sections.forEach((section) => {
        const sectionTop = section.offsetTop - 150; // Adjust for fixed navbar
        const sectionId = section.getAttribute("id");

        if (window.scrollY >= sectionTop) {
          current = sectionId;
        }
      });

      // Special case: at the very top, highlight "About" (since hero acts as About)
      if (window.scrollY < 200) {
        current = "hero"; // We'll map this to "About" link
      }

      navItems.forEach((item) => {
        item.classList.remove("active");
        let targetId = item.getAttribute("href").substring(1); // Remove #
        
        // Map hero to "About" link
        if (current === "hero" && targetId === "about") {
          item.classList.add("active");
        } else if (targetId === current) {
          item.classList.add("active");
        }
      });
    });

    // 3. FADE-IN ANIMATION ON SCROLL
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("fade-in");
          }
        });
      },
      { threshold: 0.1 }
    );

    // Observe all skill tags and project cards
    document.querySelectorAll(".skill-tag, .project-card").forEach((el) => {
      observer.observe(el);
    });

    // 4. CONTACT FORM SUBMISSION WITH FORMSPREE
    const contactForm = document.querySelector("#contact form");
    if (contactForm) {
      contactForm.addEventListener("submit", async function (e) {
        e.preventDefault();

        const submitBtn = contactForm.querySelector("button[type='submit']");
        const originalText = submitBtn.textContent;
        submitBtn.textContent = "Sending...";
        submitBtn.disabled = true;

        const formspreeID = "xqezznpk"; // Your real Formspree endpoint

        const formData = new FormData(contactForm);

        try {
          const response = await fetch(`https://formspree.io/f/${formspreeID}`, {
            method: "POST",
            body: formData,
            headers: {
              Accept: "application/json",
            },
          });

          if (response.ok) {
            contactForm.innerHTML = `
              <div style="text-align:center; padding:2rem; background:#fffbe6; border-radius:12px; color:#000;">
                <i class="fas fa-check-circle" style="font-size:3rem; color:#FFD700; margin-bottom:1rem;"></i>
                <h3>Message Sent Successfully!</h3>
                <p>Thank you! I'll get back to you as soon as possible.</p>
              </div>`;
          } else {
            throw new Error("Form submission failed");
          }
        } catch (error) {
          alert("Sorry, there was an error sending your message. Please try again or email me directly at nuelochiba@gmail.com.");
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
        }
      });
    }
  });
</script>