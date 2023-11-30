import React from "react";
import "./style.css";
import PropTypes from "prop-types";

const Modal = ({ children }) => {
    return (
        <div className="Modal">
            <div className="Modal-items">
                {children}
            </div>
        </div>
    );
};

Modal.propTypes = {
    children: PropTypes.node,
};

export default React.memo(Modal);
