import { Component } from '@angular/core';
import { TemplateDrivenComponent } from "./template-driven/template-driven.component";
import { DataDrivenComponent } from "./data-driven/data-driven.component";

@Component({
  moduleId: module.id,
  selector: 'forms-app',
  templateUrl: 'forms.component.html',
  directives: [DataDrivenComponent, TemplateDrivenComponent]
})
export class AppComponent {
}
