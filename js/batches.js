/* ================================================================
   EduStart Academy — batches.js
   Filter logic for batch cards
================================================================ */

let activeFilters = { class: 'all', subject: 'all', level: 'all' };

document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const filterType = btn.dataset.filter;
    const filterVal  = btn.dataset.val;

    // Update active button in group
    document.querySelectorAll(`.filter-btn[data-filter="${filterType}"]`)
      .forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    activeFilters[filterType] = filterVal;
    applyFilters();
  });
});

function applyFilters() {
  const cards     = document.querySelectorAll('.b-card');
  const noResults = document.getElementById('noResults');
  let visible     = 0;

  cards.forEach(card => {
    const matchClass   = activeFilters.class   === 'all' || card.dataset.class   === activeFilters.class;
    const matchSubject = activeFilters.subject === 'all' || card.dataset.subject === activeFilters.subject;
    const matchLevel   = activeFilters.level   === 'all' || card.dataset.level   === activeFilters.level;

    if (matchClass && matchSubject && matchLevel) {
      card.classList.remove('filtered-out');
      card.style.display = '';
      visible++;
    } else {
      card.classList.add('filtered-out');
      card.style.display = 'none';
    }
  });

  noResults.classList.toggle('hide', visible > 0);
}
