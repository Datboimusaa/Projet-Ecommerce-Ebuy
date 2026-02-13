//------------------------------------------------ Header ------------------------------------------------//

// Header dropdowns
const dropdownBtn = document.querySelectorAll('.dropdown-btn');

dropdownBtn.forEach(btn => {
    btn.addEventListener('click', () => {
        const dropdown = btn.nextElementSibling;

        document.querySelectorAll('.dropdown-content').forEach(menu => {
            if (menu !== dropdown) {
                menu.classList.add('hidden');
            }
        });

        dropdown.classList.toggle('hidden');
    });
});

// Header Offcanvas
const offcanvasBtn = document.querySelector('.offcanvas-btn')

offcanvasBtn.addEventListener('click', () => {
    const dropdownContent = offcanvasBtn.nextElementSibling;
    dropdownContent.classList.remove('hidden');
}) 

const closeBtn = document.querySelector('.close-btn')
closeBtn.addEventListener('click', () => {
    const offcanvasContent = document.querySelector('.offcanvas-content');
    offcanvasContent.classList.add('hidden');
})