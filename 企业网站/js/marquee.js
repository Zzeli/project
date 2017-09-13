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
	marquee:function(box,list,left,right,num,movetime){
		var num=num||1;
		var aa=list;
		var leng=list.outerWidth()+parseInt(list.css("marginRight"));
		function move () {
			box.animate({left:num*-leng},function  () {
			for (var i=0; i<num; i++) {
			box.append($(".uek_lists").eq(0));
			}
			box.css("left",0);
			})
		}
		var t=setInterval(move,movetime);
		left.hover(function  () {
			clearInterval(t)
			},function  () {
			t=setInterval(move,movetime);
			})
		right.hover(function  () {
				clearInterval(t)
			},function  () {
				t=setInterval(move,movetime);
			})
		left.click(function  () {
			move();
			})
		right.click(function  () {
			box.css("left",-num*leng);
			for (var i=0; i<num; i++) {
				box.prepend($(".uek_lists").last());
			} 
			box.animate({left:0})
		})			
	}
})