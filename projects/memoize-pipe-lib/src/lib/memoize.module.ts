import { NgModule } from '@angular/core';
import { FnPipe } from "./fn.pipe";

@NgModule({
  declarations: [
    FnPipe
  ],
  imports: [
  ],
  exports: [
    FnPipe
  ]
})
export class MemoizeModule { }
