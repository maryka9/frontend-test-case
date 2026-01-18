import {useDispatch} from "react-redux";
import {addToCart} from "../../store/cart";

export const ProductCard = ({product}) => {
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