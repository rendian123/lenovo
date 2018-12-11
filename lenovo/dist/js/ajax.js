function ajax({method = 'get',url,data,success,error}){
			//声明
			var ajax = null;
			 try{
			 	ajax = new XMLHttpRequest;
			 }catch{
			 	ajax = new activeXObject("Microsoft.XMLHTTP");
			 }

			//填写
			if(method == "get" && data){
				url += "?" + data + "&" + new Date().getTime();
			}
			ajax.open(method,url,true);

			//提交
			if(method == "get"){
				ajax.send();
			}else{
				ajax.setRequestHeader("content-type" , "application/x-www-form-urlencoded")
				ajax.send(data);
			}

			//回馈
			ajax.onreadystatechange = function(){
				if(ajax.readyState == 4){

					if(ajax.status == 200){
						if(success){
							success(ajax.responseText);
						}
					}else{
						if(error){
							error("发生错误：" + ajax.status)
						}
					}
				}
			}
		}