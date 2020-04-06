const {Table, Button,Tooltip,Input,Icon,Modal,message,Switch} =antd;

class MiApi extends React.Component {
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
                title: 'api名称',
                dataIndex: 'name',
                key: 'name',
                width: '8%',
            },
            {
                title: 'apiPath',
                dataIndex: 'request_path',
                key: 'request_path',
                width: '8%',
            },
            {
                title: '请求方法',
                dataIndex: 'request_method',
                key: 'request_method',
                width: '8%',
            },
            // {
            //     title: '请求头',
            //     dataIndex: 'request_headers',
            //     key: 'request_headers',
            //     width: '8%',
            // },
            {
                title: '请求url',
                dataIndex: 'request_url',
                key: 'request_url',
                width: '8%',
            },
            {
                title: ' 父id',
                dataIndex: 'parent_id',
                key: 'parent_id',
                width: '10%',
            },
            {
                title: '描述',
                dataIndex: 'description',
                key: 'description',
                width: '8%',
            },
            {
                title: '创建时间',
                dataIndex: 'gmt_create',
                key: 'gmt_create',
                width: '8%',
            },
            {
                title: '状态',
                dataIndex: 'status',
                key: 'status',
                render: (text, record) => {
                        let f;
                        text == "0" ? f = false : f = true;
                        return <Switch defaultChecked={f}
                                       onChange={this.onRecordChange.bind(this, text, record)} 
                                />;
                    
                }
            }
        ];
        this.columns.push({
            title: '操作',
            key: 'operation',
            align: "center",
            render: (text, record) => {
                return <div>
                    <Tooltip title="编辑">
                        <Icon type="edit" onClick={this.showUpdateModal.bind(this,record)}/>
                    </Tooltip>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <Tooltip title="删除">
                        <Icon type="delete" onClick={this.delete.bind(this,{id:record.id,parent_id:record.parent_id})}/>
                    </Tooltip>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <Tooltip title="文件管理">
                        <Icon type="file" onClick={()=>{ window.location.hash="#/B/"+record.id}}/>
                    </Tooltip>
                </div>;
            }
        });

        M.MiApi_this=this;

        this.m_props= model.action(store.dispatch);
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
            parent_id:props.parent_id
        };

    }
    componentDidMount() {
        let current=1;
        let pageSize=10;
        this.m_props.Alldatas(
            {
                startPage: current,
                limit: pageSize,
                name:this.state.name,
                status:this.state.status,
                parent_id:this.state.parent_id
            }
        );
    };
    componentWillMount () {
        store.subscribe(()=>{this.setState(store.getState())});
    }
    componentWillUnmount(){
        this.setState = (state, callback) => {
            return
     }}
     flush(parent_id){
        this.state.parent_id=parent_id;
        M.MiApi_this.m_props.Alldatas({
            startPage: this.state.startPage,
            limit: this.state.limit,
            name:this.state.name,
            status:this.state.status,
            parent_id:parent_id
        });
    }
    deleteAll(parent_id){
       Modal.confirm({
            title: '确定要清空所有API',
            content: '清空后不可恢复',
            onOk() {
                MIO.miApiDeleteAll({parent_id}).then(d=>{
                    M.MiApi_this.m_props.Alldatas({
                        startPage:  M.MiApi_this.state.startPage,
                        limit:  M.MiApi_this.state.limit,
                        name: M.MiApi_this.state.name,
                        status: M.MiApi_this.state.status,
                        parent_id: M.MiApi_this.state.parent_id
                    });
                    M.MiApi_this.props.parentFlush();
                })
            },
            onCancel() {},
          });
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
                        MIO.miApiAdd(values).then(d=>{
                            M.MiApi_this.m_props.Alldatas(this.state);
                            message.success("ok")
                            this.props.parentFlush();
                        })
                    }else{
                        MIO.miApiUpdate(values).then(d=>{
                            M.MiApi_this.m_props.Alldatas(this.state);
                            message.success("ok")
                            this.props.parentFlush();
                        })
                    }
                }
        });
     
   };
    delete(r){
        let r1 =window.confirm("确认删除"+JSON.stringify(r)+"?");
        if(r1){
            MIO.miApiDelete(r).then(d=>{
                M.MiApi_this.m_props.Alldatas(this.state);
                message.success("ok")
                this.props.parentFlush();
            })
        }
    }
    onTableChange(current, pageSize) {
        const state = this.state;
        state.startPage=current;
        state.limit=pageSize;
        M.MiApi_this.m_props.Alldatas(this.state);
    }
    onRecordChange(text, record, checked){
        let f;
        true == checked ? f = 1 : f = 0;
        MIO.miApiSetStatus({id:record.id,status:f})
        M.MiApi_this.m_props.Alldatas(this.state);
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
         const name=e.target.value;
         M.MiApi_this.m_props.Alldatas({...this.state,name});
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
                 {/* <Button type="primary" onClick={this.searchData.bind(this)}>搜索</Button> */}
                <Button type="primary" onClick={this.deleteAll.bind(this,this.state.parent_id)}>清空api</Button>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Button type="primary" onClick={this.showAddModal}>添加api</Button>  <br/>  <br/>
                <Table dataSource={this.state.Alldate} columns={this.columns} pagination={false} />
                <br/><br/><br/>
               <MiApiForm   
                    title={"miApi"+this.state.modelType=="add"?"新增(parent_id|id)"+this.state.parent_id+"|"+this.state.record.id:"修改(parent_id|id)"+this.state.parent_id+"_"+this.state.record.id} 
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











