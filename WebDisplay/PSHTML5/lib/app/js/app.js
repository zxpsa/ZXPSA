/**
 * file: mod.js
 * ver: 1.0.10
 * update: 2015/04/16
 *
 * https://github.com/fex-team/mod
 */
var require, define;

(function(global) {
	var head = document.getElementsByTagName('head')[0],
		loadingMap = {},
		factoryMap = {},
		modulesMap = {},
		scriptsMap = {},
		resMap = {},
		pkgMap = {};

	function createScript(url, onerror) {
		if (url in scriptsMap) return;
		scriptsMap[url] = true;

		var script = document.createElement('script');
		if (onerror) {
			var tid = setTimeout(onerror, require.timeout);

			script.onerror = function() {
				clearTimeout(tid);
				onerror();
			};

			function onload() {
				clearTimeout(tid);
			}

			if ('onload' in script) {
				script.onload = onload;
			} else {
				script.onreadystatechange = function() {
					if (this.readyState == 'loaded' || this.readyState == 'complete') {
						onload();
					}
				}
			}
		}
		script.type = 'text/javascript';
		script.src = url;
		head.appendChild(script);
		return script;
	}

	function loadScript(id, callback, onerror) {
		var queue = loadingMap[id] || (loadingMap[id] = []);
		queue.push(callback);

		//
		// resource map query
		//
		var res = resMap[id] || resMap[id + '.js'] || {};
		var pkg = res.pkg;
		var url;

		if (pkg) {
			url = pkgMap[pkg].url;
		} else {
			url = res.url || id;
		}

		createScript(url, onerror && function() {
			onerror(id);
		});
	}

	define = function(id, factory) {
		id = id.replace(/\.js$/i, '');
		factoryMap[id] = factory;

		var queue = loadingMap[id];
		if (queue) {
			for (var i = 0, n = queue.length; i < n; i++) {
				queue[i]();
			}
			delete loadingMap[id];
		}
	};

	require = function(id) {

		// compatible with require([dep, dep2...]) syntax.
		if (id && id.splice) {
			return require.async.apply(this, arguments);
		}
		id = require.alias(id);
		var mod = modulesMap[id];
		if (mod) {
			return mod.exports;
		}

		//
		// init module
		//
		var factory = factoryMap[id];
		if (!factory) {
			throw '[ModJS] Cannot find module `' + id + '`';
		}

		mod = modulesMap[id] = {
			exports: {}
		};

		//
		// factory: function OR value
		//
		var ret = (typeof factory == 'function') ? factory.apply(mod, [require, mod.exports, mod]) : factory;

		if (ret) {
			mod.exports = ret;
		}
		return mod.exports;
	};

	require.async = function(names, onload, onerror) {
		if (typeof names == 'string') {
			names = [names];
		}

		var needMap = {};
		var needNum = 0;

		function findNeed(depArr) {
			for (var i = 0, n = depArr.length; i < n; i++) {
				//
				// skip loading or loaded
				//
				var dep = require.alias(depArr[i]);

				if (dep in factoryMap) {
					// check whether loaded resource's deps is loaded or not
					var child = resMap[dep] || resMap[dep + '.js'];
					if (child && 'deps' in child) {
						findNeed(child.deps);
					}
					continue;
				}

				if (dep in needMap) {
					continue;
				}

				needMap[dep] = true;
				needNum++;
				loadScript(dep, updateNeed, onerror);

				var child = resMap[dep] || resMap[dep + '.js'];
				if (child && 'deps' in child) {
					findNeed(child.deps);
				}
			}
		}

		function updateNeed() {
			if (0 == needNum--) {
				var args = [];
				for (var i = 0, n = names.length; i < n; i++) {
					args[i] = require(names[i]);
				}

				onload && onload.apply(global, args);
			}
		}

		findNeed(names);
		updateNeed();
	};

	require.resourceMap = function(obj) {
		var k, col;

		// merge `res` & `pkg` fields
		col = obj.res;
		for (k in col) {
			if (col.hasOwnProperty(k)) {
				resMap[k] = col[k];
			}
		}

		col = obj.pkg;
		for (k in col) {
			if (col.hasOwnProperty(k)) {
				pkgMap[k] = col[k];
			}
		}
	};

	require.loadJs = function(url) {
		createScript(url);
	};

	require.loadCss = function(cfg) {
		if (cfg.content) {
			var sty = document.createElement('style');
			sty.type = 'text/css';

			if (sty.styleSheet) { // IE
				sty.styleSheet.cssText = cfg.content;
			} else {
				sty.innerHTML = cfg.content;
			}
			head.appendChild(sty);
		} else if (cfg.url) {
			var link = document.createElement('link');
			link.href = cfg.url;
			link.rel = 'stylesheet';
			link.type = 'text/css';
			head.appendChild(link);
		}
	};

	require.alias = function(id) {
		return id.replace(/\.js$/i, '');
	};

	require.timeout = 5000;

})(this);
/************************************************App主控制代码*********************************************/
/**
 * app.js
 * @license MIT 
 * @author PeiSheng 
 * @date：2016-08-07
 */

/**
 * 视图对象
 */
$App.screen={
	/**
	 * 是否是大于等于手机屏幕
	 * @param {Object} val 屏幕大小
	 */
	lessXS:function(val){
		if (val<768) {
			return true;
		}else{
			return false;
		}
	},
	/**
	 * 是否是大于等于平板屏幕
	 * @param {Object} val 屏幕大小
	 */
	greaterEqualSM:function(val){
		if (val>=768) {
			return true;
		}else{
			return false;
		}
	},
	/**
	 * 是否是大于等于桌面小屏幕
	 * @param {Object} val 屏幕大小
	 */
	greaterEqualMD:function(val){
		if (val>=992) {
			return true;
		}else{
			return false;
		}
	},
	/**
	 * 是否是大于等于桌面正常屏幕
	 * @param {Object} val 屏幕大小
	 */
	greaterEqualLG:function(val){
		if (val>=1199) {
			return true;
		}else{
			return false;
		}
	},
	/**
	 * 获取当前窗口宽度
	 */
	getNowDOMWidth:function(){
		return $(document).width();
	},
	/**
	 * 显示或隐藏侧边菜单
	 */
	clickNavLeftBtn:function(){
		var $dom=$("#ik_aside_menue");
		if ($dom.hasClass("ik-aside-menue-show")) {
			$dom.removeClass("ik-aside-menue-show");
		}else{
			$dom.addClass("ik-aside-menue-show");
			$dom.css("height","300px");
		}
	}
};

(function(){
	
var $document=$(document);
/**
 * 根据按钮点击后 对应的目标标签添加自定义CSS
 */
$document.on('click', '[data-toggle^="class"]', function(e) {
	e && e.preventDefault();
	var $this = $(e.target),
		$class, $target, $tmp, $classes, $targets;
	!$this.data('toggle') && ($this = $this.closest('[data-toggle^="class"]'));
	$class = $this.data()['toggle'];
	$target = $this.data('target') || $this.attr('href');
	$class && ($tmp = $class.split(':')[1]) && ($classes = $tmp.split(','));
	$target && ($targets = $target.split(','));
	$classes && $classes.length && $.each($targets, function(index, value) {
		if ($classes[index].indexOf('*') !== -1) {
			var patt = new RegExp('\\s' +
				$classes[index].replace(/\*/g, '[A-Za-z0-9-_]+').split(' ').join('\\s|\\s') +
				'\\s', 'g');
			$($this).each(function(i, it) {
				var cn = ' ' + it.className + ' ';
				while (patt.test(cn)) {
					cn = cn.replace(patt, ' ');
				}
				it.className = $.trim(cn);
			});
		}
		($targets[index] != '#') && $($targets[index]).toggleClass($classes[index]) || $this.toggleClass($classes[index]);
	});
  	$this.toggleClass('active');
});
/**
 * 侧边导航栏 点击
 */
$document.on('click',"#ik_aside_menue",function(h){
	var $nowTag=$(h.target);
	/**
	 * 点击左侧菜单栏以外部分时自动隐藏侧边栏
	 */
	if ($nowTag.hasClass("ik-aside-menue")) {
		showOrHideAsideMenue();
		return false;
	}
	/**
	 * 当点击侧边栏折叠按钮时做对应处理
	 */
	if ($nowTag.attr("id")=="ik_folded"||$nowTag.attr("id")=="ik_folded0") {
		stretchAsideMenue();
	}

	/**
	 * 检测是否为菜单级节点并设置样式
	 * 非菜单级节点不做任何处理
	 */
    //层级节点
	var $dom;
	//节点为 层级主要节点
	if ($nowTag.hasClass("dropdown-toggle")) {
		$dom=$nowTag.parent();
	}else{//节点不为层级主节点时 向上一层找主节点
		if ($nowTag.parent().hasClass("dropdown-toggle")) {
			$dom=$nowTag.parent().parent();
		}
	}
	if ($dom) {
		if ($dom.hasClass("active")) {
			$dom.removeClass("active");
			$dom.removeClass("open");
		}else{
			$dom.addClass("active");
			$dom.addClass("open");
		}
	}
});

/**
 * js模板替换
 */
function replaceTemplate(){
	var links=$("[rel=\"import\"]");
	for(var i=0,len=links.length;i<len;i++){
		var url=$App.RootUrl+"/"+links[i].getAttribute("href");
//		links[i].setAttribute("href",url);
		if (url.indexOf("head.html")<0) {//html头模板因为特殊性 故通过js直接输出，不再此处处理
			var tag=links[i];
			$.ajax({
				url:url,
				type:"GET",
				async:false,
				success:function(data){
					tag.outerHTML=data;
				}
			});
		}
	}
}

/**
 * 伸缩侧边菜单
 */
function stretchAsideMenue(){
	var $tag=$("#ik_aside_menue");
	if ($tag.hasClass("ik-aside-menue-folded")) {
		$tag.removeClass("ik-aside-menue-folded");
	}else{
		$tag.addClass("ik-aside-menue-folded");
	}
}
function init(){
	var pathname=window.location.pathname;
	
	var list=$App.AsideMenue.list;
	for (var i=0,len=list.length;i<len;i++) {
		
	}
	
	
	var vm=new Vue({
	    el: '#ik_aside_menue',
	    data: {
	        msg      : 'hi!',
	        checked  : true,
	        picked   : 'one',
	        selected : 'two',
	        multiSelect: ['one','three'],
	        menuIconClass:"glyphicon glyphicon-yen",
	        html:'<a style="color:red"> 啊盛大速度 </a>',
	        list:$App.AsideMenue.list
	    },
	    methods:{
	    	clickMenu:function(da){
//	    		console.log(da.name);
	    		if (da.class=="active open") {
	    			da.class="";
	    		}
	    	}
	    }
	});
	vm.aa="啊时代发生地方";
}

/**
 * 设置侧边菜单栏高度
 */
function setAsideMenueHeight(){
	var $dom=$("#ik_aside_menue");
	$dom.css("height",$(document).height());
}

/**
 * 显示或者隐藏侧边栏
 */
function showOrHideAsideMenue(){
	$("#ik_nav_right").collapse("hide");
	var $dom=$("#ik_aside_menue");
	var ikAsideMask = document.getElementById("ik_aside_mask");
	if ($dom.hasClass("ik-aside-menue-show")) {
		//隐藏侧边栏 遮罩层
		ikAsideMask.style.display="none";
		$dom.removeClass("ik-aside-menue-show");
	}else{
		var $content=$("#ik_content");
//		var contentH=$content.height();
//		var contentT=$content.position().top;
		//设置侧边栏高度
		$dom.css("height",$(document).height());
//		$dom.css("top",contentT);
		$("body").css("overflow","hidden");
		//创建或显示侧边栏 遮罩层
		if (ikAsideMask) {
			ikAsideMask.style.display="";
		}else{
			var divTag=document.createElement("div");
			divTag.id="ik_aside_mask";
			document.getElementById("ik_content").appendChild(divTag);
		}
		$dom.addClass("ik-aside-menue-show");
	}
}
//暴露操作方法
$App.showOrHideAsideMenue=showOrHideAsideMenue;

/**
 * 为手机进行适配
 */
function initWhenLessXS(width){
	if (!$App.screen.lessXS(width)) {
		//设置列表查询中搜索框为展开
		$("#ik_search").addClass('collapse in');
		return false;
	};
	//设置列表查询中搜索框为收缩
	$("#ik_search").addClass('collapse');
	//主界面 树形手机端时收缩
	$("#ik_tree_div").addClass('collapse');
}

/**
 * 为大于手机屏幕进行适配
 */
function initWhenGreaterEqualSM(width){
	if (!$App.screen.greaterEqualSM(width)) {
		return false;
	};
	setAsideMenueHeight();
}
/**
 * Dom渲染完毕后执行
 */
$document.ready(function(){
	if (!$App.IsCompile) {
		replaceTemplate();
	}
	
	var width=$App.screen.getNowDOMWidth();
	//为手机进行相应适配
	initWhenLessXS(width);
	initWhenGreaterEqualSM(width);
	init();
//	alert(document.getElementById("ik_nav").innerHTML);
});
})();
