import { TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { vi } from 'vitest';
import { FnPipe } from './fn.pipe';

@Component({
  standalone: true,
  imports: [FnPipe],
  template: `{{ compute | fn : value }}`
})
class FnPipeHostComponent {
  value = 21;

  compute = vi.fn((value: number): number => value * 2);
}

describe('FnPipe', () => {
  let pipe: FnPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FnPipe]
    });
    pipe = TestBed.inject(FnPipe);
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should call a function with no arguments', () => {
    const mockFunc = vi.fn().mockReturnValue(42);
    const result = pipe.transform(mockFunc);

    expect(mockFunc).toHaveBeenCalled();
    expect(result).toBe(42);
  });

  it('should call a function with single argument', () => {
    const mockFunc = vi.fn().mockReturnValue('hello');
    const result = pipe.transform(mockFunc, 'world');

    expect(mockFunc).toHaveBeenCalledWith('world');
    expect(result).toBe('hello');
  });

  it('should call a function with multiple arguments', () => {
    const mockFunc = vi.fn().mockReturnValue(10);
    const result = pipe.transform(mockFunc, 5, 2);

    expect(mockFunc).toHaveBeenCalledWith(5, 2);
    expect(result).toBe(10);
  });

  it('should preserve the return type of the original function', () => {
    // Example with different return types
    const stringFunc = (x: string) => `Hello ${x}`;
    const numberFunc = (a: number, b: number) => a + b;

    const stringResult = pipe.transform(stringFunc, 'world');
    const numberResult = pipe.transform(numberFunc, 5, 3);

    expect(stringResult).toBe('Hello world');
    expect(numberResult).toBe(8);
  });

  it('should not call the template function again when pipe inputs stay unchanged', () => {
    const fixture = TestBed.createComponent(FnPipeHostComponent);

    fixture.detectChanges();

    expect(fixture.nativeElement.textContent.trim()).toBe('42');
    expect(fixture.componentInstance.compute).toHaveBeenCalledTimes(1);

    fixture.detectChanges();

    expect(fixture.nativeElement.textContent.trim()).toBe('42');
    expect(fixture.componentInstance.compute).toHaveBeenCalledTimes(1);
  });
});
