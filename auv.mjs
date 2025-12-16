///////////////////////////////////////////////////////////////////////
// auto-update-version scripts for ABC Tools Lite
// https://github.com/anton-bregolas/abctools-lite
// MIT License
// (c) Anton Zille 2025
///////////////////////////////////////////////////////////////////////
// Usage: node auv.mjs -help
// Custom .bashrc alias example: alias vv='node auv.mjs -v'
///////////////////////////////////////////////////////////////////////

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync, spawn } from 'node:child_process';
import liteVersionJson from './abc_lite_version.json' with { type: "json" };
import toolsVersionJson from './abc_tools_version.json' with { type: "json" };

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const liteScriptsFile = path.join(__dirname, 'app-lite.js');
const liteVersionFile = path.join(__dirname, 'abc_lite_version.json');
const serviceWorkerFile = path.join(__dirname, 'service_worker.js');
const abcToolsPage = path.join(__dirname, 'abctools.html');
const abcToolsQEPage = path.join(__dirname, 'abctools-quick-editor.html');
const abcToolsScripts = path.join(__dirname, 'app.js');
const abcToolsStyles = path.join(__dirname, 'app.css');

const args = process.argv.slice(2);

function getVersionData() {
  const { version, date } = liteVersionJson;
  const abcToolsVersion = toolsVersionJson.version;
  return {
    toolsVersion: abcToolsVersion ? abcToolsVersion : null,
    liteVersion: version ? version : null,
    liteDate: date? date : null
  };
}

function bumpLiteVersion(version) {
  const parts = version.split('-');
  parts[parts.length - 1] = (+parts[parts.length - 1] + 1).toString();
  return parts.join('-');
}

function getNewLiteVersion() {
  const toolsVerNum = toolsVersionJson.version.split('_')[0];
  return `lite-${toolsVerNum}-1`
}

function getCurrentDate() {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

async function readFileData(filePath) {
  try {
    return await fs.readFile(filePath, 'utf8');
  } catch (err) {
    console.error(`✗ Failed to read ${path.basename(filePath)}:`, err.message);
    throw err;
  }
}

async function updateFile(filePath, updateData) {
  try {
    await fs.writeFile(filePath, updateData, 'utf8');
    console.log(`✓ ${path.basename(filePath)} updated`);
  } catch (err) {
    console.error(`✗ ${path.basename(filePath)} update failed:`, err.message);
    throw err;
  }
}

async function updateVersionFile(newLiteVersion, newLiteDate) {
  const jsonData = JSON.parse(await readFileData(liteVersionFile));
  jsonData.version = newLiteVersion ?? jsonData.version;
  jsonData.date = newLiteDate ?? jsonData.date;
  const updatedJson = JSON.stringify(jsonData);
  await updateFile(liteVersionFile, updatedJson);
}

async function updateLiteScripts(newLiteVersion) {
  const appLiteData = await readFileData(liteScriptsFile);
  const updatedAppLite = 
    appLiteData
      .replace(/gLiteVersionNumber\s*=\s*["'`].*?["'`]/, `gLiteVersionNumber = '${newLiteVersion}'`)
  await updateFile(liteScriptsFile, updatedAppLite);
}

async function updateServiceWorker(newLiteVersion, newLiteDate) {
  const swData = await readFileData(serviceWorkerFile);
  const updatedSw = 
    swData
      .replace(/\/\/ Last updated on [\d-]*/g, `\/\/ Last updated on ${newLiteDate}`)
      .replace(/CACHE_VERSION\s*=\s*["'`].*?["'`]/, `CACHE_VERSION = '${newLiteVersion}'`);
  await updateFile(serviceWorkerFile, updatedSw);
}

async function updateAbcToolsPages() {
  const htmlFiles = [abcToolsPage, abcToolsQEPage];
  const toolScript = /\t<script type="text\/javascript" src="app(?:-min)*\.js(?:\?v=[\d]*)*">/g;
  const liteScript = `\t<script type="text/javascript" src="app-lite.js"></script><!-- ABC Tools Lite custom scripts -->\n\t<script type="text/javascript" src="app.js">`;
  const readData = await Promise.all(htmlFiles.map(file => readFileData(file)));
  const writeTask = readData.map((data, i) =>
    updateFile(htmlFiles[i], data.replace(toolScript, liteScript))
  );
  await Promise.all(writeTask);
}

async function updateAppScripts() {
  const appJsData = await readFileData(abcToolsScripts);
  const defaultUiFonts = /font-family:[\s]*[Hh]elvetica/g;
  const defaultCodeFonts = /font-family:[\s]*[Cc]ourier/g;
  const customUiFonts = `font-family:var(--abctools-ui-font-fallbacks)`;
  const customCodeFonts = `font-family:var(--abctools-code-font-fallbacks)`;
  const updatedAppJs = 
    appJsData
      .replace(defaultUiFonts, customUiFonts)
      .replace(defaultCodeFonts, customCodeFonts);
  await updateFile(abcToolsScripts, updatedAppJs);
}

async function updateAppStyles() {
  const appCssData = await readFileData(abcToolsStyles);
  const defaultUiFonts = /font-family:[\s]*[Hh]elvetica/g;
  const defaultCodeFonts = /font-family:[\s]*[Cc]ourier/g;
  const customUiFonts = `font-family: var(--abctools-ui-font-fallbacks)`;
  const customCodeFonts = `font-family: var(--abctools-code-font-fallbacks)`;
  const updatedAppCss = 
    appCssData
      .replace(defaultUiFonts, customUiFonts)
      .replace(defaultCodeFonts, customCodeFonts);
  await updateFile(abcToolsStyles, updatedAppCss);
}

async function addAllChanges() {
  try {
    execSync('git add -A', { stdio: 'inherit' });
    console.log(`✓ Added all changes`);
  } catch (err) {
    console.error(`✗ Failed to add changes:`, err.message || err);
    process.exit(1);
  }
}

async function addVersionChanges() {
  try {
    execSync('git add abc_lite_version.json', { stdio: 'inherit' });
    execSync('git add service_worker.js', { stdio: 'inherit' });
    execSync('git add app-lite.js', { stdio: 'inherit' });
    console.log(`✓ Added changes to version files`);
  } catch (err) {
    console.error(`✗ Failed to add changes:`, err.message || err);
    process.exit(1);
  }
}

async function commitChangesWithMessage(commitMessage) {
  try {
    execSync(`git commit -m "${commitMessage}"`, { stdio: 'inherit' });
    console.log(`✓ Committed changes with message:\n\n${commitMessage}\n\n`);
    return 0;
  } catch (err) {
    console.error(`✗ Failed to commit changes:`, err.message || err);
    process.exit(1);
  }
}

async function addAllChangesAndCommit(commitMessage) {
  try {
    execSync('git add -A', { stdio: 'inherit' });
    execSync(`git commit -m "${commitMessage}"`, { stdio: 'inherit' });
    console.log(`✓ Added all changes & committed with message:\n\n${commitMessage}`);
    return 0;
  } catch (err) {
    console.error(`✗ Failed to add & commit changes:`, err.message || err);
    process.exit(1);
  }
}

async function openCommitEditor(message) {
  // Write to a temp file and open git commit with -t
  const tmpFile = path.join(__dirname, '.git', 'COMMIT_EDITMSG_ABCLT');
  await updateFile(tmpFile, message);
  return new Promise((resolve) => {
    const child = spawn('git', ['commit', '-t', tmpFile], { stdio: 'inherit' });
    child.on('exit', (code) => {
      fs.unlink(tmpFile).then(() => resolve(code));
    });
  });
}

async function commitWithMessage(message) {
  // Commit with a message without opening editor
  return new Promise((resolve) => {
    const child = spawn('git', ['commit', '-m', message], { stdio: 'inherit' });
    child.on('exit', (code) => resolve(code));
  });
}

// Main LT auto-update-version sequence

async function main() {
  
  const type = args[0];

  if (!type || !['-a', '-abc', '-c', '-ca', '-help', '-tst', '-up', '-us', '-uv', '-v'].includes(type)) {
    console.error('ABC Tools Lite :: Auto-Version-Update\n\nUsage: v[a|abc|c|ca|help|tst|up|us|uv|v] || node auv.mjs [-a|-abc|-c|-ca|-help|-tst|-up|-us|-uv|-v]');
    process.exit(1);
  }

  if (type === '-help') {
    console.log(
     'ABC Tools Lite :: Auto-Version-Update' + '\n\n' +
     '-a\t|\tva\t|\tadd version files only' + '\n' +
     '-abc\t|\tvabc\t|\tauto-complete merge from abc tools upstream' + '\n' +
     '-c\t|\tvc\t|\topen commit editor, update / add / commit version files on success' + '\n' +
     '-ca\t|\tvca\t|\tupdate version, add all, open commit editor' + '\n' +
     '-help\t|\tvhelp\t|\tlist all available commands' + '\n' +
     '-tst\t|\tvtst\t|\ttest updated app version / date' + '\n' +
     '-up\t|\tvus\t|\tupdate html pages, add all on success' + '\n' +
     '-us\t|\tvus\t|\tupdate scripts & styles, add all on success' + '\n' +
     '-uv\t|\tvuv\t|\tupdate / add version files only, auto-commit' + '\n' +
     '-v\t|\tvv\t|\tshow current app version / date' + '\n'
    );
    process.exit(0);
  }

  if (type === '-a') {
    addVersionChanges();
    return;
  }

  const { toolsVersion, liteVersion, liteDate } = getVersionData();
  
  if (type === '-v') {
    console.log(
      `ABC Tools version:\t${toolsVersion}\nABC Lite version:\t${liteVersion}\nABC Lite updated:\t${liteDate}`
    ); 
    return; 
  }

  const newLiteVersion =
    type === '-abc'? getNewLiteVersion() :
    bumpLiteVersion(liteVersion);

  const newLiteDate = getCurrentDate();

  if (type === '-tst') {
    console.log(
      `Test bump ABC Lite version:\t${newLiteVersion}\nTest update ABC Lite version:\t${getNewLiteVersion()}\nTest update ABC Lite date:\t${newLiteDate}`
    ); 
    return; 
  }

  if (type === '-abc' || type === '-ca') {
    await updateVersionFile(newLiteVersion, newLiteDate);
    await updateServiceWorker(newLiteVersion, newLiteDate);
    await updateLiteScripts(newLiteVersion);
  }

  let commitMsg = '';
  let exitCode = 1;

  if (type === '-abc') {
    await updateAbcToolsPages();
    await updateAppScripts();
    await updateAppStyles();
    commitMsg =
      `Update ABC Tools to v.${toolsVersion}`;
    exitCode = await addAllChangesAndCommit(commitMsg);

  } else if (type === '-c') {
    commitMsg = 
      `ABC Tools Lite\n\n` +
      `- Updated to version ${newLiteVersion}`;
    exitCode = await openCommitEditor(commitMsg);

  } else if (type === '-ca') {
    await addAllChanges();
    commitMsg = 
      `ABC Tools Lite\n\n` +
      `- Updated to version ${newLiteVersion}`;
    exitCode = await openCommitEditor(commitMsg);

  } else if (type === '-up') {
    await updateAbcToolsPages();
    exitCode = 0;

  } else if (type === '-us') {
    await updateAppScripts();
    await updateAppStyles();
    exitCode = 0;

  } else if (type === '-uv') {
    commitMsg =
      `Bump ABC Tools Lite version\n\n` +
      `- Update app version to ${newLiteVersion}\n`;
    exitCode = await commitWithMessage(commitMsg);
  }

  if (exitCode !== 0) {
    process.exit(1);
  }

  if (exitCode === 0) {
    // For -c, only update version file & service worker if commit succeeded
    if (type === '-c') {
      await updateVersionFile(newLiteVersion, newLiteDate);
      await updateServiceWorker(newLiteVersion, newLiteDate);
      await updateLiteScripts(newLiteVersion);
      commitMsg =
        `Bump ABC Tools Lite version\n\n` +
        `- Update app version to ${newLiteVersion}\n`;
      await addVersionChanges();
      await commitChangesWithMessage(commitMsg);

    } else if (type === '-abc') {
      console.log(`✓ Completed merging ABC Tools update`);
      
    } else if (type === '-ca') {
      console.log(`✓ Committed all changes`);

    } else if (type === '-up') {
      await addAllChanges();
      console.log(`✓ Updated html pages & staged all changes`);

    } else if (type === '-us') {
      await addAllChanges();
      console.log(`✓ Updated app files & staged all changes`);

    } else if (type === '-uv') {
      console.log(`✓ Committed version update`);
    }
  }
}

main();