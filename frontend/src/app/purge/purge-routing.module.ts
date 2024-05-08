import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { IndexComponent } from './index/index.component';
import { ViewComponent } from './view/view.component';

const routes: Routes = [

  { path: 'purges', redirectTo: 'purges/all', pathMatch: 'full'},
  { path: 'purges/:purgeId/view', component: ViewComponent },
  { path: 'purges/all', component: IndexComponent },
  { path: 'purges/create', component: CreateComponent },
  { path: 'purges/:purgeId/edit', component: EditComponent } 

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PurgeRoutingModule { }
