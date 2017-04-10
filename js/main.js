/*=========================================

Template Name: DAFFODIL - Personal Portfolio Template
Author: ThemeLabBD
Version: 1.0
Design and Developed by: ThemeLabBD

NOTE: This is the custom jQuery file for the template

=========================================*/



(function ($) {
	"use strict";
    
    
    var $body = $("body"),
        $window = $(window);
    
        
        /*=============================
                Sticky header
        ==============================*/
        $('.navbar-collapse a').on('click',function(){
          $(".navbar-collapse").collapse('hide');
        });

        $window.on('scroll', function() {
          if ($(".navbar").offset().top > 100) {
            $(".custom-navbar").addClass("top-nav-collapse");
              } else {
                $(".custom-navbar").removeClass("top-nav-collapse");
              }
        });
    
    
    
    
    /*=============================
                Smoothscroll js
        ==============================*/
        $(function() {
          $('.custom-navbar a, a.scroll-btn').on('click', function(event) {
            var $anchor = $(this);
            $('html, body').stop().animate({
                scrollTop: $($anchor.attr('href')).offset().top - 0
            }, 1000);
            event.preventDefault();
          });
        });  
   
        
    /*======================================
        jquery scroll spy
    ========================================*/
        $body.scrollspy({
        
            target : ".navbar-collapse",
            offset : 95
        
        });
        
        
     /*=================================
            Bootstrap menu fix
     ==================================*/
        $(".navbar-toggle").on("click", function(){
        
            $body.addClass("mobile-menu-activated");
        
        });
        
        $("ul.nav.navbar-nav li a").on("click", function(){
        
            $(".navbar-collapse").removeClass("in");
        
        });
        
        
        /*====================================================
            background-image flickering solution for mobile
            =======================================================*/
             var bg = jQuery("#home");
            function resizeBackground() {
                bg.height($window.height() + 60);
            }
            resizeBackground();
       
    
    
        /*=============================
                WOW js
        ==============================*/
        new WOW({ mobile: false }).init();
    
        /*===================================
                owl carousel
         ====================================*/
        $(".review-list").owlCarousel({
            loop:true,
            margin:0,
            nav:false,
            dots:true,
            autoplay:true,
            autoplayHoverPause:true,
            responsive:{
                0:{
                    items:1
                },
                600:{
                    items:1
                },
                1000:{
                    items:1
                }
            }
        });
      
    
    
    
        /*=============================
            Contact form validator
    ==============================*/
       $("#contactForm").validator().on("submit", function (event) {
    if (event.isDefaultPrevented()) {
        // handle the invalid form...
        //formError();
        submitMSG(false, "Did you fill in the form properly?");
    } else {
        // everything looks good!
        event.preventDefault();
        submitForm();
    }
});


function submitForm(){
    // Initiate Variables With Form Content
    var name = $("#name").val();
    var email = $("#email").val();
    var msg_subject = $("#msg_subject").val();
    var message = $("#message").val();


    $.ajax({
        type: "POST",
        url: "https://go-mail.herokuapp.com/mailer",
        data: "name=" + name + "&email=" + email + "&msg_subject=" + msg_subject + "&message=" + message,
        success : function(text){
            if (text == "success"){
                formSuccess();
            } else {
                formError();
                submitMSG(false,text);
            }
        }
    });
}

function formSuccess(){
    $("#contactForm")[0].reset();
    submitMSG(true, "Message Submitted!")
}

function formError(){
    $("#contactForm").removeClass().addClass('fadeIn animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
        $(this).removeClass();
    });
}

function submitMSG(valid, msg){
    if(valid){
        var msgClasses = "h3 text-center tada animated text-success";
    } else {
        var msgClasses = "h3 text-center text-danger";
    }
    $("#msgSubmit").removeClass().addClass(msgClasses).text(msg);
}
        
        

    
    $window.on('load', function(){
          /*=============================
                Preloder
        ==============================*/
         $('.spinner').fadeOut(); 
        $('.preloader').delay(350).fadeOut(500);
        $body.delay(350).css({'overflow':'visible'});
            
        });

    
         
  


})(jQuery);