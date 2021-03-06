import React from 'react';
import Attributes from './Attributes';
import GoodsNameAndCost from './GoodsNameAndCost';
import PlusMinusButtons from './PlusMinusButtons';
import GoodsImage from './GoodsImage';

interface GoodsAttributesProps {
  attributeSelected: (index: number) => void
  setAmountUp: (productIndexes: (string | number[][] | number)[]) => void
  setAmountDown: (productIndexes: (string | number[][] | number)[]) => void | undefined
  goodsAmount: (string | number[][] | number)[][]
  stateCurrency: number
  productsIndexes: number[]
  products: {id: string, name: string, gallery: string[], prices: {amount: string}[],
    attributes: {id: string, name: string,  items: { value: string, displayValue: string; }[]; }[] }[]
}

export default class GoodsAttributes extends React.Component<GoodsAttributesProps> {

  productsRender = (productsIndexes: number[], products: {id: string, name: string, gallery: string[],
    prices: {amount: string}[], attributes: {id: string, name: string,  items: { value: string,
    displayValue: string; }[]; }[] }[], stateCurrency: number, attributeSelected: (index: number) => void,
    goodsAmount: (string | number[][] | number)[][], setAmountUp: (productIndexes: (string | number[][] |
    number)[]) => void, setAmountDown: (productIndexes: (string | number[][] | number)[]) => void | undefined) => {

    return productsIndexes.map((productIndex: number, goodsNumber: number) => (
      <div key={goodsNumber} className='cart-window-container'>
        <div className='window-first-container'>
          <GoodsNameAndCost product={products[productIndex]} stateCurrency={stateCurrency} />
          <div className='cart-window-attribute-row'>
            {this.renderAttributes(products, productIndex, goodsAmount, goodsNumber, attributeSelected)}
          </div>
        </div>
        <PlusMinusButtons setAmountUp={setAmountUp} setAmountDown={setAmountDown} goodsAmount={goodsAmount}
                          goodsNumber={goodsNumber} />
        <GoodsImage product={products[productIndex]} />
      </div>
    ))
  }

  renderAttributes = (products: {id: string, name: string, gallery: string[],
    prices: {amount: string}[], attributes: {id: string, name: string,  items: { value: string,
    displayValue: string; }[]; }[] }[], productIndex: number, goodsAmount: (string | number[][] | number)[][],
    goodsNumber: number, attributeSelected: (index: number) => void) => {

    if (products[productIndex].attributes.length !== 0) {
       return products[productIndex].attributes
        .map((element: {name: string, items: {value: string, displayValue: string}[]}, index: number) => (
          <div key={index}>
            {element.name}
            {element.items.map((item: {value: string, displayValue: string}, attributeNumber: number) => {
              // @ts-ignore
              if (goodsAmount[goodsNumber][1][0][index] == attributeNumber)
                return <Attributes key={attributeNumber} attributeSelected={() => attributeSelected(attributeNumber)}
                                   value={item.value} />
              return null
            })}
          </div>
        ))}
    return null
  }

  render() {
    const { attributeSelected, goodsAmount, products, stateCurrency, productsIndexes, setAmountUp,
      setAmountDown } = this.props;
    return (
      <>
        {this.productsRender(productsIndexes, products, stateCurrency, attributeSelected, goodsAmount, setAmountUp,
          setAmountDown)}
      </>
    )
  }
}
