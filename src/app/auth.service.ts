import { map, Observable } from 'rxjs';
import { StorageService } from './storage.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ITokenSuccess } from 'src/types/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient, private storageService: StorageService) { }

  authUrl: string = `${environment.app_url}authentication/`;

  loginGuest(): Observable<void> {

    let httpParams = new HttpParams();

    const params = httpParams.set('api_key', environment.api_key)

    const guestSessionUrl = `${this.authUrl}guest_session/new`;

    return this.httpClient.get<ITokenSuccess>(guestSessionUrl, { params: params})
                   .pipe(
                    map(result => {
                      console.log("result", result)
                        this.storageService.addToStorage("guest_token", result.guest_session_id)
                    })
                   )
  }

  logoutGuest() {
    let httpParams = new HttpParams();

    const params = httpParams.set('api_key', environment.api_key)
    // .set('Content-Type', 'application/json; charset=utf-8')

    const logoutUrl = `${this.authUrl}session`;

    const guest_token = this.storageService.getFromStroage<string>("guest_token")

    const obj = JSON.stringify({
      session_id: guest_token
    })

    return this.httpClient.delete<ITokenSuccess>(logoutUrl,
                     { params: params,
                       body: obj,

                      }
                    )
                   .pipe(
                    map(result => {
                        this.storageService.removeFromStorage("guest_token")
                    })
                   )
  }

}
