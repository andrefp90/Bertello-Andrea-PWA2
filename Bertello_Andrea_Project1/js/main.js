/*  
	My book log
	Author: Andrea Bertello
*/

(function($){

    /* tooltip */
	
	$('.masterTooltip').hover(function(){

//Hover over code
        var title = $(this).attr('title');
        $(this).data("tipText", title).removeAttr("title");
        $('<p class="tooltip"></p>')
        .text(title)
        .appendTo("body")
        .fadeIn("slow");

    }, function() {
        //Hover out code
        $(this).attr("title", $(this).data("tipText"));
        $(".tooltip").remove();
    }).mousemove(function(e) {
        var mousex = e.pageX + 20;
        var mousey = e.pageY + 10;
        $('.tooltip')
            .css({ top: mousey, left: mousex })
    });

    /*Tabs for dashboard*/

    $('#tabs p').hide().eq(0).show();
    $('#tabs p:not(:first)').hide();

    $('#tab-nav li').click(function(e){
        e.preventDefault();
        $('#tabs p').hide();

    $('#tab-nav .current').removeClass("current");
        $(this).addClass('current');
        var clicked = $(this).find('a:first').attr('href');

        $('#tabs '+ clicked).fadeIn('fast');
    }).eq(0).addClass('current');

/*Modal*/

    $('.modalClick').on('click', function(event){
        event.preventDefault();
        $('#overlay')
            .fadeIn()
            .find('#modal')
            .fadeIn();
    });

    $('.close').on('click',function(event){
        event.preventDefault();
        $('#overlay')
            .fadeOut()
            .find("#modal")
            .fadeOut();
    });



    $('.mystatus').mouseover(function(){
        $(this).fadeTo(100, .3);
    });
    $('.mystatus').mouseout(function(){
        $(this).fadeTo(100, 1);
    });

    /* photo gallery*/

    var thumbnailSpacing = 15;

$(document).ready(function(){

    $('a.sortLink').on('click',function(e){
        e.preventDefault();
        $('a.sortLink').removeClass('selected');
        $(this).addClass('selected');
        var keyword = $(this).attr('data-keyword');
        sortThumbnails(keyword);

    });





    $('.gallery .sorting').css('margin-bottom',window.thumbnailSpacing+'px');
    $('.thumbnail_container a.thumbnail').addClass('showMe').addClass('fancybox').attr('rel','group');

    positionThumbnails();

});

    function sortThumbnails(keyword){

      $('.thumbnail_container a.thumbnail').each(function(){

          var thumbnailKeywords = $(this).attr('data-keywords');
          if(keyword == 'all'){
          $(this).addClass('showMe').removeClass('hideMe').attr('rel','group');
          }else{

              if( thumbnailKeywords.indexOf(keyword) != -1){

                  $(this).addClass('showMe').removeClass('hideMe').attr('rel','group');

              }else{
                  $(this).addClass('hideMe').removeClass('showMe').attr('rel','none');
              }

          }

      });
        positionThumbnails();
    }

    function positionThumbnails(){

        /*debug*/ $('.debug-remainder').html('');

$('.thumbnail_container a.thumbnail.hideMe').animate({opacity:0},500,function(){

    $(this).css({'display':'none','top':'0px','left':'0px'});
});

        var containerWidth = $('.photos').width();
        var thumbnail_R = 0;
        var thumbnail_C = 0;
        var thumbnailWidth = $('a.thumbnail img:first-child').outerWidth() + window.thumbnailSpacing;
        var thumbnailHeight = $('a.thumbnail img:first-child').outerHeight() + window.thumbnailSpacing;
        var max_C = Math.floor(containerWidth / thumbnailWidth);

        $('.thumbnail_container a.thumbnail.showMe').each(function(index){
            var remainder = (index%max_C)/100;
            var maxIndex = 0;
            /*debug */ $('.debug-remainder').append(remainder+' - ');

            if(remainder == 0){
                if(index != 0){
                    thumbnail_R += thumbnailHeight;
                }
                thumbnail_C = 0;
            }else{
                thumbnail_C += thumbnailWidth;
            }

            $(this).css('display','block').animate({
                'opacity': 1,
               'top':thumbnail_R+'px',
                'left':thumbnail_C+'px'
            }, 500);

            var newWidth = max_C * thumbnailWidth;
            var newHeight = thumbnail_R + thumbnailHeight;
            $('.thumbnail_container').css({'width':newWidth+'px','height':newHeight+'px'});


        });

        detectFancyboxLinks();

        var sortingWidth = $('.thumbnail_container').width() / thumbnailWidth;
        var newWidth = sortingWidth * thumbnailWidth - window.thumbnailSpacing;
        $('.sorting').css('width',newWidth+'px');
    }


function detectFancyboxLinks(){

    $('a.fancybox[rel="group"]').fancybox({
        'transitionIn' :'elastic',
        'transitionOut' :'elastic',
        'titlePosition' :'over',
        'speedIn': 500,
        'overlayColor' : '#000',
        'padding' : 0,
        'overlayOpacity' : .75
    });
}
		

	
})(jQuery); // end private scope




