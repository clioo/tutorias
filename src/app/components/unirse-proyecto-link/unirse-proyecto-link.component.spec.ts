import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnirseProyectoLinkComponent } from './unirse-proyecto-link.component';

describe('UnirseProyectoLinkComponent', () => {
  let component: UnirseProyectoLinkComponent;
  let fixture: ComponentFixture<UnirseProyectoLinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnirseProyectoLinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnirseProyectoLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
