import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PetitPost } from '../models/petit-post';

@Injectable({
  providedIn: 'root'
})
export class PetitPostService {
  private baseUrl = 'http://localhost:8092/petitPosts';

  constructor(private http: HttpClient) {}

 
  createPetitPost(zoneId: number, petitPost: PetitPost): Observable<PetitPost> {
    return this.http.post<PetitPost>(`${this.baseUrl}/zones/${zoneId}/petit-posts`, petitPost);
  }
  
  updatePetitPost(zoneId: number, petitPostId: number, petitPost: PetitPost): Observable<PetitPost> {
    return this.http.put<PetitPost>(`${this.baseUrl}/zones/${zoneId}/petit-posts/${petitPostId}`, petitPost);
  }
  

  deletePetitPost(petitPostId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${petitPostId}`);
  }
}
