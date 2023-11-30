import React from "react";
import Head from "../head";
import List from "../list";
import PropTypes from "prop-types";
import "./style.css";
import CartItem from "../Cart-item";

const Cart = (props) => {
    return (
        <div className="Cart">
            <Head Header={"Корзина"} setOpenModal={props.setOpenModal} />

            {props.cart.length > 0 ?
                (<List
                    children={props.cart.map((item) => (
                        <CartItem item={item} removeFromCart={props.removeFromCart}/>
                    ))}
                />) :
                (<div></div>)
            }

            <div className="Cart-money">
                <div className="Cart-sum">
                    <span>Итого</span>
                    <span className="Cart-final-sum">{`${props.sumOfItemsInCarts} ₽`}</span>
                </div>
            </div>
        </div>
    );
};

Cart.propTypes = {
    cart: PropTypes.arrayOf(
        PropTypes.shape({
            code: PropTypes.number,
            count: PropTypes.number,
        })
    ).isRequired,
    setOpenModal: PropTypes.func,
    sumOfItemsInCarts: PropTypes.number,
    removeFromCart: PropTypes.func,
};

Cart.defaultProps = {
    removeFromCart: () => {},
    setOpenModal: () => {},
};

export default React.memo(Cart);
