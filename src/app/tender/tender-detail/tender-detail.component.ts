import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { Tender } from "../tender.model";
import { TenderService } from "../tender.service";

@Component({
  selector: 'app-tender-detail',
  templateUrl: './tender-detail.component.html',
  styleUrls: ['./tender-detail.component.css']
})
export class TenderDetailComponent implements OnInit {
  form: FormGroup;
  tender: Tender;
  mode = "Create";
  private tenderId: number;

  constructor(public tenderService: TenderService, public route: ActivatedRoute, public router: Router) {}

  ngOnInit(){
    this.form = new FormGroup({
      tenderName: new FormControl(null, {validators: [Validators.required]}),
      contractNo: new FormControl(null, {validators: [Validators.required]}),
      releaseDate: new FormControl(null, {validators: [Validators.required]}),
      releaseTime: new FormControl(null, {validators: [Validators.required]}),
      closingDate: new FormControl(null, {validators: [Validators.required]}),
      closingTime: new FormControl(null, {validators: [Validators.required]}),
      description: new FormControl(null, {validators: [Validators.required]})
    });

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if(paramMap.has('tenderId')){
        if(paramMap.has('readOnly')){
          this.mode = "ReadOnly";
        }
        else{
          this.mode = "Edit"
        }

        this.tenderId = +paramMap.get('tenderId');
        this.tenderService.getTender(this.tenderId).subscribe(tenderData=>{
          this.tender = { tenderId: tenderData.tenderId,
            contractNo: tenderData.contractNo,
            closingDate: tenderData.closingDate,
            creatorId: tenderData.creatorId,
            description: tenderData.description,
            releaseDate: tenderData.releaseDate,
            tenderName: tenderData.tenderName
          };

          var splittedClosingDate = this.tender.closingDate.split("T",2);
          var splittedReleaseDate = this.tender.releaseDate.split("T",2);

          this.form.setValue({ tenderName: this.tender.tenderName,
              contractNo: this.tender.contractNo,
              description: this.tender.description,
              closingDate: splittedClosingDate[0],
              closingTime: splittedClosingDate[1],
              releaseDate: splittedReleaseDate[0],
              releaseTime: splittedReleaseDate[1]
            });
        });
      } else{
        this.mode = "Create";
        this.tenderId = null;
      }
    });
  }

  onSaveTender() {
    if(this.form.invalid || this.mode === "ReadOnly"){
      return;
    }

    const reqReleaseDate = this.form.value.releaseDate + "T" + this.form.value.releaseTime;
    const reqClosingDate = this.form.value.closingDate + "T" + this.form.value.closingTime;


    if(this.mode === "Create"){
      this.tenderService.addTender(this.form.value.tenderName,
        this.form.value.contractNo,
        reqReleaseDate,
        reqClosingDate,
        this.form.value.description,
        this.form.value.creatorId
        );
    }
    else{
      this.tenderService.editTender(this.tenderId,
        this.form.value.tenderName,
        this.form.value.contractNo,
        reqReleaseDate,
        reqClosingDate,
        this.form.value.description,
        this.form.value.creatorId
      );

      this.router.navigate(['/']);
    }

    this.form.reset();
  }
}
