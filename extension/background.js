/* globals chrome */
chrome.browserAction.onClicked.addListener(function(tab) {
  let url = new URL(tab.url);
  if (url.hostname.endsWith('.glitch.me')) {
    chrome.tabs.executeScript(tab.id, {file: "bookmarklet.js"});
  }
});