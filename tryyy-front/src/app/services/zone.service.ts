import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Zone } from '../models/zone';

@Injectable({
  providedIn: 'root'
})
export class ZoneService {
  private baseUrl = 'http://localhost:8092/zones';

  constructor(private http: HttpClient) {}

  updateZone(postId: number, zone: Zone): Observable<Zone> {
    return this.http.put<Zone>(`${this.baseUrl}/${zone.id}`, zone).pipe(
      catchError(this.handleError)
    );
  }

  deleteZone(zoneId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${zoneId}`).pipe(
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
