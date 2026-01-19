import {useDispatch} from "react-redux";
import {addToCart} from "@store/cart";

import PropTypes from "prop-types";

import "./ProductCard.css";

export const ProductCard = ({ product }) => {
    const dispatch = useDispatch();

    return (
        <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <div className="price">${product.price}</div>
            <button onClick={() => {dispatch(addToCart(product))}}>Добавить в корзину</button>
        </div>
    )
}

ProductCard.propTypes = {
    product: PropTypes.shape({
        id: PropTypes.number.isRequired,
        image: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        price: PropTypes.string.isRequired,
    })
}