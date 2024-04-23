import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemoizePipeLibComponent } from './memoize-pipe-lib.component';

describe('MemoizePipeLibComponent', () => {
  let component: MemoizePipeLibComponent;
  let fixture: ComponentFixture<MemoizePipeLibComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemoizePipeLibComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MemoizePipeLibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
