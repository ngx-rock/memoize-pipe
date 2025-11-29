# Memoize Pipe

[![npm version](https://badge.fury.io/js/@ngx-rock%2Fmemoize-pipe.svg)](https://badge.fury.io/js/@ngx-rock%2Fmemoize-pipe) [![GitHub license](https://img.shields.io/badge/license-MIT-green.svg)](https://github.com/ngx-rock/memoize-pipe/blob/main/LICENSE)

*Memoize Pipe* – универсальный `pipe` для мемоизации вычислений в Angular шаблонах.

## Описание

В Angular функции в шаблонах вызываются на каждом цикле проверки изменений (change detection). 
Чтобы минимизировать избыточные вычисления, рекомендуется использовать механизм `pipe`. 
Однако создание отдельных пайпов для единичного использования выглядит избыточно.

**Memoize Pipe** решает эту проблему, предоставляя универсальный пайп, который автоматически кеширует результаты функций на основе их аргументов.

### Что такое мемоизация?

Мемоизация — это техника оптимизации, при которой результаты дорогостоящих вычислений сохраняются в кеше. При повторном вызове функции с теми же аргументами возвращается сохранённый результат, что значительно повышает производительность.

## Использование

### Базовый пример

Преобразуем обычный вызов функции в оптимизированный с помощью `fn` пайпа:

**До:**
```typescript
@Component({
  selector: 'app-example',
  template: `
    <div>{{ formatUserData(user, preferences) }}</div>
    <div>{{ calculateTotal(items) }}</div>
  `,
})
export class AppComponent {
  formatUserData(user: User, preferences: UserPreferences): string {
    // Дорогостоящее вычисление
    return `${user.name} (${preferences.theme})`;
  }

  calculateTotal(items: CartItem[]): number {
    // Сложная логика расчёта
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }
}
```

**После:**
```typescript
@Component({
  selector: 'app-example',
  template: `
    <div>{{ formatUserData | fn : user : preferences }}</div>
    <div>{{ calculateTotal | fn : items }}</div>
  `,
})
export class AppComponent {
  formatUserData(user: User, preferences: UserPreferences): string {
    // Эта функция теперь будет вызвана только при изменении аргументов
    return `${user.name} (${preferences.theme})`;
  }

  calculateTotal(items: CartItem[]): number {
    // Пересчёт только при изменении массива items
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }
}
```

### Сохранение контекста

Для функций, которые используют `this` (свойства компонента), преобразуйте их в стрелочные функции:

```typescript
@Component({
  selector: 'app-context',
  template: `
    <div>{{ processData | fn : inputData }}</div>
  `,
})
export class AppComponent {
  private multiplier = 10;

  // Стрелочная функция сохраняет контекст this
  processData = (data: number[]): number[] => {
    return data.map(item => item * this.multiplier);
  }
}
```

## Установка

### npm
```bash
npm install @ngx-rock/memoize-pipe
```

### pnpm
```bash
pnpm add @ngx-rock/memoize-pipe
```

### yarn
```bash
yarn add @ngx-rock/memoize-pipe
```

### Подключение в приложении

**Standalone компоненты (рекомендуется):**
```typescript
import { FnPipe } from "@ngx-rock/memoize-pipe";

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [FnPipe, CommonModule],
  template: `{{ myFunction | fn : arg1 : arg2 }}`
})
export class ExampleComponent {}
```

**Модульный подход:**
```typescript
import { FnPipe } from "@ngx-rock/memoize-pipe";

@NgModule({
  imports: [FnPipe],
  // ...
})
export class AppModule {}
```

## Преимущества

✅ **Простота использования** - минимальные изменения в коде  
✅ **Типобезопасность** - полная поддержка TypeScript  
✅ **Производительность** - автоматическая мемоизация  
✅ **Универсальность** - работает с любыми функциями  
✅ **Standalone** - поддержка автономных компонентов  

## Важные замечания

⚠️ **Чистые функции**: Для корректной работы мемоизации функции должны быть чистыми (возвращать одинаковый результат для одинаковых аргументов)

⚠️ **Ссылочные типы**: Мемоизация работает на основе сравнения ссылок. Для объектов и массивов убедитесь, что вы создаёте новые экземпляры при изменении данных

⚠️ **Память**: Результаты функций кешируются на время жизни компонента. Для компонентов с большим количеством уникальных вызовов следите за потреблением памяти

## Совместимость

| memoize-pipe | Angular   | TypeScript |
|--------------|-----------|------------|
| 0.x.x        | 13.x.x    | ~4.7.x     |
| 1.x.x        | 14.x.x    | ~4.8.x     |
| 2.x.x        | 17.x.x    | ~5.2.x     |
| 18.x.x       | 18.x.x    | ~5.4.x     |
| 19.x.x       | 19.x.x    | ~5.6.x     |
| 20.x.x       | 20.x.x    | ~5.8.x     |
| 21.x.x       | 21.x.x    | ~5.9.x     |

## Часто задаваемые вопросы

**Q: Когда стоит использовать fn pipe?**  
A: Используйте для дорогостоящих вычислений в шаблонах, особенно для фильтрации, сортировки, форматирования данных.

**Q: Как работает кеширование?**  
A: Результаты кешируются на основе входных аргументов. При изменении любого аргумента функция выполняется заново.

**Q: Можно ли использовать с асинхронными функциями?**  
A: Нет, fn pipe предназначен только для синхронных функций. Для асинхронных операций используйте async pipe в сочетании с Observable.

---

[English](README.md) | **[Русский](README_RU.md)**
