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
	//轮播图特效
	carousel:function(box,lists,btns,type,breaktime,movetime){
		var breaktime=breaktime||3000;
		var movetime=movetime||300;
		var type=type||one;
		if(type=="one"){
			var num=0;
			function moveone() {
				num++; 
				if(num==lists.length-1){
				box.animate({left:-num*lists.width()},movetime,function  () {
				box.css("left",0);
				});
				num=0;
				}else{
					box.animate({left:-num*lists.width()},movetime);  
				}
				btns.removeClass("uek_active");
				$(btns[num]).addClass("uek_active");
			}
		var ts=setInterval(moveone,breaktime)	 
		btns.hover(function  () {
			clearInterval(ts);
			box.stop();
			var index=btns.index(this);
			num=index;
			box.animate({left:-num*lists.width()},movetime);
			btns.removeClass("uek_active");
			$(btns[num]).addClass("uek_active");
			 },function  () {
			ts=setInterval(moveone,breaktime)
		 })
		}/*type one 结束*/	
		if(type=="two"){
			lists.css({
				position:"absolute",	
				left:0,
				top:0	
			})
			btns.css({
				position:"relative",
				zIndex:3	
			})	
			var numtwo=1;
			function movetwo(){
				if(numtwo==(lists.length-1)){numtwo=0}
				lists.css({
				zIndex:0,
				opacity:0	
				});	
				lists.animate({opacity:1},movetime)	
				lists[numtwo].style.zIndex=2;
				btns.removeClass("uek_active");
				$(btns[numtwo]).addClass("uek_active")
				numtwo++;		
			}
			var tt=setInterval(movetwo,breaktime);	
			btns.hover(function  () {
				clearInterval(tt);
				box.stop();
				var indexs=btns.index(this);
				numtwo=indexs+1;
				lists.css({
					display:"none"	
				})
				$(lists[indexs]).css({
					display:"block",
					zIndex:2,
					opacity:0	
				})	
				$(lists[indexs]).animate({opacity:1},movetime)
				btns.removeClass("uek_active");
				$(btns[indexs]).addClass("uek_active");
				},function  () {
					var indexs=btns.index(this);
					lists.css({
					display:"block",
					zIndex:1,
					opacity:1
					})
					$(lists[indexs]).css({
					zIndex:2
					})		 
					tt=setInterval(movetwo,breaktime)
				})
		}/*type two 结束*/  
	}

})