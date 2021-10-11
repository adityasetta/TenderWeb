import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { TenderListComponent } from "./tender-list/tender-list.component";
import { TenderDetailComponent } from "./tender-detail/tender-detail.component";
import { TenderRoutingModule } from "./tender-routing.module";

@NgModule({
  declarations: [TenderDetailComponent, TenderListComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class TenderModule {}
