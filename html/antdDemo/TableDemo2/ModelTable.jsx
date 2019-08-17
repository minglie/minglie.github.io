class ModelTable extends React.Component {
    constructor(props) {
        super(props);
        console.log(props,"AAAAAAAAAAAAAAAAAAA");
        this.columns = [
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
         ];
        window.m_this=this;
        //模拟props,通过父组件传给子props
        this.m_props= model.action(store.dispatch);
        this.state={
            Alldate:[],
            total: 0,
        };
        store.subscribe(()=>{this.setState(store.getState())});
    }
    componentDidMount() {
            let current=1;
            let pageSize=10;
            this.m_props.Alldatas(
            {
                startPage: current,
                limit: pageSize
            }
        );
    };
    onChange(current, pageSize) {
            m_this.m_props.Alldatas(
            {
                startPage: current,
                limit: pageSize
            }
        );
    }

    render() {

            return (
                <div>
                    <antd.Table dataSource={this.state.Alldate} columns={this.columns} pagination={false} />
                <br/>
                <antd.Pagination
                showSizeChanger showQuickJumper
                defaultCurrent={1}
                total={this.state.total}
                onChange={this.onChange}
                pageSizeOptions={["5","10","20"]}
                />
                </div>
            )
    }

}

