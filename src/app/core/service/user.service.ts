import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import env from "../../../environments/.env";

const USER_MNG_URL = env.userMngUrl;

const httpOptionsJSON = {
  headers: new HttpHeaders({'Content-Type': 'application/json; charset=UTF-8'})
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  getUsersByUUIDList(uuidList: string[]): Observable<any> {
    const url = `${USER_MNG_URL}/users/list/`;
    const requestBody = {uuid_list: uuidList};
    let users = this.http.post(url, requestBody, httpOptionsJSON);
    (users.subscribe(users => {
      console.log(users)
    }));
    return users;
  }

  getUserData(): Observable<any> {
    return this.http.get<any>(USER_MNG_URL + `/users/me/`, httpOptionsJSON);
  }
}
