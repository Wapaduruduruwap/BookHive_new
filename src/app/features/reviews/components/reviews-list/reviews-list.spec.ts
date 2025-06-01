import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewsList } from './reviews-list';

describe('ReviewsList', () => {
  let component: ReviewsList;
  let fixture: ComponentFixture<ReviewsList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReviewsList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewsList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
