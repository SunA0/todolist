;(function () {
    const template = `<tr>
    <td>{{emp.id}}</td>
    <td>{{emp.name}}</td>
    <td>{{emp.salary}}</td>
    <td>
        <a href="#" @click="deleteItem">删除</a>
    </td>
  </tr>`

  window.Item = {
      props: {
        emp: { // 指定属性名/数据类型/是否必须 
            type: Object,
            required: true
        },
        deleteEmp: Function,
        index: Number
      },

      methods: {
        deleteItem () {
            this.deleteEmp(this.index)
        }
      },
      template
  }
})()