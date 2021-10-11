import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth-guard';
import { LoginComponent } from './auth/login/login.component';
import { TenderDetailComponent } from './tender/tender-detail/tender-detail.component';
import { TenderListComponent } from './tender/tender-list/tender-list.component';

const routes: Routes = [
  { path: "", component: TenderListComponent, canActivate: [AuthGuard] },
  { path: "create", component: TenderDetailComponent, canActivate: [AuthGuard]  },
  { path: "view/:tenderId/:readOnly", component: TenderDetailComponent, canActivate: [AuthGuard]  },
  { path: "edit/:tenderId", component: TenderDetailComponent, canActivate: [AuthGuard]  },
  { path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
