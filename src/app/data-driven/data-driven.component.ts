import {Component, Output, EventEmitter} from '@angular/core';
import {
  FormGroup,
  FormControl,
  REACTIVE_FORM_DIRECTIVES,
  Validators,
  FormBuilder,
  FormArray
} from "@angular/forms";
import { Observable } from "rxjs/Rx";

@Component({
  moduleId: module.id,
  selector: 'data-driven',
  templateUrl: 'data-driven.component.html',
  directives: [REACTIVE_FORM_DIRECTIVES]
})
export class DataDrivenComponent {
  myForm: FormGroup;

  user = {
    username: 'Max',
    email: 'chris@test.com',
    password: 'test',
    gender: 'M',
    role: 'guest',
    topics: 'tech',
    isActive: true,
    toggle: 'isunchecked',
    colors: [],
    hobbies: []
  };

  genders = [
    'male',
    'female'
  ];

  constructor(private formBuilder: FormBuilder) {
    // this.myForm = new FormGroup({
    //   'userData': new FormGroup({
    //     'username': new FormControl('Max', Validators.required),
    //     'email': new FormControl('', [
    //       Validators.required,
    //       Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
    //     ])
    //   }),
    //   'password': new FormControl('', Validators.required),
    //   'gender': new FormControl('male'),
    //   'hobbies': new FormArray([
    //     new FormControl('Cooking', Validators.required)
    //   ])
    // });

    this.myForm = formBuilder.group({
      'userData': formBuilder.group({
        'username': ['Max', [Validators.required, this.exampleValidator]],
        'email': ['', [
          Validators.required,
          Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
        ]]
      }),
      'password': ['', Validators.required],
      'gender': ['male'],
      'hobbies': formBuilder.array([
        ['Cooking', Validators.required, this.asyncExampleValidator]
      ])
    });

    this.myForm.valueChanges.subscribe(
        (data: any) => {
          console.log('Data-driven form valueChanges');
          console.log(data);
          this.user.username = data.userData.username;
          this.user.email = data.userData.email;
          this.user.password = data.password;
          this.user.gender = data.gender;
          this.user.hobbies = data.hobbies;
        }
    );
    
    this.myForm.statusChanges.subscribe(
        (data: any) => {
          console.log('Data-driven form statusChanges');
          console.log(data);
        }
    );
  }

  onAddHobby() {
    (<FormArray>this.myForm.find('hobbies')).push(new FormControl('', Validators.required, this.asyncExampleValidator));
  }

  @Output() formSubmit = new EventEmitter();

  onSubmit() {
    console.log('Data-driven form submitted');
    console.log(this.myForm);
    console.log(this.myForm.controls);
    this.user.username = this.myForm.controls['userData'].value.username;
    this.user.email = this.myForm.controls['userData'].value.email;
    this.user.password = this.myForm.controls['password'].value;
    this.user.gender = this.myForm.controls['gender'].value;
    this.user.hobbies = this.myForm.controls['hobbies'].value;
    console.log(this.user);
    this.formSubmit.emit(this.user);
  }

  exampleValidator(control: FormControl): {[s: string]: boolean} {
    if (control.value === 'Example') {
      return {example: true};
    }
    return null;
  }

  asyncExampleValidator(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>(
      (resolve, reject) => {
        setTimeout(() => {
          if (control.value === 'Example') {
            resolve({'invalid': true});
          } else {
            resolve(null);
          }
        }, 1500);
      }
    );
    return promise;
  }

}
