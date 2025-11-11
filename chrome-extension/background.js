// Background script for the Chrome extension

// Handle extension installation
chrome.runtime.onInstalled.addListener(function() {
  console.log('Sentence Recorder extension installed');
});

// Handle messages from content scripts or popup
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === 'sentenceRecorded') {
    // Could add notification or other background processing here
    console.log('Sentence recorded:', request.data);
  }
  sendResponse({ received: true });
});

// Optional: Add context menu for recording sentences
chrome.contextMenus.create({
  title: "Record selected sentence",
  contexts: ["selection"],
  id: "recordSentence"
});

chrome.contextMenus.onClicked.addListener(function(info, tab) {
  if (info.menuItemId === "recordSentence" && info.selectionText) {
    chrome.tabs.sendMessage(tab.id, { action: 'recordSelection' });
  }
});
