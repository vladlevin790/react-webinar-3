import React, { useCallback } from 'react';
import { memo } from 'react';
import ItemBasket from '../../components/item-basket';
import List from '../../components/list';
import ModalLayout from '../../components/modal-layout';
import BasketTotal from '../../components/basket-total';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';

function Basket(props) {
  const store = useStore();

  const select = useSelector((state) => ({
    list: state.basket.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  const removeFromBasket = useCallback((_id) => store.actions.basket.removeFromBasket(_id), [store]);
  const closeModal = useCallback(() => store.actions.modals.close(), [store]);

  const navigate = useCallback(
    (_id) => {
      store.actions.modals.close();
      props.navigate(_id);
    },
    [store, props.navigate]
  );

  const renderBasketItem = useCallback(
    (item) => <ItemBasket item={item} onRemove={removeFromBasket} onClick={navigate} />,
    [removeFromBasket, navigate]
  );

  return (
    <ModalLayout title="Корзина" onClose={closeModal}>
      <List list={select.list} renderItem={renderBasketItem} />
      <BasketTotal sum={select.sum} />
    </ModalLayout>
  );
}

export default memo(Basket);
