import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecepyDetailComponent } from './recepy-detail.component';

describe('RecepyDetailComponent', () => {
  let component: RecepyDetailComponent;
  let fixture: ComponentFixture<RecepyDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecepyDetailComponent]
    });
    fixture = TestBed.createComponent(RecepyDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
