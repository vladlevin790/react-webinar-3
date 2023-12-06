import { codeGenerator } from "../../utils";
import StoreModule from "../module";

class Catalog extends StoreModule {
  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0);
  }

  initState() {
    return {
      list: [],
      count: 0,
    };
  }

  load(pageNum = 1) {
    return fetch(`/api/v1/articles?limit=10&skip=${10 * (pageNum - 1)}&fields=items(_id, title, price),count`)
      .then((response) => response.json())
      .then((json) => {
        this.setState(
          {
            ...this.getState(),
            list: json.result.items,
            count: json.result.count,
          },
          'Загружены товары из АПИ'
        );
      });
  }

  loadItemData(_id) {
    if (!_id) {
      return Promise.resolve({});
    }

    return fetch(`/api/v1/articles/${_id}?fields=*,madeIn(title,code),category(title)`)
      .then((response) => response.json())
      .then((json) => ({
        _id,
        description: json.result.description,
        title: json.result.title,
        country: json.result.madeIn.title,
        category: json.result.category.title,
        year: json.result.edition,
        price: json.result.price,
      }))
      .catch((error) => {
        console.error("Error loading item data:", error);
        return {};
      });
  }
}

export default Catalog;
