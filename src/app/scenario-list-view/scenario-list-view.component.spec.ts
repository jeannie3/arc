import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScenarioListViewComponent } from './scenario-list-view.component';

describe('ScenarioListViewComponent', () => {
  let component: ScenarioListViewComponent;
  let fixture: ComponentFixture<ScenarioListViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScenarioListViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScenarioListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
