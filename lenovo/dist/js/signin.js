define(['jquery'],function($){

	function signin(){
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
			

			/*登录验证*/

			// 选择登录方式（账号密码、手机号、二维码）

			var Sure1 = false;
			var Sure2 = true;
			$("#phone_codesign").click(function(){
				$("#pwd_signin").css("display","none");
				$("#phone_signin").css("display","block");
				Sure1 = true;
				Sure2 = false;
			})

			$("#pwd_codesign").click(function(){
				$("#pwd_signin").css("display","block");
				$("#phone_signin").css("display","none");
				Sure1 = false;
				Sure2 = true;
			})

			// 微信扫码验证
			$(".weixin").click(function(){
				$(".weixin").css("display","none");
				$(".PC").css("display","block");
				$(".h1").html("联想会员扫码登录");
				$("#img1").css("display","none");

				$("#pwd_signin").css("display","none");
				$("#phone_signin").css("display","none");
				$("#weixin_signin").css("display","block");
			})
			$(".PC").click(function(){
				$(".weixin").css("display","block");
				$(".PC").css("display","none");
				$(".h1").html("联想会员登录");
				$("#img1").css("display","block");

				$("#weixin_signin").css("display","none");
				if(Sure1){
					$("#phone_signin").css("display","block");
				}else if(Sure2){
					$("#pwd_signin").css("display","block");
				}
			})




			// 点击验证账号密码是否是会员
			var oPassword = document.getElementById('password');
			var oPhone = document.getElementById('phone');

			$(".btn").click(function(){

				if(!oPhone.value){
					alert("请输入账号密码!")
				}else{
					var str = `phone=${oPhone.value}&password=${oPassword.value}`;
					$.ajax({
						method:"post",
						url:"php/register.php?type=login",
						data:str,
						success:function(data){
							window.location.href="index.html"
						},
						error:function(msg){
							alert(msg);
						}
					})
				}
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

			


			




















		})//整体结束括号
				
		














	}

	return{
		signin : signin
	}


})