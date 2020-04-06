const {Table, Button,Tooltip,Input,Icon,Modal,message,Switch} =antd;

class MiEnv extends React.Component {
    constructor(props) {
        super(props);
        this.columns = [
            {
                title: 'id',
                dataIndex: 'id',
                key: 'id',
                width: '5%',
                render: text => <a href="#"> { text } </a>
            },
            {
                title: '名称',
                dataIndex: 'name',
                key: 'name',
                width: '10%',
            },
            {
                title: '键',
                dataIndex: 'env_key',
                key: 'env_key',
                width: '10%',
            },
            {
                title: '值',
                dataIndex: 'env_value',
                key: 'env_value',
                width: '10%',
            },
            {
                title: '描述',
                dataIndex: 'description',
                key: 'description',
                width: '30%',
            }
        ];
        this.columns.push({
            title: '操作',
            key: 'operation',
            align: "center",
            width: '30%',
            render: (text, record) => {
                return <div>
                    <Tooltip title="编辑">
                        <Icon type="edit" onClick={this.showUpdateModal.bind(this,record)}/>
                    </Tooltip>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <Tooltip title="删除">
                        <Icon type="delete" onClick={this.delete.bind(this,{id:record.id,parent_id:record.parent_id})}/>
                    </Tooltip>
                </div>;
            }
        });
        M.MiEnv_this=this;
        this.state={
            record:{},
            Alldate:[],
            visible:false,
            total: 0,
            name:'',
            status:'2',
            startPage:1,
            limit:10,
            visible: false,
            modelType:"add",
        };

    }
    componentDidMount() {
        let current=1;
        let pageSize=10;
        MIO.miEnvListByPage({
            startPage: current,
            limit: pageSize,
            name:this.state.name,
            status:this.state.status,
            parent_id:this.state.parent_id
        }).then(d=>{
            const Alldate =M.global.maplist(d.rows);
            const total = d.total;
            M.MiEnv_this.setState({
                Alldate: Alldate,
                total: total
            })
        })
    };

    componentWillMount () {
      


    }
    componentWillUnmount(){
        this.setState = (state, callback) => {
            return
     }}

    flush=()=>{
        MIO.miEnvListByPage({
            startPage: this.state.startPage,
            limit: this.state.limit,
            name:this.state.name,
            status:this.state.status
        }).then(d=>{
            const Alldate =M.global.maplist(d.rows);
            const total = d.total;
            M.MiEnv_this.setState({
                Alldate: Alldate,
                total: total
            })
        })
    }
    deleteAll(){
        let r1 =window.confirm("确认删除所有环境变量");
        if(r1){
            MIO.miEnvDeleteAll().then(d=>{
                M.MiEnv_this.flush();
                message.success("ok");
            })
        }

    }
    addOrUpdate = () => {
        const { form } = this.formRef.props;
        form.validateFields((err, values) => {
                if (err) {
                    message.error("ng")
                    return;
                }else{
                    let values=form.getFieldsValue()
                    this.state.visible=false;
                    if(this.state.modelType=="add"){
                        MIO.miEnvAdd(values).then(d=>{
                            M.MiEnv_this.flush();
                            message.success("ok")
                        })
                    }else{
                        MIO.miEnvUpdate(values).then(d=>{
                            M.MiEnv_this.flush();
                            message.success("ok")
                        })
                    }
                }
        });
     
   };
    delete(r){
        let r1 =window.confirm("确认删除"+JSON.stringify(r)+"?");
        if(r1){
            MIO.miEnvDelete(r).then(d=>{
                M.MiEnv_this.flush();
                message.success("ok")
            })
        }
    }
    onTableChange(current, pageSize) {
        const state = this.state;
        state.startPage=current;
        state.limit=pageSize;
        M.MiEnv_this.flush();
    }
    
     showAddModal = (record) => {
        this.setState({
          visible: true,
          modelType:"add",
          record:{}
        });
      };
      showUpdateModal = (record) => {  
        const { form } = this.formRef.props;   
        form.resetFields();
        this.setState({
          visible: true,
          modelType:"update",
          record:record
        });
      };
      handleCancel = e => {
        const { form } = this.formRef.props;
        form.resetFields();
        this.setState({
          visible: false,
        });
      };
     searchData=e=>{
        this.state.name=e.target.value;
        M.MiEnv_this.flush();
     }

    render() {
        return (
            <div>          
                <Input
                    type="text"
                    placeholder="name"
                    defaultValue={""}
                    onChange={this.searchData}
                    style={{ width: '30%', marginRight: '3%' }}
                />
                <Button type="primary" onClick={this.deleteAll.bind(this,this.state.parent_id)}>清空环境变量</Button>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Button type="primary" onClick={this.showAddModal}>添加环境变量</Button>  <br/>  <br/>
                <Table dataSource={this.state.Alldate} columns={this.columns} pagination={false} />
                <br/><br/><br/>
               <MiEnvForm   
                    title={(this.state.modelType=="add"? "新增" : "修改")+"(id)"+this.state.record.id} 
                    wrappedComponentRef={(form) => this.formRef = form} 
                    visible={this.state.visible}
                    initData={this.state.record}
                    parent_id={this.state.parent_id}
                    onCancel={this.handleCancel}
                    onCreate={this.addOrUpdate}/>
                <antd.Pagination
                    showSizeChanger showQuickJumper
                    defaultCurrent={1}
                    total={this.state.total}
                    onChange={this.onTableChange.bind(this)}
                    onShowSizeChange={this.onTableChange.bind(this)}
                    pageSizeOptions={["5","10","20"]}
                />
            </div>
        )
    }
}











