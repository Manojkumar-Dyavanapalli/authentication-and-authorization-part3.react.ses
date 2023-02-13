import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import ProductCard from '../ProductCard'

import './index.css'

class AllProductsSection extends Component {
  state = {
    productsList: [],
    isLoading: true,
  }

  componentDidMount = () => {
    this.getProducts()
  }

  getProducts = async () => {
    const url = 'https://apis.ccbp.in/products'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.products.map(eachProduct => ({
        title: eachProduct.title,
        brand: eachProduct.brand,
        price: eachProduct.price,
        id: eachProduct.id,
        imageUrl: eachProduct.image_url,
        rating: eachProduct.rating,
      }))
      this.setState({productsList: updatedData, isLoading: false})
    }
  }

  renderLoader = () => (
    <div data-testid="loader" className="loader-container">
      <Loader type="Oval" color="#ffffff" height={50} />
    </div>
  )

  renderProductsList = () => {
    const {productsList} = this.state
    return (
      <div>
        <h1 className="products-list-heading">All Products</h1>
        <ul className="products-list">
          {productsList.map(product => (
            <ProductCard productData={product} key={product.id} />
          ))}
        </ul>
      </div>
    )
  }

  render() {
    const {isLoading} = this.state
    return <> {isLoading ? this.renderLoader() : this.renderProductsList()} </>
  }
}

export default AllProductsSection
