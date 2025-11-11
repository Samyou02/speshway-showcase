// Popup script for the Chrome extension

document.addEventListener('DOMContentLoaded', function() {
  const recordSelectionBtn = document.getElementById('recordSelection');
  const recordPageBtn = document.getElementById('recordPage');
  const viewSentencesBtn = document.getElementById('viewSentences');
  const statusDiv = document.getElementById('status');

  // Function to show status message
  function showStatus(message, isSuccess = true) {
    statusDiv.textContent = message;
    statusDiv.className = `status ${isSuccess ? 'success' : 'error'}`;
    statusDiv.style.display = 'block';
    setTimeout(() => {
      statusDiv.style.display = 'none';
    }, 3000);
  }

  // Function to send message to content script
  function sendMessageToContentScript(action) {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      if (tabs[0]) {
        chrome.tabs.sendMessage(tabs[0].id, { action: action }, function(response) {
          if (chrome.runtime.lastError) {
            showStatus('Error: Could not communicate with page. Try refreshing the page.', false);
          } else if (response && response.success) {
            showStatus('Sentence recorded successfully!', true);
          }
        });
      } else {
        showStatus('No active tab found.', false);
      }
    });
  }

  // Event listeners
  recordSelectionBtn.addEventListener('click', function() {
    sendMessageToContentScript('recordSelection');
  });

  recordPageBtn.addEventListener('click', function() {
    sendMessageToContentScript('recordPage');
  });

  viewSentencesBtn.addEventListener('click', function() {
    // Open the admin page to view sentences
    chrome.tabs.create({ url: 'http://localhost:8080/admin/sentences' });
  });

  // Check if backend is running
  fetch('http://localhost:5001/api/health')
    .then(response => {
      if (!response.ok) {
        throw new Error('Backend not responding');
      }
      return response.json();
    })
    .then(data => {
      if (data.status === 'ok') {
        showStatus('Backend connected ✓', true);
      }
    })
    .catch(error => {
      showStatus('Backend not running. Start the backend server first.', false);
      recordSelectionBtn.disabled = true;
      recordPageBtn.disabled = true;
    });
});
