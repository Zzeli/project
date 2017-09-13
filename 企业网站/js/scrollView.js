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
//放大旋转  
function zoomRotate (zoom) {
 var clientW=$(window).width();
var clientH=$(window).height();
  var zoom=zoom
 var zoomSpans=sliceText(zoom);
 $(window).scroll(function (){
  var scrollT=$(window).scrollTop();
   if((zoom.offset().top-clientH/2)-scrollT<-clientH/2-100){
   	return;
   }
  if((zoom.offset().top-clientH/2)<scrollT){
   var num=1-(zoom.offset().top-clientH/2)/scrollT;
   if(num<0.1){
   	num=0;
   }
   zoomSpans.each(function  (index,obj) {
	  
	 if(index%2==0){
	    $(this).css({
   	      transform:"rotate("+num*5+"rad)"
        })
	 }else{
		$(this).css({
   	      transform:"rotate("+(-num*5)+"rad)"
        })
	  }
   })
   var newnum=num*10;
   if(newnum<1){
   	newnum=1;
   }
   zoom.css({
   	transform:"scale("+newnum+")"
   })
  }

 })

}
 


//fly 文字飞入
/*
 fir   方向   r 从右飞入  l从左飞入
*/
function fly (flyObj,dir,rotate) {
	var rotate=rotate==undefined?true:rotate;
	var dir=dir||"l";
	var clientW=$(window).width();
	var clientH=$(window).height();
	if(dir=="l"){
	var initPosition=-(flyObj.offset().left+flyObj.width());
	}else	if(dir=="r"){
	 var initPosition=(flyObj.offset().left+flyObj.width());
	}	
	flyObj.css({
	position:"relative",
    left:initPosition,
	top:0
	})
	var initTop=flyObj.offset().top;
	$(window).scroll(function  () {
		var scrollT=$(window).scrollTop();
		if((initTop+clientH)<scrollT){
			return;
		 }
		 
		if((initTop-clientH)<scrollT){
	 	
		  var num=1-(scrollT/(initTop));
           
			   if(num<0.05){
			 	num=0;
			   }
			   
			   flyObj.css({
			    left:num*(initPosition)
			   })
			 
					
			
		   if(rotate){  
			    flyObj.css({
				  transform:"rotate("+num*3+"rad)"
				}) 
			   }
		}  
	})
}


/*固定
num  固定的距离(高度)
*/
function fixed (obj,num) {
	
 var clientW=$(window).width();
 var clientH=$(window).height();
 var num=num||clientH/2;
 var initTop=obj.offset().top;
 var initLeft=obj.offset().left;
 $(window).scroll(function  () {
	 
   var scrollT=$(window).scrollTop();

   if(initTop-parseInt(obj.css("margin-top"))<scrollT){
     obj.css({
	 position:"relative",
	 top:scrollT-initTop+parseInt(obj.css("margin-top")),
	 left:initLeft
	 })
		 
   }else{
   obj.css({
	 position:"static"
	 })
   }

   if(initTop-parseInt(obj.css("margin-top"))+num<scrollT){
     obj.css({
	 position:"static"
	 })
		 
   }
 })
}

/*原点放大旋转*/
function origin (obj) {
	
	var clientW=$(window).width();
	var clientH=$(window).height();
	var initTop=obj.offset().top;
		obj.css({
		transform:"scale(5)"
		})
	
	$(window).scroll(function  () {
		var scrollT=$(window).scrollTop();
		if((initTop-clientH/2)<=scrollT){
			return;
		 }
		 
		if((initTop-clientH)<scrollT){
	 	   
		    var num1=(360/(clientH/2))*((scrollT-(initTop-clientH)+20))
			var num2=5/(clientH/2)*((scrollT-(initTop-clientH)));
			
			    if(num1>360){
				  num1=360;
				}
				if(num2>4){
				num2=4
				}
				
			    obj.css({
				  transform:"rotate("+num1+"deg) scale("+(5-num2)+")"
				}) 
			 
		}  
	})
}
	/*如影随形
	  obj  要处理的对象
	  num  跟随的个数
	*/

	function follow (obj,num) {
	  var num=num||2;
	  var arr=[];
	  for (var i=0; i<num; i++) {
		  obj.clone(true);
	  }
	}


//分割文字
 function sliceText(obj){
   //obj.css("perspective","800px")
   var objText=$.trim(obj.text());
   obj.text("");
   /*var box=$("<div>").css({
   	width:"100%",height:"100%"
   }).appendTo(obj);
   */
   var spans=[];
   for (var i = 0; i < objText.length; i++) {
     spans.push($("<span>").css("display","inline-block").html(objText.charAt(i)).appendTo(obj));	
   }
   return obj.find("span");
 }
