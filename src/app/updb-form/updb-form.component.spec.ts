import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdbFormComponent } from './updb-form.component';

describe('UpdbFormComponent', () => {
  let component: UpdbFormComponent;
  let fixture: ComponentFixture<UpdbFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdbFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdbFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
