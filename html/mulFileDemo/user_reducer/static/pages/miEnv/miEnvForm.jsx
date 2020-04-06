const { Form, Select, Input, Button ,Radio} = antd;
const { Option } = Select;
const MiEnvForm = Form.create({})(
  class extends React.Component {
    componentWillMount () {
     
     }
    render() {
      const { visible, onCancel, onCreate, form,title,initData} = this.props;
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
          {getFieldDecorator('id', {
           initialValue:initData.id
          })(<Input  hidden/>)}
        </Form.Item>
        <Form.Item label="name">
          {getFieldDecorator('name', {
            initialValue:initData.name,
            rules: [{ required: true, message: 'Please input your note!' }],
          })(<Input />)}
        </Form.Item>
        <Form.Item label="env_key">
          {getFieldDecorator('env_key', {
            initialValue:initData.env_key,
            rules: [{ required: true, message: 'Please input your note!' }],
          })(<Input />)}
        </Form.Item>
        <Form.Item label="env_value">
          {getFieldDecorator('env_value', {
            initialValue:initData.env_value,
            rules: [{ required: true, message: 'Please input your note!' }],
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

