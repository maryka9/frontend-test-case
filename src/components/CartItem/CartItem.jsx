import React from "react";
import {removeFromCart, updateQuantity} from "@store/cart";
import {useDispatch} from "react-redux";

import PropTypes from "prop-types";

import "./CartItem.css";

export const CartItem = ({item}) => {
    const dispatch = useDispatch();

    const handleUpdateQuantity = (id, quantity) => {
        if (quantity <= 0) {
            dispatch(removeFromCart(id));
        } else {
            dispatch(updateQuantity({ id, quantity }));
        }
    };

    const handleRemoveItem = (id) => {
        dispatch(removeFromCart(id));
    };

    return (
        <div className="cart-item">
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
    )
}

CartItem.PropTypes = {
    item: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        quantity: PropTypes.number.isRequired,
    })
}