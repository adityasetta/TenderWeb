import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "../auth/auth-guard";

import { TenderDetailComponent } from "./tender-detail/tender-detail.component";
import { TenderListComponent } from "./tender-list/tender-list.component";

const routes: Routes = [
  { path: "list", component: TenderListComponent, canActivate: [AuthGuard] },
  { path: "create", component: TenderDetailComponent, canActivate: [AuthGuard]  },
  { path: "view/:tenderId/:readOnly", component: TenderDetailComponent, canActivate: [AuthGuard]  },
  { path: "edit/:tenderId", component: TenderDetailComponent, canActivate: [AuthGuard]  }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TenderRoutingModule {}
