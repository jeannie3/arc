import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScenarioSceneContextComponent } from './scenario-scene-context.component';

describe('ScenarioSceneContextComponent', () => {
  let component: ScenarioSceneContextComponent;
  let fixture: ComponentFixture<ScenarioSceneContextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScenarioSceneContextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScenarioSceneContextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
