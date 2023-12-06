import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat } from '../../utils';
import { useNavigate } from 'react-router-dom';
import './style.css';

function Item({ item, onAdd, onClick }) {
  const cn = bem('Item');

  const handleAdd = (e) => {
    e.stopPropagation();
    onAdd(item._id);
  };

  return (
    <div className={cn()} onClick={() => onClick(item._id)}>
      <div className={cn('title')}>{item.title}</div>
      <div className={cn('actions')}>
        <div className={cn('price')}>{numberFormat(item.price)} ₽</div>
        <button onClick={handleAdd}>Добавить</button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
  onAdd: PropTypes.func,
  onClick: PropTypes.func,
};

Item.defaultProps = {
  onAdd: () => {},
  onClick: () => {},
};

export default memo(Item);
