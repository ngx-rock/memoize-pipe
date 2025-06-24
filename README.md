# Memoize Pipe

[![npm version](https://badge.fury.io/js/@ngx-rock%2Fmemoize-pipe.svg)](https://badge.fury.io/js/@ngx-rock%2Fmemoize-pipe) [![GitHub license](https://img.shields.io/badge/license-MIT-green.svg)](https://github.com/ngx-rock/memoize-pipe/blob/main/LICENSE)

*Memoize Pipe* – a universal `pipe` for memoizing computations in Angular templates.

## Description

In Angular, functions in templates are called on every change detection cycle. 
To minimize redundant computations, it's recommended to use the `pipe` mechanism. 
However, creating separate pipes for one-time use seems excessive.

**Memoize Pipe** solves this problem by providing a universal pipe that automatically caches function results based on their arguments.

### What is memoization?

Memoization is an optimization technique where the results of expensive function calls are cached. When the function is called again with the same arguments, the cached result is returned, significantly improving performance.

## Usage

### Basic Example

Transform a regular function call into an optimized one using the `fn` pipe:

**Before:**
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
    // Expensive computation
    return `${user.name} (${preferences.theme})`;
  }

  calculateTotal(items: CartItem[]): number {
    // Complex calculation logic
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }
}
```

**After:**
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
    // This function will now only be called when arguments change
    return `${user.name} (${preferences.theme})`;
  }

  calculateTotal(items: CartItem[]): number {
    // Recalculation only when the items array changes
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }
}
```

### Preserving Context

For functions that use `this` (component properties), convert them to arrow functions:

```typescript
@Component({
  selector: 'app-context',
  template: `
    <div>{{ processData | fn : inputData }}</div>
  `,
})
export class AppComponent {
  private multiplier = 10;

  // Arrow function preserves the 'this' context
  processData = (data: number[]): number[] => {
    return data.map(item => item * this.multiplier);
  }
}
```

## Installation

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

### Adding to Your Application

**Standalone components (recommended):**
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

**Module-based approach:**
```typescript
import { FnPipe } from "@ngx-rock/memoize-pipe";

@NgModule({
  imports: [FnPipe],
  // ...
})
export class AppModule {}
```

## Benefits

✅ **Easy to use** - minimal code changes required  
✅ **Type safety** - full TypeScript support  
✅ **Performance** - automatic memoization  
✅ **Universal** - works with any functions  
✅ **Standalone** - supports standalone components  

## Important Notes

⚠️ **Pure functions**: For memoization to work correctly, functions should be pure (return the same result for the same arguments)

⚠️ **Reference types**: Memoization works based on reference comparison. For objects and arrays, ensure you create new instances when data changes

⚠️ **Memory**: Function results are cached for the component's lifetime. For components with many unique calls, monitor memory consumption

## Compatibility

| memoize-pipe | Angular   | TypeScript |
|--------------|-----------|------------|
| 0.x.x        | 13.x.x    | ~4.7.x     |
| 1.x.x        | 14.x.x    | ~4.8.x     |
| 2.x.x        | 17.x.x    | ~5.2.x     |
| 18.x.x       | 18.x.x    | ~5.4.x     |
| 19.x.x       | 19.x.x    | ~5.6.x     |
| 20.x.x       | 20.x.x    | ~5.8.x     |

## Frequently Asked Questions

**Q: When should I use the fn pipe?**  
A: Use it for expensive computations in templates, especially for filtering, sorting, and data formatting.

**Q: How does caching work?**  
A: Results are cached based on input arguments. When any argument changes, the function is executed again.

**Q: Can I use it with async functions?**  
A: No, fn pipe is designed only for synchronous functions. For async operations, use the async pipe combined with Observable.

---

**[English](README.md)** | [Русский](README_RU.md)
