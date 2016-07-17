 $.fn.scrollEnd = function(callback, timeout) {          
  $(this).scroll(function(){
    var $this = $(this);
    if ($this.data('scrollTimeout')) {
      clearTimeout($this.data('scrollTimeout'));
    }
    $this.data('scrollTimeout', setTimeout(callback,timeout));
  });
};

// how to call it (with a 1000ms timeout):
$(window).scrollEnd(function(){
    var tmp_id = 1;
    //$( "input[name*='man']" ) hyperfeed_story_id_
    $( "div[id*='hyperfeed_story_id']").contents().each(function(){
        // var element = $('.userContentWrapper._5pcr');
        if($(this).find('div.userContentWrapper._5pcr').length != 0)
        {
            var _this = $(this).find('div.userContentWrapper._5pcr');
            var _swap = $('<div id="textnodewrapper' + tmp_id + '" />');
            $.each(_this.text().split(' '),function(i,val){
                if($.trim(val).length > 0)
                {
                    _swap.append('<span class="textnode">' + val + '</span>');
                }
            });
            _swap.insertBefore(_this);
            // _this.remove();
        }
        tmp_id++;
    });

    var screen_bottom = $(window).height();
    var on_screen_words = [];
    $('.textnode').each(function(){
        if(($(this).position().top + $(this).height()) < screen_bottom)
        {
            on_screen_words.push($(this).text());
        }
    });
    alert(on_screen_words.join(' '));

}, 1000);

 //http://stackoverflow.com/questions/3701311/event-when-user-stops-scrolling

//http://stackoverflow.com/questions/6990350/jquery-get-text-currently-shown-ie-not-just-visible

