$(function(){
	/*手机二维码*/
	$("#client_top").hover(function(){
		$("#client_bottom").slideDown(400),
		$("#client_top").css("color","#f4f4f4")
	},function(){
		$("#client_bottom").slideUp(400),
		$("#client_top").css("color","#cacaca")
	})

	/*公告*/
	var index1 = 0;
	var timer1 = 0;
	function tab(){
		$(".news_notice").stop().animate({top:-34 * index1},1000,function(){
			if(index1 == $(".news_notice li").size() ){
				index1 = 0;
				$(".news_notice").css({top:0});
			}
		})
	}
	function timerInner(){
		index1++;
		tab();
	}
	timer1 = setInterval(timerInner(),1000);
	

	/*表单验证*/


	// 手机号
	$(".person_phone").keyup(function(){
		$(".error").css("display","none");

		$(".person_phone").css("border","1px solid #d6d6d6");
		$(".person_phoneX").css("background","url(images/X.png) no-repeat");

		//是否显示X
		if(!$(".person_phone").val()){
			$(".person_phoneX").css("display","none");
		}else{
			$(".person_phoneX").css("display","block");
		}

		
	})

	//给手机X添加事件
	$(".person_phoneX").click(function(){
		$(".person_phone").val("");
		$(".person_phoneX").css("display","none");
		$(".error").css("display","none");
		$(".person_phone").css("border","1px solid #d6d6d6");
	})



	// 密码框
	$(".person_phone_pwd").keyup(function(){
		$(".register_errorBtn .error").css("display","none");

		$(".person_phone_pwd").css("border","1px solid #d6d6d6");
		$(".person_phone_pwdX").css("background","url(images/X.png) no-repeat");

		//是否显示X
		if(!$(".person_phone_pwd").val()){
			$(".person_phone_pwdX").css("display","none")
		}else{
			$(".person_phone_pwdX").css("display","block")
		}

	})

	//给密码X添加事件
	$(".person_phone_pwdX").click(function(){
		$(".person_phone_pwd").val("");
		$(".person_phone_pwdX").css("display","none");
		$(".error").css("display","none");
		$(".person_phone_pwd").css("border","1px solid #d6d6d6");
	})

	// 确认密码框
	$(".person_phone_repwd").keyup(function(){
		$(".register_errorBtn .error").css("display","none");

		$(".person_phone_repwd").css("border","1px solid #d6d6d6");
		$(".person_phone_repwdX").css("background","url(images/X.png) no-repeat");

		//是否显示X
		if(!$(".person_phone_repwd").val()){
			$(".person_phone_repwdX").css("display","none")
		}else{
			$(".person_phone_repwdX").css("display","block")
		}
		
	})

	//给确认密码X添加事件
	$(".person_phone_repwdX").click(function(){
		$(".person_phone_repwd").val("");
		$(".person_phone_repwdX").css("display","none");
		$(".error").css("display","none");
		$(".person_phone_repwd").css("border","1px solid #d6d6d6");
	})



	// 滑块验证
	var oBlock = document.getElementById("block");
	var oSlider = document.getElementById("slider");

	
	// 固定滑块位置
	
	drag(oBlock);
	


	
	

	
	// 拖拽函数
	var dragSure = false;
	function drag(node){
		var offsetX = 0;
		var offsetY = 0;

		node.onmousedown = function(event){
			var e = event || window.event;

			offsetX = e.clientX - node.offsetLeft;
			offsetY = e.clientY - node.offsetTop;

			document.onmousemove = function(event){
				var e = event || window.event;

				var i = e.clientX - offsetX;
				var j = 0;

				if(i > oSlider.offsetWidth - node.offsetWidth){
					i = 308;
				}
				if(i < 0){
					i = 0;
				}
				
				node.style.left = i + "px";
				node.style.top = j + "px";

				$(".green").css("width",node.offsetLeft)

			}
		}

		
		document.onmouseup = function(){
			document.onmousemove = null;
			if(node.offsetLeft < 180 || node.offsetLeft >240){

				node.style.left = 0 + "px";
				
			}else{
				setTimeout(function(){
					node.style.left = 308 + "px";
					$(".green").css("width",node.offsetLeft);
					$(".person_slider p").html("验证成功").css("color","#fff");
					$(".hd").css("background","url(images/slider_bt1.png) no-repeat");
					dragSure = true;
				},1200);

				// 验证成功，固定滑块
				node.onmousedown = null;
				document.onmouseup = null;
			}
			$(".green").css("width",node.offsetLeft)
		}





	}//拖拽结束


	
	



	// 按钮
	$(".btn").click(function(){

		// 手机号验证
		var oLength = $(".person_phone").val().length;
		var oValue = $(".person_phone").val();

		var phoneSure = false;//假设手机号还没设置好

		if(!oValue){
			alert("请输入手机号");
		}else{
			if(oLength != 11){
				$(".register_errorBtn .error").css("display","block").html("请输入有效的手机号码");
				$(".person_phone").css({
					border:"1px solid red"
				});
				$(".person_phoneX").css("background","url(images/X1.png) no-repeat");
			}else if(/\D/.test(oValue)){
				$(".register_errorBtn .error").css("display","block").html("请输入有效的手机号码");
				$(".person_phone").css({
					border:"1px solid red"
				})
				$(".person_phoneX").css("background","url(images/X1.png) no-repeat");
			}else if(oValue[1] < "3" || oValue[1] > "9"){
				$(".register_errorBtn .error").css("display","block").html("请输入有效的手机号码");
				$(".person_phone").css({
					border:"1px solid red"
				})
				$(".person_phoneX").css("background","url(images/X1.png) no-repeat");
			}else{
				$(".person_phone").css({
					border:"1px solid green"
				});
				phoneSure = true;
			}
		}


		//密码验证

		var oLength_pwd = $(".person_phone_pwd").val().length;
		var oValue_pwd = $(".person_phone_pwd").val();

		var passwordSure = false;//假设密码还没设置好

		if(!oValue_pwd){
			alert("请输入密码");
		}else{
			if(oLength_pwd < 8 || oLength_pwd > 20){
				$(".register_errorBtn .error").css("display","block").html("密码长度出错！");
				$(".person_phone_pwd").css({
					border:"1px solid red"
				})
				$(".person_phone_pwdX").css("background","url(images/X1.png) no-repeat");
			}else{
				$(".person_phone_pwd").css({
					border:"1px solid green"
				});
				passwordSure = true;
			}
		}

		// 确认密码

		var oPassword = document.getElementById('password');
		var oRepassword = document.getElementById('repassword');
		var oPhone = document.getElementById('phone');

		var repasswordSure = false;//假设确认密码未成功

		if(!oRepassword.value){
			alert("请确认密码");
		}else{
			if(oPassword.value !== oRepassword.value){
				$(".register_errorBtn .error").css("display","block").html("请再次确认密码！");
				$(".person_phone_repwd").css({
					border:"1px solid red"
				})
				$(".person_phone_repwdX").css("background","url(images/X1.png) no-repeat");
			}else{
				$(".person_phone_repwd").css({
					border:"1px solid green"
				});
				repasswordSure = true;
			}
		}


		// 表单验证通过,插入数据库
		if(phoneSure && repasswordSure && passwordSure && dragSure){

			var str = `phone=${oPhone.value}&password=${oPassword.value}`;
					$.ajax({
						method:"post",
						url:"php/register.php?type=register",
						data:str,
						success:function(data){
							window.location.href="signin.html"
						},
						error:function(msg){
							alert(msg);
						}
					})



		}else{
			alert("格式错误！");
		}
		//验证通过结束括号

		



	})//btn点击结束括号























})//整体结束括号
		
		













