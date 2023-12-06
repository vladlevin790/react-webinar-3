import React, { memo, useCallback, useEffect } from 'react';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import Products from '../../components/products';
import { useLoaderData, useNavigate } from 'react-router-dom';
import Basket from '../basket';

function Product() {
  const navigate = useNavigate();
  const { data, store } = useLoaderData();
  const activeModal = useSelector((state) => state.modals.name);

  useEffect(() => {
    document.title = `Simple SPA: ${data.title}`;
  }, [data.title]);

  const addToBasket = useCallback(() => store.actions.basket.addToBasket(data._id), [store, data._id]);
  const openModalBasket = useCallback(() => store.actions.modals.open('basket'), [store]);

  const navigateToProduct = useCallback((_id) => {
    navigate(`/products/${_id}`);
  }, [navigate]);

  const select = useSelector((state) => ({
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  return (
    <>
      <PageLayout>
        <Head title={data.title} />
        <BasketTool onOpen={openModalBasket} amount={select.amount} sum={select.sum} />
        <Products data={data} onAddItem={addToBasket} />
      </PageLayout>
      {activeModal === 'basket' && <Basket navigate={navigateToProduct} />}
    </>
  );
}

export default memo(Product);
