// Content script to record sentences from web pages

// Function to extract sentences from text
function extractSentences(text) {
  // Simple sentence extraction using regex
  const sentences = text.match(/[^.!?]+[.!?]+/g) || [];
  return sentences.map(s => s.trim()).filter(s => s.length > 10); // Filter out very short sentences
}

// Function to record a sentence
async function record(sentence) {
  try {
    const response = await fetch('http://localhost:5001/api/sentences', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: sentence,
        url: window.location.href,
        timestamp: new Date().toISOString()
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Sentence recorded:', data);
    return data;
  } catch (error) {
    console.error('Failed to record sentence:', error);
    throw error;
  }
}

// Function to process text selection
function handleTextSelection() {
  const selection = window.getSelection();
  if (selection.rangeCount > 0) {
    const selectedText = selection.toString().trim();
    if (selectedText) {
      const sentences = extractSentences(selectedText);
      if (sentences && sentences.length > 0) {
        // Record the first sentence found in selection
        const sentenceToRecord = sentences[0];
        if (sentenceToRecord) {
          record(sentenceToRecord).catch(console.error);
        }
      }
    }
  }
}

// Function to process page content periodically
function processPageContent() {
  const bodyText = document.body.innerText || '';
  const sentences = extractSentences(bodyText);

  // Record a random sentence from the page (limit to avoid spam)
  if (sentences && sentences.length > 0) {
    const randomIndex = Math.floor(Math.random() * Math.min(sentences.length, 5));
    const sentenceToRecord = sentences[randomIndex];
    if (sentenceToRecord) {
      record(sentenceToRecord).catch(console.error);
    }
  }
}

// Listen for text selection
document.addEventListener('mouseup', () => {
  setTimeout(handleTextSelection, 100); // Small delay to ensure selection is complete
});

// Process page content when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', processPageContent);
} else {
  processPageContent();
}

// Also process content after a delay to catch dynamic content
setTimeout(processPageContent, 3000);

// Listen for messages from popup or background
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'recordSelection') {
    handleTextSelection();
    sendResponse({ success: true });
  } else if (request.action === 'recordPage') {
    processPageContent();
    sendResponse({ success: true });
  }
});
