// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});


// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    window.scrollY > 50 ?
        navbar.style.backgroundColor = 'rgba(10, 10, 10, 0.98)' :
        navbar.style.backgroundColor = 'rgba(10, 10, 10, 0.95)';
});

// Modal open/close
const modal = document.getElementById("contact-modal");
const openBtn = document.querySelector(".cta-button");
const closeBtn = document.querySelector(".close-btn");

openBtn.addEventListener("click", function (e) {
    e.preventDefault();
    modal.style.display = "block";
});

closeBtn.addEventListener("click", function () {
    modal.style.display = "none";
});

window.addEventListener("click", function (e) {
    if (e.target == modal) {
        modal.style.display = "none";
    }
});

// Form submission
const contactForm = document.getElementById("contact-form");

contactForm.addEventListener("submit", async function (e) {
  e.preventDefault();

  const formData = {
    name: document.getElementById("name").value.trim(),
    email: document.getElementById("email").value.trim(),
    phone: document.getElementById("phone").value.trim(),
    message: document.getElementById("message").value.trim()
  };

  try {
    const res = await fetch("/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    });

    if (res.ok) {
      alert("✅ Message sent successfully!");
      contactForm.reset();
      modal.style.display = "none";
    } else {
      alert("❌ Failed to send message. Try again.");
    }
  } catch (err) {
    alert("⚠️ An error occurred. Please try again later.");
    console.error(err);
  }
});
