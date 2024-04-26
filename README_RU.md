# Memoize Pipe
 
[![npm version](https://badge.fury.io/js/@ngx-rock%2Fmemoize-pipe.svg)](https://badge.fury.io/js/@ngx-rock%2Fmemoize-pipe)

*Memoize Pipe* – универсальный, строго типизированный `pipe` для мемоизации вычислений в шаблоне.

**Описание**

В Angular вызывают функции в шаблоне на каждый обход проверки изменений. 
Чтобы минимизировать вычисления функция, рекомендуется использовать механизм `pipe`. 
Но создавать их ради только для одного-двух применений выглядит избыточно.

Этот проект призван решить эту проблему.

## Как использовать

Преобразуем вызов функции в `pipe`:

```
  @Component({
    ...
    template: `
      {{ heavyComputation(person, index) }}
    `,
  })
  export class AppComponent {
    heavyComputation(name: string, index: number) {
      ... very heavy computation
    }
  }
```

Импортируем из библиотеки pipe `fn` и вставляем в шаблон, аргументы функции передаём, как обычные параметры.

```
  @Component({
    ...
    template: `
      {{ heavyComputation | fn : person : index }}
    `,
  })
  export class AppComponent {
    heavyComputation(name: string, index: number) {
      ... very heavy computation
    }
  }
```

С минимальными изменения достигаем значительную оптимизацию производительности.

### Сохранение контекста

Не всегда функция в компоненте может быть чистой и не зависеть от внешних аргументов.
Для сохранения контекста `this` надо преобразовать функцию в стрелочный формат.

```
  @Component(...)
  export class AppComponent {
    heavyComputation = (name: string, index: number) => {
      ... very heavy computation
    }
  }
```

## Установка

Устанавливаем `memoize-pipe` из npm:

```
  npm i @ngx-rock/memoize-pipe
```

И импортируем модуль:

```
  import { FnPipe } from "@ngx-rock/memoize-pipe";

  @NgModule({
    ...
    imports: [ FnPipe,... ]
    ...
  })
```

### Совместимость

| memoize-pipe | Angular   |
|--------------|-----------|
| 0.1.x        | => 13.x.x |
| 0.2.x        | => 14.x.x |

---

[English](README.md) **[Русский](README_RU.md)**
