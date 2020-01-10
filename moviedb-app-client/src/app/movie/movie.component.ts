import { Component, OnInit } from '@angular/core';

import { RemoteMovieService } from '../service/remote-movie/remote-movie.service';
import { Movie } from '../model/Movie';
import {MovieService} from '../service/movie/movie.service';

@Component({
    selector: 'app-movie',
    templateUrl: './movie.component.html',
    styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {
    movies: Movie[] = [];
    page = 1;
    loading = false;

    constructor(private remoteMovieService: RemoteMovieService, private movieService: MovieService) { }

    ngOnInit() {
        this.loadMovies();
    }

    /**
     * Initialize movies on page.
     * Load cached movies if user has been interacting with site
     * Only fetch movies if page number is different from cached page number.
     */
    loadMovies() {
        if (this.movieService.movies.length > 0) {
            this.movies = this.movieService.movies;
            this.page = this.movieService.page;
        }

        if (this.page !== this.movieService.page) {
            this.fetchMovies();
        }
    }

    /**
     * Fetch movies from remote server
     */
    fetchMovies() {
        console.log(this.page);
        this.remoteMovieService.fetchNowPlaying(this.page).subscribe(
            (data: any) => {
                for (let i = 0; i < data.results.length; i++) {
                    const result = data.results[i];
                    const movie: Movie = {
                        backdropPath: result['backdrop_path'],
                        id: result['id'],
                        posterPath: result['poster_path'],
                        voteAverage: result['vote_average'],
                        overview: result['overview'],
                        releaseDate: result['release_date'],
                        title: result['title'],
                        budget: 0,
                        runtime: 0,
                        status: '',
                        homepage: '',
                        isFavorite: false,
                        genres: []
                    };

                    this.movies.push(movie);
                }
            });
        this.page += 1;
        this.loading = false;

        // Store current fetch results so that returning to home page does not re-fetch items.
        this.movieService.movies = this.movies;
        this.movieService.page = this.page;
    }

    /**
     * Fetch more movies from remote server
     */
    fetchMoreMovies() {
        this.loading = true;
        this.fetchMovies();
    }

}
