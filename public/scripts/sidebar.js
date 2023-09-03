const dropdowns = document.querySelectorAll('.dropdown');

dropdowns.forEach((d) => {
  const select = d.querySelector('.select');
  const caret = d.querySelector('.caret');
  const menu = d.querySelector('.menu');
  const options = d.querySelectorAll('.menu li');


  select.addEventListener('click', () => {
    select.classList.toggle('select-clicked');
    caret.classList.toggle('caret-rotate');
    menu.classList.toggle('menu-open');
  });

  options.forEach((option) => {
    option.addEventListener('click', () => {
      selected.innerText = option.innerText;
      selected.classList.remove('select-clicked');
      caret.classList.remove('caret-rotate');
      menu.classList.remove('menu-open');

      options.forEach((option) => {
        option.classList.remove('active');
      });
      option.classList.add('active');
    });
  });
});