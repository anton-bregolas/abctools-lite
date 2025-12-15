///////////////////////////////////////////////////////////////////////
// ABC Tools Lite Custom Scripts
// https://github.com/anton-bregolas/abctools-lite
// MIT License
// (c) Anton Zille 2025
///////////////////////////////////////////////////////////////////////

// Custom global variables / constants
var gLiteVersionNumber = 'lite-3066-2';

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