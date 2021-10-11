import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";

import { Tender } from "../tender.model";
import { TenderService } from "../tender.service";

@Component({
  selector: 'app-tender-list',
  templateUrl: './tender-list.component.html',
  styleUrls: ['./tender-list.component.css']
})
export class TenderListComponent implements OnInit, OnDestroy{
  tenders: Tender[] = [];
  private tendersSub: Subscription;

  constructor(public tendersService: TenderService){}

  ngOnInit(){
    this.tendersService.getTenders();
    console.log(this.tenders);
    this.tendersSub = this.tendersService.getTenderUpdateListener()
      .subscribe((tenderData:{tenders: Tender[]})=>{
        this.tenders = tenderData.tenders;
      });
  }

  onDelete(tenderId: number){
    // this.isLoading = true;
    this.tendersService.deleteTender(tenderId).subscribe(()=>{
        this.tendersService.getTenders();
      },
      () => {
        // this.isLoading = false;
    });
  }

  ngOnDestroy(){
    this?.tendersSub?.unsubscribe();
  }

}
