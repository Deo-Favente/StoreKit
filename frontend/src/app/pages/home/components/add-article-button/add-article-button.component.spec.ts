import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddArticleButtonComponent } from './add-article-button.component';

describe('AddArticleButtonComponent', () => {
  let component: AddArticleButtonComponent;
  let fixture: ComponentFixture<AddArticleButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddArticleButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddArticleButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
