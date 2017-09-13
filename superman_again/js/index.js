$(function(){
	 var lis=$('.nav a');

      lis.each(function(){
      	$this = $(this);
		   if($this[0].href==String(window.location)){
		        $this.parent().addClass("active");  
		    } 
      })
     $('.navbar-nav li').not(".active").find('a').mouseover(function(){
            $(this).css({color:'#fff'})
            $(this).prev('.nav-animate').css({display:'block',zIndex:'-1'})
        })
        $('.navbar-nav li').not(".active").find('a').mouseout(function(){
            $(this).css({color:'#fff'})
            $(this).prev('.nav-animate').css({display:'none',zIndex:'-1'})
        })
})