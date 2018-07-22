import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardCreatorComponent } from './card-creator.component';

describe('CardCreatorComponent', () => {
  let component: CardCreatorComponent;
  let fixture: ComponentFixture<CardCreatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardCreatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
