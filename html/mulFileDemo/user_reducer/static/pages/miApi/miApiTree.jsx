const { Tree, Icon, Button, Row, Col } = antd;
const { TreeNode } = Tree;

const transTreeData = (data) => {
    return data.map(item => {
        let isleaf = false;
        item.leaf == "0" ? isleaf = false : isleaf = true;
        if (item.childrens) {
            item.childrens = treedata(item.childrens);
        }
        return Object.assign({}, item, {
            title: item.name,
            key: item.id,
            isLeaf: isleaf
        });
    });
};
//https://blog.csdn.net/xh_960125/article/details/89850928
class MiApiTree extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            expandedKeys: [],
            autoExpandParent: true,
            curRecord: {},
            checkedKeys: [],
            selectedKeys: [],
            value2: 'Apple',
            department_id: '',
            rightClickNodeTreeItem: {
                pageX: '',
                pageY: '',
                id: '',
                categoryName: '',
            },
            display: 'none',
            treeData: [],
            parent_id:-1
        };
        M.M_MiApiTree_this=this;
    }

    componentDidMount() {
        M.doSql("select id,name,leaf from mi_api where parent_id=-1").then(d => this.setState({
            treeData: transTreeData(d),
        })
        );
    }
    onExpand = (expandedKeys, expanded, record) => {
        this.setState({
            expandedKeys,
            expanded,
            autoExpandParent: false,
        });
    };

    onSelect = (selectedKeys, info) => {
        let parent_id = -1;
        if(info.selectedNodes.length>0){
            parent_id=info.selectedNodes[0].props.dataRef.id
        }
        M.M_MiApiTree_this.state=parent_id;
        this.setState({parent_id:parent_id}, M.MiApi_this.flush(parent_id))
       
    };

    renderTreeNodes = data =>
        data.map(item => {
            if (item.children) {
                return (
                    <TreeNode title={item.name} key={item.id} dataRef={item} data-key={item.id} data-title={item.categoryName} >
                        {this.renderTreeNodes(item.childrens)}
                    </TreeNode>
                );
            }
            return <TreeNode {...item} dataRef={item} />;
        });

    onLoadData = treeNode => {
        if (treeNode.props.children) {
            this.setState({
                treeData: [...this.state.treeData],
            });
            return;
        }
        M.doSql(`select id,name,leaf from mi_api where parent_id=${treeNode.props.dataRef.id}`).then(d => {
            treeNode.props.dataRef.children = transTreeData(d);
            this.setState({
                treeData: [...this.state.treeData],
            });
        }
        );
    }

    // 点击取消隐藏
    hideRight = e => {
        this.setState({
            display: 'none',
        });
    };
    flush=()=>{
        M.doSql("select id,name,leaf from mi_api where parent_id=-1").then(d =>  M.M_MiApiTree_this.setState({
            treeData: transTreeData(d),
            autoExpandParent: false, 
            expandedKeys:[]
        })
        );
    }
    renderTreeNodes = data =>
        data.map(item => {
            if (item.children) {
                return (
                    <TreeNode title={item.title} key={item.key} dataRef={item}>
                        {this.renderTreeNodes(item.children)}
                    </TreeNode>
                );
            }
            return <TreeNode key={item.key} {...item} dataRef={item} />;
        });

    render() {
        return (
            <div>
                <Row>
                    <Col span={4}> 
                     <Button onClick={()=>this.setState({parent_id:null}, M.MiApi_this.flush(null))}>全部</Button>
                     <Tree
                        autoExpandParent={true}
                        loadData={this.onLoadData}
                        expandedKeys={this.state.expandedKeys}
                        onSelect={this.onSelect}
                        onExpand={this.onExpand}
                    >{this.renderTreeNodes(this.state.treeData)}
                    </Tree>
                    </Col>
                    <Col span={20}><MiApi parentFlush={this.flush} parent_id={this.state.parent_id}/></Col>
                </Row>
            </div>
        );
    }
}
