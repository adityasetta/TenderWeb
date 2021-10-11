import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "../auth/auth-guard";

import { TenderDetailComponent } from "./tender-detail/tender-detail.component";
import { TenderListComponent } from "./tender-list/tender-list.component";

const routes: Routes = [
  { path: "list", component: TenderListComponent, canActivate: [AuthGuard] },
  { path: "create", component: TenderDetailComponent, canActivate: [AuthGuard]  },
  { path: "view/:tenderId/:readOnly", component: TenderDetailComponent, canActivate: [AuthGuard] },
  { path: "edit/:tenderId", component: TenderDetailComponent, canActivate: [AuthGuard]  },


  // Tried to implement Child Routes, but parameter won't be passed, need more research on this
  // { path: "detail", component: TenderDetailComponent, canActivate: [AuthGuard],
  //     children:[
  //       { path: ":tenderId", component: TenderDetailComponent},
  //       { path: ":tenderId/:readOnly", component: TenderDetailComponent}
  //     ]
  // }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TenderRoutingModule {}
