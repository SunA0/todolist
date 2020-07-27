(function(){

	//声明插件对象
	const MyPlugin = {}

	MyPlugin.install = function (Vue, options) {
		// 1. 添加全局方法或 property
		Vue.myGlobalMethod = function () {
			console.log("plugin->myGlobalMethod")
		  // 逻辑...
		}
	  
		// 2. 添加全局资源
		Vue.directive('my-directive', {
		  inserted (el, binding) {
			el.insertHtml = "plugin my-directive"+binding.value
		  }
		})
	  
		// 添加实例方法
		Vue.prototype.$myMethod = function (value) {
		  console.log('myMethod实例方法'+value)
		}
	  }
	  //插件添加到window对象
	  window.MyPlugin = MyPlugin 
})()