import { Pipe, PipeTransform } from '@angular/core';

/**
 * Transforms the given function by applying the provided arguments and returning the result.
 *
 * @param {T} func - The function to be transformed.
 * @param {...any[]} args - The arguments to be applied to the function.
 * @return {ReturnType<T>} The result of applying the function with the provided arguments.
 */
@Pipe({
  name: 'fn',
  standalone: true
})
export class FnPipe implements PipeTransform {
  transform<T extends (...args: any[]) => any>(func: T, ...args: Parameters<T>): ReturnType<T> {
    return func(...args);
  }
}
