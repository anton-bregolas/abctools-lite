///////////////////////////////////////////////////////////////////////
// ABC Tools Lite Custom Scripts
// https://github.com/anton-bregolas/abctools-lite
// MIT License
// (c) Anton Zille 2025
///////////////////////////////////////////////////////////////////////

// Custom global variables / constants
var gLiteVersionNumber = 'lite-3129-6';

var ABC_TOOLS_BASE_URL =
  window.location.origin + window.location.pathname.replace(/\/[^\/]*$/, '/');

var ABC_TOOLS_EDITOR_URL =
  `${ABC_TOOLS_BASE_URL}abctools.html`;
  
var ABC_TOOLS_VERSION_FILE_URL =
  `${ABC_TOOLS_BASE_URL}abc_lite_version.json`;

// Custom Export PDF fonts

var PDF_FONT_FIRA_REGULAR = "./fonts/firasans-regular.js";
var PDF_FONT_FIRA_BOLD = "./fonts/firasans-semibold.js";
var PDF_FONT_FIRA_ITALIC = "./fonts/firasans-italic.js";
var PDF_FONT_FIRA_BOLDITALIC = "./fonts/firasans-semibolditalic.js";

////////////////////////////////////////////
// APP LITE: AUTO-SCALE NOTATION
///////////////////////////////////////////

// Add notation auto-scaling data (enabled via gAutoScaleNotation)

function setAutoScaleNotation() {
  document.body.dataset.notationScaling = "auto";
  document.body.style.setProperty("--abctools-notation-fullscreen-scaling", `${gFullScreenScaling}%`);
}

// Check if notation auto-scaling has been applied by the app

function isAutoScaleNotationApplied() {
  return !!document.body.style.getPropertyValue("--abctools-notation-fullscreen-scaling");
}

// Remove notation auto-scaling data

function resetAutoScaleNotation() {
  document.body.removeAttribute("data-notation-scaling");
  document.body.style.removeProperty("--abctools-notation-fullscreen-scaling");
}

////////////////////////////////////////////
// APP LITE: SHOW / HIDE UI ELEMENTS
///////////////////////////////////////////

// Show bottom button bar of the editor (setting stored via gBottomBarShowing)

function liteShowBottomBar() {

  document.body.dataset.abctoolsUiBottomBar = "show";
}

// Hide bottom button bar of the editor (setting stored via gBottomBarShowing)

function liteHideBottomBar() {

  document.body.removeAttribute("data-abctools-ui-bottom-bar");
}

// Show or hide bottom button bar depending on the current localStorage setting

function liteRestoreBottomBar() {

  const wasBottomBarHidden = 
    gLocalStorageAvailable && localStorage.abcLiteHideBottomBar && localStorage.abcLiteHideBottomBar === "true";

  if (wasBottomBarHidden) {

    liteHideBottomBar();
    return;
  } 

  liteShowBottomBar();
}

////////////////////////////////////////////
// APP LITE: SHIFT FOCUS / RESET POSITION
///////////////////////////////////////////

// Shift focus to the currently used ABC text field

function doFocusAbc() {

  if (gEnableSyntax) {

    gTheCM.focus();

  } else {

    gTheABC.focus();
  }
}

// Reset ABC text field selection

function resetAbcSelection() {

  if (gEnableSyntax) {

    // Set the selection to the start of the tune
    gTheCM.selectionStart = 0;
    gTheCM.selectionEnd = 0;

  } else {

    // Set the selection to the start of the tune
    gTheABC.selectionStart = 0;
    gTheABC.selectionEnd = 0; 
  }
}

// Reset ABC text field scroll position

function resetAbcScroll() {

  if (gEnableSyntax) {

    // Scroll it to the top
    gTheCM.getScrollerElement().scrollTo(0, 0);

  } else {

    // Scroll it to the top
    gTheABC.scrollTo(0, 0);    
  }
}

// Shift focus to player controls

function doPlayerFocus() {

  const playButton = document.querySelector('.abcjs-midi-start');

  if (playButton) playButton.focus();
}