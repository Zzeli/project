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
	 //下拉导航
	navDown:function(lists,dlists){
		var that=this;
		var t;
		lists.hover(function(){
			var that2=this;
			clearTimeout(t);
			t=setTimeout(function(){
				$(that2).find(dlists).slideDown();
			},200)
		},function(){
			$(that).find(dlists).slideUp();
			})	
	}
})