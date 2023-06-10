import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecipesListPage } from './recipes-list.page';

describe('RecipesListPage', () => {
  let component: RecipesListPage;
  let fixture: ComponentFixture<RecipesListPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RecipesListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
