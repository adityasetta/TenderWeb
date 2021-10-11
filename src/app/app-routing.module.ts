import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { TenderDetailComponent } from './tender/tender-detail/tender-detail.component';
import { TenderListComponent } from './tender/tender-list/tender-list.component';

const routes: Routes = [
  // lazy load tender components
  { path: "tender", loadChildren: () => import('./tender/tender.module').then(m => m.TenderModule)},
  { path: 'login', component: LoginComponent},
  { path: '', redirectTo: 'tender/list', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
