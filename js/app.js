(function (Vue) {
	const STORAGE_KEY = "items-vue.js"
	//本地存储数据
	const itemStorage = {
		//获取数据
		fetch:function(){
			return JSON.parse(localStorage.getItem(STORAGE_KEY)||"[]")
			
		},
		//保存数据
		save:function(){
			localStorage.setItem(STORAGE_KEY,JSON.stringify(items))
		}
	}

	const items=[{id:1,content:"vue",completed:false},
				{id:2,content:"java",completed:false},
				{id:3,content:"rails",completed:true}]
	//全局自定义指令
	//自动获取焦点
	Vue.directive("app-focus",{
		inserted(el,binding){
			//聚焦元素
			el.focus()
		},
		update(el,binding){
			//聚焦元素
			if(binding.value){
				el.focus()
			}
			
		}

	})
	//全局过滤
	Vue.filter('contentFilter',function(value){
		if(!value){
			return ''
		}
		return value.toString().replace('TMD','***')
	})

	var app = new Vue({
		el:"#todoapp",
		data:{
			title:"TodoList",
			//items, //items: items ES6写法
			items:itemStorage.fetch(),
			currentItem:null,
			filterStatus: "all"

		},
		watch:{
			// items: function(newVal,oldVal){
			// 	console.log("watch item",newVal,oldVal) 
			// }
			//深度监听
			items:{
				deep:true,
				handler:function(newItems,oldItems){
					itemStorage.save(newItems ) 
				}
			}

		},
		//自定义局部指令
		directives:{
			"todo-focus":{
				update(el,binding){
					if(binding.value){
						el.focus()
					}
					
				}		
			}
		},
		computed:{
			filterItems(){
				switch(this.filterStatus){
					case 'active':
						return this.items.filter(item=>!item.completed);
						break;
					case 'completed':
						return this.items.filter(item=> item.completed);
						break;
					default:
						return this.items
						break;
				}
			},
			//双向绑定
			toggleAll: {
				//任务栏状态变化，更新复选框状态
				get(){//get: function()
					//监听sum，sum变化就会改变
					console.log("toggleall get", this.sum);
					return this.sum === 0;//为true
				},
				//复选框状态变化，更新任务栏状态
				set(newStatus){
					console.log("toggleall set")
					this.items.forEach(function (item){
						item.completed = newStatus
					})
					// ES6
					// this.items.forEach((item)=>{
					// 	item.completed = newStatus
					// })
				}
			},
			//未完成数量 单项绑定
			sum: function(){
				const res = this.items.filter(function(item){
					return !item.completed
				})
				return res.length
			}
		},	
		methods:{
			finishEdit(index,item,event){
				//获取输入框
				const content = event.target.value.trim();
				//判断值是否为空，为空删除
				if(!content){
					this.removeItem(index);
					return;
				}
				//不为空则修改
				item.content = content
				//退出编辑，移除editing样式
				this.canelEdit();

			},
			removeCompleted: function(){
				console.log("remove completed");
			    //过滤未完成任务项 ES6简介写法
			    this.items  = this.items.filter(item => !item.completed)
			},
			removeItem: function(index){
				console.log(index);
			    //移出一条数据
				this.items.splice(index,1)
			},
			addItem: function(event){
				console.log("use addItem",event.target.value);
				//获取内容
				const content = event.target.value.trim();
				//判断非空
				if (!content.length) return;
				//添加元素
				const id = this.items.length + 1
				this.items.push({
					id,//id:id
					content,//content:content
					completed:false
				})
				//清空输入栏
				event.target.value = ""
			},
			toEdit(item){
				console.log("toEdit",item.content);
				this.currentItem = item
			},
			canelEdit(){
				this.currentItem = null;
			}		
		}
	})
//路由hash改变时
window.onhashchange = function(){
	console.log("change url hash",window.location.hash)
	//=> "#/all"
	app.filterStatus = window.location.hash.substr(2) || 'all'
	
}
window.onhashchange()

})(Vue);
