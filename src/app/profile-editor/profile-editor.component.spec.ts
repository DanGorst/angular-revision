import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileEditorComponent } from './profile-editor.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('ProfileEditorComponent', () => {
  let component: ProfileEditorComponent;
  let fixture: ComponentFixture<ProfileEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule ],
      declarations: [ ProfileEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
