
  
    const slider = document.querySelector('.about-slider');
    const slides = document.querySelectorAll('.about-slide');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const dots = document.querySelectorAll('.dot');

    let currentSlide = 0;
    let startX = 0;
    let isDragging = false;

    function updateSlider() {
      slider.style.transform = `translateX(-${currentSlide * 100}%)`;
      
    
      dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
      });
    }

    function nextSlide() {
      currentSlide = (currentSlide + 1) % slides.length;
      updateSlider();
    }

    function prevSlide() {
      currentSlide = (currentSlide - 1 + slides.length) % slides.length;
      updateSlider();
    }


    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

  
    dots.forEach(dot => {
      dot.addEventListener('click', () => {
        currentSlide = parseInt(dot.dataset.slide);
        updateSlider();
      });
    });

    slider.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
      isDragging = true;
    });

    slider.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
    });

    slider.addEventListener('touchend', (e) => {
      if (!isDragging) return;
      
      const endX = e.changedTouches[0].clientX;
      const diff = startX - endX;
      
      if (diff > 50) {
        nextSlide();
      } else if (diff < -50) {
        prevSlide();
      }
      
      isDragging = false;
    });

    
    let autoplayInterval = setInterval(nextSlide, 5000);

    const sliderContainer = document.querySelector('.about-slider-container');
    sliderContainer.addEventListener('mouseenter', () => {
      clearInterval(autoplayInterval);
    });

    sliderContainer.addEventListener('mouseleave', () => {
      autoplayInterval = setInterval(nextSlide, 5000);
    });

    // Testimonial Slider JavaScript
const testimonialSlider = document.querySelector('.testimonial-slider');
const testimonialSlides = document.querySelectorAll('.testimonial-slide');
const prevTestimonialBtn = document.getElementById('prevTestimonialBtn');
const nextTestimonialBtn = document.getElementById('nextTestimonialBtn');
// Select only the dots inside the testimonial slider controls (HTML uses data-slide)
const testimonialDots = document.querySelectorAll('.testimonial-slider-container .slider-dots .dot');

let currentTestimonialSlide = 0;
let testimonialStartX = 0;
let isTestimonialDragging = false;

function updateTestimonialSlider() {
  testimonialSlider.style.transform = `translateX(-${currentTestimonialSlide * 100}%)`;
  
  testimonialDots.forEach((dot, index) => {
    dot.classList.toggle('active', index === currentTestimonialSlide);
  });
}

function nextTestimonialSlide() {
  currentTestimonialSlide = (currentTestimonialSlide + 1) % testimonialSlides.length;
  updateTestimonialSlider();
}

function prevTestimonialSlide() {
  currentTestimonialSlide = (currentTestimonialSlide - 1 + testimonialSlides.length) % testimonialSlides.length;
  updateTestimonialSlider();
}

nextTestimonialBtn.addEventListener('click', nextTestimonialSlide);
prevTestimonialBtn.addEventListener('click', prevTestimonialSlide);

testimonialDots.forEach(dot => {
  dot.addEventListener('click', () => {
    // HTML uses data-slide on the testimonial dots (same name as about-slider dots)
    const idx = dot.dataset.slide;
    if (typeof idx !== 'undefined') {
      currentTestimonialSlide = parseInt(idx, 10);
      updateTestimonialSlider();
    }
  });
});

testimonialSlider.addEventListener('touchstart', (e) => {
  testimonialStartX = e.touches[0].clientX;
  isTestimonialDragging = true;
});

testimonialSlider.addEventListener('touchend', (e) => {
  if (!isTestimonialDragging) return;
  
  const endX = e.changedTouches[0].clientX;
  const diff = testimonialStartX - endX;
  
  if (diff > 50) {
    nextTestimonialSlide();
  } else if (diff < -50) {
    prevTestimonialSlide();
  }
  
  isTestimonialDragging = false;
});

let testimonialAutoplay = setInterval(nextTestimonialSlide, 6000);

const testimonialContainer = document.querySelector('.testimonial-slider-container');
testimonialContainer.addEventListener('mouseenter', () => {
  clearInterval(testimonialAutoplay);
});

testimonialContainer.addEventListener('mouseleave', () => {
  testimonialAutoplay = setInterval(nextTestimonialSlide, 6000);
});

// Contact Form Handler
document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contactForm');

  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();

      // Get form values
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const subject = document.getElementById('subject').value;
      const message = document.getElementById('message').value;

      // Basic validation
      if (name && email && subject && message) {
        // Show success message
        showSuccessMessage(name);

        // Reset form
        contactForm.reset();

        // Log form data (in production, you would send this to a server)
        console.log('Form submitted with:');
        console.log('Name:', name);
        console.log('Email:', email);
        console.log('Subject:', subject);
        console.log('Message:', message);
      }
    });
  }

  // Input field animations
  const inputs = document.querySelectorAll('.form-group input, .form-group textarea');
  inputs.forEach(input => {
    input.addEventListener('focus', function() {
      this.parentElement.classList.add('focused');
    });

    input.addEventListener('blur', function() {
      if (this.value === '') {
        this.parentElement.classList.remove('focused');
      }
    });
  });
});


function showSuccessMessage(name) {

  const successDiv = document.createElement('div');
  successDiv.className = 'success-message';
  successDiv.innerHTML = `
    <h3>✓ Message Sent!</h3>
    <p>Thank you, ${name}! Your message has been received.</p>
    <p>I'll get back to you as soon as possible.</p>
  `;

 
  document.body.appendChild(successDiv);

  
  setTimeout(() => {
    successDiv.classList.add('show');
  }, 100);

 
  setTimeout(() => {
    successDiv.classList.remove('show');
    setTimeout(() => {
      document.body.removeChild(successDiv);
    }, 300);
  }, 3000);
}

const observerOptions = {
  threshold: 0.2,
  rootMargin: '0px 0px -100px 0px'
};

const contactObserver = new IntersectionObserver(function(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '0';
      entry.target.style.transform = 'translateX(-50px)';
      
      setTimeout(() => {
        entry.target.style.transition = 'all 0.6s ease';
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateX(0)';
      }, 100);
      
      contactObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

document.addEventListener('DOMContentLoaded', function() {
  const contactItems = document.querySelectorAll('.contact-item');
  contactItems.forEach((item, index) => {
    item.style.transitionDelay = `${index * 0.1}s`;
    contactObserver.observe(item);
  });
});

// Hamburger Menu Toggle (robust selectors + guards)
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
  });

  // Close menu when clicking on a nav link
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
      hamburger.classList.remove('active');
      navLinks.classList.remove('active');
    }
  });
} else {
  // Defensive: if elements missing, don't throw errors; log for debugging
  console.warn('Hamburger or nav-links element not found.');
}
