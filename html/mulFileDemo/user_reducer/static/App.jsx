const { Layout , Menu } = antd;
const { Content, Sider,Footer,Header } = Layout;
const {HashRouter  , Route, Link } = ReactRouterDOM;

const {useState,useEffect,useContext}=React;
const NumberContext = React.createContext();



class App extends React.Component {
    state = {
        collapsed: false,
    };
    onCollapse = (collapsed) => {
        this.setState({ collapsed });
    }
    render() {
        return (
            <HashRouter>
                <Layout style={{ minHeight: '100vh' }}>
                    <Sider
                        collapsible
                        collapsed={this.state.collapsed}
                        onCollapse={this.onCollapse}
                    >
                        <div className="logo" />
                        {/*<img src="baidu.png"/>*/}
                        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                            <Menu.Item key="1">
                                <Link to="/"><Icon type="api" theme="twoTone" />API</Link>
                            </Menu.Item>
                            <Menu.Item key="3">
                                <Link to="/C"><Icon type="file-text" theme="twoTone"/>环境变量</Link>
                            </Menu.Item>
                            <Menu.Item key="4">
                                <Link to="/D"><Icon type="file-text" theme="twoTone"/>mingCount</Link>
                            </Menu.Item>
                            <Menu.Item key="5">
                                <Link to="/E"><Icon type="file-text" theme="twoTone"/>mingColour</Link>
                            </Menu.Item>

                        </Menu>
                    </Sider>
                    <Layout>
                         {/* <Header className="site-layout-background" style={{ padding: 0 }} /> */}
                        <Content style={{ margin: '0 16px' }}>
                            <div style={{ padding: 24, background: '#fff', height: "100%" }}>
                                <Route exact path="/" component={MiApiTree} />
                                <Route path="/C" component={MiEnv} />
                                <Route path="/D" component={MingCounter} />
                                <Route path="/E" component={mingColour} />
                            </div>
                        </Content>
                        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
                    </Layout>
                </Layout>
            </HashRouter>
        );
    }
}