import React from 'react';
import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';
import './index.css';

export default function Products({ data, onAddItem }) {
  const cn = bem('products');

  return (
    <div className={cn()}>
      <p className={cn('description')}>{data.description}</p>
      <p className={cn('country')}>
        Страна производитель: <span className={cn('country-value')}>{data.country}</span>
      </p>
      <p className={cn('category')}>
        Категория: <span className={cn('category-value')}>{data.category}</span>
      </p>
      <p className={cn('year')}>
        Год выпуска: <span className={cn('year-value')}>{data.year}</span>
      </p>
      <p className={cn('price')}>
        Цена: <span className={cn('price-value')}>{data.price}</span>
      </p>
      <button className={cn('button')} onClick={onAddItem}>
        Добавить
      </button>
    </div>
  );
}

Products.propTypes = {
  data: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    price: PropTypes.number,
    description: PropTypes.string,
    country: PropTypes.string,
    category: PropTypes.string,
    year: PropTypes.number,
  }),
  onAddItem: PropTypes.func.isRequired,
};
