import React, { memo, useCallback, useEffect } from 'react';
import Item from '../../components/item';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import List from '../../components/list';
import useSelector from '../../store/use-selector';
import Pagination from '../../components/pagination';
import { useLoaderData, useNavigate } from 'react-router-dom';
import Basket from '../basket';

function Main() {
  const navigate = useNavigate();
  const activeModal = useSelector((state) => state.modals.name);

  const loaderData = useLoaderData();
  const page = Number(loaderData.page) || 1;
  const store = loaderData.store;

  useEffect(() => {
    store.actions.catalog.load(page);
  }, [store, page]);

  const select = useSelector((state) => ({
    list: state.catalog.list,
    count: state.catalog.count,
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  const addToBasket = useCallback((_id) => store.actions.basket.addToBasket(_id), [store]);
  const openModalBasket = useCallback(() => store.actions.modals.open('basket'), [store]);

  const renderItem = useCallback(
    (item) => <Item item={item} onAdd={addToBasket} onClick={navigateToProduct} />,
    [addToBasket, navigateToProduct]
  );

  const navigateToProduct = useCallback((_id) => {
    navigate(`/products/${_id}`);
  }, [navigate]);

  return (
    <>
      <PageLayout>
        <Head title="Магазин" />
        <BasketTool onOpen={openModalBasket} amount={select.amount} sum={select.sum} />
        <List list={select.list} renderItem={renderItem} />
        <Pagination totalPages={Math.ceil(Number(select.count) / 10)} currentPage={page} />
      </PageLayout>
      {activeModal === 'basket' && <Basket navigate={navigateToProduct} />}
    </>
  );
}

export default memo(Main);
