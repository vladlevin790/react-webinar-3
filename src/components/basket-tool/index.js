import { memo } from "react";
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat, plural } from "../../utils";
import './style.css';
import { NavLink } from "react-router-dom";

function BasketTool({ sum, amount, onOpen }) {
  const cn = bem('BasketTool');

  const renderBasketContent = () => {
    if (amount) {
      const itemsLabel = plural(amount, { one: 'товар', few: 'товара', many: 'товаров' });
      const formattedSum = numberFormat(sum);
      return `${amount} ${itemsLabel} / ${formattedSum} ₽`;
    } else {
      return 'пусто';
    }
  };

  return (
    <div className={cn()}>
      <NavLink to="/" className={cn('link')}>Главная</NavLink>
      <span className={cn('label')}>В корзине:</span>
      <span className={cn('total')}>
        {renderBasketContent()}
      </span>
      <button onClick={onOpen}>Перейти</button>
    </div>
  );
}

BasketTool.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number
};

BasketTool.defaultProps = {
  onOpen: () => {},
  sum: 0,
  amount: 0
};

export default memo(BasketTool);
