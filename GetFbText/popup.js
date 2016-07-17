// Copyright (c) 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * Get the current URL.
 *
 * @param {function(string)} callback - called when the URL of the current tab
 *   is found.
 */
function getCurrentTabUrl(callback) {
  // Query filter to be passed to chrome.tabs.query - see
  // https://developer.chrome.com/extensions/tabs#method-query
  var queryInfo = {
    active: true,
    currentWindow: true
  };

  chrome.tabs.query(queryInfo, function(tabs) {
    // chrome.tabs.query invokes the callback with a list of tabs that match the
    // query. When the popup is opened, there is certainly a window and at least
    // one tab, so we can safely assume that |tabs| is a non-empty array.
    // A window can only have one active tab at a time, so the array consists of
    // exactly one tab.
    var tab = tabs[0];

    // A tab is a plain object that provides information about the tab.
    // See https://developer.chrome.com/extensions/tabs#type-Tab
    var url = tab.url;

    // tab.url is only available if the "activeTab" permission is declared.
    // If you want to see the URL of other tabs (e.g. after removing active:true
    // from |queryInfo|), then the "tabs" permission is required to see their
    // "url" properties.
    console.assert(typeof url == 'string', 'tab.url should be a string');

    callback(url);
  });

  // Most methods of the Chrome extension APIs are asynchronous. This means that
  // you CANNOT do something like this:
  //
  // var url;
  // chrome.tabs.query(queryInfo, function(tabs) {
  //   url = tabs[0].url;
  // });
  // alert(url); // Shows "undefined", because chrome.tabs.query is async.
}

function renderStatus(statusText) {
  document.getElementById('status').textContent = statusText;
}

function renderTextbox(text) {
  document.getElementById('textbox').value = text;
}

function getFbData() {
    chrome.storage.local.get('fb_data', function(items) {
      if(items != null) {
        renderTextbox(items.fb_data);       
      } else {
        renderTextbox('No data to save.');
      }
      chrome.storage.sync.clear();
    });
}

//http://stackoverflow.com/questions/21012580/is-it-possible-to-write-data-to-file-using-only-javascript
function createDownloadOption() {
    var textFile = null,
    makeTextFile = function (text) {
      var data = new Blob([text], {type: 'text/plain'});

      // If we are replacing a previously generated file we need to
      // manually revoke the object URL to avoid memory leaks.
      if (textFile !== null) {
        window.URL.revokeObjectURL(textFile);
      }

      textFile = window.URL.createObjectURL(data);

      return textFile;
    };

    var create = document.getElementById('create'),
      textbox = document.getElementById('textbox');

    create.addEventListener('click', function () {
      var link = document.getElementById('downloadlink');
      link.href = makeTextFile(textbox.value);
      link.style.display = 'block';
    }, false);
}

document.addEventListener('DOMContentLoaded', function() {
  getCurrentTabUrl(function(url) {
    if(url.indexOf("facebook.com") != -1) {
      renderStatus("ON FACEBOOK");
      getFbData(); 
      createDownloadOption();
    }
  });
});







