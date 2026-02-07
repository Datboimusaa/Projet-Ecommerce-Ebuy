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