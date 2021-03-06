import React from 'react';
import '../../Pages/Goods/Goods.styles.scss';
import { NavLink } from 'react-router-dom';
import CurrentCurrency from './CurrentCurrency';

interface GoodsNameProps {
  stateCurrency: number
  product: {id: string, name: string, prices: {amount: string}[]}
  choseGoods: (goodsId: string) => void
}

export default class GoodsName extends React.Component<GoodsNameProps> {
  render() {
    const { product, choseGoods } = this.props;
    return (
      <NavLink to='/goods' onClick={() => choseGoods(product.id)}>
        <p className='cart-first-text'>{product.name}</p>
        <p className='cart-first-text weight-normal'>{product.id}</p>
        <p className='cart-goods-padding'>
          <CurrentCurrency />
          {product.prices[this.props.stateCurrency].amount}
        </p>
      </NavLink>
    )
  }
}
