import React from 'react'
import { Col, Row } from 'antd'
import { useDispatch } from 'react-redux'
import { useSelector } from '../../redux/hooks'
import { PaymentForm, CheckOutCard } from '../../components'
import { placeOrder } from '../../redux/order/slice'
import { MainLayout } from '../../layouts/mainLayout'

export const PlaceOrderPage: React.FC = () => {
  const jwt = useSelector((s) => s.user.token) as string
  const loading = useSelector((s) => s.order.loading)
  const order = useSelector((s) => s.order.currentOrder)
  const dispatch = useDispatch()
  return (
    <MainLayout>
      <Row>
        <Col span={12}>
          <PaymentForm />
        </Col>
        <Col span={12}>
          <CheckOutCard
            loading={loading}
            order={order}
            onCheckout={() => {
              dispatch(placeOrder({ jwt, orderId: order.id }))
            }}
          />
        </Col>
      </Row>
    </MainLayout>
  )
}
