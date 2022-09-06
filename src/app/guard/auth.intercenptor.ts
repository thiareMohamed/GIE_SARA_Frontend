import {HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {LoginService} from "../pages/login/login.service";

@Injectable()
export class AuthIntercenptor implements HttpInterceptor {

  constructor(private login: LoginService) {
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    //add the jwt token (localStotage) request
    let authReq = req
    const token = this.login.getToken();
    if (token != null) {
      authReq = authReq.clone({
        setHeaders: {Authorization: `Bearer ${token}`},
      });
    }
    return next.handle(authReq);
  }

}

export const authInterceptorProviders = [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthIntercenptor,
      multi: true,
    }
  ]
