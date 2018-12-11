<?php 
	header('content-type:text/html;charset="utf-8"');

	//区分登录还是注册
	$type = $_GET['type'];


	//取出用户名，密码
	$username = $_POST['phone'];
	$password = $_POST['password'];


	//链接服务器
	$link = mysql_connect("localhost", "root", "123456");
	//2、判断数据库是否链接成功
	if(!$link){
		echo '数据库链接失败';
		exit; //退出整个php程序
	}

	//3、设置字符集
	mysql_set_charset('utf8');

	//4、选择数据库
	mysql_select_db("lenovo");




	if($type == "login"){
		//登录
		//5.准备SQL语句
		$sql = "SELECT * FROM personal WHERE phone='{$username}';";
		//6.发送SQL语句
		$res = mysql_query($sql);
		//7.结果集
		$row = mysql_fetch_assoc($res);
		if(!$row){
			echo "用户名不存在";
		}else{
			$sql = "SELECT * FROM personal WHERE phone='{$username}' AND password='{$password}';";
			//6.发送SQL语句
			$res = mysql_query($sql);
			//7.结果集
			$row = mysql_fetch_assoc($res);
			if(!$row){
				echo "用户名或密码错误";
			}else{
				echo "登录成功";
			}
		}
	}

	if($type == "register"){
		//注册
		//5.准备SQL语句
		$sql = "SELECT * FROM personal WHERE phone='{$username}';";
		//6.发送SQL语句
		$res = mysql_query($sql);
		//7.结果集
		$row = mysql_fetch_assoc($res);

		if($row){
			echo "用户名已存在";
		}else{
			//5.准备SQL语句
			$sql = "INSERT INTO personal(phone,password) VALUES('{$username}','{$password}');";
			//6.发送SQL语句
			$res = mysql_query($sql);
			
			
			if($res){
				echo "插入成功";
			}else{
				echo "插入失败";
			}
		}
	}

	//8、关闭数据库
	mysql_close($link);


 ?>