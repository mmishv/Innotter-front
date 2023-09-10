import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {PageLayoutComponent} from "./pages/page-layout/page-layout.component";


const routes: Routes = [{path: ':pageId', component: PageLayoutComponent},];

@NgModule({
  imports: [RouterModule.forChild(routes)], exports: [RouterModule]
})
export class PagesRoutingModule {
}
