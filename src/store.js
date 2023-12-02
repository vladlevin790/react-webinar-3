import {generateCode} from "./utils";

/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
  }

  /**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */
  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    }
  }

  /**
   * Выбор состояния
   * @returns {Object}
   */
  getState() {
    return this.state;
  }

  /**
   * Установка состояния
   * @param newState {Object}
   */
  setState(newState) {
    this.state = newState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }

  /**
   * Добавление товара в корзину.
   * @param item
   */

  addToCart(code) {
    const itemInCart = this.state.cart.find((el) => el.code === code);
    const item = this.state.list.find((el) => el.code === code);

    if (itemInCart) {
      this.setState({
        ...this.state,
        cart: this.state.cart.map((el) => (el.code === code ? { ...el, count: el.count + 1 } : el)),
        sumOfItemsInCarts: this.state.sumOfItemsInCarts + itemInCart.price,
      });
    } else if (item) {
      this.setState({
        ...this.state,
        cart: [...this.state.cart, { ...item, count: 1 }],
        sumOfItemsInCarts: this.state.sumOfItemsInCarts + item.price,
        counter: this.state.counter + 1,
      });
    }
  }



  /**
   * Удаление товара из корзины.
   * @param item
   */

  removeFromCart(code) {
    const item = this.state.cart.find((el) => el.code === code);

    if (item) {
      const delCartItem = this.state.cart.filter((el) => el.code !== code);
      const delSumOfItemsInCarts = this.state.sumOfItemsInCarts - item.count * item.price;
      const delCounter = this.state.counter - 1;

      this.setState({
        ...this.state,
        cart: delCartItem,
        sumOfItemsInCarts: delSumOfItemsInCarts,
        counter: delCounter,
      });
    }
  }

}

export default Store;
