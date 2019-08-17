const { BrowserRouter , Route, Link } = ReactRouterDOM;


const Bc=({comments})=>{
    return (
        <div>
            <h1>BBBB-->{location.href}</h1>
        </div>
    )
};
const Cc=({comments})=>{
    return (

        <div>
            <h1>CCCCC-->{location.href}</h1>
        </div>
    )
};


class App extends  React.Component {
    constructor(props){
        super(props);
        this.state={
            comments:['aaaa',"sss","ddd"]
        }

    }
    render() {

        return (
            <BrowserRouter>
            <div className="alert alert-success">
                <header className="title">
                    <Link to="/">A</Link>
                    <Link to="/B/1">B</Link>
                    <Link to="/C/2">C</Link>
                    <Link to="/D?aid=2">D</Link>
                    <Link to="/E?aid=3">E</Link>
                </header>

                <Route exact path="/B/:aid" component={Bc} />
                <Route path="/C/:aid" component={Cc} />
                <Route path="/D" component={Bc} />
                <Route path="/E" component={Cc} />


            </div>
            </BrowserRouter>
        );
    }
}
