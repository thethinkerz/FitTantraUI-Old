// header
 $(document).ready(function(){
    $(window).scroll(function(){
        var scrollTop = 50
        if($(window).scrollTop() >= scrollTop){
            $('header').addClass('headerFix');
        }
        if($(window).scrollTop() < scrollTop){
            $('header').removeClass('headerFix'); 
        }
    })
})