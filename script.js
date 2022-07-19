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

function initTheme() {
  // If user has dark preference, set the dark theme by default.

  // LocalStorage overrides this however, as the user has then changed the theme,
  // which we want to persist to those settings then.
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
  const storedTheme = localStorage.getItem('theme');

  if (storedTheme === 'dark') {
    ThemeSwitchTxt.innerText = 'Light';

    return updateThemeClasses('dark');
  }

  if (storedTheme === 'light') {
    ThemeSwitchTxt.innerText = 'Dark';

    return updateThemeClasses('light');
  }

  if (prefersDarkScheme.matches) {
    ThemeSwitchTxt.innerText = 'Dark';

    return updateThemeClasses('dark');
  }
}


// Submit form
function submitForm(e) {
  e.preventDefault();

  const githubUsername = document.getElementById('github-username').value;

  fetchUser(githubUsername);
}

// Fetch user by username with github API
async function fetchUser(username) {
  SearchError.classList.add('hidden');

  try {
    const response = await fetch(`https://api.github.com/users/${username}`);
    const parsedResponse = await response.json();

    if (!response.ok) {
      return SearchError.classList.remove('hidden');
    }

    return updateDOM(parsedResponse);
  } catch (err) {
    return console.log(err);
  }
}

// Default user to be displayed
fetchUser('NinjaInShade');

// Default theme to be activated
initTheme();
