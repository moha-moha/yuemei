import React, { PropTypes } from 'react'
import { Form, Input, Select, Radio, Modal, DatePicker, Upload, Icon, message } from 'antd'
import moment from 'moment'
const FormItem = Form.Item
const Option = Select.Option

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
}

const modal = ({
  visible,
  type,
  item = {},
  onOk,
  onCancel,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
  },
}) => {
  function handleOk () {
    validateFields((errors) => {
      if (errors) {
        return
      }
      const data = {
        ...getFieldsValue(),
        key: item.key,
      }
      onOk(data)
    })
  }

  const modalOpts = {
    title: `${type === 'create' ? '新建用户' : '修改用户'}`,
    visible,
    onOk: handleOk,
    onCancel,
    wrapClassName: 'vertical-center-modal',
  }

  function getBase64 (img, callback) {
    const reader = new FileReader()
    reader.addEventListener('load', () => callback(reader.result))
    reader.readAsDataURL(img)
  }

  function beforeUpload (file) {
    const isJPG = file.type === 'image/jpeg'
    if (!isJPG) {
      message.error('你只能上传JPG格式的!')
    }
    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isLt2M) {
      message.error('图片尺寸小于2M!')
    }
    return isJPG && isLt2M
  }

  const handleChange = (info) => {
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      // getBase64(info.file.originFileObj, imageUrl => this.setState({ imageUrl }));
    }
  }

  return (
    <Modal {...modalOpts}>
      <Form layout="horizontal">
        <FormItem label="上传头像：" hasFeedback {...formItemLayout}>
          {getFieldDecorator('avatar', {
            initialValue: item.avatar,
          })(<Upload
            className="avatar-uploader"
            name="avatar"
            showUploadList={false}
            action="api/avatar/"
            beforeUpload={beforeUpload}
            onChange={handleChange}
          >
            {item.avatar ?
              <img src={item.avatar} alt="" className="avatar" /> :
              <Icon type="plus" className="avatar-uploader-trigger" />}
          </Upload>)}
        </FormItem>
        <FormItem label="姓名：" hasFeedback {...formItemLayout}>
          {getFieldDecorator('name', {
            initialValue: item.name,
            rules: [
              {
                required: true,
                message: '姓名未填写',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="出生年月：" hasFeedback {...formItemLayout}>
          {getFieldDecorator('birthday', {
            initialValue: item.birthday ? moment(item.birthday) : '',
            rules: [
              {
                required: true,
                message: '出生年月未填写',
              },
            ],
          })(<DatePicker showToday={false} />)}
        </FormItem>
        <FormItem label="性别" {...formItemLayout}>
          {getFieldDecorator('isMale', {
            initialValue: item.isMale || false,
          })(
            <Radio.Group>
              <Radio value>男</Radio>
              <Radio value={false}>女</Radio>
            </Radio.Group>
          )}
        </FormItem>
        <FormItem label="手机号码：" hasFeedback {...formItemLayout}>
          {getFieldDecorator('phone', {
            initialValue: item.phone,
            rules: [
              {
                required: true,
                message: '手机号不能为空并为有效的号码',
                pattern: /^(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/,
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="邮箱：" hasFeedback {...formItemLayout}>
          {getFieldDecorator('email', {
            initialValue: item.email,
            rules: [
              {
                type: 'email',
                message: '请输入正确的邮箱地址',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="住址：" hasFeedback {...formItemLayout}>
          {getFieldDecorator('address', {
            initialValue: item.address,
            rules: [
              {
                required: true,
                message: '不能为空',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="用户来源：" {...formItemLayout}>
          {getFieldDecorator('comefrom', {
            initialValue: item.comefrom || 'other',
          })(<Select style={{ width: 120 }}>
            <Option value="other">其它</Option>
            <Option value="old">老客</Option>
            <Option value="new">老带新</Option>
            <Option value="dzdp">大众点评</Option>
            <Option value="pt">美团</Option>
          </Select>)}
        </FormItem>
        <FormItem label="备注：" hasFeedback {...formItemLayout}>
          {getFieldDecorator('mark', {
            initialValue: item.mark,
          })(<Input type="textarea" rows={4} />)}
        </FormItem>
      </Form>
    </Modal>
  )
}

modal.propTypes = {
  form: PropTypes.object.isRequired,
  visible: PropTypes.bool,
  type: PropTypes.string,
  item: PropTypes.object,
  onCancel: PropTypes.func,
  onOk: PropTypes.func,
}

export default Form.create()(modal)
