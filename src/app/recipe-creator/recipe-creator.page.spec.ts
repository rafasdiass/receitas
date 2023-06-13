import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecipeCreatorPage } from './recipe-creator.page';

describe('RecipeCreatorPage', () => {
  let component: RecipeCreatorPage;
  let fixture: ComponentFixture<RecipeCreatorPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RecipeCreatorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
