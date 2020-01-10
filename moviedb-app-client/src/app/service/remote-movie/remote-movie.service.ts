import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ErrorService } from '../error/error.service';

@Injectable({
    providedIn: 'root'
})
export class RemoteMovieService {
    private THE_MOVIE_DB_URL = 'https://api.themoviedb.org/3/movie';
    private API_KEY = '<YOUR_MOVIE_DB_API_KEY>';

    constructor(private http: HttpClient, private errorService: ErrorService) { }

    fetchNowPlaying(page: number = 1): Observable<any> {
        return this.http.get<any>(`${this.THE_MOVIE_DB_URL}/now_playing?api_key=${this.API_KEY}&page=${page}`)
            .pipe(catchError(this.errorService.handleError('fetchNowPlaying')));
    }

    fetchMovieDetail(id: number): Observable<any> {
        return this.http.get<any>(`${this.THE_MOVIE_DB_URL}/${id}?api_key=${this.API_KEY}`)
            .pipe(catchError(this.errorService.handleError('fetchMovieDetail')));
    }
}
