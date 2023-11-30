import React from "react";
import PropTypes from "prop-types";
import "./style.css";

function Item(props) {
  const callbacks = {
      addItemToCart: () => {
      props.addItemToCart(props.item);
    },
  };

  return (
      <div className={"Item"}>
            <div className="Item-code">{props.item.code}</div>
            <div className="Item-title">{props.item.title}</div>
            <div className="Item-actions">
                <span className="Item-price">{`${props.item.price} ₽`}</span>
                <button onClick={callbacks.addItemToCart}>Добавить</button>
            </div>
      </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
    addItemToCart: PropTypes.func,
};

Item.defaultProps = {
  addItemToCart: () => {},
};

export default React.memo(Item);
