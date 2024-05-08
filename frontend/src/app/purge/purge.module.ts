import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PurgeRoutingModule } from './purge-routing.module';
import { CreateComponent } from './create/create.component';
import { ViewComponent } from './view/view.component';
import { EditComponent } from './edit/edit.component';
import { IndexComponent } from './index/index.component';


@NgModule({
  declarations: [
    CreateComponent,
    ViewComponent,
    EditComponent,
    IndexComponent
  ],
  imports: [
    CommonModule,
    PurgeRoutingModule
  ]
})
export class PurgeModule { }
