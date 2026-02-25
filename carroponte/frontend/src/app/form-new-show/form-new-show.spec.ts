import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormNewShow } from './form-new-show';

describe('FormNewShow', () => {
  let component: FormNewShow;
  let fixture: ComponentFixture<FormNewShow>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormNewShow]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormNewShow);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
