import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable, BehaviorSubject, of} from 'rxjs';
import env from "../../../environments/.env";
import {Page} from "../model/page.model";
import {Statistics} from "../model/statistics.model";
import {Tag} from "../model/tag.model";
import {Group} from "../model/group.model";

const INNOTTER_URL = env.innotterUrl;
const STATISTICS_URL = env.statisticsUrl;

const httpOptionsJSON = {
  headers: new HttpHeaders({'Content-Type': 'application/json; charset=UTF-8'})
};

@Injectable({
  providedIn: 'root'
})
export class PageService {
  private currentPageSubject = new BehaviorSubject<any>(null);
  private currentPageStatisticsSubject = new BehaviorSubject<any>(null);
  currentPage$: Observable<Page> = this.currentPageSubject.asObservable();
  currentPageStatistics$: Observable<Statistics> = this.currentPageStatisticsSubject.asObservable();

  constructor(private http: HttpClient) {
  }

  getUserPages(userId = ''): Observable<Page[]> {
    if (userId != '') {
      return this.http.get<Page[]>(INNOTTER_URL + `/pages/user/?user_uuid=${userId}`, httpOptionsJSON)
    } else {
      return this.http.get<Page[]>(INNOTTER_URL + `/pages/user/`, httpOptionsJSON);
    }
  }

  createPage(name: string, description: string): Observable<Page> {
    return this.http.post<Page>(INNOTTER_URL + '/pages/', {
      name: name, description: description
    }, httpOptionsJSON);
  }

  updatePageMainInfo(name: string, description: string, uuid: string): Observable<any> {
    const pageId = this.getSelectedPageId();
    if (pageId) {
      const body = {name: name, description: description, uuid: uuid};
      return this.http.patch<any>(INNOTTER_URL + `/pages/${pageId}/`, body, httpOptionsJSON);
    }
    return of(null);
  }

  uploadImage(imageFile: File): Observable<any> {
    const pageId = this.getSelectedPageId();
    const formData = new FormData();
    formData.append('file', imageFile);
    return this.http.patch(`${INNOTTER_URL}/pages/${pageId}/upload_image/`, formData);
  }

  loadCurrentPage() {
    const pageId = this.getSelectedPageId();
    if (pageId) {
      return this.loadPage(pageId);
    } else {
      this.currentPageSubject.next(null);
    }
  }

  loadPage(pageId: string) {
    this.http.get<Page>(INNOTTER_URL + `/pages/${pageId}/`, httpOptionsJSON).subscribe((data) => {
      this.currentPageSubject.next(data);
    });
  }

  loadStatistics() {
    const pageId = this.getSelectedPageId();
    if (pageId) {
      this.http.get<Statistics>(STATISTICS_URL + `/statistics/${pageId}/`, httpOptionsJSON).subscribe((data) => {
        this.currentPageStatisticsSubject.next(data);
      });
    } else {
      this.currentPageStatisticsSubject.next(null);
    }
  }

  selectPage(pageId: string) {
    localStorage.setItem('selectedPage', pageId);
    this.loadCurrentPage();
    this.loadStatistics();
  }

  getSelectedPageId() {
    return localStorage.getItem('selectedPage');
  }

  changeVisibility(): Observable<any> {
    const pageId = this.getSelectedPageId();
    return this.http.patch(`${INNOTTER_URL}/pages/${pageId}/toggle_visibility/`, httpOptionsJSON);
  }

  getTags(): Observable<Tag[]> {
    return this.http.get<Tag[]>(`${INNOTTER_URL}/tags/`);
  }

  addTagToPage(tagName: string): Observable<any> {
    const pageId = this.getSelectedPageId();
    return this.http.patch(`${INNOTTER_URL}/pages/${pageId}/add_tag/`, {name: tagName}, httpOptionsJSON);
  }

  removeTagFromPage(tagName: string): Observable<any> {
    const pageId = this.getSelectedPageId();
    return this.http.patch(`${INNOTTER_URL}/pages/${pageId}/remove_tag/`, {name: tagName}, httpOptionsJSON);
  }

  acceptRequest(userUuid: string): Observable<any> {
    const pageId = this.getSelectedPageId();
    return this.http.post(`${INNOTTER_URL}/pages/${pageId}/accept_request/`, {request: userUuid}, httpOptionsJSON);
  }

  rejectRequest(userUuid: string): Observable<any> {
    const pageId = this.getSelectedPageId();
    return this.http.post(`${INNOTTER_URL}/pages/${pageId}/reject_request/`, {request: userUuid}, httpOptionsJSON);
  }

  acceptAllRequests(): Observable<any> {
    const pageId = this.getSelectedPageId();
    return this.http.post(`${INNOTTER_URL}/pages/${pageId}/accept_all_requests/`, httpOptionsJSON);
  }

  rejectAllRequests(): Observable<any> {
    const pageId = this.getSelectedPageId();
    return this.http.post(`${INNOTTER_URL}/pages/${pageId}/reject_all_requests/`, httpOptionsJSON);
  }

  searchPage(field: string): Observable<Page[]> {
    return this.http.get<Page[]>(`${INNOTTER_URL}/pages/?search=${field}`, httpOptionsJSON);
  }

  subscribe(pageId: string): Observable<any> {
    return this.http.post(`${INNOTTER_URL}/pages/${pageId}/subscribe/`, httpOptionsJSON);
  }

  unsubscribe(pageId: string): Observable<any> {
    return this.http.post(`${INNOTTER_URL}/pages/${pageId}/unsubscribe/`, httpOptionsJSON);
  }

  setPageBlockPeriod(pageId: string, period: number = -1): Observable<any> {
    let params = new HttpParams();
    if (period != -1) {
      params = params.set('days', period);
    }
    return this.http.patch(`${INNOTTER_URL}/pages/${pageId}/block/`, {}, {headers: httpOptionsJSON.headers, params});
  }

  createTag(name: string): Observable<Group> {
    return this.http.post<Group>(`${INNOTTER_URL}/tags/`, {name: name}, httpOptionsJSON);
  }

  deleteTag(tagId: number): Observable<any> {
    return this.http.delete(`${INNOTTER_URL}/tags/${tagId}`, httpOptionsJSON);
  }
}

