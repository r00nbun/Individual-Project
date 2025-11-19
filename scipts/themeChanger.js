document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.querySelector('.header__theme-icon');
    const html = document.documentElement;
    const iconTheme = document.querySelector('.header__theme-icon-img');
    const themeHintText = document.querySelector('.header__theme-icon-text');

    toggleButton.addEventListener('click', () => {
        if (html.classList.contains('theme-light')) {
            html.classList.replace('theme-light', 'theme-dark');
            themeHintText.textContent = 'Поменять тему на светлую';
            iconTheme.alt = 'Иконка тёмной темы';
            iconTheme.src = 'images/Dark_theme_icon.svg'
            localStorage.setItem('theme', 'theme-dark');
        } else {
            html.classList.replace('theme-dark', 'theme-light');
            localStorage.setItem('theme', 'theme-light');
            iconTheme.alt = 'Иконка светлой темы';
            themeHintText.textContent = 'Поменять тему на тёмную';
            iconTheme.src = 'images/Light_theme_icon.svg';
        }
    })

    const savedTheme = localStorage.getItem('theme');

    if (savedTheme) {
        html.classList.remove('theme-light', 'theme-dark');
        html.classList.add(savedTheme);

        if (savedTheme === 'theme-dark') {
            themeHintText.textContent = 'Поменять тему на светлую';
            iconTheme.alt = 'Иконка тёмной темы';
            iconTheme.src = 'images/Dark_theme_icon.svg'
        } else {
            themeHintText.textContent = 'Поменять тему на тёмную';
            iconTheme.alt = 'Иконка светлой темы';
            iconTheme.src = 'images/Light_theme_icon.svg';
        }
    }
})