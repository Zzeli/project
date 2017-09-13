/*
*
* 
*  Copyright:山西优逸客科技有限公司 项目开发组 
*
*  Date:2015-01-20 Time:01-14
*
*  The development team: Json  L  Herman  Abner
*
*
*/
$.fn.extend({
	//漂浮窗
	floatWindow:function(speedx,speedy,speed,closewindow){
		var that=this;
		$(this).css({
			zIndex:999,
			position:"fixed"	
			})	   
		var speed=speed||60;
		var float=$(this);
		var speedx=speedx||5;
		var speedy=speedy||5;
		float.hover(function(){
			clearInterval(t)
			},function(){ 
			t=setInterval(move,speed)
			});
		closewindow.click(function(){
			that.css("display","none");
			})   
		function move () {
			var left=float.offset().left;
			var top=float.offset().top-($(window).scrollTop());
			var widths=$(window).width();
			var heights=$(window).height();
			var newleft=left+speedx;
			var newtop=top+speedy;
			if (newleft>(widths-float.width())) {
			newleft=widths-float.width();
			speedx*=-1;
		}
		if (newleft<0) {
			newleft=0;
			speedx*=-1;
		}
		if (newtop>(heights-float.height())) {
			newtop=heights-float.height();
			speedy*=-1;
		}
		if (newtop<0) {
			newtop=0;
			speedy*=-1;
		}else{
		float.css({
			left: newleft,
			top: newtop  
		})
		}/*else结束*/
		}/*move函数结束*/
		var t=setInterval(move,speed);
	}

})