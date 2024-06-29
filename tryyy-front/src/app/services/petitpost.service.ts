import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { PetitPost } from '../models/petit-post';

@Injectable({
  providedIn: 'root'
})
export class PetitPostService {
  private baseUrl = 'http://localhost:8092/petitPosts';

  constructor(private http: HttpClient) {}

  updatePetitPost(zoneId: number, petitPost: PetitPost): Observable<PetitPost> {
    return this.http.put<PetitPost>(`${this.baseUrl}/${petitPost.id}`, petitPost).pipe(
      catchError(this.handleError)
    );
  }
  deletePetitPost(petitPostId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${petitPostId}`).pipe(
      catchError(this.handleError)
    );
  }
  

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('Une erreur s\'est produite :', error.error.message);
    } else {
      console.error(
        `Code d'erreur ${error.status}, ` +
        `Erreur : ${error.error}`
      );
    }
    return throwError('Une erreur s\'est produite. Veuillez réessayer plus tard.');
  }
}
