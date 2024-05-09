import { useState, useEffect } from "react"
import { Link, useParams, useLocation } from "react-router-dom"
import { getProduct } from "../../api"

function ProductDetail() {
  const [product, setProduct] = useState(null)
  const { id } = useParams()
  const location = useLocation()
  
  useEffect(() => {
    async function loadProduct() {
      try {
        const data = await getProduct(id)
        setProduct(data)
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    }
    loadProduct()
  }, [id])

  const search = location.state?.search || "";
  const type = location.state?.type || "products";
  const capitalizedType = type
  .split(" ")
  .map(word => word.charAt(0).toUpperCase() + word.slice(1))
  .join(" ");

  return (
    <div className="product-details-container">
      <Link
        to={`..${search}`}
        relative="path"
        className="back-button"
      >
        &larr; <span>Back to {capitalizedType}</span>
      </Link>
      {
        product && (
          <div className="product-detail-container" tabIndex={product}>
            <div className="detail-img-container">
              <img src={product.image} alt={product.title}/>
            </div>
            <div className="detail-attribute-container">
              <h1>{product.title}</h1>
              <h2>{product.description}</h2>
              <p>${product.price}</p>
              <p>Rating: {product.rating?.rate}</p>
              <Link
                to={{
                  pathname: "/purchases",
                  state: { product: product }
                }}
              >
                <button className="cart-btn">Add to Cart</button>
              </Link>
            </div>
          </div>
        )
      }
    </div>
  )
}

export default ProductDetail