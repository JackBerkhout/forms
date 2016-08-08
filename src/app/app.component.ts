import {Component} from '@angular/core';
import {TemplateDrivenComponent} from "./template-driven/template-driven.component";
import {DataDrivenComponent} from "./data-driven/data-driven.component";

@Component({
    moduleId: module.id,
    selector: 'forms-app',
    templateUrl: 'forms.component.html',
    directives: [DataDrivenComponent, TemplateDrivenComponent],
    styles: [`
    .panel {
        padding: 16px;
    }
  `]
})
export class AppComponent {
    myUser = {
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

    onTemplateSubmit(event) {
        console.log('onTemplateSubmit');
        // console.log(event);
        this.myUser = this.copyObject(event, true);
        // this.myUser.username = event.username;
        // this.myUser.email = event.email;
        // this.myUser.password = event.password;
        // this.myUser.gender = event.gender;
        // this.myUser.gender = event.gender;
        console.log(this.myUser);
    }

    /* Only works for native objects, host objects are not
     ** included. Copies Objects, Arrays, Functions and primitives.
     ** Any other type of object (Number, String, etc.) will likely give
     ** unexpected results, e.g. copy(new Number(5)) ==> 0 since the value
     ** is stored in a non-enumerable property.
     **
     ** Expects that objects have a properly set *constructor* property.
     */
    copyObject(source, deep = false) {
        var o, prop, type;

        if (typeof source != 'object' || source === null) {
            // What do to with functions, throw an error?
            o = source;
            return o;
        }
        o = new source.constructor();
        for (prop in source) {
            if (source.hasOwnProperty(prop)) {
                type = typeof source[prop];

                if (deep && type == 'object' && source[prop] !== null) {
                  o[prop] = this.copyObject(source[prop], deep);
                } else {
                    o[prop] = source[prop];
                }
            }
        }
        return o;
    }


    /**
     * Returns a deep copy of the object
     */
    deepCopy(oldObj: any) {
        var newObj = oldObj;
        if (oldObj && typeof oldObj === "object") {
            newObj = Object.prototype.toString.call(oldObj) === "[object Array]" ? [] : {};
            for (var i in oldObj) {
                newObj[i] = this.deepCopy(oldObj[i]);
            }
        }
        return newObj;
    }
}
