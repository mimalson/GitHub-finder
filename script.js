const body = document.body;
const ThemeSwitchTxt = document.getElementById('theme-switch-text');
const SearchError = document.getElementById('search-error');
const moonIcon = document.getElementById('moon');
const sunIcon = document.getElementById('sun');



// Toggles body class and switches over icons
function updateThemeClasses(themeToSwitchTo) {
  sunIcon.classList.add('hidden');
  moonIcon.classList.add('hidden');

  if (themeToSwitchTo === 'dark') {
    sunIcon.classList.remove('hidden');
    return body.classList.add('dark-theme');
  }

  moonIcon.classList.remove('hidden');
  body.classList.remove('dark-theme');
}

// Switch light themes via button
function switchTheme() {
  // If it contains dark-theme class, we're switching to light theme
  if (body.classList.contains('dark-theme')) {
    ThemeSwitchTxt.innerText = 'Dark';

    localStorage.setItem('theme', 'light');

    return updateThemeClasses('light');
  } else {
    ThemeSwitchTxt.innerText = 'Light';

    localStorage.setItem('theme', 'dark');

    return updateThemeClasses('dark');
  }
}
