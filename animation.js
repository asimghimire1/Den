document.addEventListener('DOMContentLoaded', function() {
    // Typed.js animation for the heading
    var typed = new Typed('#typed', {
        strings: ["Zero<br>to One", "Ideas<br>to Reality", "Startups<br>to Success"],
        typeSpeed: 90,
        backSpeed: 60,
        loop: true,
        showCursor: true,
        cursorChar: '|',
        autoInsertCss: true
    });

    // Smooth counting animation for the stats
    const counters = document.querySelectorAll('.stat-number');
    const duration = 3000; // Duration of the animation in milliseconds (3 seconds)

    counters.forEach(counter => {
        const updateCount = (timestamp) => {
            if (!counter.startTime) counter.startTime = timestamp;
            const progress = Math.min((timestamp - counter.startTime) / duration, 1);
            const target = +counter.getAttribute('data-target');
            const current = Math.floor(progress * target);
            
            if (progress < 1) {
                counter.innerText = current.toLocaleString() + '+';
                // Subtle bounce effect with a slight scale increase
                const bounce = Math.sin(progress * Math.PI) * 0.1;
                counter.style.transform = `scale(${1 + bounce})`;
                requestAnimationFrame(updateCount);
            } else {
                counter.innerText = target.toLocaleString() + '+';
                counter.style.transform = 'scale(1)';
            }
        };

        // Trigger the animation when the counter comes into view
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    requestAnimationFrame(updateCount);
                    observer.unobserve(entry.target); // Stop observing once animation starts
                }
            });
        }, { threshold: 0.5 });

        observer.observe(counter);
    });

    // Particle animation
    function createParticles() {
        const container = document.getElementById('particles-container');
        const particleCount = 1; 
        const colors = [
            'hsl(0, 0%, 100%)', 
            'hsl(0, 0%, 90%)', 
            'hsl(0, 0%, 80%)', 
            'hsl(0, 0%, 70%)'  
        ];

        function spawnParticle() {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            particle.style.left = `${Math.random() * 100}%`; // Random horizontal position
            particle.style.bottom = `0`; // Start from the bottom of the page
            particle.style.background = colors[Math.floor(Math.random() * colors.length)]; // Random white/grey color
            // Add custom properties for animation variation
            particle.style.setProperty('--x-offset', `${(Math.random() - 0.5) * 50}px`); // Horizontal drift
            particle.style.setProperty('--y-offset', `${Math.random() * -50}px`); // Slight vertical variation
            particle.style.animationDelay = `${Math.random() * 2}s`;
            container.appendChild(particle);

            // Remove particle after animation ends
            particle.addEventListener('animationend', () => {
                particle.remove();
            });
        }

        // Create initial particles
        for (let i = 0; i < particleCount; i++) {
            spawnParticle();
        }

        // Spawn new particles less frequently
        setInterval(spawnParticle, 500); // Every 500ms
    }

    // Initialize particles
    createParticles();
});


// VIDEO SECTION HAI

  const thumbnail = document.getElementById("thumbnail");
  const video = document.getElementById("video");

  thumbnail.addEventListener("click", function () {
    thumbnail.style.display = "none"; // hide thumbnail
    video.style.display = "block";    // show video
    video.play().catch((error) => {
      console.error("Video play failed:", error);
    });
  });


const buttonGroup = document.querySelector('.button-group');
const investorButton = document.querySelector('.join-investor');
const entrepreneurButton = document.querySelector('.join-entrepreneur');

[investorButton, entrepreneurButton].forEach(button => {
  button.addEventListener('mouseenter', () => {
    buttonGroup.classList.add('group-hover');
  });
  button.addEventListener('mouseleave', () => {
    buttonGroup.classList.remove('group-hover');
  });
});

// JavaScript to toggle FAQ answers
        document.querySelectorAll('.faq-question-toggle').forEach(toggle => {
    toggle.addEventListener('click', () => {
        const parentItem = toggle.parentNode;
        parentItem.classList.toggle('active');
    });
});






// slider step


$(function() {
    let images = gsap.utils.toArray(".flip-card");
  
    gsap.to(images, {
      xPercent: -100 * (images.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: ".twosections",
        // pinSpacing: false,
        pin: true,
        scrub: 1,
      //   snap: 1 / (images.length - 1),
        end: () => "+=" + document.querySelector(".flip-card-inner").offsetWidth + 4
      }
    });
  
  });