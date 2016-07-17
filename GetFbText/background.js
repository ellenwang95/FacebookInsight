//https://developer.chrome.com/extensions/storage
function saveChanges(text) {
    chrome.storage.local.get('fb_data', function(items) {
        var data = [];
        if (!chrome.runtime.error) {
            data = items.fb_data;
            if(data == null) {
                data = [];
            }
        } else {
            alert('something happened');
        }
        data.push(text.concat('\n\n\n'));
        alert('DATA SAVED: ' + data);
        chrome.storage.local.clear();
        // Save it using the Chrome extension storage API.
        chrome.storage.local.set({'fb_data': data}, function() {
            // Notify that we saved.
            // alert('DATA SAVED: ' + data);
        });
    });
}

function appendFbText() {
    var story_elem = $( "div[id*='hyperfeed_story_id']"); 
    story_elem.contents().each(function(){
        if($(this).find('div.userContentWrapper._5pcr').length != 0)
        {
            var _this = $(this).find('div.userContentWrapper._5pcr');
            // alert(_this.text());
            saveChanges(_this.text());
        }
    });
}

appendFbText();

//  $.fn.scrollEnd = function(callback, timeout) {          
//   $(this).scroll(function(){
//     var $this = $(this);
//     if ($this.data('scrollTimeout')) {
//       clearTimeout($this.data('scrollTimeout'));
//     }
//     $this.data('scrollTimeout', setTimeout(callback,timeout));
//   });
// };

// // how to call it (with a 1000ms timeout):
// $(window).scrollEnd(function(){
//     appendFbText();
// }, 1000);









