
class Table extends React.Component {
    constructor(props){
        super(props);
        this.state={
            dataSource:[]
        };
        Table.M_this=this;
    }
    componentDidMount() {
        const formatUrl=M.formatUrl(location.href);
        M.IO.listByPage({name:"",parent_id:formatUrl.split("/")[formatUrl.split("/").length-2]}).then(d=>{
            Table.M_this.setState({
                dataSource:d
            })
        });
    };
    handleSearch(e){
        if(e){
            e.preventDefault()
        }
        const formatUrl=M.formatUrl(location.href);
        let name=Table.M_this.refs.name.value;
        M.IO.listByPage({name:name,parent_id:formatUrl.split("/")[formatUrl.split("/").length-2]}).then(d=>{
            Table.M_this.setState({
                dataSource:d
            })
        });
    }

    render() {
        const list=this.state.dataSource.map((d,i)=>{

            return(
                     <tr key={i} className="col-lg-2" >
                         <td><a href={d.res_url} title={d.description}>{d.name}</a></td>
                     </tr>
            )
        });
        return (
            <div>
                <div className="table-responsive">
                    <div className="panel panel-default">
                        <div className="panel-body">
                            <form role="form" className="form-inline">
                                <div className="form-group">
                                    <input type="text" defaultValue="" style={{width:"100%"}} className="form-control" ref="name" placeholder="请输入名称"></input>

                                </div>
                                <div className="form-group">
                                    <button type="submit"  onClick={this.handleSearch} className="btn btn-success  btn-block">开始搜索</button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <table className="table table-striped ">
                        <tbody>
                        {list}
                        </tbody>
                    </table>
                </div>
            </div>

        )
    }



}
