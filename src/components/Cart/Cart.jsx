import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
    clearCart,
    removeFromCart,
    selectCartCount,
    selectCartItems,
    selectTotalPrice,
    updateQuantity
} from "../../store/cart";

export function Cart() {
    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems);
    const cartCount = useSelector(selectCartCount);
    const totalPrice = useSelector(selectTotalPrice);

    const [isOpen, setIsOpen] = useState(false);
    const [showCheckout, setShowCheckout] = useState(false);

    const handleRemoveItem = (id) => {
        dispatch(removeFromCart(id));
    };

    const handleUpdateQuantity = (id, quantity) => {
        if (quantity <= 0) {
            dispatch(removeFromCart(id));
        } else {
            dispatch(updateQuantity({ id, quantity }));
        }
    };

    const handleCheckout = () => {
        setShowCheckout(true);
        setTimeout(() => {
            alert('Заказ оформлен!');
            dispatch(clearCart());
            setShowCheckout(false);
            setIsOpen(false);
        }, 1000);
    };

    return (
        <div className="cart">
            <button className="cart-toggle" onClick={() => setIsOpen(!isOpen)}>
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
                            cartItems.map(item => (
                                <div key={item.id} className="cart-item">
                                    <img src={item.image} alt={item.name} />
                                    <div className="item-details">
                                        <h4>{item.name}</h4>
                                        <p>${item.price}</p>
                                        <div className="quantity-controls">
                                            <button onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}>
                                                –
                                            </button>
                                            <span>{item.quantity}</span>
                                            <button onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}>
                                                +
                                            </button>
                                        </div>
                                    </div>
                                    <button className="remove-btn" onClick={() => handleRemoveItem(item.id)}>
                                        Удалить
                                    </button>
                                </div>
                            ))
                        )}
                    </div>

                    <div className="cart-footer">
                        <div className="total">Итого: ${totalPrice}</div>
                        <button
                            className="checkout-btn"
                            onClick={handleCheckout}
                            disabled={cartItems.length === 0 || showCheckout}
                        >
                            {showCheckout ? 'Оформляем...' : 'Оформить заказ'}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

