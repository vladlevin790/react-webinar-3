/**
 * Плюрализация
 * Возвращает вариант с учётом правил множественного числа под указанную локаль
 * @param value {Number} Число, под которое выбирается вариант формы.
 * @param variants {Object<String>} Варианты форм множественного числа.
 * @example plural(5, {one: 'товар', few: 'товара', many: 'товаров'})
 * @param [locale] {String} Локаль (код языка)
 * @returns {String}
 */
export function plural(value, variants = {}, locale = 'ru-RU') {
  // Получаем фурму кодовой строкой: 'zero', 'one', 'two', 'few', 'many', 'other'
  // В русском языке 3 формы: 'one', 'few', 'many', и 'other' для дробных
  // В английском 2 формы: 'one', 'other'
  const key = new Intl.PluralRules(locale).select(value);
  // Возвращаем вариант по ключу, если он есть
  return variants[key] || '';
}

/**
 * Генератор чисел с шагом 1
 * @returns {Function}
 */
export function codeGenerator(start = 0) {
  return () => ++start;
}

/**
 * Форматирование разрядов числа
 * @param value {Number}
 * @param options {Object}
 * @returns {String}
 */
export function numberFormat(value, locale = 'ru-RU', options = {}) {
  return new Intl.NumberFormat(locale, options).format(value);
}

/* 
[1,2,3,...,10]
[1,2,3,4...,10]
[1,...,3,4,5,...,10]
[1,...,7,8,9,10]
[1,...,8,9,10]
*/
export function generatePagesList(curr, max) {
  if (!curr || !max) return [];
  let currPageIndex;
  let pages;
  if (max <= 7) {
    for (let i = 1; i <= max; i++) {
      pages.push(i);
      return { pages, currPageIndex: curr - 1 };
    }
  } else {

    if (curr < 3) {
      pages = [1, 2, 3, '...', max];
      currPageIndex = curr
    }
    if (curr === 3) {
      pages = [1, 2, 3, 4, '...', max];
      currPageIndex = 3
    }
    if (curr > 3 && curr < max - 2) {
      pages = [1, '...', curr - 1, curr, curr + 1, '...', max];
      currPageIndex = 4
    }
    if (curr === max - 2) {
      pages = [1, '...', curr - 1, curr, curr + 1, max];
      currPageIndex = 4
    }
    if (curr > max - 2) {
      pages = [1, '...', max - 2, max - 1, max];
      currPageIndex = 5 - (max - curr)
    }
    currPageIndex -= 1;
  }
  return { pages, currPageIndex }
}
