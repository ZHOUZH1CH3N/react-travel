import { useEffect } from 'react'
import { Form, Input, Button, Checkbox } from 'antd'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router'
import { signIn } from '../../redux/user/slice'
import { useSelector } from '../../redux/hooks'

import styles from './SignInForm.module.css'

export const SignInForm = () => {
  const loading = useSelector((state) => state.user.loading)
  const error = useSelector((state) => state.user.error)
  const jwt = useSelector((state) => state.user.token)

  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    if (jwt !== null) {
      history.push('/')
    }
  }, [jwt])

  const onFinish = (values: any) => {
    dispatch(signIn({ email: values.username, password: values.password }))
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      className={styles['register-form']}
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{ offset: 8, span: 16 }}
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit" loading={loading}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}
