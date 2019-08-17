
class Index extends React.Component {
    constructor(props){
        super(props);
    }
    componentDidMount() {

    };
    flush=(e)=>{
        this.setState({});
        this.refs.table.handleSearch();
    };
    render() {
        return(
            <div>
                <Head flush={this.flush}/>
                 <a href="https://minglie.github.io/Snippets/managerbrower/index.html">后台管理</a>
				 &nbsp;&nbsp;&nbsp;
				 <a href={M.database_path1}>数据源</a>
                <Table ref="table"/>
            </div>
        )
    }

}
