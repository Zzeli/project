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
	//返回顶部
	backTop:function(oh){
		var oh=oh||300;
		var top;
		var t;
		var that=this;
		this.hide();
		$(window).scroll(function(){
		   if($(window).scrollTop()>oh){
				that.show();
				clearTimeout(t);
				t = setTimeout(function(){
					that.animate({bottom:120},200,function(){
							that.animate({bottom:102},200);
					});
				},200);
		   }else{
				that.hide();
		   }
		});
		this.click(function(){
		$({someValue: $(window).scrollTop() }).animate(
			{someValue: 0}, {
			duration:700,
			step: function() {
				$(window).scrollTop(this.someValue);
			}
		})
	})
	}

})