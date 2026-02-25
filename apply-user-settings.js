///////////////////////////////////////////////////////////////////////
// ABC Tools Lite Apply User Settings Scripts
// https://github.com/anton-bregolas/abctools-lite
// MIT License
// (c) Anton Zille 2025-2026
///////////////////////////////////////////////////////////////////////

// Check and apply the user's color theme and fonts preferences

document.addEventListener('DOMContentLoaded', () => {

  if (!storageAvailable('localStorage')) {

    console.warn(`Local Storage not available: Custom settings will not be applied`);
    return;
  }

  const userTheme = localStorage.abcLitePrefersColorTheme;
  const userFontCode = localStorage.abcLitePrefersFontCode;
  const userFontUi = localStorage.abcLitePrefersFontUi;

  if (userFontUi && userFontUi !== 'Fira Sans') {

    document.body.style.setProperty("--abctools-font-ui", userFontUi);
  }

  if (userFontCode && userFontCode !== 'Fira Mono') {

    document.body.style.setProperty("--abctools-font-code", userFontCode);
  }

  if ((!userTheme &&
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches) ||
      userTheme === "dark") {
      
    document.body.dataset.theme = "dark";
    return;
  }

  if (userTheme) {

    document.body.dataset.theme = userTheme;
  }
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// storage-available by Stijn de Witt
// GitHub Repo: https://github.com/Download/storage-available
// MIT License
// Copyright (c) 2016 Stijn de Witt <StijnDeWitt@hotmail.com>
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Detect if web storage is available and functional

function storageAvailable(type) {
  try {
    var storage = window[type],
      x = '__storage_test__';
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  }
  catch(e) {
    return false;
  }
}