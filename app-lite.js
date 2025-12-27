///////////////////////////////////////////////////////////////////////
// ABC Tools Lite Custom Scripts
// https://github.com/anton-bregolas/abctools-lite
// MIT License
// (c) Anton Zille 2025
///////////////////////////////////////////////////////////////////////

// Custom global variables / constants
var gLiteVersionNumber = 'lite-3115-2';

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