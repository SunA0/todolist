;(function () {
    const template = `<div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
        
    <!--右边上半区域-->
    <!--<h1 class="page-header">Dashboard</h1>-->
        <!--定义插槽-->
        <slot name="dashboard"></slot>
        <!--通过属性绑定的方式向子组件传递数据
            @自定义事件名=事件监听函数        
            在子组件 dashboard 中触发 了 delete_hobby 事件来调用 deleteHobby 函数
        -->
        <dashboard :hobbies="hobbies" @delete_hobby="deleteHobby"></dashboard>
    <!--右边下半区域-->
        <h2 class="sub-header">Section title</h2>
        <home-list :empList="empList" :deleteEmp="deleteEmp"></home-list>

      </div>`

    window.AppHome = {
        template, // template: template,

        data () { // alt+shift 
            return {
                hobbies: ['coding', '睡觉', '打豆豆', '看书'],
                empList: [
                    {id: 1, name: '小梦1', salary: '80001'},
                    {id: 2, name: '小梦2', salary: '80002'},
                    {id: 3, name: '小梦3', salary: '80003'},
                    {id: 4, name: '小梦4', salary: '80004'},
                    {id: 5, name: '小梦5', salary: '80005'}
                ]
            }
        },

        methods: {
            // 删除某个员工
            // 因为删除 emp 会对 empList 做更新操作
            // 而这个 empList 初始化在当前组件中，所以删除 的函数需要定义在这个组件里面
            deleteEmp (index) {
                this.empList.splice(index, 1)
            },
            deleteHobby (index) {
                this.hobbies.splice(index, 1)
            }
        },

        components: { //Dashboard 作为AppHome 的子组件
            Dashboard, // Dashboard: Dashboard
            HomeList // HomeList:HomeList
        }
    }
})()