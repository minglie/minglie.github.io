const dataSource = [{
    key: 1,
    name1: '天下',
    age: 18,

},{
    key: 2,
    name1: '晓晓',
    age: 22,

}]



const columns = [
    {
        title: '姓名',
        dataIndex: 'name1',
        key: 'name',
        render: text => <a href="#"> { text } </a>
    },
    {
        title: '年龄',
        dataIndex: 'age',
        key: 'age',
    },
  ]

