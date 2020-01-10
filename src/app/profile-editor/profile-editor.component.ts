import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { forbiddenNameValidator } from './forbidden-name.directive';

@Component({
  selector: 'app-profile-editor',
  templateUrl: './profile-editor.component.html',
  styleUrls: ['./profile-editor.component.css']
})
export class ProfileEditorComponent implements OnInit {

  profileForm = this.fb.group({
    firstName: ['', [Validators.required, forbiddenNameValidator(/bob/i)]],
    lastName: ['', [Validators.required, Validators.minLength(3)]],
    address: this.fb.group({
      street: [''],
      city: [''],
      state: [''],
      zip: ['']
    }),
    aliases: this.fb.array([
      this.fb.control('')
    ])
  });

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.profileForm.value);
  }

  updateProfile() {
    this.profileForm.patchValue({
      firstName: 'Nancy',
      address: {
        street: '123 Drew Street'
      }
    });
  }

  get aliases() {
    return this.profileForm.get('aliases') as FormArray;
  }

  addAlias() {
    this.aliases.push(this.fb.control(''));
  }

  get lastName() {
    return this.profileForm.get('lastName') as FormControl;
  }

  get firstName() {
    return this.profileForm.get('firstName') as FormControl;
  }
}
