import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddbFormComponent } from './addb-form.component';

describe('AddbFormComponent', () => {
  let component: AddbFormComponent;
  let fixture: ComponentFixture<AddbFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddbFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddbFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
