import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationDetaiComponent } from './location-detai.component';

describe('LocationDetaiComponent', () => {
  let component: LocationDetaiComponent;
  let fixture: ComponentFixture<LocationDetaiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LocationDetaiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LocationDetaiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
