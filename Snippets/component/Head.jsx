

class Head extends React.Component {

    constructor(props){
        super(props);
        this.state={
            dataSource:[]
        };
        M.M_this=this;
    }


    componentDidMount() {


        M.IO.listAllRoot({}).then(d=>{
            M.M_this.setState({
                dataSource:d
            })
        });


    };



    handleFlush=(e)=>{
        setTimeout( this.props.flush,100)
    };

    gotoManager=(e)=>{
        location.href="manager/index.html"
    };



    render() {

        const list=this.state.dataSource.map((d,i)=>
            <li  key={i}>
                <a href={"#/"+d.id} className="active" onClick={this.handleFlush}>{d.name}</a>
            </li>
        );


        return (
            <nav className="navbar navbar-inverse" role="navigation">
                        <ul className="nav navbar-nav">
                            {list}
                        </ul>
            </nav>
        )
    }
}