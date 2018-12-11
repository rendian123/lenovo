

//模块化开发
console.log('加载成功');

require.config({
	paths:{
		"jquery":"jquery-1.11.3",
		"jquery-cookie":"jquery.cookie",
		"parabola":"parabola",
		'details':"details"
	},

	shim:{
		//设置依赖关系
		"jquery-cookie":["jquery"]
	},

	/*声明抛物线运动不遵从AMD规范*/
	"parabola":{
		exports:"_"
	}

})


//引入模块调用
require(['details'],function(details){
	details.details();
})




