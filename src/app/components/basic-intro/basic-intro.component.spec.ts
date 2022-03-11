import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicIntroComponent } from './basic-intro.component';

describe('BasicIntroComponent', () => {
  let component: BasicIntroComponent;
  let fixture: ComponentFixture<BasicIntroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasicIntroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicIntroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
