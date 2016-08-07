/**
 * app配置文件
 * @license MIT 
 * @author PeiSheng 
 * @date：2016-08-07
 */
var $App={
	/**
	 * 是否开启调试模式
	 */
	Debug:false,
	/**
	 * 是否进行编译
	 */
	IsCompile:false,
	/**
	 * 当前项目名称 主要用于调试阶段 
	 * 路径中带有项目路径的兼容 通常出现在tomact Hbuilder等中
	 */
	ProjectName:"PSHTML5"
};




$App.AsideMenue={};
/**
 * 左侧菜单配置
 */
$App.AsideMenue.list = [{
		html: '<a style="color:red"> 啊盛大速度1 </a>',
		iconClass: "glyphicon glyphicon-yen",
		name: "测试的啊",
		link: "http://www.baidu.com",
//		rowClass: "active open",
		submenu: [{
			html: "",
			iconClass: "glyphicon glyphicon-yen",
			name: "测试的啊1",
			link: "",
			submenu: ""
		}]
	}, {
		html: "",
		iconClass: "glyphicon glyphicon-yen",
		name: "测试的啊1",
		link: "#",
//		rowClass: "active open",
		submenu: [{
			html: "",
			iconClass: "glyphicon glyphicon-yen",
			name: "测试的啊1",
			link: "",
			submenu: ""
		}]
	}, {
		html: "",
		iconClass: "glyphicon glyphicon-yen",
		name: "第一层",
		link: "#",
//		rowClass: "active open",
		submenu: [{
			html: "",
			iconClass: "glyphicon glyphicon-yen",
			name: "第二层",
			link: "",
			submenu: [{
				html: "",
				iconClass: "glyphicon glyphicon-yen",
				name: "第三层",
				link: "",
				submenu: [{
					html: "",
					iconClass: "glyphicon glyphicon-yen",
					name: "第四层_常规列",
					link: "",
					submenu: ""
				}]
			}, {
				html: "",
				iconClass: "glyphicon glyphicon-yen",
				name: "第三层_常规列",
				link: "",
				submenu: ""
			}]
		}, {
			html: "",
			iconClass: "glyphicon glyphicon-yen",
			name: "第二层_常规列",
			link: "",
			submenu: "",
			rowClass: "active open"
		}]
	}
];








/**
 * 非编译模式兼容
 */
(function(){
	var loca=document.location;
	var rootUrl=loca.protocol+"//"+loca.host+"/"+$App.ProjectName;
	$App.RootUrl=rootUrl;
	function urlHandleForRootRelative(htmlStr){
			var str=rootUrl;
			htmlStr0='src="'+str+"";
			htmlStr1='href="'+str+"";
			htmlStr=htmlStr.replace(/src="/ig,htmlStr0)
				.replace(/href="/ig,htmlStr1);
		return htmlStr;
	}
	if (!$App.IsCompile) {
		/**
		 * 模拟公用Head模板[需与Head.html保持同步]
		 */
		var headHtml='<meta charset="UTF-8">'
			+'<meta http-equiv="X-UA-Compatible" content="IE=edge">'
			+'<meta name="viewport" content="width=device-width, initial-scale=1,minimum-scale=1.0,user-scalable=no">'
			+'<link rel="stylesheet" href="/lib/bootstrap/css/bootstrap.css" />'
			+'<link rel="stylesheet" href="/lib/app/css/app.css" />'
			+'<script type="text/javascript" src="/lib/vue/vue.js"></script>'
			+'<script type="text/javascript" src="/lib/jquery/jquery-1.10.2.min.js"></script>'
			+'<script type="text/javascript" src="/lib/bootstrap/js/bootstrap.js"></script>'
			+'<script type="text/javascript" src="/lib/app/js/app.js"></script>';
			document.write(urlHandleForRootRelative(headHtml));	
	}
})();