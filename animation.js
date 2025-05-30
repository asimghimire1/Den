document.addEventListener('DOMContentLoaded', () => {
    // Typed.js Animation for the Heading
    if (document.getElementById('typed')) {
        new Typed('#typed', {
            strings: ["Zero<br>to One", "Ideas<br>to Reality", "Startups<br>to Success"],
            typeSpeed: 90,
            backSpeed: 60,
            loop: true,
            showCursor: true,
            cursorChar: '|',
            autoInsertCss: true
        });
    }

    // Smooth Counting Animation for Stats
    const counters = document.querySelectorAll('.stat-number');
    const duration = 3000; // 3 seconds

    if (counters.length > 0) {
        counters.forEach(counter => {
            const observer = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const target = +counter.getAttribute('data-target');
                        const startTime = performance.now();
                        
                        const animate = (time) => {
                            const progress = Math.min((time - startTime) / duration, 1);
                            const current = Math.floor(progress * target);
                            counter.innerText = `${current.toLocaleString()}+`;

                            const bounce = Math.sin(progress * Math.PI) * 0.1;
                            counter.style.transform = `scale(${1 + bounce})`;

                            if (progress < 1) requestAnimationFrame(animate);
                            else counter.style.transform = 'scale(1)';
                        };

                        requestAnimationFrame(animate);
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });
            
            observer.observe(counter);
        });
    }

    

    // Video Section
    const thumbnail = document.getElementById('thumbnail');
    const video = document.getElementById('video');
    const watchDemoButton = document.getElementById('watch-demo');

    if (thumbnail && video && watchDemoButton) {
        const playVideo = () => {
            thumbnail.style.display = 'none';
            video.style.display = 'block';
            video.play().catch((error) => console.error('Video play failed:', error));
        };

        thumbnail.addEventListener('click', playVideo);
        watchDemoButton.addEventListener('click', playVideo);
    }

    // Hover Effects for Buttons
    const investorButton = document.querySelector('.join-investor');
    const entrepreneurButton = document.querySelector('.join-entrepreneur');

    if (investorButton && entrepreneurButton) {
        entrepreneurButton.addEventListener('mouseenter', () => {
            investorButton.style.backgroundColor = '#E5EDF5';
            investorButton.style.color = '#026181';
        });

        entrepreneurButton.addEventListener('mouseleave', () => {
            investorButton.style.backgroundColor = '';
            investorButton.style.color = '';
        });
    }


    // slider step


// $(function() {
//     gsap.registerPlugin(ScrollTrigger);
//     let images = gsap.utils.toArray(".flip-card");
  
//     gsap.to(images, {
//       xPercent: -100 * (images.length - 1.7),
//       ease: "none",
//       scrollTrigger: {
//         trigger: ".twosections",
//         // pinSpacing: false,
//         pin: true,
//         scrub: 1,
//       //   snap: 1 / (images.length - 1),
//         end: () => "+=" + document.querySelector(".flip-card-inner").offsetWidth}
// });
// });

$(function() {
    gsap.registerPlugin(ScrollTrigger);

    const images = gsap.utils.toArray(".flip-card");
    const dots = document.querySelectorAll('.dot');
    const totalSteps = images.length;

    // GSAP animation for scrolling (original)
    const tl = gsap.to(images, {
        xPercent: -100 * (images.length - 1.7),
        ease: "none",
        scrollTrigger: {
            trigger: ".twosections",
            pin: true,
            scrub: 1,
            // snap: 1 / (images.length - 1),
            end: () => "+=" + document.querySelector(".flip-card-inner").offsetWidth,
            onUpdate: (self) => {
                // Calculate which step is in the center based on scroll progress
                const progress = self.progress;
                const stepWidth = 1 / (totalSteps - 1);
                const activeStepIndex = Math.min(
                    Math.round(progress / stepWidth),
                    totalSteps - 1
                );

                // Update active dot
                dots.forEach(dot => dot.classList.remove('active'));
                dots[activeStepIndex].classList.add('active');
            }
        }
    });

    // Click handler for dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            // Ensure ScrollTrigger is initialized
            if (tl.scrollTrigger) {
                const progress = index / (totalSteps - 1);
                const scrollPosition = tl.scrollTrigger.start + (tl.scrollTrigger.end - tl.scrollTrigger.start) * progress;
                
                // Check if GSAP ScrollTo plugin is available
                if (gsap.plugins.scrollTo) {
                    gsap.to(window, {
                        scrollTo: { y: scrollPosition, autoKill: false },
                        duration: 0.5,
                        ease: "power1.out",
                        onComplete: () => {
                            ScrollTrigger.refresh();
                        }
                    });
                } else {
                    // Fallback to native window.scrollTo
                    window.scrollTo({ top: scrollPosition, behavior: 'smooth' });
                }
            }
        });
    });

    // Ensure ScrollTrigger refreshes on resize
    window.addEventListener('resize', () => {
        ScrollTrigger.refresh();
    });
});
    

    // Reload and Scroll to Top
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);

    const logo = document.querySelector('.logo');
    const footerHeader = document.querySelector('.footer-column h3');

    if (logo) logo.addEventListener('click', () => location.reload());
    if (footerHeader) footerHeader.addEventListener('click', () => location.reload());

    // Back-to-Top Button
    const backToTopButton = document.querySelector('.backtotop');
    const videoContainer = document.querySelector('.video-main-container');

    if (backToTopButton && videoContainer) {
        window.addEventListener('scroll', () => {
            const rect = videoContainer.getBoundingClientRect();
            if (rect.bottom < 0) backToTopButton.classList.add('show');
            else backToTopButton.classList.remove('show');
        });

        backToTopButton.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});



//faq
// JavaScript to toggle FAQ answers
document.addEventListener('DOMContentLoaded', () => {
    // Select all FAQ toggles
    const toggles = document.querySelectorAll('.faq-question-toggle');
    
    // Set the first FAQ item as active by default
    if (toggles.length > 0) {
        const firstItem = toggles[0].parentNode;
        firstItem.classList.add('active');
        toggles[0].style.borderLeft = '8px solid #35819a';
    }

    // Add click event listeners to all toggles
    toggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const parentItem = toggle.parentNode;
            const isActive = parentItem.classList.contains('active');

            // Remove 'active' class from all FAQ items and reset border
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
                item.querySelector('.faq-question-toggle').style.borderLeft = ''; // Default border
            });

            // If the clicked item was not active, activate it and set red border
            if (!isActive) {
                parentItem.classList.add('active');
                toggle.style.borderLeft = '8px solid #35819a';
            }
       });
    });
});
