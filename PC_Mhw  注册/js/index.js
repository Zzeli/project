$(function(){
    var swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        paginationClickable: true,
        spaceBetween: 30,
        centeredSlides: true,
        autoplay: 2500,
        autoplayDisableOnInteraction: false
    });

    var lis=$('.nav li');
    lis.on('click',function(){
        lis.removeClass('active');
        $(this).addClass('active')
    })

   var show_more=$('.news-container .article');
    show_more.on('click',function(){
        $(this).toggleClass('active');
    })

    $('.education-item').hover(function(){
        $(this).find('.mask').toggleClass('hidden')
        $(this).find('.mask-con').toggleClass('hidden')
     }
)
$('.detail').hover(function(){
    $(this).toggleClass('active')
})



})