import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestCheckIn } from './guest-check-in';

describe('GuestCheckIn', () => {
  let component: GuestCheckIn;
  let fixture: ComponentFixture<GuestCheckIn>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuestCheckIn]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuestCheckIn);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});