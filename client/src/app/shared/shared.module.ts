import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateTransformPipe } from './date-transform.pipe';



@NgModule({
  declarations: [
    DateTransformPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DateTransformPipe
  ]
})
export class SharedModule { }
