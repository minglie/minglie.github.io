
const CommentList=({comments})=>{
    return (

        <div className="list-grop mb-3">
            {
                comments.map((comment,index)=>
                    <li key={index} className="list-group-item"> {comment}</li>
                )
            }
        </div>
    )
}



class App extends  React.Component {
    constructor(props){
        super(props);
        this.state={
            comments:['aaaa',"sss","ddd"]
        }

    }
    render() {
        return (
            <div className="alert alert-success">

                <CommentList comments={this.state.comments} />
                <button className="btn btn-primary">留言</button>
            </div>
        );
    }
}
