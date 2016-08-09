import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'keyValueFilter'
})
export class KeyValueFilterPipe implements PipeTransform {
    transform(value: any, args: any[] = null): any {

        return Object.keys(value).map(function(key) {
            let pair = {};
            let k = 'key';
            let v = 'value'
            pair[k] = key;
            pair[v] = value[key];
            return pair;
        });
    }
}

// Usage:
//
// optionsMap = {
//     OptionA: true,
//     OptionB: false,
//     OptionC: true,
//     OptionD: true,
// };
//
// ngOnInit() {
//     // this.initOptions();
//     this.updateUserOptions();
// }
//
// updateCheckedOptions(option, event) {
//     this.optionsMap[option] = event.target.checked;
//     // console.log(option);
//     // console.log(this.optionsMap);
//     this.updateUserOptions();
// }
//
// updateUserOptions() {
//     this.user.options.splice(0, this.user.options.length);
//     for(var x in this.optionsMap) {
//         // console.log(x + ' ' + this.optionsMap[x]);
//         if (this.optionsMap[x]) {
//             this.user.options.push(x);
//         }
//     }
//     console.log(this.user.options);
// }
//
// <div class="form-group">
//     <label>Options :</label>
// <div *ngFor="let option of optionsMap | keyValueFilter; let i = index">
// <label>
//     <input type="checkbox"
// name="options"
// value="{{option.key}}"
//     [checked]="optionsMap[option.key]"
// (change)="updateCheckedOptions(option.key, $event)"/>
//     {{option.key}} ({{optionsMap[option.key]}})
// </label>
// </div>
// </div>
