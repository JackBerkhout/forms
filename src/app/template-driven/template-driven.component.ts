import {Component, EventEmitter, Output, OnInit} from '@angular/core';
import { NgForm } from "@angular/forms";
// import { User } from './user.interface';
// import { Theme } from './theme.interface';
import {KeyValueFilterPipe} from '../pipes/key-value.pipe';

@Component({
  moduleId: module.id,
  selector: 'template-driven',
  templateUrl: 'template-driven.component.html',
  styles: [`
    .ng-invalid.ng-touched {
      border: 1px solid red;
    }
  `],
  pipes: [KeyValueFilterPipe]
})
export class TemplateDrivenComponent implements OnInit {

  // public user: User;
  user = {
    username: 'Max',
    email: 'chris@test.com',
    password: 'test',
    gender: 'M',
    role: 'guest',
    topics: 'tech',
    isActive: true,
    toggle: 'isunchecked',
    hobbies: []
  };

  public genders = [
    { value: 'F', display: 'Female' },
    { value: 'M', display: 'Male' }
  ];

  public roles = [
    { value: 'admin', display: 'Administrator' },
    { value: 'guest', display: 'Guest' },
    { value: 'custom', display: 'Custom' }
  ];

  public topics = [
    { value: 'game', display: 'Gaming' },
    { value: 'tech', display: 'Technology' },
    { value: 'life', display: 'Lifestyle' }
  ];

  public toggles = [
    { value: 'ischecked', display: 'IsChecked' },
    { value: 'isunchecked', display: 'IsUnchecked' }
  ];

  // options = [];
  // optionsMapNames = [];
  // optionsMap = {
  //   OptionA: true,
  //   OptionB: false,
  //   OptionC: true,
  //   OptionD: true,
  // };

  public optionsMap2 = [
    { name: 'Wind Surfing', checked: true },
    { name: 'Ice Skating', checked: false },
    { name: 'Web Surfing', checked: true },
    { name: 'Watching Movies', checked: true },
  ];

  @Output() formSubmit = new EventEmitter();

  ngOnInit() {
    this.updateUserColors();
  }

  updateCheckedColors(option, event) {
    for (var i = 0, l = this.optionsMap2.length; i < l; i++) {
      if (this.optionsMap2[i].name == option) {
        this.optionsMap2[i].checked = event.target.checked;
      }
    }
    this.updateUserColors();
  }

  updateUserColors() {
    this.user.hobbies.splice(0, this.user.hobbies.length);
    for (var i = 0, l = this.optionsMap2.length; i < l; i++) {
      if (this.optionsMap2[i].checked) {
        this.user.hobbies.push(this.optionsMap2[i].name);
      }
    }
    console.log(this.user.hobbies);
  }

  onSubmit(form: NgForm) {
    console.log('Template-driven form submitted');
    console.log(form);
    console.log(form.value);
    console.log(this.user);
    this.formSubmit.emit(this.user);
  }
}
