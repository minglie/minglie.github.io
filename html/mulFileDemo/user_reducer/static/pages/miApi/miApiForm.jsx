const { Form, Select, Input, Button ,Radio} = antd;
const { Option } = Select;
const MiApiForm = Form.create({})(
  class extends React.Component {
    componentWillMount () {
     
     }
    render() {
      const { visible, onCancel, onCreate, form,title,initData,parent_id} = this.props;
      const { getFieldDecorator } = form;
      return (
        <Modal
          visible={visible}
          title={title}
          okText="ok"
          onCancel={onCancel}
          onOk={onCreate}
        >
        <Form onSubmit={this.handleSubmit}>
        <Form.Item >
          {getFieldDecorator('parent_id', {
            initialValue:parent_id||initData.parent_id
          })(<Input hidden/>)}
        </Form.Item>
        <Form.Item >
          {getFieldDecorator('id', {
           initialValue:initData.id
          })(<Input hidden />)}
        </Form.Item>
        <Form.Item label="名称">
          {getFieldDecorator('name', {
            initialValue:initData.name,
            rules: [{ required: true, message: 'Please input your note!' }],
          })(<Input />)}
        </Form.Item>
        <Form.Item label="api地址">
          {getFieldDecorator('request_path', {
            initialValue:initData.request_path,
            rules: [{ required: false, message: 'Please input your note!' }],
          })(<Input />)}
        </Form.Item>
        <Form.Item label="请求方法">
          {getFieldDecorator('request_method', {
            initialValue:initData.request_method,
            rules: [{ required: true, message: 'Please input your note!' }],
          })( <Select initialValue={initData.request_method||"GET"}>
          <Option value="GET">GET</Option>
          <Option value="POST">POST</Option>
        </Select>)} 
         
        </Form.Item>
        <Form.Item label="请求头">
          {getFieldDecorator('request_headers', {
            initialValue:initData.request_headers||`{"Content-Type":"application/json"}`,
            rules: [{ required: true, message: 'Please input your note!' }],
          })(<Input />)}
        </Form.Item>

        <Form.Item label="请求url">
          {getFieldDecorator('request_url', {
            initialValue:initData.request_url,
            rules: [{ required: false, message: 'Please input your note!' }],
          })(<Input />)}
        </Form.Item>
        <Form.Item label="描述">
          {getFieldDecorator('description', {
            initialValue:initData.description,
            rules: [{ required: false, message: 'Please input your note!' }],
          })(<Input />)}
        </Form.Item>
      </Form>
        </Modal>
      );
    }
  },
);

