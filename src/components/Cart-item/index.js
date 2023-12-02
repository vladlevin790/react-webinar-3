import React from "react";
import PropTypes from "prop-types";
import "./style.css";

function CartItem(props) {
    const callbacks = {
        removeFromCart: () => {
            props.removeFromCart(props.item.code);
        },
    };

    return (
        <div className={"CartItem"}>
            <div className="CartItem-code">{props.item.code}</div>
            <div className="CartItem-title">{props.item.title}</div>
            <div className="CartItem-actions">
                <span className="CartItem-price">{`${props.item.price.toLocaleString('ru-RU')} ₽`}</span>
                <span className="CartItem-count">{`${props.item.count} шт`}</span>
                <button onClick={callbacks.removeFromCart}>Удалить</button>
            </div>
        </div>
    );
}

CartItem.propTypes = {
    item: PropTypes.shape({
        code: PropTypes.number,
        title: PropTypes.string,
        price: PropTypes.number,
        count: PropTypes.number,
    }).isRequired,
    removeFromCart: PropTypes.func,
};

CartItem.defaultProps = {
    removeFromCart: () => {},
};

export default React.memo(CartItem);
