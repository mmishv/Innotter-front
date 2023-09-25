import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, switchMap} from 'rxjs';
import env from "../../../environments/.env";
import {UserService} from "./user.service";
import {PageService} from "./page.service";
import {Post} from "../model/post.model";

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

  getUserNewsFeed(): Observable<Post[]> {
    return this.userService.getCurrentUserData().pipe(
      switchMap((userData) => {
        const userId = userData.id;
        const newsFeedUrl = INNOTTER_URL + `/users/${userId}/news/`;
        return this.http.get<Post[]>(newsFeedUrl, httpOptionsJSON);
      })
    );
  }
  createPost(text: string): Observable<Post> {
    let pageId = this.pageService.getSelectedPageId()
    return this.http.post<Post>(INNOTTER_URL + `/pages/${pageId}/posts/`, {content: text}, httpOptionsJSON);
  }
  getPost(pageId: string, postId: string): Observable<Post> {
    return this.http.get<Post>(INNOTTER_URL + `/pages/${pageId}/posts/${postId}/`, httpOptionsJSON);
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

  createReply(pageId: string, postId: string, text: string): Observable<Post> {
    return this.http.post<Post>(INNOTTER_URL + `/pages/${pageId}/posts/${postId}/reply/`, {content: text}, httpOptionsJSON);
  }

  getLikes() {
    return this.userService.getCurrentUserData().pipe(switchMap((userData) => {
      const userId = userData.id;
      const userLikesUrl = INNOTTER_URL + `/users/${userId}/likes/`;
      return this.http.get<Post[]>(userLikesUrl, httpOptionsJSON);
    }));
  }
}
