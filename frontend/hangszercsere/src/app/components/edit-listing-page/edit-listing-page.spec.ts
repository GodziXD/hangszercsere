import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditListingPage } from './edit-listing-page';

describe('EditListingPage', () => {
  let component: EditListingPage;
  let fixture: ComponentFixture<EditListingPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditListingPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditListingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
