import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectCartCount, selectCartItems, selectTotalPrice} from "@store/cart";
import {checkoutCart} from "@store/api/thunks";

import {CartItem} from "../CartItem/CartItem";

import "./Cart.css";

export const Cart= () => {
    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems);
    const cartCount = useSelector(selectCartCount);
    const totalPrice = useSelector(selectTotalPrice);

    const [isOpen, setIsOpen] = useState(false);
    const [showCheckout, setShowCheckout] = useState(false);

    const handleCheckout = async () => {
       setShowCheckout(true);
        try {
            await dispatch(checkoutCart(cartItems)).unwrap();
            alert("Заказ оформлен!");
            setIsOpen(false);
        } catch (err) {
            console.error("Ошибка при оформлении заказа", err);
        } finally {
            setShowCheckout(false);
        }
    };

    return (
        <div className="cart">
            <button className="cart-toggle" onClick={() => setIsOpen(prev => !prev)}>
                Корзина ({cartCount})
            </button>

            {isOpen && (
                <div className="cart-dropdown">
                    <div className="cart-header">
                        <h3>Корзина</h3>
                        <button onClick={() => setIsOpen(false)}>×</button>
                    </div>

                    <div className="cart-items">
                        {cartItems.length === 0 ? (
                            <p>Корзина пуста</p>
                        ) : (
                            cartItems.map(item => <CartItem key={item.id} item={item} /> )
                        )}
                    </div>

                    <div className="cart-footer">
                        <div className="total">Итого: ${totalPrice}</div>
                        <button
                            className="checkout-btn"
                            onClick={handleCheckout}
                            disabled={cartItems.length === 0 || showCheckout}
                        >
                            {showCheckout ? "Оформляем..." : "Оформить заказ"}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

