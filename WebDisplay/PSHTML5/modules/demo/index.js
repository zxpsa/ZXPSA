/**
 * 功能块组件Demo
 * @license MIT 
 * @author PeiSheng 
 * @date：2016-08-07
 */
define('/modules/demo/index', function(require, exports, module) {
	'use strict';
	initGraphicAssembly();
	module.exports={
		openEditView:openEditView,
		openDetailView:openDetailView
	};
	// @require modules/pages/login/index.styl
	//	module.exports = {
	//	    url: '/login?referrer&isShare',
	//	    template: "asdasd",
	//	    data: {
	//	        pageName: '登录'
	//	    },
	//	    controllerAs: 'vm',
	//	    controller: "adsd"
	//	};
	//	module.exports=

	function openEditView() {
		$("#EditView").modal({
			backdrop: 'static'
		});
	}

	function openDetailView() {
		$("#DetailView").modal({
			backdrop: 'static'
		});
	}
	$('.form_datetime').datetimepicker({
		language: 'zh-CN',
		weekStart: 1,
		todayHighlight: 1,
		startView: 2,
		forceParse: 0,
		showMeridian: 1,
		autoclose: true,
		todayBtn: true,
		pickerPosition: "bottom-left"
	});
//	console.log("exports:");
//	console.log(exports);
//	console.log("module:");
//	console.log(module);
//	console.log("exports:");
//	console.log(exports);
//	console.log("module:");
//	console.log(module);
//	console.log("exports:");
//	console.log(exports);
//	console.log("module:");
//	console.log(module);
//	console.log("exports:");
//	console.log(exports);
//	console.log("module:");
//	console.log(module);
//	console.log("exports:");
//	console.log(exports);
//	console.log("module:");
//	console.log(module);
//	console.log("exports:");
//	console.log(exports);
//	console.log("module:");
//	console.log(module);
//	console.log("exports:");
//	console.log(exports);
//	console.log("module:");
//	console.log(module);

	/**
	 * 初始化图形组件
	 */
	function initGraphicAssembly() {
		// 基于准备好的dom，初始化echarts实例
		var myChart = echarts.init(document.getElementById('main'));
		var myChart1 = echarts.init(document.getElementById('main1'));
		// 指定图表的配置项和数据
		var option = {
			title: {
				text: 'ECharts 入门示例'
			},
			tooltip: {},
			legend: {
				data: ['销量']
			},
			xAxis: {
				data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
			},
			yAxis: {},
			series: [{
				name: '销量',
				type: 'bar',
				data: [5, 20, 36, 10, 10, 20]
			}]
		};

		var base = +new Date(1968, 9, 3);
		var oneDay = 24 * 3600 * 1000;
		var date = [];

		var data = [Math.random() * 300];

		for(var i = 1; i < 200; i++) {
			var now = new Date(base += oneDay);
			date.push([now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'));
			data.push(Math.round((Math.random() - 0.5) * 20 + data[i - 1]));
		}

		var option1 = {
			tooltip: {
				trigger: 'axis',
				position: function(pt) {
					return [pt[0], '10%'];
				}
			},
			title: {
				left: 'center',
				text: '大数据量面积图',
			},
			legend: {
				top: 'bottom'
			},
			toolbox: {
				feature: {
					dataZoom: {
						yAxisIndex: 'none'
					},
					restore: {},
					saveAsImage: {}
				}
			},
			xAxis: {
				type: 'category',
				boundaryGap: false,
				data: date
			},
			yAxis: {
				type: 'value',
				boundaryGap: [0, '100%']
			},
			dataZoom: [{
				type: 'inside',
				start: 0,
				end: 10
			}, {
				start: 0,
				end: 10,
				handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
				handleSize: '80%',
				handleStyle: {
					color: '#fff',
					shadowBlur: 3,
					shadowColor: 'rgba(0, 0, 0, 0.6)',
					shadowOffsetX: 2,
					shadowOffsetY: 2
				}
			}],
			series: [{
				name: '模拟数据',
				type: 'line',
				smooth: true,
				symbol: 'none',
				sampling: 'average',
				itemStyle: {
					normal: {
						color: 'rgb(255, 70, 131)'
					}
				},
				areaStyle: {
					normal: {
						color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
							offset: 0,
							color: 'rgb(255, 158, 68)'
						}, {
							offset: 1,
							color: 'rgb(255, 70, 131)'
						}])
					}
				},
				data: data
			}]
		};
		// 使用刚指定的配置项和数据显示图表。
		myChart.setOption(option);
		myChart1.setOption(option1);
	}

	//console.log(require);
});