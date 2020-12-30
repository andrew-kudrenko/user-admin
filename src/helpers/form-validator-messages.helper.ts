export const messages = {
  incorrect: 'Некорректное значение',
  required: 'Это поле обязательно к заполнению',
  lessThan: (value: number) => `Не более ${value} символов`,
  greaterThan: (value: number) => `Не менее ${value} символов`,
}
