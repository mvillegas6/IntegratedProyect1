const select = document.querySelector('#formSel');

select.addEventListener('change', function() {
    const form = document.querySelector('#postForm');
    form.submit();
})