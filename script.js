document.addEventListener('DOMContentLoaded', function() {
  const smoothScroll = (target) => {
      const startPosition = window.pageYOffset;
      const targetPosition = target.getBoundingClientRect().top + startPosition;
      const startTime = performance.now();
      const duration = 1000; // Duration of the scroll animation in milliseconds
      
      const animation = (currentTime) => {
          const elapsedTime = currentTime - startTime;
          const progress = Math.min(elapsedTime / duration, 1);
          const easeFunction = t => t * (2 - t);
          
          window.scrollTo(0, startPosition + (targetPosition - startPosition) * easeFunction(progress));
          
          if (elapsedTime < duration) {
              requestAnimationFrame(animation);
          }
      };
      
      requestAnimationFrame(animation);
  };

  const scrollLinks = document.querySelectorAll('a[href^="#"]');
  scrollLinks.forEach(link => {
      link.addEventListener('click', (event) => {
          event.preventDefault();
          const targetId = link.getAttribute('href');
          const targetElement = document.querySelector(targetId);
          if (targetElement) {
              smoothScroll(targetElement);
          }
      });
  });
});
