import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeOrganizationsComponent } from './home-organizations.component';

describe('HomeOrganizationsComponent', () => {
  let component: HomeOrganizationsComponent;
  let fixture: ComponentFixture<HomeOrganizationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeOrganizationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeOrganizationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
