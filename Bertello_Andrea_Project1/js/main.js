/*  
	My book log
	Author: Andrea Bertello
*/

(function($) {

    /* --------------------- tooltip --------------------- */

    $('.masterTooltip').hover(function () {

//Hover over code
        var title = $(this).attr('title');
        $(this).data("tipText", title).removeAttr("title");
        $('<p class="tooltip"></p>')
            .text(title)
            .appendTo("body")
            .fadeIn("slow");

    }, function () {
        //Hover out code
        $(this).attr("title", $(this).data("tipText"));
        $(".tooltip").remove();
    }).mousemove(function (e) {
        var mousex = e.pageX + 20;
        var mousey = e.pageY + 10;
        $('.tooltip')
            .css({ top: mousey, left: mousex })
    });




    /*---------------------Tabs for dashboard---------------------------*/

    $('#tabs p').hide().eq(0).show();
    $('#tabs p:not(:first)').hide();

    $('#tab-nav li').click(function (e) {
        e.preventDefault();
        $('#tabs p').hide();

        $('#tab-nav .current').removeClass("current");
        $(this).addClass('current');
        var clicked = $(this).find('a:first').attr('href');

        $('#tabs ' + clicked).fadeIn('fast');
    }).eq(0).addClass('current');

    /*--------------------- New books ---------------------*/

    $('#addButton').on('click', function () {

        var projName = $('#projectName').val(),
            projDesc = $('#projectDescription').val(),
            projDue = $('#projectDueDate').val(),
            status = $('input[name = "status"]:checked').prop("id");

        $.ajax({
            url: "xhr/new_project.php",
            type: "post",
            dataType: "json",
            data: {
                projectName: projName,
                projectDescription: projDesc,
                projectDueDate: projDue,
                status: status
            },
            success: function (response) {
                console.log('Testing');
                if (response.error) {
                    alert(response.error);
                } else {
                    window.location.assign("books.html");
                }
                ;
            }
        });

    });

    /* ---------------------Get Books --------------------- */
    var projects = function(){

    $.ajax({
        url: 'xhr/get_projects.php',
        type: 'get',
        dataType: 'json',
        success: function(response) {
            if (response.error) {
                console.log(response.error);
            } else {

                for (var i = 0, j=response.projects.length; i < j; i++) {
                    var result = response.projects[i];

                    $(".projects").append(
                            '<div id="sortable" class="ui-state-default">' +
                            " <input class= 'projectid' type='hidden' value='" + result.id
                            + "'> " +
                            "Project Name: " + result.projectName + "<br>" +
                            "Project Description:" + result.projectDescription + "<br>"
                            +
                            "Project Status: " + result.status + "<br>"
                            + '<button class="deletebtn">Delete</button>'
                            + '<button class="editbtn">Edit</button>'
                            + '</div> <br>'
                    );
                } ;


                $('.deletebtn').on('click', function (e) {

                   var pid = $(this).parent().find('.projectid').val();







                    console.log('test delete');



                    $.ajax({
                        url: 'xhr/delete_project.php',
                        data: {
                            projectID: pid
                        },
                        type: 'POST',
                        dataType: 'json',
                        success: function (response) {
                            console.log('Testing');

                            if (response.error) {
                                alert(response.error);
                            } else {
                                window.location.assign("books.html");
                            };


                        }

                    });
                });//end delete

            }

        }
    });


    }
    $( "#dialog" ).dialog();

    projects();

    /* ---------------------Sortable --------------------- */

    $( "#sortable" ).sortable();
    $( "#sortable" ).disableSelection();









/* ---------------------Modal --------------------- */

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

    /* --------------------- datepicker --------------------- */
    $( "#from" ).datepicker({
        defaultDate: "+1w",
        changeMonth: true,
        numberOfMonths: 2,
        onClose: function( selectedDate ) {
            $( "#to" ).datepicker( "option", "minDate", selectedDate );
        }
    });
    $( "#to" ).datepicker({
        defaultDate: "+1w",
        changeMonth: true,
        numberOfMonths: 3,
        onClose: function( selectedDate ) {
            $( "#from" ).datepicker( "option", "maxDate", selectedDate );
        }
    });

    /* --------------------- Login --------------------- */

        $('#signinButton').click(function(){
            var user = $('#user').val();
            var pass = $('#pass').val();
            console.log("This notifies you if the password is working");
            $.ajax({
                url:'xhr/login.php',
                type:'post',
                dataType: 'json',
                data: {
                    username: user,
                    password: pass
                },
                success:function(response){
                    console.log("test user");
                    if(response.error){
                        alert(response.error);
                    }else{
                        window.location.assign('dashboard.html')
                    };
                }
            });
        });


/* --------------------- LogOut --------------------- */

        $('#logOut').click(function(e){
            e.preventDefault;
            $.get('xhr/logout.php', function(){
                window.location.assign('index.html')
            })
        });


    /* ---------------------Register ---------------------*/

    $('#register').on('click', function () {
        var firstname= $('#first').val(),
            lastname= $('#last').val(),
            email= $('#email').val(),
            username= $('#username').val(),
            password= $('#password').val();
        console.log(firstname+' '+lastname+' '+email+' '+username+' '+password);

        $.ajax({
            url:'xhr/register.php',
            type: 'post',
            dataType:'json',
            data:{
                first_name:firstname,
                last_name:lastname,
                email:email,
                username:username,
                password:password
            },

            success:function(response){
                if(response.error){
                    alert(response.error);

                    }else{
                        window.location.assign('dashboard.html');
                    }
                }
        });

    });

/* ---------------------Projects page ---------------------*/
    $('.booksbtn').on('click', function (e) {
        e.preventDefault();
        window.location.assign('books.html');

    });

/* ---------------------Display username---------------------*/
    $.getJSON("xhr/check_login.php", function(data) {
        console.log(data);
        $.each(data, function(key, val){
            console.log(val.first_name);
        $(".userid").html("Welcome : " + val.first_name);
    })
    });






    /*--------------------- photo gallery---------------------*/

    var thumbnailSpacing = 15;

$(document).ready(function(){

    $('a.sortLink').on('click',function(e){
        e.preventDefault();
        $('a.sortLink').removeClass('selected');
        $(this).addClass('selected');
        var keyword = $(this).attr('data-keyword');
        sortThumbnails(keyword);

    });







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

            $(this).css('display','inline').animate({
                'opacity': 1,
               'top':thumbnail_R+'px',
                'left':thumbnail_C+'px'
            }, 500);

            var newWidth = max_C * thumbnailWidth;
            var newHeight = thumbnail_R + thumbnailHeight;
            $('.thumbnail_container').css({'width':newWidth+'px','height':newHeight+'px'});


        });


    }

    /* Colorbox */
   $('#photos').find('a').colorbox({
       rel:'gal',
       'maxWidth' : '90%',
       'scalePhotos' :true
   });



		

	
})(jQuery); // end private scope




