import { TestBed } from '@angular/core/testing';
import { FnPipe } from './fn.pipe';

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
    const mockFunc = jasmine.createSpy('mockFunc').and.returnValue(42);
    const result = pipe.transform(mockFunc);

    expect(mockFunc).toHaveBeenCalled();
    expect(result).toBe(42);
  });

  it('should call a function with single argument', () => {
    const mockFunc = jasmine.createSpy('mockFunc').and.returnValue('hello');
    const result = pipe.transform(mockFunc, 'world');

    expect(mockFunc).toHaveBeenCalledWith('world');
    expect(result).toBe('hello');
  });

  it('should call a function with multiple arguments', () => {
    const mockFunc = jasmine.createSpy('mockFunc').and.returnValue(10);
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
});
