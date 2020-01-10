import { Component, OnInit } from '@angular/core';

import { MovieService } from '../service/movie/movie.service';
import { Movie } from '../model/Movie';

@Component({
    selector: 'app-favorite',
    templateUrl: './favorite.component.html',
    styleUrls: ['./favorite.component.css']
})
export class FavoriteComponent implements OnInit {
    movies: Movie[];

    constructor(private movieService: MovieService) { }

    ngOnInit() {
        this.listFavoriteMovies();
    }

    listFavoriteMovies(): void {
        this.movieService.listFavoriteMovies().subscribe(movies => this.movies = movies);
    }

    removeFromFavorite(movie: Movie): void {
        this.movies = this.movies.filter(m => m !== movie);
        this.movieService.removeFromFavorite(movie.id).subscribe();
    }

}
