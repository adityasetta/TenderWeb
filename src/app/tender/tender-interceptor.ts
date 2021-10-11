import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class TenderInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if(req.body){
      const postRequest = req.clone({
        headers: req.headers.set("Content-Type", "application/json")
      });

      return next.handle(postRequest);
    }
    return next.handle(req);
  }
}
