/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
    this.uniqueCode = this.nextCode(initState.list);
  }

  //Вычисляю следующий "код"
  nextCode(list) {
    return list.reduce((maxCode, item) => Math.max(maxCode, item.code), 0) + 1;
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
   * Добавление новой записи (Внёс правки в добавление записи, чтобы оно добавлялось сразу с свойством count и значением выделения(selected))
   */
  addItem() {
    const newItem = {
      code: this.generateUniqueCode(),
      title: 'Новая запись',
      selected: false,
      count: 0
    };

    this.setState({
      ...this.state,
      list: [...this.state.list, newItem]
    });
  }

  //генерирую уникальный код
  generateUniqueCode() {
    const code = this.uniqueCode;
    this.uniqueCode++;
    return code;
  }

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.filter(item => item.code !== code)
    })
  };

  /**
   * Выделение записи по коду
   * @param code
   */
  selectItem(code) {

    this.setState({

      list: this.state.list.map(item => {

        return {
          ...item,
          selected: item.code === code ? !item.selected : false,
          count: item.code === code && !item.selected ? item.count + 1 : item.count
        };

      })
    });
  }

}

export default Store;
