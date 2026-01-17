import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportArticlePopupComponent } from './export-article-popup.component';

describe('ExportArticlePopupComponent', () => {
  let component: ExportArticlePopupComponent;
  let fixture: ComponentFixture<ExportArticlePopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExportArticlePopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExportArticlePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
