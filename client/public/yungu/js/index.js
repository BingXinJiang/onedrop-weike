$(function(){
	//头部点击切换效果
	$(".starHome").click(function(){
		$(".starHome a").removeClass().addClass("active");
		$(".starTips a").removeClass("active");
		$(".starAction a").removeClass("active");
		$("#main").css("background","none")
		$("body").css("background","url(../yungu/images/yugu_bg.jpg) no-repeat  center top")
		$("#newStarHome").show();
		$("#newStarTrip").hide();
		$("#newStarAction").hide();
	});
	$(".starTips").click(function(){
		$(".starHome a").removeClass("active");
		$(".starTips a").addClass("active");
		$(".starAction a").removeClass("active");
		$("body").css("background","#000")
		$("#main").css("background","url(../yungu/images/yugu_xinxing.jpg) no-repeat center -214px")
		$("#newStarHome").hide();
		$("#newStarTrip").show();
		$("#newStarAction").hide();
	})
	$(".starAction").click(function(){
		$(".starHome a").removeClass("active");
		$(".starTips a").removeClass("active");
		$(".starAction a").addClass("active");
		$("#main").css("background","none")
		$("body").css("background","url(../yungu/images/yugu_fenbu.jpg) no-repeat  center center");
		$("#newStarHome").hide();
		$("#newStarTrip").hide();
		$("#newStarAction").show();
	})
	//二维码的点击消失
	$("#ewm>span").click(function(){
		$(this).parent().hide()
	})
})
