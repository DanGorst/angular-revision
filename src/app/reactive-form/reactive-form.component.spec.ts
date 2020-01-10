import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactiveFormComponent } from './reactive-form.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('ReactiveFormComponent', () => {
  let component: ReactiveFormComponent;
  let fixture: ComponentFixture<ReactiveFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule ],
      declarations: [ ReactiveFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReactiveFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update the value in the model', () => {
    const input = fixture.nativeElement.querySelector('input');

    input.value = 'Red';
    input.dispatchEvent(new Event('input'));

    expect(fixture.componentInstance.favoriteColorControl.value).toEqual('Red');
  });

  it('should update the value in the view', () => {
    component.favoriteColorControl.setValue('Blue');

    const input = fixture.nativeElement.querySelector('input');

    expect(input.value).toBe('Blue');
  });
});
