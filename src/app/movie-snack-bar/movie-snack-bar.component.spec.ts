import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieSnackBarComponent } from './movie-snack-bar.component';

describe('MovieSnackBarComponent', () => {
  let component: MovieSnackBarComponent;
  let fixture: ComponentFixture<MovieSnackBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovieSnackBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieSnackBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
