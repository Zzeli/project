$(function  () {

	var flag=true;
	window.onscroll=function(){
		var obj=document.body||document.documentElement;

		if(flag){
			
			if(obj.scrollTop>=1500){
				flag=false;
	 			go();
			}
		}
		
	}
	function go(){
		var shuziobj1=document.querySelector(".sgq_shuzi1");
		var num1=2600;
		var time1=25;
		var cnum1=0;

		var shuziobj2=document.querySelector(".sgq_shuzi2");
		var num2=520;
		var time2=25;
		var cnum2=0;

		var shuziobj3=document.querySelector(".sgq_shuzi3");
		var num3=667;
		var time3=25;
		var cnum3=0;


		zengzhang(num1,time1,cnum1,shuziobj1);
		zengzhang(num2,time2,cnum2,shuziobj2);
		zengzhang(num3,time3,cnum3,shuziobj3);
		function zengzhang(num,time,cnum,shuziobj){
			
			var steep1=Math.floor(num/time);
			shuziobj.innerHTML=cnum;
			var t=setInterval(function(){
				cnum+=steep1;
				if(cnum>=num){
					cnum=num;
					clearInterval(t);
				}
				shuziobj.innerHTML=cnum;
			},50);
		}
		
		}
		
})