# Angular Memoize Pipe - `fn` pipe для производительности шаблонов

[![clone-alert](https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/ngx-rock/memoize-pipe/main/clone-alert-badge.json)](https://github.com/BaryshevRS/clone-alert)
[![npm version](https://badge.fury.io/js/@ngx-rock%2Fmemoize-pipe.svg)](https://badge.fury.io/js/@ngx-rock%2Fmemoize-pipe)


> English README is the source of truth. This file is a Russian translation.

`@ngx-rock/memoize-pipe` - маленький standalone Angular pipe для вызова функций из шаблонов без повторного выполнения на каждом проходе change detection.

Пакет предоставляет один pipe, `fn`. Он позволяет Angular обрабатывать вызов функции в шаблоне как pure pipe binding. Если ссылка на функцию и аргументы не изменились, Angular сохраняет предыдущий результат pipe и не вызывает функцию повторно.

## Кратко

- Package: `@ngx-rock/memoize-pipe`
- Export: `FnPipe`
- Template syntax: `{{ myFunction | fn : arg1 : arg2 }}`
- Purpose: avoid repeated synchronous function calls in Angular templates when inputs are unchanged
- Mechanism: Angular pure pipe change detection, not a custom global memoization cache
- Best for: formatting, filtering, sorting, totals, and derived display values
- Not for: async functions, side effects, hidden mutable state, or deep equality

Типовые поисковые запросы, на которые отвечает этот пакет:

- Angular function in template performance
- avoid calling method in Angular template
- memoize Angular template function
- Angular pure pipe for function calls
- optimize Angular change detection in templates

## Установка

```bash
npm install @ngx-rock/memoize-pipe
```

```bash
pnpm add @ngx-rock/memoize-pipe
```

```bash
yarn add @ngx-rock/memoize-pipe
```

## Быстрый старт

Импортируйте `FnPipe` в standalone component и передайте функцию в pipe `fn`.

```typescript
import { Component } from '@angular/core';
import { FnPipe } from '@ngx-rock/memoize-pipe';

@Component({
  selector: 'app-total',
  standalone: true,
  imports: [FnPipe],
  template: `
    <strong>{{ calculateTotal | fn : items }}</strong>
  `
})
export class TotalComponent {
  items = [
    { price: 20, quantity: 2 },
    { price: 15, quantity: 1 }
  ];

  calculateTotal = (items: Array<{ price: number; quantity: number }>): number => {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };
}
```

## До И После

Без pipe Angular может вызывать метод из шаблона на каждом цикле change detection:

```typescript
@Component({
  selector: 'app-user',
  template: `
    <div>{{ formatUser(user, preferences) }}</div>
  `
})
export class UserComponent {
  formatUser(user: User, preferences: UserPreferences): string {
    return `${user.name} (${preferences.theme})`;
  }
}
```

С `fn` функция вызывается снова только когда меняется ссылка на функцию или один из аргументов pipe:

```typescript
import { FnPipe } from '@ngx-rock/memoize-pipe';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [FnPipe],
  template: `
    <div>{{ formatUser | fn : user : preferences }}</div>
  `
})
export class UserComponent {
  formatUser = (user: User, preferences: UserPreferences): string => {
    return `${user.name} (${preferences.theme})`;
  };
}
```

## Что Делает Pipe

`FnPipe` помогает с дорогими синхронными вычислениями в Angular templates:

- форматирование значений из нескольких входов
- расчет total/sum
- сортировка или фильтрация уже загруженных массивов
- подготовка view model для отображения
- уменьшение повторных вызовов методов во время change detection

Пакет специально маленький. Он экспортирует standalone Angular pipe с именем `fn`.

## Как Это Работает

`FnPipe` использует поведение Angular pure pipe.

Angular pipes по умолчанию pure. Для pure pipe binding Angular вызывает `transform` только когда изменился один из входов. Это значит:

- primitive arguments сравниваются по значению
- objects и arrays сравниваются по ссылке
- сама функция тоже является входом, поэтому ее ссылка должна быть стабильной
- глобального кеша и deep equality нет

Поэтому лучше использовать arrow function properties. Они сохраняют стабильную ссылку на функцию и контекст `this`.

```typescript
export class ExampleComponent {
  multiplier = 10;

  multiplyItems = (items: number[]): number[] => {
    return items.map(item => item * this.multiplier);
  };
}
```

```html
{{ multiplyItems | fn : items }}
```

## Больше Примеров

### Несколько Аргументов

```typescript
formatPrice = (amount: number, currency: string, locale: string): string => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency
  }).format(amount);
};
```

```html
{{ formatPrice | fn : total : 'USD' : 'en-US' }}
```

### Фильтрация Списка

```typescript
filterUsers = (users: User[], query: string): User[] => {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) {
    return users;
  }

  return users.filter(user => user.name.toLowerCase().includes(normalizedQuery));
};
```

```html
@for (user of filterUsers | fn : users : searchQuery; track user.id) {
  <span>{{ user.name }}</span>
}
```

Создавайте новый массив `users`, когда список меняется. Мутация того же массива на месте не запустит пересчет pure pipe.

### Подготовка Display Data

```typescript
toUserLabel = (user: User, roleNames: Record<string, string>): string => {
  return `${user.name} - ${roleNames[user.role] ?? 'Unknown role'}`;
};
```

```html
{{ toUserLabel | fn : user : roleNames }}
```

### Использование С Module-Based Angular Apps

```typescript
import { NgModule } from '@angular/core';
import { FnPipe } from '@ngx-rock/memoize-pipe';

@NgModule({
  imports: [FnPipe]
})
export class AppModule {}
```

## Когда Использовать

Используйте `fn`, когда:

- функция синхронная
- функция pure для одинаковых входов
- вычисление достаточно дорогое, чтобы это имело смысл
- аргументы обновляются иммутабельно или имеют стабильные ссылки
- отдельный custom pipe был бы лишним

## Когда Не Использовать

Не используйте `fn`, когда:

- функция имеет side effects
- функция зависит от скрытого mutable state
- функция возвращает разные результаты для одинаковых входов
- операция асинхронная
- отдельный domain pipe сделает шаблон понятнее

Для асинхронной работы используйте Angular `async` pipe с `Observable`, `Promise` или signal-based state.

## Заметки

### Стабильные Ссылки На Функции

Предпочитайте arrow function properties:

```typescript
formatName = (user: User): string => {
  return `${user.firstName} ${user.lastName}`;
};
```

Не создавайте функции inline в template и не возвращайте новую функцию из getter.

### Ссылочные Типы

Objects и arrays сравниваются по ссылке. Если объект или массив изменился, создайте новый instance:

```typescript
this.items = [...this.items, newItem];
```

Избегайте in-place mutation, если ожидаете пересчет pipe:

```typescript
this.items.push(newItem);
```

## FAQ

**Этот pipe реализует собственный memoization cache?**  
Нет. Он использует Angular pure pipe caching для текущего binding. Angular пропускает вызов pipe, пока ссылка на функцию и аргументы не изменились.

**Можно использовать с async functions?**  
Нет. `fn` предназначен для синхронных функций. Для async values используйте Angular `async` pipe.

**Есть deep equality для objects и arrays?**  
Нет. Angular pure pipes используют reference checks для objects и arrays.

**Он tree-shakable?**  
Да. У пакета нет side effects, и он экспортирует standalone pipe.

---

[English](README.md) | **[Русский](README_RU.md)**
