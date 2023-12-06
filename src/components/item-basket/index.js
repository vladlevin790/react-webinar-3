import { memo } from 'react';
import PropTypes from 'prop-types';
import { numberFormat } from '../../utils';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function ItemBasket({ item, onRemove, onClick }) {
  const cn = bem('ItemBasket');

  const handleClick = () => {
    onClick(item._id);
  };

  const handleRemove = (e) => {
    e.stopPropagation();
    onRemove(item._id);
  };

  return (
    <div className={cn()} onClick={handleClick}>
      <div className={cn('title')}>{item.title}</div>
      <div className={cn('right')}>
        <div className={cn('cell')}>{numberFormat(item.price)} ₽</div>
        <div className={cn('cell')}>{numberFormat(item.amount || 0)} шт</div>
        <div className={cn('cell')}>
          <button onClick={handleRemove}>Удалить</button>
        </div>
      </div>
    </div>
  );
}

ItemBasket.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    price: PropTypes.number,
    amount: PropTypes.number,
  }).isRequired,
  onRemove: PropTypes.func,
  onClick: PropTypes.func,
};

ItemBasket.defaultProps = {
  onRemove: () => {},
  onClick: () => {},
};

export default memo(ItemBasket);
