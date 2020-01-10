import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ErrorService } from '../error/error.service';
import { Movie } from '../../model/Movie';

@Injectable({
    providedIn: 'root'
})
export class MovieService {
    private MOVIE_SERVER_URL = 'http://localhost:8080/api/movie';

    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    movies: Movie[] = []; // for caching downloaded movies
    page = 0; // for caching current page

    constructor(private http: HttpClient, private errorService: ErrorService) { }

    listFavoriteMovies(): Observable<any> {
        return this.http.get(`${this.MOVIE_SERVER_URL}/favorites`);
    }

    /**
     * Get favorite movie detail
     * @param id id of movie
     */
    getFavoriteMovie(id: number): Observable<any> {
        return this.http.get(`${this.MOVIE_SERVER_URL}/favorite/${id}`)
            .pipe(catchError(this.errorService.handleError('fetchMovieDetail')));
    }

    addToFavorite(movie: Movie): Observable<any> {
        return this.http.post(`${this.MOVIE_SERVER_URL}/favorite/add`, movie, this.httpOptions)
            .pipe(catchError(this.errorService.handleError('fetchMovieDetail')));
    }

    removeFromFavorite(id: number): Observable<any> {
        return this.http.delete(`${this.MOVIE_SERVER_URL}/favorite/remove/${id}`,
                this.httpOptions)
            .pipe(catchError(this.errorService.handleError('fetchMovieDetail')));
    }
}
