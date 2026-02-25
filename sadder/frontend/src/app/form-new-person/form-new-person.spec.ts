import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormNewPerson } from './form-new-person';

describe('FormNewPerson', () => {
  let component: FormNewPerson;
  let fixture: ComponentFixture<FormNewPerson>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormNewPerson]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormNewPerson);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
