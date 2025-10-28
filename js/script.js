// Initialize AOS Animations

AOS.init({
  duration: 1000,
  once: true
});

// Smooth Scrolling for Navbar Links

document.querySelectorAll('#navbar .nav-link').forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    const navbarHeight = document.getElementById('navbar').offsetHeight;
    const targetPosition = target.offsetTop - navbarHeight + 1;
    window.scrollTo({ top: targetPosition, behavior: 'smooth' });
  });
});

// Active Navbar Link Highlight on Scroll

const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('#navbar .nav-link');

function updateActiveLink() {
  const scrollPos = window.scrollY + document.getElementById('navbar').offsetHeight + 5;
  sections.forEach(section => {
    const top = section.offsetTop;
    const bottom = top + section.offsetHeight;
    if (scrollPos >= top && scrollPos < bottom) {
      const id = section.getAttribute('id');
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${id}`) {
          link.classList.add('active');
        }
      });
    }
  });
}

window.addEventListener('scroll', updateActiveLink);
window.addEventListener('load', updateActiveLink);

// Back to Top
const backToTopBtn = document.getElementById("backToTop");
backToTopBtn.style.display = "none"; // Always hide on load

window.addEventListener('scroll', () => {
  if (window.scrollY > 250) {
    backToTopBtn.style.display = "flex";
  } else {
    backToTopBtn.style.display = "none";
  }
});

backToTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Contact Form Submission via EmailJS

(function() {
  emailjs.init("-Npn4C8BPqvGKIWP8");
})();

const contactForm = document.getElementById('contact-form');

if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();

    emailjs.sendForm('service_9adnqu2', 'template_zo1yh7v', this)
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Message Sent!',
          text: 'I’ll get back to you soon',
          confirmButtonColor: '#5BC0BE'
        });
        contactForm.reset();
      })
      .catch(error => {
        Swal.fire({
          icon: 'error',
          title: 'Oops!',
          text: 'Something went wrong. Try again later.',
          confirmButtonColor: '#3A506B'
        });
        console.error('EmailJS error:', error);
      });
  });
}

// Download Resume
const resumeButton = document.getElementById("resumeDownload");
const notifyForm = document.getElementById("notify-form");
const resumeUrl = "resume/Yuvasreee M Resume.pdf";


resumeButton.addEventListener("click", function (e) {
  e.preventDefault();
  const modal = new bootstrap.Modal(document.getElementById("notifyModal"));
  modal.show();
});


notifyForm.addEventListener("submit", function (e) {
  e.preventDefault();

  emailjs.sendForm("service_9adnqu2", "template_9v74efa", this)
    .then(() => {
      Swal.fire({
        icon: 'success',
        title: 'Thank you!',
        confirmButtonColor: '#5BC0BE'
      });


      const link = document.createElement('a');
      link.href = resumeUrl;
      link.download = 'Yuvasree_M_Resume.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

    
      bootstrap.Modal.getInstance(document.getElementById("notifyModal")).hide();
      this.reset();
    })
    .catch(err => {
      Swal.fire({
        icon: 'error',
        title: 'Oops!',
        text: 'Something went wrong. Try again later.',
        confirmButtonColor: '#3A506B'
      });
      console.error('EmailJS error:', err);
    });
});


document.querySelector('#notifyModal .btn-outline-secondary')
  .addEventListener('click', () => {
    const link = document.createElement('a');
    link.href = resumeUrl;
    link.download = 'Yuvasree_M_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });
document.addEventListener("DOMContentLoaded", () => {
  const scrollWrapper = document.querySelector(".projects-scroll-wrapper");
  if (!scrollWrapper) return;

  let scrollSpeed = 0.5; 
  let isPaused = false;

  const cards = Array.from(scrollWrapper.children);
  cards.forEach(card => scrollWrapper.appendChild(card.cloneNode(true)));

  function autoScroll() {
    if (!isPaused) {
      scrollWrapper.scrollLeft += scrollSpeed;
      if (scrollWrapper.scrollLeft >= scrollWrapper.scrollWidth / 2) {
        scrollWrapper.scrollLeft = 0;
      }
    }
    requestAnimationFrame(autoScroll);
  }

  scrollWrapper.addEventListener("mouseenter", () => (isPaused = true));
  scrollWrapper.addEventListener("mouseleave", () => (isPaused = false));

  autoScroll();
});
