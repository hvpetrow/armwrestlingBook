import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateTransform'
})
export class DateTransformPipe implements PipeTransform {

  transformedDate!: Date
  transform(firebaseTimestampObject: any): any {
    if (firebaseTimestampObject) {
      this.transformedDate = firebaseTimestampObject.toDate();

    }
    return this.transformedDate;
  }

}
