import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutBarkComponent } from './about-bark.component';

describe('AboutBarkComponent', () => {
  let component: AboutBarkComponent;
  let fixture: ComponentFixture<AboutBarkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboutBarkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutBarkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
