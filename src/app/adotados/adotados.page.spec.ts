import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdotadosPage } from './adotados.page';

describe('AdotadosPage', () => {
  let component: AdotadosPage;
  let fixture: ComponentFixture<AdotadosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdotadosPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdotadosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
