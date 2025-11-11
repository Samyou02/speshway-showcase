# Sentence Recorder Chrome Extension

This Chrome extension automatically records sentences from web pages and sends them to a backend server for storage and analysis.

## Features

- **Automatic Recording**: Records sentences from page content when pages load
- **Manual Selection**: Right-click on selected text to record specific sentences
- **Popup Interface**: Easy-to-use popup for manual recording and viewing sentences
- **Backend Integration**: Sends recorded sentences to a REST API

## Installation

1. Open Chrome and go to `chrome://extensions/`
2. Enable "Developer mode" in the top right
3. Click "Load unpacked" and select the `chrome-extension` folder
4. The extension should now be installed and visible in your extensions list

## Usage

### Automatic Recording
- The extension automatically records sentences when you visit web pages
- Sentences are extracted from the page content and sent to the backend

### Manual Recording
1. Click the extension icon in the toolbar
2. Select text on a webpage
3. Click "Record Selection" in the popup
4. Or right-click selected text and choose "Record selected sentence"

### Viewing Recorded Sentences
- Click "View Recorded Sentences" in the popup to open the admin interface

## Backend Requirements

Make sure your backend server is running on `http://localhost:5001` with the following endpoint:

- `POST /api/sentences` - Accepts sentence data
- `GET /api/sentences` - Returns recorded sentences

## Files

- `manifest.json` - Extension configuration
- `contentScript.js` - Injects into web pages to record sentences
- `popup.html` - Extension popup interface
- `popup.js` - Popup functionality
- `background.js` - Background service worker

## Development

To modify the extension:

1. Make changes to the files
2. Go to `chrome://extensions/`
3. Click the refresh button on the Sentence Recorder extension
4. Test your changes

## Permissions

The extension requires the following permissions:

- `activeTab` - Access the current tab
- `storage` - Store extension data
- `scripting` - Inject content scripts
- Host permission for `http://localhost:5001/*` - Communicate with backend
