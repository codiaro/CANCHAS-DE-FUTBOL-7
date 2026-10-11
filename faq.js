/**
 * CANCHAS DE FÚTBOL 7 - FAQ ACCORDION & SEARCH FILTER
 */

document.addEventListener('DOMContentLoaded', () => {
  initFaqAccordion();
  initFaqSearch();
});

function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question-btn');
    if (!questionBtn) return;

    questionBtn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Optional: Close others (accordion mode)
      faqItems.forEach(otherItem => {
        if (otherItem !== item) otherItem.classList.remove('active');
      });

      if (isActive) {
        item.classList.remove('active');
      } else {
        item.classList.add('active');
      }
    });
  });
}

function initFaqSearch() {
  const searchInput = document.getElementById('faq-search-input');
  if (!searchInput) return;

  const faqItems = document.querySelectorAll('.faq-item');
  const noResultsMsg = document.getElementById('faq-no-results');

  searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase().trim();
    let visibleCount = 0;

    faqItems.forEach(item => {
      const question = (item.querySelector('.faq-question-btn')?.textContent || '').toLowerCase();
      const answer = (item.querySelector('.faq-answer')?.textContent || '').toLowerCase();

      if (question.includes(query) || answer.includes(query)) {
        item.style.display = 'block';
        visibleCount++;
      } else {
        item.style.display = 'none';
      }
    });

    if (noResultsMsg) {
      noResultsMsg.style.display = (visibleCount === 0 && query !== '') ? 'block' : 'none';
    }
  });
}
