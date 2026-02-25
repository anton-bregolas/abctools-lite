# ABC Tools Lite

**ABC Tools Lite** is a lightweight fork of ABC Transcription Tools developed by [Anton Zille](https://github.com/anton-bregolas/). This version of the Tools aims to improve cross-platform experience for mobile, tablet and desktop users and minimize the device storage space taken up on startup while retaining key offline functionality of the original Michael Eskin app. It features a work-in-progress restyle of the Tools' user interface in an attempt to make this popular ABC notation software more accessible and customizable.

> [!IMPORTANT]
> This README covers fixes and experimental new features added in ABC Tools Lite project. If you need help with the app's basic functionality or ABC music notation, please visit Michael Eskin's extensive <a href="https://michaeleskin.com/abctools/userguide.html" target="_blank" title="ABC Transcription Tools User Guide">ABC Transcription Tools User Guide</a>

🎵 [**LITE APP LINK**](https://abc.tunebook.app/) 🎻 [**LITE BACKUP LINK**](https://anton-bregolas.github.io/abctools-lite/abctools.html) 🎵 https://abc.tunebook.app/

ABC Tools Lite is the default notation editor of the [NS Session Setlist](https://ns.tunebook.app/) app at the Novi Sad Irish traditional music session ([GitHub Source](https://github.com/anton-bregolas/NS-Session-Setlist)). To see more sources of music in ABC notation see the updated [ABC Sources](https://abc.tunebook.app/tunesources.html) page.

ABC Tools Lite includes GPLv3-licensed libraries and is thus distributed under the terms of the GNU General Public License version 3.0. To see licensing terms for individual components used by the Tools visit [Credits](https://abc.tunebook.app/credits.html) page or see LICENSE-LIB.

ABC Tools Lite is based on ABC Transcription Tools, a tunes-to-notation converter developed by <a href="https://michaeleskin.com" target="_blank">Michael Eskin</a>. Check out the outline of technical and functional differences below to see whether Lite fits your use case. Note that this fork may include some experimental features and alternative UI logic as compared to Michael Eskin's ABC Transcription Tools (for full original functionality make sure to visit [ABC Transcription Tools GitHub](https://github.com/seisiuneer/abctools)).

## Tools vs. Tools Lite: Assets Used

Feature | ABC Transcription Tools | ABC Tools Lite 
| --- | --- | --- |
| Initial Cache Size | **~140MB** | **~25MB** |
| Assets Cached on Startup | Main app assets, default offline instruments,<br> ABC docs, MIDI docs, PDF fonts, User Guide page | Main app assets, default offline instruments,<br> custom UI fonts |
| Progressive Web App? | Yes | Yes (Customized) |
| Offline Functionality? | Full on startup + additional tune & instrument databases cached on demand | Most on startup + additional PDF fonts, tune & instrument databases cached on demand |
| Updates? | Frequent feature updates and improvements by Michael Eskin | Monthly updates merging new custom features with original updates by Michael Eskin |

## Tools Lite: New Customization Options

Option Name | Option Description |
| --- | --- |
| ☑️ **Customize display of Editor toolbars independently** | Hide or show the bottom buttons bar and the title bar independently of each other if you need to save more screen space. Hiding the title bar now triggers the Compact Mode. Tablature buttons are hidden by default on startup (enable in Settings). Title bar links have been moved to Context Menu. |
| ☑️ **Customize Export PDF font style** | Select new multilingual fonts in PDF Export menu (Fira Sans) and pick between regular / bold / italic / bold italic versions when adding title page & index. |
| ☑️ **Customize notation scaling behavior** | Turn auto-scaling of notation ON or OFF in Settings. Turned OFF by default in ABC Tools Lite as it prevents scaling of maximized notation. |
| ☑️ **Select ABC Tools two-column mode on any device** | Experimental: Try the fixed two-column mode (formerly iPad Side-by-Side) on any Android or iOS device. Best suits tablets. |
| ☑️ **Use keyboard for editor navigation** | Optionally tab through editor & UI overlay buttons without Tab selection disappearing or being captured. Further speed up navigation by using new keyboard shortcuts. |
| ☑️ **Use keyboard for context menu navigation** | Press Ctrl + Shift + F10 to open the app's updated Context Menu which now uses anchor positioning. Optionally use arrow keys, Home and End to navigate the list of menu items. Press Enter or Space to activate an item, press Escape or Tab to close the menu and shift focus. |
| ⏱️ **Use keyboard for modal navigation** | Optionally use keyboard to navigate modal dialogs, auto-focus X button on open by default.<br>You can now use Escape key to quickly exit from all modal dialog types.<br>TO DO: Ensure focus is not captured after operations and is restored after modal is closed. |
| ⏱️ **Customize ABC Editor font style** | TO DO: Choose thickness level for the new default code font Fira Code for increased legibility. |
| ⏱️ **Customize ABC Tools color theme** | TO DO: Choose between Light, Dark, Subdued and Antique color themes or create your own using new customization menu. |
| ⏱️ **Customize ABC Tools UI font** | TO DO: Select custom font-family for all ABC Tools UI menus, including the Editor and Modals. |
| ⏱️ **Customize ABC Tools UI layout** | TO DO: Select between desktop mode and custom mobile mode with fully responsive design, uniform large buttons and larger menu fonts. |

## Tools Lite: New Keyboard Shortcuts

| Key Combination | Description | When Viewing |
| --- | --- | --- |
| `SHIFT + F1` | Open Tools Lite Welcome Screen | Blank Editor |
| `SHIFT + F1` | Open ABC Editor View Help Dialog | Editor View |
| `SHIFT + F1` | Open Notation View Help Dialog| Notation View |
| `SHIFT + F2` | Open Add ABC Dialog | Editor View |
| `SHIFT + F2` | Focus on Edit Button | Notation View |
| `SHIFT + F3` | Open Jump to Tune | Editor & Notation |
| `SHIFT + F4` | Focus on ABC Input | Editor View |
| `SHIFT + F4` | Focus on Play Button | Notation View |
| `SHIFT + F7` | Open More Tools Dialog | Editor View |
| `SHIFT + F8` | Open Sharing Dialog | Editor View |
| `SHIFT + F9` | Toggle Compact Mode | Editor View |
| `SHIFT + F11` | Maximize Notation / Show ABC Editor | Editor & Notation |
| `SHIFT + F12` | Switch Between Editor / Quick Editor | Editor & Notation |
| `CTRL + SHIFT + F10` | Open Tools Context Menu | Editor View |

## Tools Lite: Original ABC Tools Shortcuts

| Key Combination | Description | When Viewing |
| --- | --- | --- |
| `F3` | Rewind the current tune to start | Player / Quick Editor |
| `F4` | Open Player with the current tune | Editor & Notation |
| `F4` | Play / pause the currently loaded tune | Player / Quick Editor |
| `CTRL + F`<br>/ `⌘ + F` | Open Find & Replace Dialog | Focused ABC Editor*<br>Notation View† |
| `CTRL + J`<br>/ `⌘ + J` | Open Jump to Tune Dialog | Editor & Notation |
| `CTRL + S`<br>/ `⌘ + S` | Save all tunes as a text file (.abc / .txt) | Editor & Notation† |
| `CTRL + /`<br>/ `⌘ + /` | Create Tune Set | Editor & Notation†† |
| `CTRL + \`<br>/ `⌘ + \` | Align Bars (One Tune) | Focused ABC Editor* |

\* Lite: Limited to calls from focused ABC Editor to prevent unexpected shortcut capture
<br>† Lite: Default ABC Tools behavior + fix bypassing of disable-edit share link mode
<br>†† Lite: Default ABC Tools behavior + fix uncaught error in notation view

## UI Fixes & Features Roadmap

UI Improvement | Status | Details
| --- | --- | --- |
| *Migrate hardcoded styles to CSS to make ABC Tools UI easier to maintain and customize* | STAGE SIX ⏱️ | **i:** Use CSS flexbox instead of JS for centering Editor shell (fixes long-standing tablet issues for mobile users & embedded ABC Tools).<br>Add media breakpoint to apply editor two-column mode styles.<br>**ii:** Add data-attributes to apply notation and abc input area states.<br>Clean up hardcoded styles & leave comments in app.js.<br>**iii:** Add common reusable styles for Tools pages / sections.<br>Replace inline styles in modal headers with reusable classes.<br>**iv:** Replace button colors with CSS variables for flexible color theme adjustments.<br>**v:** Replace fixed button margins with flexible layouts.<br>**vi:** TO DO: Overhaul markup in Help Dialog, What's New Screen & Context Menu to prepare for work on flexible layouts.<br>**vii:** TO DO: Replace inline px/pt with responsive rem/em units; apply Editor font style using CSS variables. |
| *Add custom UI fonts for better cross-platform experience* | DONE☑️ | New UI font: Fira Sans.<br>New ABC font: Fira Code. |
| *Add custom font fallbacks to app styles & scripts* | DONE☑️ | Prepare the ground for UI font customization.<br>Update app.js & app.css, add custom styles & scripts. |
| *Add on-demand PDF fonts for wider selection and multilingual support* | DONE☑️ | New PDF fonts: Fira Sans (Regular, Semibold, Italic, Semibold Italic) with extended Cyrillic character set (supports 1025 languages). |
| *Enable optional Two Column editor mode for all mobile devices* | DONE☑️ | Previously limited to iPad, now available on all iOS and Android devices (experimental). |
| *Enable separate show/hide context menu options for Title Bar and Bottom Bar UI* | DONE☑️ | Toggle Bottom Bar now hides/shows Bottom Bar (when available).<br>Toggle Compact Mode now hides/shows Title Bar only (use to save space).<br>Rearrange UI when Compact Mode enabled. |
| *Make auto-scaling optional to fix unexpected zoom-blocking behavior* | DONE☑️ | Auto-scale maximized notation available as Settings option (off by default, forced in Two Column mode). |
| *Customize app pages* | DONE☑️ | Update ABC Sources, Credits and Uninstall pages; add reusable common styles, replace px/pt with responsive rem units (for fonts).<br>Apply basic user color theme settings for pages on DOM load.<br>TO DO: Add breakpoints enabling responsive behavior. |
| *Move ABC Tools links to context menu, convert items to button-sized links* | DONE☑️ | Make links to external pages and tools available via context menu item while making them more mobile-friendly. |
| *Customize Export Website generator* | DONE☑️ | Replace notation centering scripts with flexible layout.<br>Make arrow navigation loop through to first / last tune.<br>Full-Featured Website: Replace LZString with native browser Deflate encoding.<br>Full-Featured Website: Rebalance MIDI chords/bass and instrument volumes.<br>Full-Featured Website: Add custom MIDI instrument option: ClaviZouki. |
| *Customize app icons* | DONE☑️ | Add Bootstrap icons, use icons from the same set, use svg/symbol for icons. |
| *Customize app buttons* | DONE☑️ | Set new flat look of app buttons by default.<br>Color bottom bar buttons for quicker recognition.<br>Convert untabbable button elements to proper buttons.<br>Make button margins flexible and standardize padding. |
| *Customize Help Dialog* | DONE☑️ | Add new Help Dialog logic & contents:<br>Pressing ? in Blank Editor shows new Welcome Screen;<br>Pressing ? in Editor View shows About the Editor View;<br>Pressing ? in Notation View shows About the Notation View;<br>Alt-click on ? opens ABC Transcription Tools User Guide;<br>Shift-click on ? opens ABC Tools Lite Readme. |
| *Customize What's New* | DONE☑️ | Add new What's New Dialog logic & contents:<br>Show ABC Tools Lite Latest Updates summary;<br>Add detailed description of selected updates;<br>Auto-show What's New Dialog only if it's unintrusive. |
| *Customize app context menu* | ⏱️ IN PROGRESS | Add modern CSS anchor positioning for smoother menu opening.<br>Implement menu keyboard navigation and prevent accidental scroll.<br>TO DO: Refactor Context Menu as a popover for mobile layout, add adaptive styles. |
| *Customize app modals* | ⏱️ IN PROGRESS | Add auto-focused X header button to modals as alternative dialog exit option.<br>Ensure Escape key provides exit from all modal dialogs.<br>Remove confusing Enter bindings for Settings dialogs.<br>TO DO: Refactor modals to use HTML Dialog.<br>TO DO: Make dialogs fixed position.<br>TO DO: Add in-modal scrolling & prevent background scroll. |
| *Add basic accessibility features* | ⏱️ IN PROGRESS | Add outline & cursor styles to basic buttons.<br>Add focus-visible styles to all inputs & textarea.<br>Make Editor & Modal buttons fully tabbable..<br>Add & remove disable attribute to visually disabled elements.<br>Fix hidden inputs inaccessible in tabbing order.<br>Refactor Modal header elements to use semantic HTML.<br>Add forced prefers-reduced-motion styles disabling animation.<br>Make overlay buttons fully tabbable.<br>Fix unexpected key-capturing and tabbing order interruptions.<br>Fix unreachable dialog menu elements on narrow screens.<br>Update key dialogs and context menu to semantic markup.<br>TO DO: Fix unexpected focus capturing during keyboard navigation.<br>TO DO: Where possible, replace divs with semantic elements. |
| *Add color themes for ABC Tools UI* | ⏱️ IN PROGRESS | Add basic dark and light color themes to pages.<br>TO DO: Add basic dark and light color themes to Editor.<br>TO DO: Add color theme customization menu.<br>TO DO: Add more custom color themes. |
| *Add user-customizable UI color theme option* | ⏱️ IN PROGRESS | TO DO: Replace hardcoded color settings with CSS variables. |
| *Add user-customizable UI font option* | ⏱️ IN PROGRESS | TO DO: Replace hardcoded font settings with CSS variables.<br>TO DO: Refactor inline fonts to use responsive rem units. |

<details>
  <summary><b>Original ABC Transcription Tools README & CREDITS</b></summary>

# abctools

<p>This converter can generate standard music notation from ABC, MusicXML, BWW, and MIDI files, show note names along with notation, and also create tablature for Mandolin, GDAD Bouzouki, CGDA Mandola/Mandocello, CGDAE 5-string Fiddle, DGDAE Bouzouki, Standard Guitar, DADGAD Guitar, Ukulele, Tin Whistle, or Baroque Recorder.</p>
<p>It can also transpose ABC up or down in semitone increments.</p>
<p>It can generate PDF tunebooks in tune-per-page, multiple-tunes-per-page, or tune incipits formats.</p>
<p>It can play ABC files with melody and chords, and supports custom MIDI instruments.</p>
<p>Try it out here:</p>
<p><a href="https://michaeleskin.com/abc" target="_blank">https://michaeleskin.com/abc</a></p> 
<p>User guide:</p>
<p><a href="https://michaeleskin.com/abctools/userguide.html" target="_blank">https://michaeleskin.com/abctools/userguide.html</a></p> 
<p>Demo video:</p>
<p><a href="https://www.youtube.com/watch?v=eVOLh2Z-GDU" target="_blank">https://www.youtube.com/watch?v=eVOLh2Z-GDU</a></p>
<p>You can also use Share URLs or QR codes to open the tool with tune sets pre-loaded.</p>
<p>The full ABC for the tunes and tab settings are encoded in URL parameters on the share links.</p>
<p>Click these Share URLs to open the tune ready to play in the ABC Tools:</p>
<p style="line-height:28px;"><a href="https://abc.tunebook.app/abctools.html?def=eJxtkctqwzAQRff6irsJ2Tg0lkNaBAnYqVv6ghZKKQ2mWLakug8rKM4ixT_U3-iXdWT3TTajmat7z8j4VoTsWpxWhi1EXNs6wGVVPClX1Qbnm0YhsfaJ3YnYubw2qoS2Dsebqskd5BapqwosnN0UD2Ra2NXWVeahwfvb7yvwcbgPdi7CvQN2RXUyC8cTdiGmNJ-JlA3YIJfF4_p-bTd1qW3dQOeNtFu6uREhGqfks6Ijr9cru1azUcjhU4OLk8MTrJw1Ln_BZNr5-U7_bjs8nykOBT03OVqYuTYjGI5ZOaSxGHJIKKoGLdMRyojU_wEvdH72x49lqWUWjfpzN1JGkB65VHkWUTWZn74WDejhxNb-QX6Z5BRHOZwXw47VU_Sc_gwh0kRlU4gW_rM4o5lgSeBBaYS0a-Lgs2NJMO1Df0wcr3QXR35ovT6i0om_osskKHXWxeMi-_aSwLpFHEcBKcfUxMEPvG9ee4poGfsAQFirgA&format=noten&ssp=10&name=Pickering_Lute_Book_Jig&play=1" target="_blank">Jig from the "Pickering Lute Book"</a><br/>Harp</p>
<p style="line-height:28px;"><a href="https://abc.tunebook.app/abctools.html?def=eJzdWW2L48gR_u5f0RwYbUAjr9vyywzpBVmSzXE5SEIIAaEOsiRrL7e7c8zMhrnJ5r_nqepuqW1rZnYhCSSwK0vV1dXdVU-9dM1fbuaTP93sPvzUvX8Qt0fx8L4V288fDx_aQ9tO0ps__vTx_udfxQ-3d_fVz7d_n0yn9_XtXSv-8UYsxUr8Rnx5I-ZCioWI8SH-OfndzXw2X03-gJ9Yzddy8uONnMWT6WRaHeq_3f_1_vbzp-Z4--lBHKuHw-2vGPnhJiG5D9XxeN_-IuK3_HXXPtTvP1T3D-Lh7nM7-fPNHC8tNiY-fVTf_f7TbfSduO9fMeXH77PvxS93t91d9VG8xQQpDtX9vRgbWjw_FD8_tHQ7GBtcvTQ4n4injfjiPaaLS9LKJ-U6U5lOhUp1rvBBDNcTn5xmTI2KPFRpXsbiKfY-5TudSo9tOpcQLyKdLQyjG8pJfuZWTEWWqnQb8ozlZODaqb3eg5rs1X4ndK4TlZwQdmZ8Ot9MXmUyn_sdLU1zJBSk7RIJTRphuhifyhgrJeE-TEJBD34BYxJqkBOB__QDSck-EXt60Kw11kp0lVQioccXJ3FY-Ox7ung7oa-tqkWlq2J7KItE1UFJ6q6DXvFJmCXODNMFDKwz3WSNyOjxRTRN3YiaHthjo5ugaQIQ-YcmwPygqqZ2P5DZWHF4PEnxNBO6DRYzyfxAA9EgKxCRagLia2pVb-l4TQBKTYLpB5s9CA0PDDTTpjHA0A_gv64UaSLSVUwS66AJNG8raiE3MsKnMQARYYp8V-i2KqXoilZ15bHFYKtb1eqGf1PaIPZG39BKWzraNAY46CxYKZeMyyQMr8AT6rzE-TZC5YvZ5iqfvYjM5ZyQuYWdQ8XGV_twBxE0mNOvwjML-_fsxYHpEkDyRwtVt6UskrqkTUd5KCOMSJFIVTOljUVRQRFtALa2AhT4dEtAy2gGcyFBFPxOnEaSm2StuidQCVXrGhbnCACgQYFH1QndAWoH8lM2mrFHG1gtmz0YpK2ANPoCAKvSIrGthniAaECwjIoMoDUc0xXFGmi7ImVXhCiCEocFuxu2Z8OGNZhkZNFU4K5nwk51B2rVqe4IcBKOmPA0oAZJwLw7JNuBJuBJ3ZFWYkbAS1uRFUnyJR_tQgdFyuDNkytsrtpgBqdQrQXsdA2I8YdxAFKfN-yNPIkB5uxFoxOmm_nkbLUxAaTmig0rDYxrZq_Bzh5HtIZJTTDz_C5n4GwAwCLvg0eR5fsL--kqONA8QoPZ2Jo2FkMs5MZEtAvblYPZIcAamIWpqqI5lVug7SCxDYJjEKgOIjsj8hr4q4KgM1QMCvMDhZBGiMe94tikBl5BuVVoCczG5KPZTcd76YLZ0SqVV6HQ6FQMGcLoQ1dWTwaUM4OAAQiS_OFCt1tW4PXKxhW4H0SXEYRLPii56PGqOOKXJ-vejkfaJ05ulFyz9azzkUSG-VUBj6F1fS9kFLUBzzcy-2NWAZvJuC1bqjGqwhItPB-bIc0WB9J4yenyLdyjIG4ovgcAPBUuvOH4aGglsS6prJmIRxoYHlRLnJNWPsnUBH1quqYontovw7UQj0tXJES55BKjD7dGhtuIqQsMLQcNkTzsBXH2P-M3A5TizzdJCTzKej7xuB6G1iPHfGtpyIOMgSFqWYYRRSycJrKrAum4PMmvDBlIAxqACLzbvBodg4VFC4NlJo4u7nqiY2eK5qpoDqWBiHizoAzZSN0QAPdXxR72L23EoDhiJNoYYLPq-a5tnoTdUMmp3KQhCU2HfGaVhtI3G-VDX31GCKW1x5j-AUZXBWYnpc7xkoV9sg0524Yzyp2nlCwcBI0Yg1IVxXJVc5TqeuRWJfK5birWNBKFUxznqYTH3JBNe75Um5eskk5TzzkOKRMZPAwoNOniSdh0wcnnSZxnpzMus_a6hzVBktexy0XbMHapxXCQ-0RV4AJ01Xsupwt_2FRuJs5nchtKxxf7OgUN8a2VLq43MvORbTZ4bVWuE7MzL6OmsQusw_76QcPfx0hbR5oyEl8R8AlIdVJ3cliLvKCjyca-mgqMjl8Vl7zkI3ASF8FO4dEHqzGHfCVYAdGPCxumPOpJhDqLXpuTqOTTNiNB55lAZD6_Pgahyj4gbuuqxH6qrwxCztgmUTWcqPpq_iIIjIT654JFryT8-8bQ8LiAs4nH-bJ_vub3F7Qxm-LIkVfT-EMjZ12PnHU9ctb1iEU3IxY9dS9LGznO9chxrkeOc22Po2oupbmseMeOc8p2fWFok6xmV7XNLy-5y8im_w3ucuEV_11P8Wmv-gYyAmowuiLId83_r2dc0P5HXaJHeIsCivH9rDNYnL2A_uXJxa1vT3AtbToUlLa16TacXkoXVKxvqWEjqGukqWF03jW46CKsJq_yIP2HftlMnYo8NLfpcBcmIV-nkQt4mterI1KkkMRPGE328oRQTRaWrm-XOMn7cOuoKPUGXnCEmRO15IjENDDZmWDGXDc55VE3lFj6k_lW_Srs_XYz2XDxpAUzN1t5e-oZ8ZqEqZFB0YKOxhcNvnHsQ53aGVmo--NpPgRGXbOCPrU9JMhhSn0YKzSeDCfv2ybhZdPPKwspGO29jh-3U5NQFnvqF1FXxpxFFjvarHTBCrNr-dvItngSGeFqWTOq8L0LZZqJNEszF8f43RKizC5eez0-jmymoYs1U53x0tSaLbYhblg5L03GOMYu0DWFbvj-WqBspqaR6wHw3jO1Nx0Gc7eg7iDdXHVzNNqKGV06gQhW5o7GHI72OrEwUkntIEd8gCrV6K0Loi1KkwN2ABr1-KJWRq3daS5NLQ9unduriK3uKdTmfFXhLcNcId9XwEUWZvtJ4DSUFuwG1sZky5EGOQViWtLry1ETWKYS6yQshe4eVgBsHtVkQFNEn_T6uHNsnUnnBmbcYLFBm5Rj8jpVuVTssmLbjvp2DqNei9103Hoa9GzdwfSRzu49NlQ9ib7JZ-84KqVLTmqvsZ5XuWBgPQm3ta8IB6vrrw0H-XhAABtQljF0bPYhpgSa9JqJJiZYTz6d4nOfezknrhdd3fdyGy8ujrylzfcSATgTScmJC2qS9e4ynHJntutbEkPct1XelL7LZ7rPvU2en95VpkFgm1XRYcHwRBTKpO2mc8blLhh3h2bVM40k22t0743rF7pOFXbTBRV1Jg3uOWvDExCfiryhZrNuTSzxO26uFXXeiKJFA7-L59Ibe4JpPJHmUrXvz5xp7-9LjPvEmVC71Ha9OMkhJnPaHlGxT0qdFHtFPyDSNwxAT7GTThlcUfgagSPKiEMdXhReoIGtiR9eh9vcVbGt3PpFv29brA9BkCd1CPKmcDfVSFRUQ0veOl7Ovbc-cNkWnK1TRuq3l6r0NarMviQaumMuX_klxn-uWvdoz9TqxnRpOQytTMH8FVU7eXu2KzcujX17ve7lb-59uT8QUceLIgDHtLPL1nLkxMvTtgp5tNfiGv_rz3ry_N-G-qvA6yX-WZYwnaNiqP34RnzaFR0t_u2K31b_SzLXxRVgiIR9M4h7Qb1pKUJRM8Vr4XqW6G8HlGhz_ptN7EWLkT0P9wRL8dtf7N8Xt4hvuiT8CwTkQ78&format=noten&ssp=10&name=Flight_of_the_Bumblebee&play=1" target="_blank">Flight of the Bumblebee</a><br/>Acoustic Grand Piano</p>
<p style="line-height:28px;"><a href="https://abc.tunebook.app/abctools.html?def=eJyNkVGLnDAUhd_zKy6hvjXMGMPUBuZBRyLTdqFdSlta1iUadWw1FrWFFX98E-O8zEsHQsi9nHz35OQb99FnfpJ6arSEWGqFTvxdf9HwtWnbRnYj-s6jtoXHpr5MIzyWYzn8LRX6wP1diB442zF05m2jy3wo5S94hT5xyvboPRfIk3nxc3we-z9aVb2eoJJT3r8gz3s4J2coLv2gfg99DQH6wn2YhjJvS9DdEX9spO7xVWg1g-zg7cHqEE46DBEFRbd9gWgtCERZansLeHSTZWl0TPHpDYYZMpEKWLDAIAJICCTMKtl9wAPCqaGk1CwCaSbscVnJP4riCWKjNzPSwIrD-5j-3kA7QyioWWSFFZED37j0zYPiHJsKx6qxdwSzqt3JjGE4sTedkDmjz6UduyLdvO3pcwiLlR2cxRkkhcpus7V0U3p-iK69rJbmWBHTrgJQBNQ6j-7vAlF6AzrWZIuvDqAgm3vK7qMd_msrdHnFrxMQ9JrZ0ZXX4FwwCVnjczkHexdfIiLl_mPNjmw_wmA2sif0D-OFylM&format=noten&ssp=10&name=Star_Wars_Cantina_Theme&play=1" target="_blank">Star Wars Cantina Theme</a><br/>SFX Rain Synth and Honky-Tonk Piano</p>
<p style="line-height:28px;"><a href="https://abc.tunebook.app/abctools.html?def=eJydVO1q2zAU_a-nuDXkn1PHspumBg8iRxLtlpVBGWMwDydSGo_aHrITSOkL7TX2ZLtSnLIyCMn-CHTuOed-6NpfkpA8JHdFpVtgTa3gYa0rTbJk3tTdDj42pipqvN6b8hGmxlzCXbOugRXG7MjX5PcvOgqvQJR1tWnLZaBXK12r8hItPiRhMCGf8IzT8GpE5kkcxOR9IsmgWCx_tN_bZlOrFaaBVdEtmh0ZDNrO6G65firaDjqz0QjNb2e3sFw3Rv00zSNE0QFbFG27bZ4gpNdvaAfscxKih148aair1LvfaqNMudUgN2VXGO8gsramqIDeWAnxeOUB82Mv8yCL4cXd88zdUwvAgJ5CislL4mAuAhGAwJAYguCc93QuAxmAlEMrkkIIqxo767MkE_J3GuFiRzTcasLRXpSrVA1BxcCmjn6DXU0gsYyTmgzjk1jj11mApJjUxVQE8kCfMlceGzt63xFSReRgH3ieDXtyNnFv0HdgHS0nV0ccKf3XMZ_xgyPft0xdM9fWk1PgHsNpiHccBHU8DEibzMLyNYCy8SkykG8CKOu7ZAyesR5qT9YXxNgzVsgCxgIHwiAanTLoiJLzVy6KCZy9dNH4P7YumhzbOvvNjAhwf_9UPvUkUmeQznB4PvPxtbB9ASnOD6eDaD51IkogneLk5XC_Xda8n7yicLHS-AvriguBq_AN6TH5AwV5L6k&format=noten&ssp=10&name=James_Bond_Theme&play=1" target="_blank">James Bond Theme</a><br/>Overdrive Guitar and Electric Fingered Bass</p>
<p style="line-height:28px;"><a href="https://abc.tunebook.app/abctools.html?def=eJyFkd9q2zAYxe_1FB_eDB3Uc-yobSrIheRZJXS5GBtjLIxiS3LqzpaK_xQS-kJ7jT3ZJDsOKWXbjY2-75zfObK_kQh9IetS6nJ73wGreoUScqu03gHrm0ZVFfpOfv-KZ9EF8FLXfVuKUBWF0rJ8Xyu7RB9JFC7QJ_vEyyieoTXBIUYrUpVa5Y3KfsJbdEtojnzkw2fTa1kY3UFnoG8VnJnHrjS6haxRUFR9Kc_Bpuz09hwyLaHIutzs3hHkZ7l4aO_aI2DcDFSWtW2Y3JtGtvDYmG2T1YP5yVR9rVpr9terDysQTuIEMJtGubVaGVziFyI3wgsL_0oi6BqVV8rmrFVl5G6KOGKnyGjUI4_XVx5Q7N24N8Pw7NG8zh7sQcyBBYf5DaSxXb0Sgz9H_zCQ0cFjoBzO5ksWDgMRspACT0_C-NxLrt5ce7BZpkz9gD1wKgIXcHnoKGJQhYVYhou4ewFxgIP1wNnHlpFOnf_eAPxr9N8WrxoMqtMKYwp2DqmG3lF8KK5wAEoq6TiJPUt7lkKecO1A8D0dXBfIY7nr71gJH1QsP8qYYMH42cY_wCijY9wCDXQau0JJyvmEt5hgmQZj5429VgCbxF0PA3lG6A_aJ-VZ&format=noten&ssp=10&name=Midnight_Blue&play=1" target="_blank">Midnight Blue</a><br/>Acoustic Grand Piano</p>
<p style="line-height:28px;"><a href="https://abc.tunebook.app/abctools.html?def=eJx9VNuO2zYQfddXDBYw_MLtRrLiZAXwQXekTYAFUhRFBTqgJErbYtfaWt6gdd1_zwxJXRzbAWRyOLczwzn074Hr_Bp8lBB1j-pZOXEQP8rdk-ohPGzl1-51B3fws6z-fkXVw5Pc7pXzR-Der986i0VfdTsFLvwHHhxhBf87HwP37r3zKVjd-c4vQVo6C3Lb79S-enyS_R72u1dFSllWf_Vf-u51Wzfddg-N3Jfdv2j5LXDRSZVPCje57V-6XvHbe9g-85vP8p_u5bHbqhvo7flGI3z6kHyAl13X7uQzrNc6jTekIc-HP-W2s1EP2-6nC2FvdNQKStn3cM3sOgW1JeCwxo6nZbFyzlTrc9W9A8fgADXUXEGtUNWg0LT0HYHLTQuSlyBLcnY9B6qlB1z5lABl4CWXuJO50Qndt86ZhSsFG0zebhoLUFuwhfve-QEigVVLAlt47piXFrWsl6iul3ioluivpaORCVUnojjfQXl9i7LEyvG3aT0N5EHt32qXdw7U39tMj1x5gKpN4-krfYO5Gl9r0Rb5UGlB6fSLFV65uoxB6UtjIsf1_B61NBpbHywYjoYc6hkEHg8eBGj1PWMdgEyDOAGBtndENgtRDhCNLqTxRjzDETq12tS22GcLNLYjfJFDHVgrdaoPhbpthQdF3dBaKaGVUUXKgz_yCQeVQZbTd4QwhzCiD8vgEVQ1fZZMRU4pijQXhlDIigoUmYssFDM-TYY8hw3mjXhocg8wmklXsBDA4igxI5PmYKspqSh5Q4zEHT-KtuQp0kro2yXBo4nziNpGIZv4k51acoLJPcAzD0fuFDEPsYBc3xqPWIKHlA75RKD8EgRmL7KaWggrMVKoyJvZ7RWpPhm3NDd-OLhwZJPxLJLMjC3ObV8kjKSiusjNVHDS_Ixdw59LxhiixSxkYtq_VyeDmvgWa1PKchaLmXBEw2U95ooZrjmDkMWWkTljCcOVhwyoYKYT4M4gYSlZyJOnOhbdUBWR_giWoph1NVZ4MDCoyFg0U1zsgXhrmrClUmk8MlZb9_nVpFM8EhpjsH5xkj9DyWa5ekenOSkitkmR_MaYjbPIrk1jNFzF0Q-k0Lc3N1DH6Y8GjA6Y3dSGV5La1-bPxy6m3Vag_znMmMNxGd7VmdqOOZ2tZ0oTT09uYE88sEdXiC648GSKzoa4nCz2LWKDttIrJQ4aDEnS4VmOtSBD4wkhsaiGmhgZkhza4oY__IgZHyIrHab4QnNemKJEQbULuslY4GUnwtw-jmf2lM001qf3Y2I886gNVwV8A_5ET4o&format=noten&ssp=10&name=La_Boheme&play=1" target="_blank">La Boheme</a><br/>Tenor Sax and Acoustic Grand Piano</p>
<p><strong>Example ABC Tunebook:</strong></p>
<p>Click the Share URL below to open an ABC tunebook with 9 tunes in the ABC Tools.</p>
<p>The set is ready to export to PDF with a Title Page, Table of Contents, and Index:</p>
<p style="line-height:28px;"><a href="https://abc.tunebook.app/abctools.html?def=eJytVu9u2zYQ_86nOHQw-iWIarVZOgHzQEWSEbTJ0s1YBxSDQZGnP7UsuZI8zwBfZg-wp-iL7Y6ykzR1kKbIF4vkHY_3-_HuR4_ECK6iBPp1jWnTLEA3dVbm61b1ZVNDh31f1nknRmK0MtmntarKfgvHpyduPk-x3yDWc94-71ZKI_gvxEgZ05d9hfDs96pUaQGXTY_dM7hqqoXqnL1bp4OLDM9g1qq60225cofOmqbqIMJlM0RqNMxUSq5NBmdN3WPdDzGqsl6kSi_6hnyGqE3boylrg__AOf_e8Suv1-aqquarSm3ZMGePDvwxUPKfWt0YhKLvV4HnLUtdKKywW5T1sW6WnkrpKK1cqvOsaec7_1m7hWbdw3J7HyQh_gxgLGYBzAqEsKKDN6rHVpwFcKH6Hs5oT9nrQvwWDFSJiwB875V4S_u81-IdfU5eiDcBREv1kWCk-mM375p1bTLiBbJqXRoxGl2cR-ewapu8VUsCJWyQGAiNF3pWJhBHVh6FRxDFNokhTqyQt62JpXKQNJNe4tk4gmgSB5ZjSAi1NT5IY7PcyzxAGiCgb4XRnnHzUEISH47A6H1G_0b1RUVV87z7DuThsqwfg3zILENrQgJpcZJxmlqC1Pu0r42ac2aQYwh9-gbW50E2yS0ToDLI0WYGDBJ6m19HmqAVtIya42jpSJC7IJmXe7s4FHhg4SWzcPH5P13g53-r76JBPoYDSWfzfYAFl27IAwSFYDNPERb0QIdUB3f8EhrEw1VqukxgSLQegwNEIx8IkcopBqSKnDNFZAJxQv6AkkYhAz_kIzWgO5k87S7Wg6E0fEOS-8z-EqMaNyuVoyP9lSNd1dSe8L6sDFyWedE_dauNiu0KW5YTJyAdKchmsznekjKsU3QCQj2vi1_-_vn0j-nmol6t4l_fCUstaELuvySyU0IqbeJNqRijSej6844x8tni2pKMmbI59eFE71nNXZUSua6rxY0L1SsSv9zFxu1nZk6Ymfeq6ornHfwwfpiS6aMoyX3IuQusyrl_jAMwldxw99h8mPqBBTGdSDePWbPCo-jW56Btt9GB-vELUP43dNQjJTV2ZGcWNbCKaKefw4rPUiAOmBMWR_nS3RtfD8unDvfrEydKvNvZxFfGZNj7RVmf7t8TWdcqL1LMn_712Gs5K__tMdVSSEU3yJ14wGsMJgPjs3TwAJ2kZv7NI2I0K-Qu2Ifx1ya3jfB_8B84yh2009rXzM8V9mRplalwS3L7xAVuAxb3fS3GdFGcEXeqoTI4bKNKnUhXByG_J1z5ebj7Zf2aspe4Y7vZK3dV_hOju8TNUrULfHIxc-JiqIav_x-4fHZv_kHbGFh5WFp8N9pdM7W4ok6_J9J95iEY7mORFBLq_wFmFiu2&format=noten&ssp=10&name=Sliabh_Notes_Polkas" target="_blank">"Sliabh Notes" Polkas Tunebook</a></p>
<hr>
<p><strong>Sample Tune Set QR Codes</strong></p>
<p>I have an album of tune set Share URL QR codes up at <a href="https://flic.kr/s/aHBqjArRJZ">ABC Tune Set QR Codes</a> that you can try scanning with your phone.</p>
<hr>
<p><strong>Open Source Info:</strong></p>
<p>The converter uses open source Javascript libraries and forks of other projects:</p>
<p><a href="https://www.abctransposer.de/" target="_blank">Jens Wollschlager's ABC Transposer</a> was the initial inspiration for the development of this tool.</p> 
<p><a href="https://www.abcjs.net/" target="_blank">abcjs</a> by Paul Rosen and Gregory Dyke to convert abc to sheet music.</p>
<p><a href="https://www.npmjs.com/package/html-to-image" target="_blank">html-to-image</a> is used to prepare the html sheet music for PDF conversion.</p>
<p><a href="https://github.com/parallax/jsPDF" target="_blank">jsPDF</a> is used to create the PDF.</p>
<p><a href="https://github.com/Hopding/pdf-lib" target="_blank">pdf-lib</a> is used to split PDF tunebooks into individual PDF files.</p>
<p><a href="https://github.com/OMerkel/tin_whistle/tree/master/res/font" target="_blank">Tin Whistle Fingering Font</a> by Paul Merke is used to generate the whistle tabs.</p> 
<p><a href="https://davidshimjs.github.io/qrcodejs" target="_blank">qrcode.js</a> is used to generate the QR codes.</p> 
<p><a href="https://github.com/pieroxy/lz-string" target="_blank">lz-string.js</a> is used to for LZW compression of the tunes for share links.</p> 
<p><a href="https://wim.vree.org/js/xml2abc-js_index.html" target="_blank">xml2abc.js</a> is used to for converting MusicXML format to ABC.</p> 
<p><a href="https://wim.vree.org/svgParse/abc2xml.html" target="_blank">abc2xml</a> is used for the ABC format to MusicXML transcoding Python web service.</p> 
<p><a href="https://github.com/cuthbertLab/music21" target="_blank">Music21</a> is used for the MIDI to MusicXML transcoding Python web service.</p> 
<p><a href="https://stuk.github.io/jszip/" target="_blank">jszip.js</a> is used to unzip compressed .mxl files.</p>
<p><a href="https://github.com/zhuker/lamejs" target="_blank">lame.js</a> is used to for converting .wav format to .mp3.</p> 
<p><a href="https://github.com/swevans/unmute" target="_blank">umute.js</a> is used to for fixing the iOS tab switch audio mute issue.</p> 
<p><a href="https://musescore.org/en/handbook/3/soundfonts-and-sfz-files" target="_blank">MuseScore General</a> is the basis for the rendered MuseScore soundfont.</p> 
<p><a href="https://github.com/marmooo/midi2abc" target="_blank">midi2abc</a> is used for the standalone MIDI to ABC transcoding.</p> 
<p><a href="http://moinejf.free.fr/bww2abc" title="bww2abc" target="_blank">bww2abc</a> by Jean-Francois Moine is used for BWW to ABC conversion under a <a href="https://michaeleskin.com/abctools/gpl3.txt" target="_blank">GPL3+</a> license.</p>
<p><a href="https://johnresig.com/files/titleCaps.js" target="_blank">Title Caps</a> by John Resig is used for MusicXML title generation.</p> 
<p><a href="https://modal.daypilot.org" target="_blank">DayPilot Modal</a> is used for modal dialog replacements.</p> 
<p><a href="https://github.com/mturco/context-menu" target="_blank">context-menu</a> is used for dropdown menus.</p>
<p><a href="https://github.com/panzi/ocarina_tabs" target="_blank">ocarina_tabs</a> by panzi was the starting point for the 12-Hole Ocarina Tab Creator tool.</p>
<p><a href="https://www.fontspace.com/recorders-font-f18231" target="_blank">Hiawatha's Recorder Fingering Font</a> is used for Baroque Recorder fingering tablature.</p>
<p><a href="https://versilian-studios.com/vcsl/" target="_blank">Versilian Community Sample Library</a> CC0 Baroque Recorder samples were the starting point for the SATB Recorder instruments.</p>
<p>Ui icons created by <a href="https://www.flaticon.com/free-icons/ui" title="ui icons" target="_blank"> PDF and Karacis - Flaticon</a>.</p>
<p>Options icon by Marie Van den Broeck from <a href="https://thenounproject.com/browse/icons/term/options/" target="_blank" title="options Icons">Noun Project</a> (CC BY 3.0)</p>
<p>Anglo Concertina fingering solution and ABC parsing methods used by the tab injectors originally developed by <a href="https://jvandonsel.github.io/fingering/fingering.html" target="_blank">Jim Van Donsel</a>.</p>
<p>Diatonic harmonica mapping algorithm derived from: <a href="https://welltemperedstudio.wordpress.com/code/abc2harp/" target="_blank">abc2harp</a> by Gek Siong Low.</p>       
<p><a href="https://github.com/TomWyllie/folkfriend" title="FolkFriend" target="_blank">FolkFriend.app Tune Collection</a> by Tom Wyllie, used for the search engine, used under <a href="https://michaeleskin.com/abctools/gpl3.txt" title="GPL3" target="_blank">GPL3</a> licensing.</p>
<p><a href="https://freesound.org/people/bosone/packs/4209/" title="Bodhran Samples by Bosone" target="_blank">Bodhran Samples by Bosone</a> used under <a href="https://creativecommons.org/licenses/by-nc/4.0/" title="by-nc" target="_blank">CC BY-NC 4.0</a> licensing.</p>
<p><a href="https://ko-fi.com/s/573c321432" title="Irish Bouzouki (Kontakt Sample Instrument)" target="_blank">Irish Bouzouki (Kontakt Sample Instrument)</a> by Eamon Coughlan (sampled from an instrument built by Daniel Hoban) used as the basis for the Irish Bouzouki 2 instrument.</p>
<p><a href="https://www.arachnosoft.com/main/soundfont.php?documentation=fullscreen#copyright" title="Arachno Soundfont Licenses" target="_blank">Arachno Soundfont</a> used under a variety of non-commercial use licenses.</p>
<p>Without these free open-source resources this project would not have been possible.</p>
<hr>
<p><strong>Project Contributors:</strong></p>
<p>Thank you to Philip McGarvey for the share link export feature addition!</p>
<p>Thank you to Gavin Heneghan for allowing me to use his 20,000+ tune database for the tune search page.</p>
<p>Thank you to Matteo Brusa for prototyping work on the key/mode aware MIDI input system.</p>
<p>Thank you to <a href="https://www.youtube.com/@BenjaminHockenberry" target="_blank">Ben Hockenberry</a> for contributing to the Bodhran backing track templates</p>
<hr>
</details>