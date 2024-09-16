# Memoize Pipe
 
[![npm version](https://badge.fury.io/js/@ngx-rock%2Fmemoize-pipe.svg)](https://badge.fury.io/js/@ngx-rock%2Fmemoize-pipe) [![GitHub license](https://img.shields.io/badge/license-MIT-green.svg)](https://github.com/ngx-rock/memoize-pipe/blob/main/LICENSE)

*Memoize Pipe* – a universal, strictly typed pipe for memoizing computations in Angular templates.

## About

In Angular, functions are called in templates on each change detection cycle. To minimize computational overhead, it is recommended to use the pipe mechanism. However, creating pipes just for one or two use cases seems excessive.
This project aims to solve this problem.

## Usage

Convert the function call to `pipe`:

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

We import pipe `fn` from the library and insert it into the template. 
Function arguments are passed as usual parameters.

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

### Saving the context

It isn't always possible for a function in a component to be pure and independent of external arguments.
To save the `this` you should convert the function into arrow format.

```
  @Component(...)
  export class AppComponent {
    heavyComputation = (name: string, index: number) => {
      ... very heavy computation
    }
  }
```

## Installation

Install `memoize-pipe` from npm:

```
  npm i @ngx-rock/memoize-pipe
```

Support for standalone modules starting from version 14.x.x:

```
  import { FnPipe } from "@ngx-rock/memoize-pipe";

  @Component({
    ...
    standalone: true,
    imports: [ FnPipe,... ]
    ...
  })
```

## Compatibility

| memoize-pipe | Angular   |
|--------------|-----------|
| 0.x.x        | => 13.x.x |
| 1.x.x        | => 14.x.x |
| 2.x.x        | => 17.x.x |
| 18.x.x       | => 18.x.x |
---

**[English](README.md)** | [Русский](README_RU.md)
