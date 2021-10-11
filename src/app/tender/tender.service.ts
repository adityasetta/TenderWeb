import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Tender } from "./tender.model";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { map } from 'rxjs/operators';

const BACKEND_URL = environment.apiUrl + "/tender/";

@Injectable({providedIn: 'root'})
export class TenderService{
  private tenders: Tender[] = [];
  private tendersUpdated = new Subject<{tenders: Tender[]}>();

  constructor(private httpClient: HttpClient) {}

  getTenders(){
    this.httpClient.get<{tenderId: number, contractNo: string, tenderName: string, releaseDate: string, closingDate: string}[]>(BACKEND_URL)
      .pipe(map((tenderData)=>{
        return{
          tenders: tenderData.map(tender =>{
            return{
              tenderId: tender.tenderId,
              contractNo: tender.contractNo,
              tenderName: tender.tenderName,
              releaseDate: tender.releaseDate,
              closingDate: tender.closingDate,
              description: null,
              creatorId: null
            };
          })};
      }))
      .subscribe((transformedTenderData)=>{
        this.tenders = transformedTenderData.tenders;
        this.tendersUpdated.next({
          tenders: [...this.tenders]
        });
      });
  }

  getTenderUpdateListener(){
    return this.tendersUpdated.asObservable();
  }

  getTender(tenderId: number){
    return this.httpClient.get<{tenderId: number, contractNo: string, tenderName: string, releaseDate: string, closingDate: string, description: string, creatorId: string}>(BACKEND_URL + tenderId)
  }

  addTender(tenderName: string, contractNo: string, releaseDate: string, closingDate: string, description: string, creatorId: string){
    const post: Tender = { tenderId: 0,
      tenderName: tenderName,
      contractNo: contractNo,
      releaseDate: releaseDate,
      closingDate: closingDate,
      description: description,
      creatorId: creatorId,
    };

    this.httpClient.post(BACKEND_URL + creatorId, post)
      .subscribe((responseData) => {
        console.log(responseData);
      });
  }

  editTender(tenderId: number, tenderName: string, contractNo: string, releaseDate: string, closingDate: string, description: string, creatorId: string){
    const post: Tender = { tenderId: tenderId,
      tenderName: tenderName,
      contractNo: contractNo,
      releaseDate: releaseDate,
      closingDate: closingDate,
      description: description,
      creatorId: creatorId,
    };

    this.httpClient.patch(BACKEND_URL + creatorId, post)
      .subscribe((responseData) => {
        console.log(responseData);
      });
  }

  deleteTender(tenderId: number){
    return this.httpClient.delete(BACKEND_URL + "creatorId" + "/" + tenderId);
  }
}
