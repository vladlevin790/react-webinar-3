import StoreModule from "../module";

class Basket extends StoreModule {
  initState() {
    return {
      list: [],
      sum: 0,
      amount: 0,
    };
  }

  /**
   * Добавление товара в корзину
   * @param _id Код товара
   */
  async addToBasket(_id) {
    let sum = 0;
    let exist = false;

    const list = this.getState().list.map((item) => {
      const updatedItem = item._id === _id ? { ...item, amount: item.amount + 1 } : item;
      exist = exist || updatedItem._id === _id;
      sum += updatedItem.price * updatedItem.amount;
      return updatedItem;
    });

    if (!exist) {
      const item = await this.store.actions.catalog.loadItemData(_id);
      list.push({ ...item, amount: 1 });
      sum += item.price;
    }

    this.setState(
      {
        ...this.getState(),
        list,
        sum,
        amount: list.length,
      },
      'Добавление в корзину'
    );
  }

  /**
   * Удаление товара из корзины
   * @param _id Код товара
   */
  removeFromBasket(_id) {
    const { list } = this.getState();
    const updatedList = list.filter((item) => item._id !== _id);
    const sum = updatedList.reduce((total, item) => total + item.price * item.amount, 0);

    this.setState(
      {
        ...this.getState(),
        list: updatedList,
        sum,
        amount: updatedList.length,
      },
      'Удаление из корзины'
    );
  }
}

export default Basket;
