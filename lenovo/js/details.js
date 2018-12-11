define(['jquery','jquery-cookie'],function($){
	function details(){
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
				$(".news_notice").stop().animate({top:-34 * index1},1200,function(){
					
						$(".news_notice").css({top:0});
					
				})
			}
			function timerInner(){
				index1++;
				tab();
			}
			timer1 = setInterval(timerInner,2000);
			

			// 利用 document.documentElement.scrollTop 判断是否隐藏logo并浮动导航条
			//alert($(document).offset().top)
			
			window.onscroll = function(){
				var scrollTop = document.documentElement.scrollTop;
				if(scrollTop > 50){
					$(".regist_logo").css("display","none");
					$(".navBox").css({
						top:0,
					})
				}else if(scrollTop < 50){
					$(".regist_logo").css("display","block");
					$(".navBox").css({
						top:34,
					})
				}
			}



			// 图片选项卡
			var seckill_aBtns = $(".imgBtn").find("ul").find("li");
			

			seckill_aBtns.click(function(){
				seckill_aBtns.attr("class", '');
				$(".imgBox").find("div").css("display", 'none').eq($(this).index()).css("display", 'block');
				$(".top_right").find("div").css("display", 'none').eq($(this).index()).css("display", 'block');
				$(this).attr("class", 'active');
			})




			//界限函数
			function limit(iNow,min,max){
				if(iNow < min){
					return min;
				}else if(iNow > max){
					return max;
				}else{
					return iNow;
				}
			}






			//为.imgBox添加移入移出效果
			$(".imgBox").mouseenter(function(ev){
				$(".top_right").css({
					display:"block",
					zIndex:10
				});
				$(".dian").css("display","block");


				//移动
				$(".imgBox").mousemove(function(ev){

					var X = ev.pageX - $(".imgBox").offset().left;
					var Y = ev.pageY - $(".imgBox").offset().top;


					//放大镜
					var biImgX = limit(X*2,0,640);
					var biImgY = limit(Y*2,0,642);

					$(".top_right").find(".img").css({
						backgroundPosition:`-${biImgX}px -${biImgY}px`
					})


					//点点跟随
					
						var dianX = limit(X,50,470);
						var dianY = limit(Y,50,420);

						$(".dian").css({
							left:dianX - 50 ,
							top:dianY  - 50 
						})
					
					

					
				})
			})

			$(".imgBox").mouseleave(function(){
				$(".top_right").css({
					display:"none",
					zIndex:1
				});
				$(".dian").css("display","none");
			})


			var size = 0;
			var CPU = 0;
			var GPU = 0;


			// 点击选择商品
			$(".bottom_right .btn1 span").click(function(){
				$(".bottom_right .btn1 span").attr("class","chose");
				$(this).attr("class","chose active");
				size = $(this).index()
			})
			$(".bottom_right .btn2 span").click(function(){
				$(".bottom_right .btn2 span").attr("class","chose");
				$(this).attr("class","chose active");
				CPU = $(this).index()
			})
			$(".bottom_right .btn3 span").click(function(){
				$(".bottom_right .btn3 span").attr("class","chose");
				$(this).attr("class","chose active");
				GPU = $(this).index()
			})




			// 点击跳转页面并添加cookie

			$(".btn").click(function(){

				// 获取颜色、CPU、GPU信息
				

				var id = this.id;
				var frist = $.cookie("goods") == null ? true : false;
				var num = parseInt($(".inputBox .input").val());

				if(frist){
					$.cookie('goods',`[{id:${id},num:${num},size:${size},CPU:${CPU},GPU:${GPU}}]`,{expires:7});
				}else{

					var cookieStr = $.cookie("goods");
					var arr = eval(cookieStr);
					var same = false;//判断是否添加过商品

					for(var i = 0;i < arr.length;i++){


						if(arr[i].id == id && arr[i].size == size && arr[i].CPU == CPU && arr[i].GPU == GPU){
							arr[i].num += num;

							var str = JSON.stringify(arr);
							$.cookie('goods',str,{expires:7});

							same = true;
							break;
						}
					}

					if(!same){
						var obj = {id: id, num: num,size:size,CPU:CPU,GPU:GPU};
						arr.push(obj);
						var cookieStr = JSON.stringify(arr);
						$.cookie('goods', cookieStr, {expires: 7});
					}

				}

				goods_num();

			})

			goods_num();


			// 统计数量


			function goods_num(){
				var str = $.cookie('goods');
				if(str){
					var arr = eval(str);
					var sum = 0;
					for(var i = 0 ; i < arr.length;i++){
						var num = parseInt(arr[i].num)
						sum += num;
					}
					$(".goods_num").html(sum);
				}
			}






			// 底部计算器
			
			//减法
			$(".reduce").click(function(){
				var number = parseInt($(".inputBox .input").val());

				number --;
				if(number < 1){
					number = 1
				}
				$(".inputBox .input").val(number);

				var price = number * 6299;
				$(".price span").html(`${price}.00`)

			})


			//加法
			$(".plus").click(function(){
				var number = parseInt($(".inputBox .input").val());

				number ++;
				if(number > 5){
					number = 5;
					alert("您最多可以购买5台")
				}
				$(".inputBox .input").val(number);

				var price = number * 6299;
				$(".price span").html(`${price}.00`)

			})

			//blur
			$(".input").blur(function(){
				var number = parseInt($(".inputBox .input").val());
				if(number > 5){
					number = 5;
					alert("您最多可以购买5台")
				}
				$(".inputBox .input").val(number);

				var price = number * 6299;
				$(".price span").html(`${price}.00`)

			})










		})//$(function())
	}//details

	return{
		details : details
	}
})