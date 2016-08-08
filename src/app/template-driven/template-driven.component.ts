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
    .panel {
        padding: 16px;
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
    options: []
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
    { value: 'life', display: 'Lifestyle' },
  ];

  public toggles = [
    { value: 'ischecked', display: 'IsChecked' },
    { value: 'isunchecked', display: 'IsUnchecked' },
  ];

  // options = [];
  // optionsMapNames = [];
  optionsMap = {
    OptionA: true,
    OptionB: false,
    OptionC: true,
    OptionD: true,
  };

  @Output() formSubmit = new EventEmitter();

  ngOnInit() {
    // this.initOptions();
    this.updateOptionsMap();
  }

  // initOptions() {
  //   for(var x in this.optionsMap) {
  //     this.optionsMapNames.push(x);
  //   }
  // }

  updateCheckedOptions(option, event) {
    this.optionsMap[option] = event.target.checked;
    // console.log(option);
    // console.log(this.optionsMap);
    this.updateOptionsMap();
  }

  updateOptionsMap() {
    this.user.options.splice(0, this.user.options.length);
    for(var x in this.optionsMap) {
      // console.log(x + ' ' + this.optionsMap[x]);
      if (this.optionsMap[x]) {
        this.user.options.push(x);
      }
    }
    console.log(this.user.options);
  }

  onSubmit(form: NgForm) {
    console.log('Template-driven form submitted');
    console.log(form);
    console.log(form.value);
    console.log(this.user);
    this.formSubmit.emit(this.user);
  }
}
