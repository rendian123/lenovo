define(['jquery','jquery-cookie'],function($){

	function index(){
		$(function(){//window.onload = function(){}
			/*手机二维码*/
			$("#client_top").hover(function(){
				$("#client_bottom").slideDown(400),
				$("#client_top").css("color","#f4f4f4")
			},function(){
				$("#client_bottom").slideUp(400),
				$("#client_top").css("color","#cacaca")
			})



			goods_num();
			//计算购物车数量
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
			
			
			window.onscroll = function(){
				var scrollTop = document.documentElement.scrollTop;
				if(scrollTop > 50){
					$(".regist_logo").css("display","none");
					$(".navBox").css({
						top:0,
					})
					$(".float_right").css("display","block");
				}else if(scrollTop < 50){
					$(".regist_logo").css("display","block");
					$(".navBox").css({
						top:34,
					})
					$(".float_right").css("display","none");
				}
			}


			//轮播图

			var iNow = 0;//轮播图当前下标
			var wheel_timer = 0;//轮播图定时器

			
			var aBtns = $(".play").find("ol").find("li");
			var oUl = $(".wheel").find("ul");
			var aLis = oUl.find("li")

			// 点击切换
			aBtns.click(function(){

				iNow = $(this).index();
				wheel();
			})

			// 显示隐藏切换
			$(".bannerBox").mouseenter(function(){
				$(".wheel_btn").css("display","block")
			})

			$(".bannerBox").mouseleave(function(){
				$(".wheel_btn").css("display","none")
			})

			// 点击事件
			$(".wheel_btn_left").click(function(){
				iNow--;

				if(iNow < 0){
					iNow = 6;
				}

				wheel();

			})
			$(".wheel_btn_right").click(function(){
				iNow++;
				wheel();

				if(iNow == aLis.size() - 1){
					aBtns.eq(0).attr("class","active");
				}
			})
			



			// 封装轮播
			function wheel(){
				aBtns.attr("class","");
				aBtns.eq(iNow).attr("class","active")

				// ul动起来
				oUl.stop().animate({left:-1920 * iNow}, 1 , function(){

					if(iNow == aLis.size() - 1){
						iNow = 0;
						oUl.css("left",0);
					}
					
				});
			}

			// 轮播图自己动
			function innerTimer(){
				iNow ++ ;
				wheel();

				if(iNow == aLis.size() - 1){
					aBtns.eq(0).attr("class","active");
				}
			}

			wheel_timer = setInterval(innerTimer,4000)






			// 轮播图请求json数据
			$.ajax({
				url: "js/index_wheel.json",
				success: function(arr){
					for(var i = 0; i < arr.length; i++){
						$(`<li>
							<a href="#">${arr[i].title}<span class="glyphicon glyphicon-menu-right"></span></a>
						</li>`).appendTo($('.tabBox_left ul'));

						// 根据arr.length插入对等数量的div
						var tabBox_right_div = $(`<div class="deta1" id = "id${arr[i].id}">
								<div class="detaLfet">

								</div>
								<div class="detaRight">
								</div>
							</div>`);
						tabBox_right_div.appendTo($('.tabBox_right'));

						//deta数据循环
						var deta = arr[i].deta;
						for(var j = 0 ; j <deta.length;j++){
							var node = $(`	
								<div class="detaLfet_list" id="id${deta[j].id}">
									<p><a href="#">${arr[i].deta[j].deta_title}</a></p>
									<ul>
											
									</ul>
								</div>
							`);
							var index = j;
							node.appendTo($(`#id${i} .detaLfet`));

							
							// deta_list数据循环
							var deta_list = deta[j].deta_list;
							for(var k = 0;k < deta_list.length;k++){
								var node = $(`	
										<li><a href="">${arr[i].deta[j].deta_list[k]}</a></li>
									`);
									node.appendTo($(`#id${i} #id${j} ul`));
							}//deta_list
						}//deta

						// 图片数据循环
						var img = arr[i].img;
						for(var u = 0 ;u < img.length;u++){
							var node = $(`	
								<div class="img">
									<a href="#">
										<img src="${arr[i].img[u]}" alt="">
									</a>
								</div>
							`);
							node.appendTo($(`#id${i} .detaRight`));
						}//img
					}//arr
				},
				error:function(msg){
					alert(msg);
				}
			})


			// 移入移出
			
			$(".tabBox_left").on("mouseenter","li",function(){
				$(".tabBox_right").css("display","block");
				$(".tabBox_right").find(".deta1").css("display","none").eq($(this).index()).css("display", 'block');
			})

			$(".tabBox_left").on("mouseleave","li",function(){
				if($(".tabBox_right").css('display',"block")){
					$(".tabBox_right").find(".deta1").css("display","none").eq($(this).index()).css("display", 'block');
				}else{
					$(".tabBox_right").css("display","none");
					$(".deta1").css("display","none");
				}
				
			})





			$(".tabBox").mouseleave(function(){
				if($(".tabBox_right").css('display',"block")){
					$(".tabBox_right").css("display","none");
					$(".deta1").css("display","none");
				}
			})

		})//最后一个结束



		// 请求秒杀数据
		$.ajax({
			url:"js/index_seckill.json",
			success: function(arr){

				//场次循环
				for(var i = 0;i < arr.length;i++){
					$(`<div class="tab" id="id${arr[i].id}">
							<div class="tab_left">
								<p class = 'p1'>${arr[i].scene}</p>
								<p class = 'p2'>距离秒杀结束还剩</p>
								<div class="setintervalBox">
									<span class = "span1">00</span>
									<span class = "span2">00</span>
									<span class = "span3">00</span>
								</div>
							</div>
							<div class="tab_right">
								
								
							</div>
						</div>`).appendTo($(".seckill_goods"));


						//单个商品循环
						var deta = arr[i].deta;
						for(var j = 0;j < deta.length;j++){
							$(`<div class="div div${deta[j].id}">
									<div class="left_img">
										<a href="details.html"><img src="${deta[j].img}" alt=""></a>
									</div>
									<div class="right">
										<div class="goods_title">
											<a href="">${deta[j].deta_title}</a>
										</div>
										<div class="priceBox">
											<p>
												<span class="span1">${deta[j].price}</span>
												<span class="span2">${deta[j].price1}</span>
											</p>
											<a href="details.html">
												${deta[j].html}
											</a>
										</div>
									</div>
								</div>`).appendTo($(`#id${i} .tab_right`));
						}



				}//场次循环

			},
			error:function(msg){
				alert(msg)
			}
		})// 请求秒杀数据

		//为秒杀数据设置移入移出效果

		var seckill_aBtns = $(".seckill").find("ol").find("li");
		var seckill_oUl = $(".seckill").find(".seckill_goods");
		var seckill_aLi = $(".seckill").find(".seckill_goods").find(".tab");

		seckill_aBtns.mouseenter(function(){
			var seckill_iNow = $(this).index();
			seckill_aBtns.attr("class","");
			seckill_aBtns.eq(seckill_iNow).attr("class","active");
			//轮播
			
			seckill_oUl.animate({left:-1200 * seckill_iNow},200,function(){})

		})


		// 请求content数据

		$.ajax({
			url:"js/index_content.json",
			success:function(arr){
				
				// 添加楼层数据
				for(var i = 0;i < arr.length;i++){
					$(`<div class="floor" id="id${arr[i].id}">
							<div class="floor_title">
								<h3>${arr[i].title}</h3>
								<div class="links">
									
								</div>
							</div>
							<div class="floor_number">
								<div class="floor_left">
									<img src="${arr[i].img}" alt="">
								</div>
								<div class="floor_right">
									
									
								</div>
							</div>
						</div>`).appendTo($(".content"));

					// links循环
					var links = arr[i].links;
					for(var j = 0 ; j < links.length;j++){
						$(`<a href="">${links[j]}</a>`).appendTo($(`#id${i} .links`));
					}

					//单个商品循环
					var goods = arr[i].goods;
					for(var k = 0 ;k < goods.length;k++){
						$(`<div class="goods_box">
								<a href="details.html" class="img">
									<img src="${goods[k].img}" alt="">
								</a>
								<p><a href="details.html">${goods[k].deta_title}</a></p>
								<p><a href="details.html">${goods[k].trait}</a></p>
								<p><a href="details.html">${goods[k].price}</a></p>
								<div class="Span span${goods[k].id}"></div>
							</div>`).appendTo($(`#id${i} .floor_number .floor_right`))
					}


				}//楼层循环
			},
			error:function(msg){
				alert("msg");
			}
		})


		//利用事件委托，给图片添加移入移出效果
		$(".content").on("mouseenter",".img",function(){

			$(this).stop().animate({left:4},400,"linear");
		})
		$(".content").on("mouseleave",".img",function(){
			$(this).stop().animate({left:-4},400,"linear");
		})













	}//index

	return{
		index : index
	}
})