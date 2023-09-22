import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import env from "../../../environments/.env";
import {User} from "../model/user.model";
import {Group} from "../model/group.model";

const USER_MNG_URL = env.userMngUrl;
const INNOTTER_URL = env.innotterUrl;

const httpOptionsJSON = {
  headers: new HttpHeaders({'Content-Type': 'application/json; charset=UTF-8'})
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  getUsersByUUIDList(uuidList: string[]): Observable<User[]> {
    const url = `${USER_MNG_URL}/users/list/`;
    const requestBody = {uuid_list: uuidList};
    return this.http.post<User[]>(url, requestBody, httpOptionsJSON);
  }

  getCurrentUserData(): Observable<User> {
    return this.http.get<User>(USER_MNG_URL + `/users/me/`, httpOptionsJSON);
  }

  getUserData(userId: string): Observable<User> {
    return this.http.get<User>(USER_MNG_URL + `/users/${userId}/`, httpOptionsJSON);
  }

  uploadImage(imageFile: File): Observable<any> {
    const formData = new FormData();
    formData.append('avatar', imageFile);
    return this.http.patch(`${USER_MNG_URL}/users/me/`, formData);
  }

  edit(form: any): Observable<any> {
    let params = new HttpParams();
    for (const key in form) {
      if (form.hasOwnProperty(key)) {
        params = params.set(key, form[key]);
      }
    }
    return this.http.patch(`${USER_MNG_URL}/users/me/`, {}, {headers: httpOptionsJSON.headers, params});
  }

  getUsersPage(pageNum: number, username:string = ''): Observable<User[]> {
    return this.http.get<User[]>(USER_MNG_URL +
      `/users/?page=${pageNum}&limit=10&filter_by_name=${username}&sort_by=username&order_by=asc`, httpOptionsJSON);
  }

  patchUser(fields: any, userId: string): Observable<any> {
    let params = new HttpParams();
    for (const key in fields) {
      params = params.set(key, fields[key]);
    }
    return this.http.patch(`${USER_MNG_URL}/users/${userId}/`, {}, {headers: httpOptionsJSON.headers, params});
  }

  blockUser(userId: string): Observable<any> {
    return this.http.patch(`${INNOTTER_URL}/users/${userId}/block/`, httpOptionsJSON);
  }
  unblockUser(userId: string): Observable<any> {
    return this.http.patch(`${INNOTTER_URL}/users/${userId}/unblock/`, httpOptionsJSON);
  }

  deleteUser(userId: string): Observable<any> {
    return this.http.delete(`${USER_MNG_URL}/users/${userId}/`, httpOptionsJSON);
  }

  getAllGroups(): Observable<Group[]>{
    return this.http.get<Group[]>(`${USER_MNG_URL}/groups/`, httpOptionsJSON);
  }

  createGroup(name: string): Observable<Group> {
    return this.http.post<Group>(`${USER_MNG_URL}/groups/`, {name: name}, httpOptionsJSON);
  }

  deleteGroup(groupId: number): Observable<any> {
    return this.http.delete(`${USER_MNG_URL}/groups/${groupId}`, httpOptionsJSON);
  }
}
