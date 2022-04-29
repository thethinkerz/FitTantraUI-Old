import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrouppatternComponent } from './grouppattern.component';

describe('GrouppatternComponent', () => {
  let component: GrouppatternComponent;
  let fixture: ComponentFixture<GrouppatternComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrouppatternComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GrouppatternComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
