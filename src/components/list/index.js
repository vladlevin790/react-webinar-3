import React, { Children } from "react";
import PropTypes from "prop-types";
import "./style.css";

function List(props) {
  const { children } = props;

  return (
      <div className="List">
        {Children.toArray(children).map((child, index) => (
            <div key={index} className="List-item">
              {child}
            </div>
        ))}
      </div>
  );
}

List.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node),
};

List.defaultProps = {
  children: [],
};

export default React.memo(List);
