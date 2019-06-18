import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadanimalPage } from './cadanimal.page';

describe('CadanimalPage', () => {
  let component: CadanimalPage;
  let fixture: ComponentFixture<CadanimalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadanimalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadanimalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
