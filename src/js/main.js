import { loadHeaderFooter } from './utils.mjs';

loadHeaderFooter();

// Newsletter Signup Functionality
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('newsletter-form');
  const message = document.getElementById('newsletter-message');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      const email = form.email.value;
      // This can be send to a backend but for now, we will just show a message
      message.textContent = "Thank you for subscribing!";
      form.reset();
    });
  }
});
// End of Newsletter Signup Functionality
