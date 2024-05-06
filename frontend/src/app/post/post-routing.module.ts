import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewComponent } from './view/view.component';
import { EditComponent } from './edit/edit.component';


const routes: Routes = [

  { path: 'post', redirectTo: 'post/index', pathMatch: 'full'},
  { path: 'post/:postId/view', component: ViewComponent },
  { path: 'post/:postId/edit', component: EditComponent } 

];

  

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]

})

export class PostRoutingModule { }