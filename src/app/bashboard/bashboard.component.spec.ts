import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BashboardComponent } from './bashboard.component';

describe('BashboardComponent', () => {
  let component: BashboardComponent;
  let fixture: ComponentFixture<BashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
