import { FnPipe } from "./fn.pipe";

describe('FnPipe', () => {
  it('create an instance', () => {
    const pipe = new FnPipe();
    expect(pipe).toBeTruthy();
  });
});
