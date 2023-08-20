import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WriteRecipeComponent } from './write-recipe.component';

describe('WriteRecipeComponent', () => {
  let component: WriteRecipeComponent;
  let fixture: ComponentFixture<WriteRecipeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WriteRecipeComponent]
    });
    fixture = TestBed.createComponent(WriteRecipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
