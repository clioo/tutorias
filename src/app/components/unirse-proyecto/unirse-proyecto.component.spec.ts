import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnirseProyectoComponent } from './unirse-proyecto.component';

describe('UnirseProyectoComponent', () => {
  let component: UnirseProyectoComponent;
  let fixture: ComponentFixture<UnirseProyectoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnirseProyectoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnirseProyectoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
