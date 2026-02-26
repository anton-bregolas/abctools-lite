///////////////////////////////////////////////////////////////////////
// ABC Tools Lite Custom Scripts
// https://github.com/anton-bregolas/abctools-lite
// MIT License
// (c) Anton Zille 2025
///////////////////////////////////////////////////////////////////////

// Custom global variables / constants
var gLiteVersionNumber = 'lite-3177-7';

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

// Custom External Resource URLs

const ABC_TOOLS_LITE_README_URL =
  "https://github.com/anton-bregolas/abctools-lite#abc-tools-lite";

////////////////////////////////////////////
// APP LITE: ADD CUSTOM DATA-ATTR
///////////////////////////////////////////

// Add compact mode data

function liteEnableCompactMode() {
  document.body.dataset.mode = "compact";
}

// Reset current mode data

function liteResetCurrentMode() {
  document.body.removeAttribute("data-mode");
}

////////////////////////////////////////////
// APP LITE: AUTO-SCALE NOTATION
///////////////////////////////////////////

// Add notation auto-scaling data (enabled via gAutoScaleNotation)

function liteSetAutoScaleNotation() {
  document.body.dataset.notationScaling = "auto";
  document.body.style.setProperty("--abctools-notation-fullscreen-scaling", `${gFullScreenScaling}%`);
}

// Check if notation auto-scaling has been applied by the app

function isAutoScaleNotationApplied() {
  return !!document.body.style.getPropertyValue("--abctools-notation-fullscreen-scaling");
}

// Remove notation auto-scaling data

function liteResetAutoScaleNotation() {
  document.body.removeAttribute("data-notation-scaling");
  document.body.style.removeProperty("--abctools-notation-fullscreen-scaling");
}

////////////////////////////////////////////
// APP LITE: HANDLE EVENTS
///////////////////////////////////////////

// Handle keyboard presses / custom shortcuts

function liteHandleKeyDownEvents(event) {

  const keyCode = event.code;

  if (event.shiftKey) {

    if (event.ctrlKey && keyCode === "F10") {

      const contextMenuBtn =
        document.getElementById('morecommands');

      if (contextMenuBtn) contextMenuBtn.click();
      
      return;
    }
    
    // Handle custom Shift + Function key shortcuts
    const codesUsed = /^(?:F[1-47-9]|F1[1-2]?)$/;

    if (!codesUsed.test(keyCode)) return;

    event.preventDefault();

    const abcState = document.body.dataset.abc;

    const isAbcLoaded = abcState && abcState === "rendered";

    const helpReadmeBtn = document.getElementById('helpbutton');

    const toggleViewBtn = document.getElementById('zoombutton');

    const playMidiBtn = document.getElementById('playbuttonicon');

    switch (keyCode) {
      case "F1": // Open Welcome Screen / Editor Help / Notation Help
        if (!isAbcLoaded || !helpReadmeBtn) {
          showWelcomeScreen();
          return;
        }
        ShowHelp();
        return;

      case "F2": // Open Add ABC Dialog (or Focus on Edit Button)
        if (!gIsMaximized) {
          AddABC();
          return;
        }
        else if (isAbcLoaded && toggleViewBtn) {
          toggleViewBtn.focus();
        }
        return;

      case "F3": // Open Jump to Tune
        if (isAbcLoaded) JumpToTune();
        return;

      case "F4": // Focus on ABC Input (or Focus on Play Button)
        if (!gIsMaximized) {
          doFocusAbc();
          return;
        }
        else if (isAbcLoaded && playMidiBtn) {
          playMidiBtn.focus();
        }
        return;

      case "F7": // Open More Tools Dialog
        if (!gIsMaximized && isAbcLoaded) {
          AdvancedControlsDialog()
        }
        return;

      case "F8": // Open Sharing Dialog
        if (!gIsMaximized && isAbcLoaded) {
          SharingControlsDialog();
        }
        return;

      case "F9": // Toggle Compact Mode
        if (!gIsMaximized) {
          ToggleTopBar();
        }
        return;

      case "F11": // Maximize Notation / Show ABC Editor
        if (isAbcLoaded && !gDisableEditFromPlayLink) {
          ToggleMaximize();
          toggleViewBtn.focus();
        }
        return;

      case "F12": // Switch between Editor / Quick Editor
        if (!gDisableEditFromPlayLink) {
          liteSwitchCurrentEditor();
        }
        return;
    
      default:
        break;
    }
    return;
  }
}

// Handle counting events with GoatCounter

function liteGoatCountEvent(eventPath, eventTitle) {

  if (window.goatcounter && navigator.onLine) {

    window.goatcounter.count({
        path: `${eventPath}`,
        title: `${eventTitle}`,
        event: true,
    });
  }
}

////////////////////////////////////////////
// APP LITE: OPEN PAGES / CUSTOM TOOLS
///////////////////////////////////////////

// Open ABC Tools Lite README on GitHub

function liteOpenGitHubReadme() {

  window.open(ABC_TOOLS_LITE_README_URL, "_blank");
}

// Switch between Editor and Quick Editor
// Reopen current ABC in target Editor

function liteSwitchCurrentEditor() {

  const currentPathname = window.location.pathname;

  const targetEditorPathname =
    currentPathname.endsWith('abctools.html')?
      currentPathname.replace('abctools.html', 'abctools-quick-editor.html') :
      currentPathname.replace('abctools-quick-editor.html', 'abctools.html');

  const abcState = document.body.dataset.abc;

  const isAbcLoaded = abcState && abcState === "rendered";

  if (!isAbcLoaded) {
  
    window.location.href = targetEditorPathname;
    return;
  }

  window.location.pathname = targetEditorPathname;
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

// Shift focus to the specified element

function doFocusElemDelayed(elemSelector, delayMs) {

  const targetEl =
    document.querySelector(elemSelector);

  if (!targetEl) return;

  setTimeout(() => {

    targetEl.focus();

  }, delayMs);
}

////////////////////////////////////////////
// APP LITE: UI MENU (LEGACY) CUSTOM ITEMS
///////////////////////////////////////////

// Populate and open ABC Tools Links Center

function liteOpenToolsLinks() {

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
        '<a href="https://michaeleskin.com/abctools/userguide.html" target="_blank" class="btn btn-link btn-lite-lime" title="Open ABC Transcription Tools User Guide (External Link)" aria-title="Open ABC Transcription Tools User Guide (External Link)">ABC Tools User Guide</a>' +
        '<a href="tunesources.html" target="_blank" class="btn btn-link btn-lite-lime" title="Open ABC Tools Lite Tune Sources Page" aria-title="Open ABC Tools Lite Tune Sources Page">ABC Tune Sources</a>' +
        '<a href="credits.html" target="_blank" class="btn btn-link btn-lite-lime" title="Open ABC Tools Lite Credits Page" aria-title="Open ABC Tools Lite Credits Page">Credits & Thanks</a>' +
      '</div>' +
      '<div id="tab_specs" class="adv-tab-panel adv-tab-links-container">' +
        // Specs
        '<a href="https://abcnotation.com/wiki/abc:standard:v2.1" target="_blank" class="btn btn-link" title="Open ABC Notation Standard Wiki (External Link)" aria-title="Open ABC Notation Standard Wiki (External Link)">ABC Standard v2.1</a>' +
        '<a href="https://michaeleskin.com/abctools/ABCquickRefv0_6.pdf" target="_blank" class="btn btn-link" title="Open ABC Notation Quick Reference (External Link)" aria-title="Open ABC Notation Quick Reference (External Link)">ABC Quick Reference</a>' +
        '<a href="https://michaeleskin.com/abctools/general_midi_extended_v10.pdf" target="_blank" class="btn btn-link" title="Open MIDI Quick Reference (External Link)" aria-title="Open MIDI Quick Reference (External Link)">MIDI Quick Reference</a>' +
      '</div>' +
      '<div id="tab_tools" class="adv-tab-panel adv-tab-links-container">' +
        // Tools
        '<button class="saveaswebsite btn btn-top btn-lite-lime" id="saveaswebsite" onclick="generateWebsite();" title="Export Tunebook as Website or Gallery" aria-title="Export Tunebook as Website or Gallery">Export Website</button>' +
        '<button class="saveaswebsite btn btn-top btn-lite-lime" id="opentuningtools" onclick="TuningTools();" title="Open Michael Eskin\'s Tuning Tools" aria-title="Open Michael Eskin\'s Tuning Tools">Tuning Tools</button>' +
        '<button class="saveaswebsite btn btn-top btn-lite-lime" id="opentsoscraper" onclick="MustardScraper();" title="Open Michael Eskin\'s The Session Scraper" aria-title="Open Michael Eskin\'s The Session Scraper">Mustard Scraper</button>' +
      '</div>' +
      '<div id="tab_eskin" class="adv-tab-panel adv-tab-links-container">' + 
        // Michael Eskin
        '<a href="https://michaeleskin.com/" target="_blank" class="btn btn-link" title="Open Michael Eskin\'s Homepage (External Link)" aria-title="Open Michael Eskin\'s Homepage (External Link)">Homepage</a>' +
        '<a href="https://michaeleskin.com/abctools/tipjars.html" target="_blank" class="btn btn-link" title="Open Michael Eskin\'s Tip Jars (External Link)" aria-title="Open Michael Eskin\'s Tip Jars (External Link)">Tip Jars</a>' +
        '<a href="https://michaeleskin.com/tunebooks.html" target="_blank" class="btn btn-link" title="Open Michael Eskin\'s Tunebooks (External Link)" aria-title="Open Michael Eskin\'s Tunebooks (External Link)">Tunebooks</a>' +
      '</div>' +
      '<div id="tab_zille" class="adv-tab-panel adv-tab-links-container">' +
        // Anton Zille
        '<a href="https://github.com/anton-bregolas/abctools-lite" target="_blank" class="btn btn-link btn-lite-lime" title="Open ABC Tools Lite GitHub Page (External Link)" aria-title="Open ABC Tools Lite GitHub Page (External Link)">ABC Tools Lite (GitHub)</a>' +
        '<a href="https://ns.tunebook.app/" target="_blank" class="btn btn-link btn-lite-lime" title="Open Novi Sad Session Setlist App (External Link)" aria-title="Open Novi Sad Session Setlist App (External Link)">NS Session Setlist</a>' +
        '<a href="https://denis.tunebook.app/" target="_blank" class="btn btn-link btn-lite-lime" title="Open Project Denis App (External Link)" aria-title="Open Project Denis App (External Link)">#ProjectDenis</a>' +
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

  liteOpenToolsLinks_InitTabs();
}

// Select tab in ABC Tools Links Center

function liteOpenToolsLinks_SelectTab(tabId) {

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

function liteOpenToolsLinks_InitTabs() {

  const dialog =
    document.getElementById("abc-tools-links-dialog");

  const tabs = dialog.querySelectorAll('[data-tab]');

  tabs.forEach(
    el => el.addEventListener(
      'click',
      () => liteOpenToolsLinks_SelectTab(el.dataset.tab)
    )
  );
}

// Populate and open ABC Tools Lite: Latest dialog

function liteOpenToolsLatestScreen() {

  let modal_msg = '';

  modal_msg += '<a href="https://github.com/anton-bregolas/abctools-lite#abc-tools-lite" target="_blank" ';
	modal_msg += 'title="About ABC Tools Lite: Visit Readme Page on GitHub" aria-title="About ABC Tools Lite: Visit Readme Page on GitHub" class="modal-header-ui modal-link-help dialogcornerbutton">';
	modal_msg += '<svg aria-hidden="true"><use href="#lite-icon-help"></use></svg>';
  modal_msg += '</a>';
  
  // Modal Dialog Updates Wrapper
  modal_msg += '<div class="modal-wrapper-centered-column">';

  // Modal Dialog Updates Header
  modal_msg += '<header class="modal-header-updates-container">';
  modal_msg += '<h2 class="modal-header-updates">ABC Tools Lite: Latest</h2>';
  modal_msg += '<h3 class="modal-subheader modal-subheader-updates">Version ' + gLiteVersionNumber + ' (February 2026)</h3>';
  modal_msg += '</header>';

  // Modal Dialog Updates Intro
  modal_msg += '<p class="modal-subheader-updates modal-subheader-intro">';
  modal_msg += 'Some of the latest custom changes, fixes and improvements added to the fork:';
  modal_msg += '</p>';

  // Modal Dialog Updates Summary
  modal_msg += '<section class="modal-section-updates modal-section-summary">';
  modal_msg += '<h4>Update Summary</h4>';
  modal_msg += '<ul>';
  modal_msg += '<li><strong>ABC Tools Lite</strong>: Full keyboard navigation support for editor and notation view.</li>';
  modal_msg += '<li><strong>ABC Tools Lite</strong>: New <a href="https://github.com/anton-bregolas/abctools-lite#tools-lite-new-keyboard-shortcuts" target="_blank" title="View Full List of Keyboard Shortcuts on ABC Tools Lite GitHub">keyboard shortcuts</a> and <a href="https://github.com/anton-bregolas/abctools-lite#tools-lite-new-customization-options" target="_blank" title="View Full List of New Customization Options on ABC Tools Lite GitHub">customization options</a> added.</li>';
  modal_msg += '<li><strong>ABC Tools Lite</strong>: Custom new <a href="https://github.com/anton-bregolas/abctools-lite#ui-fixes--features-roadmap" target="_blank" title="View Full List of Custom UI Features on ABC Tools Lite GitHub">fonts, icons and styles</a> added to UI components.</li>';
  modal_msg += '<li><strong>ABC Transcription Tools</strong> updated to version <b>' + gVersionNumber + '</b>.</li>';
  modal_msg += '</ul>';
  modal_msg += '</section>';

  // Modal Dialog Updates List Latest
  modal_msg += '<section class="modal-section-updates">';
  modal_msg += '<h4>Selected Updates</h4>';
  modal_msg += '<ul>';
  modal_msg += '<li>Keyboard users can now <b>Tab</b> through editor and notation buttons and open menus with <b>Enter</b> / <b>Space</b>. All dialogs now support pressing <b>Escape</b> to exit.</li>';
  modal_msg += '<li>New <b>X</b> button ensures app menus are easy to <b>quit</b> for desktop & mobile users.</li>';
  modal_msg += '<li>Try custom <a href="https://github.com/anton-bregolas/abctools-lite#tools-lite-new-keyboard-shortcuts" target="_blank" title="View Full List of Keyboard Shortcuts on ABC Tools Lite GitHub"><b>keyboard shortcuts</b></a> to speed up tasks and get to editing ABC quicker.</li>';
  modal_msg += '<li>Try updated <b>context menu (Ctrl + Shift + F10)</b> which now uses modern anchor positioning and semantic markup. Access newly-added tools via <b>ABC Tools Links</b>.</li>';
  modal_msg += '<li>Try <b>compact mode (Shift + F9)</b> to save more screen space on narrow devices.</li>';
  modal_msg += '<li>Full support for <b>Deflate</b> compression algorithm added to Export Websites.</li>';
  modal_msg += '<li>Updated <b>Help Dialog</b> now shows tips depending on the current view.</li>';
  modal_msg += '<li>The ongoing <b>ABC Tools restyle</b> goes hand in hand with laborious <b>accessibility improvements</b>. If you find my work useful, consider <a href="https://ns.tunebook.app/" target="_blank" title="View Anton Zille\'s tunebook projects and support options"><b>Supporting & Following</b></a>.</li>';
  modal_msg += '</ul>';
  modal_msg += '</section>';

  modal_msg += '</div>';

  DayPilot.Modal.alert(modal_msg, {
    theme: "modal_flat",
    top: 25,
    width: 720,
    scrollWithPage: (AllowDialogsToScroll())
  });
}