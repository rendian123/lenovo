define(['jquery','jquery-cookie'],function($){
	function shoppingcart(){
		$(function(){

		//为页面判断cookie数据

		var cookie_arr = eval($.cookie('goods'));
		if(!cookie_arr){
			$(".kong").css("display","block")
		}else{
			$(".kong").css("display","none")
		}


		//请求购物车数据
		$.ajax({
				url: 'js/details.json',
				success: function(arr){
					
					//在所有商品信息里面找出，加入购物车的商品信息
					var cookie_arr = eval($.cookie('goods'));//${arr[cookie_arr[i].id].img}
					for(var i = 0; i < cookie_arr.length; i++){

						
						$(`
							<tr class='tr'>
								<td class="td1"  id='${cookie_arr[i].id}'>
									<div class="img">
										<img src="${arr[cookie_arr[i].id].img}" alt="">
									</div>
									<div class="txt">
										<a href="details.html">${arr[cookie_arr[i].id].title}</a>
									</div>
								</td>
								<td class="td2">
									<p class='p1' id='${cookie_arr[i].size}'>${arr[cookie_arr[i].id].size[cookie_arr[i].size]}</p>
									<p class='p2' id='${cookie_arr[i].CPU}'>${arr[cookie_arr[i].id].CPU[cookie_arr[i].CPU]}</p>
									<p class='p3' id='${cookie_arr[i].GPU}'>${arr[cookie_arr[i].id].GPU[cookie_arr[i].GPU]}</p>
								</td>
								<td class="td3">
									${arr[cookie_arr[i].id].price}
								</td>
								<td class="td4">
									<div class="inputBox">
										<div class="reduce"></div>
										<input type="text" class="input" value="${cookie_arr[i].num}">
										<div class="plus"></div>
									</div>
								</td>
								<td class="td5">
									${cookie_arr[i].num * arr[cookie_arr[i].id].price}
								</td>
								<td class="td6">
									<span class="btn">删除</span>
								</td>
							</tr>	
						`).appendTo($(".listBox .tab2"));

						
				}//for1
			},
			error:function(msg){
				alert(msg);
			}
		})




		//添加点击事件
		
		//cookie减法运算
		$(".tab2").on("click","tr .reduce",function(){
			
			var text = $(this).siblings("input[type=text]");

			text.val(parseInt(text.val()) - 1);
			if(parseInt(text.val()) < 1){
				text.val(1); 
			}

			//找出id,size,CPU,GPU,price
			var id = $(this).parents("td[class=td4]").siblings("td[class=td1]").attr('id');
			var size = $(this).parents("td[class=td4]").siblings("td[class=td2]")
						.children("p[class=p1]").attr('id');
			var CPU = $(this).parents("td[class=td4]").siblings("td[class=td2]")
						.children("p[class=p2]").attr('id');
			var GPU = $(this).parents("td[class=td4]").siblings("td[class=td2]")
						.children("p[class=p3]").attr('id');
			var price = parseInt($(this).parents("td[class=td4]").siblings("td[class=td3]").html());

			var Total_price = $(this).parents("td[class=td4]").siblings("td[class=td5]");

			//计算cookie
			var cookieStr = $.cookie("goods");
			var arr = eval(cookieStr);
			for(var i = 0; i < arr.length;i++){
				if(arr[i].id == id && arr[i].size  == size && arr[i].CPU == CPU && arr[i].GPU == GPU){
					arr[i].num --;
					if(arr[i].num < 1){
						arr[i].num = 1;
					}
					var cookieStr = JSON.stringify(arr);
					$.cookie('goods', cookieStr, {expires: 7});
					Total_price.html(arr[i].num * price)
					break;
				}
			}


			
		})//减法



		//cookie加法运算
		$(".tab2").on("click","tr .plus",function(){
					
			var text = $(this).siblings("input[type=text]");

			text.val(parseInt(text.val()) + 1);
			if(parseInt(text.val()) > 5){
				text.val(5); 
				alert("您最多可以购买5台")
			}

			//找出id,size,CPU,GPU,price
			var id = $(this).parents("td[class=td4]").siblings("td[class=td1]").attr('id');
			var size = $(this).parents("td[class=td4]").siblings("td[class=td2]")
						.children("p[class=p1]").attr('id');
			var CPU = $(this).parents("td[class=td4]").siblings("td[class=td2]")
						.children("p[class=p2]").attr('id');
			var GPU = $(this).parents("td[class=td4]").siblings("td[class=td2]")
						.children("p[class=p3]").attr('id');
			var price = parseInt($(this).parents("td[class=td4]").siblings("td[class=td3]").html());

			var Total_price = $(this).parents("td[class=td4]").siblings("td[class=td5]");

			//计算cookie
			var cookieStr = $.cookie("goods");
			var arr = eval(cookieStr);
			for(var i = 0; i < arr.length;i++){
				if(arr[i].id == id && arr[i].size  == size && arr[i].CPU == CPU && arr[i].GPU == GPU){
					arr[i].num ++;
					if(arr[i].num > 5){
						arr[i].num = 5;
					}
					var cookieStr = JSON.stringify(arr);
					$.cookie('goods', cookieStr, {expires: 7});
					Total_price.html(arr[i].num * price)
					break;
				}
			}


					
		})//加法


		//删除
		$(".tab2").on("click",".td6 .btn",function(){

			//找出id,num,size,CPU,GPU,price
			var id = $(this).parents("td[class=td6]").siblings("td[class=td1]").attr('id');
			var size = $(this).parents("td[class=td6]").siblings("td[class=td2]")
						.children("p[class=p1]").attr('id');
			var num = parseInt($(this).parents("td[class=td6]").siblings("td[class=td4]").children()
						.children("input[type=text]").val());
						
			var CPU = $(this).parents("td[class=td6]").siblings("td[class=td2]")
						.children("p[class=p2]").attr('id');
			var GPU = $(this).parents("td[class=td6]").siblings("td[class=td2]")
						.children("p[class=p3]").attr('id');
			//计算cookie并删除
			var cookieStr = $.cookie("goods");
			var arr = eval(cookieStr);
			for(var i = 0; i < arr.length;i++){
				if(arr[i].id == id && arr[i].num == num && arr[i].size  == size && arr[i].CPU == CPU && arr[i].GPU == GPU){
					
					arr.splice(i,1);

					var cookieStr = JSON.stringify(arr);
					$.cookie('goods', cookieStr, {expires: 7});

					break;
				}
			}

			//删除节点
			
			$(this).parents("tr[class=tr]").remove();

		})






		})//$(function())
	}//shoppingcart

	return{
		shoppingcart : shoppingcart
	}
})