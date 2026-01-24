///////////////////////////////////////////////////////////////////////
// ABC Tools Lite Custom Scripts
// https://github.com/anton-bregolas/abctools-lite
// MIT License
// (c) Anton Zille 2025
///////////////////////////////////////////////////////////////////////

// Custom global variables / constants
var gLiteVersionNumber = 'lite-3129-9';

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

////////////////////////////////////////////
// APP LITE: UI MENU (LEGACY) CUSTOM ITEMS
///////////////////////////////////////////

// Populate and open ABC Tools Links Center

function openAbcToolsLinks() {

  let modalContent = '';

  // Modal Dialog Header
  modalContent +=
    '<h2 class="modal-header modal-header-settings">' +
    'ABC Tools Links Center' +
    '</h2>';

  // Modal Dialog Body
  modalContent +=
    '<div id="abc-tools-links-dialog" class="adv-tabs">';
  
  // Modal Tabs
  modalContent +=
    '<div class="adv-tab-bar">' +
      '<button type="button" class="adv-tab-btn active" data-tab="tab_pages" aria-selected="true">Pages</button>' +
      '<button type="button" class="adv-tab-btn" data-tab="tab_specs">Specs</button>' +
      '<button type="button" class="adv-tab-btn" data-tab="tab_tools">Tools</button>' +
      '<button type="button" class="adv-tab-btn" data-tab="tab_eskin">Michael Eskin</button>' +
      '<button type="button" class="adv-tab-btn" data-tab="tab_zille">Anton Zille</button>' +
    '</div>';

  // Modal Panels
  modalContent +=
    '<div class="adv-tab-panels">' +
      '<div id="tab_pages" class="adv-tab-panel adv-tab-links-container active">' +
        // Pages
        '<a href="https://michaeleskin.com/abctools/userguide.html" target="_blank" class="btn btn-link" title="Open ABC Transcription Tools User Guide (External Link)" aria-title="Open ABC Transcription Tools User Guide (External Link)">ABC Tools User Guide</a>' +
        '<a href="tunesources.html" target="_blank" class="btn btn-link" title="Open ABC Tools Lite Tune Sources Page" aria-title="Open ABC Tools Lite Tune Sources Page">ABC Tune Sources</a>' +
        '<a href="credits.html" target="_blank" class="btn btn-link" title="Open ABC Tools Lite Credits Page" aria-title="Open ABC Tools Lite Credits Page">Credits & Thanks</a>' +
      '</div>' +
      '<div id="tab_specs" class="adv-tab-panel adv-tab-links-container">' +
        // Specs
        '<a href="https://abcnotation.com/wiki/abc:standard:v2.1" target="_blank" class="btn btn-link" title="Open ABC Notation Standard Wiki (External Link)" aria-title="Open ABC Notation Standard Wiki (External Link)">ABC Standard v2.1</a>' +
        '<a href="https://michaeleskin.com/abctools/ABCquickRefv0_6.pdf" target="_blank" class="btn btn-link" title="Open ABC Notation Quick Reference (External Link)" aria-title="Open ABC Notation Quick Reference (External Link)">ABC Quick Reference</a>' +
        '<a href="https://michaeleskin.com/abctools/general_midi_extended_v10.pdf" target="_blank" class="btn btn-link" title="Open MIDI Quick Reference (External Link)" aria-title="Open MIDI Quick Reference (External Link)">MIDI Quick Reference</a>' +
      '</div>' +
      '<div id="tab_tools" class="adv-tab-panel adv-tab-links-container">' +
        // Tools
        
      '</div>' +
      '<div id="tab_eskin" class="adv-tab-panel adv-tab-links-container">' + 
        // Michael Eskin
        '<a href="https://michaeleskin.com/" target="_blank" class="btn btn-link" title="Open Michael Eskin\'s Homepage (External Link)" aria-title="Open Michael Eskin\'s Homepage (External Link)">Homepage</a>' +
        '<a href="https://michaeleskin.com/abctools/tipjars.html" target="_blank" class="btn btn-link" title="Open Michael Eskin\'s Tip Jars (External Link)" aria-title="Open Michael Eskin\'s Tip Jars (External Link)">Tip Jars</a>' +
        '<a href="https://michaeleskin.com/tunebooks.html" target="_blank" class="btn btn-link" title="Open Michael Eskin\'s Tunebooks (External Link)" aria-title="Open Michael Eskin\'s Tunebooks (External Link)">Tunebooks</a>' +
      '</div>' +
      '<div id="tab_zille" class="adv-tab-panel adv-tab-links-container">' +
        // Anton Zille
        '<a href="https://github.com/anton-bregolas/abctools-lite" target="_blank" class="btn btn-link" title="Open ABC Tools Lite GitHub Page (External Link)" aria-title="Open ABC Tools Lite GitHub Page (External Link)">ABC Tools Lite (GitHub)</a>' +
        '<a href="https://ns.tunebook.app/" target="_blank" class="btn btn-link" title="Open Novi Sad Session Setlist App (External Link)" aria-title="Open Novi Sad Session Setlist App (External Link)">NS Session Setlist</a>' +
        '<a href="https://denis.tunebook.app/" target="_blank" class="btn btn-link" title="Open Project Denis App (External Link)" aria-title="Open Project Denis App (External Link)">#ProjectDenis</a>' +
      '</div>' +
    '</div>';
  
  // Modal Dialog Body Close
  modalContent += '</div>';

  DayPilot.Modal.alert(modalContent, {
    theme: "modal_flat",
    top: 50,
    width: 700,
    scrollWithPage: (AllowDialogsToScroll())
  });

  openAbcToolsLinks_InitTabs();
}

// Select tab in ABC Tools Links Center

function openAbcToolsLinks_SelectTab(tabId) {

  const dialog =
    document.getElementById("abc-tools-links-dialog");
  
  if (!dialog) return;

  const buttons = dialog.querySelectorAll(".adv-tab-btn");
  const panels = dialog.querySelectorAll(".adv-tab-panel");

  buttons.forEach(function(btn) {
    var active = (btn.getAttribute("data-tab") === tabId);
    btn.classList.toggle("active", active);
    btn.setAttribute("aria-selected", active ? "true" : "false");
  });

  panels.forEach(function(panel) {
    panel.classList.toggle("active", panel.id === tabId);
  });
}

// Initialize tabs in ABC Tools Links Center

function openAbcToolsLinks_InitTabs() {

  const dialog =
    document.getElementById("abc-tools-links-dialog");

  const tabs = dialog.querySelectorAll('[data-tab]');

  tabs.forEach(
    el => el.addEventListener(
      'click',
      () => openAbcToolsLinks_SelectTab(el.dataset.tab)
    )
  );
}