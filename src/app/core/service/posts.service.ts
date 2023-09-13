import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, switchMap} from 'rxjs';
import env from "../../../environments/.env";
import {UserService} from "./user.service";
import {PageService} from "./page.service";

const INNOTTER_URL = env.innotterUrl;


const httpOptionsJSON = {
  headers: new HttpHeaders({'Content-Type': 'application/json; charset=UTF-8'})
};

@Injectable({
  providedIn: 'root'
})
export class PostService {
  constructor(private http: HttpClient, private userService: UserService, private pageService: PageService) {
  }

  getUserNewsFeed(): Observable<any> {
    return this.userService.getUserData().pipe(
      switchMap((userData) => {
        const userId = userData.id;
        const newsFeedUrl = INNOTTER_URL + `/users/${userId}/news/`;
        return this.http.get<any>(newsFeedUrl, httpOptionsJSON);
      })
    );
  }
  createPost(text: string): Observable<any> {
    let pageId = this.pageService.getSelectedPageId()
    return this.http.post<any>(INNOTTER_URL + `/pages/${pageId}/posts/`, {content: text}, httpOptionsJSON);
  }
  getPost(pageId: string, postId: string): Observable<any> {
    return this.http.get<any>(INNOTTER_URL + `/pages/${pageId}/posts/${postId}/`, httpOptionsJSON);
  }

  likePost(pageId: string, postId: string): Observable<any> {
    return this.http.patch<any>(INNOTTER_URL + `/pages/${pageId}/posts/${postId}/like/`, httpOptionsJSON);
  }
  unlikePost(pageId: string, postId: string): Observable<any> {
    return this.http.patch<any>(INNOTTER_URL + `/pages/${pageId}/posts/${postId}/unlike/`, httpOptionsJSON);
  }

  editPost(pageId: string, postId: string, new_content: string): Observable<any>{
    return this.http.patch<any>(INNOTTER_URL + `/pages/${pageId}/posts/${postId}/`, {content: new_content}, httpOptionsJSON);
  }

  deletePost(pageId: string, postId: string): Observable<any>{
    return this.http.delete<any>(INNOTTER_URL + `/pages/${pageId}/posts/${postId}/`, httpOptionsJSON);
  }

  createReply(pageId: string, postId: string, text: string): Observable<any> {
    return this.http.post<any>(INNOTTER_URL + `/pages/${pageId}/posts/${postId}/reply/`, {content: text}, httpOptionsJSON);
  }
}
