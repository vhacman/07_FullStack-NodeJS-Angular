import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonTest } from './person-test';

describe('PersonTest', () => {
  let component: PersonTest;
  let fixture: ComponentFixture<PersonTest>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonTest]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonTest);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
