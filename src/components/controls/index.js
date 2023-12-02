import React from "react";
import PropTypes from "prop-types";
import "./style.css";
import { plural } from "../../utils";

function Controls(props) {
  return (
    <div className="Controls">
      <span>{props.title}</span>
      <span className="Controls-cart">
        {props.counter > 0
          ? `${props.counter} ${plural(props.counter, {
              one: "товар",
              few: "товара",
              many: "товаров",
            })} / ${props.sumOfItemsInCarts.toLocaleString('ru-RU')} ₽`
          : "пусто"}
      </span>
      <button onClick={() => props.setOpenModal(true)}>{props.caption}</button>
    </div>
  );
}

Controls.propTypes = {
  title: PropTypes.string,
  counter:PropTypes.number,
  sumOfItemsInCarts:PropTypes.number,
  setOpenModal: PropTypes.func,
};

Controls.defaultProps = {
    setOpenModal: () => {},
};

export default React.memo(Controls);
