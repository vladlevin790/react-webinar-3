import React, {useCallback, useState} from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Modal from "./components/modal";
import Cart from "./components/Cart";
import Item from "./components/item";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */

function App({store}) {
    const [openModal, setOpenModal] = useState(false);
    const list = store.getState().list;
    const cart = store.getState().cart;
    const sumOfItemsInCarts = store.getState().sumOfItemsInCarts;
    const counter = store.getState().counter;

    const callbacks = {
      addItemToCart: useCallback(
        (code) => {
          store.addToCart(code);
        },
        [cart]
      ),
      removeFromCart: useCallback(
            (code) => {
                store.removeFromCart(code);
            },
            [cart]
        ),
    };

    return (
        <PageLayout>
            <Head title="Магазин" />
            <Controls
                caption={"Перейти"}
                title={"В корзине:"}
                setOpenModal={setOpenModal}
                counter={counter}
                sumOfItemsInCarts={sumOfItemsInCarts}
            />
            <List
                children={list.map((item) => (
                    <Item item={item} addItemToCart={callbacks.addItemToCart} />
                ))}
            />
            {openModal && (
                <Modal
                    children={
                        <Cart
                            cart={cart}
                            setOpenModal={setOpenModal}
                            sumOfItemsInCarts={sumOfItemsInCarts}
                            removeFromCart={callbacks.removeFromCart}
                        />
                    }
                />
            )}
        </PageLayout>
    );
}

export default App;
