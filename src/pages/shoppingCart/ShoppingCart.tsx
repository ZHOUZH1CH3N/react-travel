import React from 'react'
import { Affix, Col, Row } from 'antd'
import { useDispatch } from 'react-redux'
import { MainLayout } from '../../layouts/mainLayout'
import { PaymentCard, ProductList } from '../../components'
import { useSelector } from '../../redux/hooks'
import { clearShoppingCartItem } from '../../redux/shoppingCart/slice'

import styles from './ShoppingCart.module.css'

export const ShoppingCartPage: React.FC = (props) => {
  const loading = useSelector((s) => s.shoppingCart.loading)
  const shoppingCartItems = useSelector((s) => s.shoppingCart.items)
  const jwt = useSelector((s) => s.user.token) as string
  const dispatch = useDispatch()

  return (
    <MainLayout>
      <Row>
        {/* 购物车清单 */}
        <Col span={16}>
          <div className={styles['product-list-container']}>
            <ProductList data={shoppingCartItems.map((s) => s.touristRoute)} />
          </div>
        </Col>
        {/* 支付卡组件 */}
        <Col span={8}>
          <Affix>
            <div className={styles['payment-card-container']}>
              <PaymentCard
                loading={loading}
                originalPrice={shoppingCartItems
                  .map((s) => s.originalPrice)
                  .reduce((a, b) => a + b, 0)}
                price={shoppingCartItems
                  .map(
                    (s) =>
                      s.originalPrice *
                      (s.discountPresent ? s.discountPresent : 1)
                  )
                  .reduce((a, b) => a + b, 0)}
                onCheckout={() => {}}
                onShoppingCartClear={() => {
                  dispatch(
                    clearShoppingCartItem({
                      jwt,
                      itemIds: shoppingCartItems.map((s) => s.id),
                    })
                  )
                }}
              />
            </div>
          </Affix>
        </Col>
      </Row>
    </MainLayout>
  )
}
