import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Post } from '../models/post';
import { Zone } from '../models/zone';
import { PetitPost } from '../models/petit-post';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private baseUrl = 'http://localhost:8092/posts';

  constructor(private http: HttpClient) {}

  // Méthodes pour les posts

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.baseUrl).pipe(
      catchError(this.handleError)
    );
  }

  getPost(id: number): Observable<Post> {
    return this.http.get<Post>(`${this.baseUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  createPost(post: Post): Observable<Post> {
    return this.http.post<Post>(this.baseUrl, post).pipe(
      catchError(this.handleError)
    );
  }

  updatePost(id: number | undefined, post: Post): Observable<Post> {
    return this.http.put<Post>(`${this.baseUrl}/${id}`, post).pipe(
      catchError(this.handleError)
    );
  }

  deletePost(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  // Méthodes pour les zones

  updateZone(postId: number | undefined, zone: Zone): Observable<Zone> {
    return this.http.put<Zone>(`${this.baseUrl}/${postId}/zones/${zone.id}`, zone).pipe(
      catchError(this.handleError)
    );
  }

  // Méthodes pour les petits posts

  updatePetitPost(postId: number | undefined, zoneId: number | undefined, petitPost: PetitPost): Observable<PetitPost> {
    return this.http.put<PetitPost>(`${this.baseUrl}/${postId}/zones/${zoneId}/petitPosts/${petitPost.id}`, petitPost).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Erreur côté client
      console.error('Une erreur s\'est produite :', error.error.message);
    } else {
      // Erreur côté serveur
      console.error(
        `Code d'erreur ${error.status}, ` +
        `Erreur : ${error.error}`
      );
    }
    // Renvoie une observable avec une erreur conviviale pour l'utilisateur
    return throwError('Une erreur s\'est produite. Veuillez réessayer plus tard.');
  }
}
