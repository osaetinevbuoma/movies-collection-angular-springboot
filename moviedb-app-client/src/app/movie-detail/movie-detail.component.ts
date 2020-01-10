import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { MovieService } from '../service/movie/movie.service';
import { RemoteMovieService } from '../service/remote-movie/remote-movie.service';
import { Movie } from '../model/Movie';

@Component({
    selector: 'app-movie-detail',
    templateUrl: './movie-detail.component.html',
    styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {
    movie: Movie;

    constructor(private movieService: MovieService, private remoteMovieService: RemoteMovieService,
                private route: ActivatedRoute, private location: Location) { }

    ngOnInit() {
        this.getMovieDetails();
    }

    getMovieDetails(): void {
        const id = +this.route.snapshot.paramMap.get('id');
        this.movieService.getFavoriteMovie(id).subscribe(movie => {
            if (movie === null) {
                this.remoteMovieService.fetchMovieDetail(id).subscribe(remoteMovie => {
                    this.movie = {
                        backdropPath: remoteMovie['backdrop_path'],
                        id: remoteMovie['id'],
                        posterPath: remoteMovie['poster_path'],
                        voteAverage: remoteMovie['vote_average'],
                        overview: remoteMovie['overview'],
                        releaseDate: remoteMovie['release_date'],
                        title: remoteMovie['title'],
                        budget: remoteMovie['budget'],
                        runtime: remoteMovie['runtime'],
                        status: remoteMovie['status'],
                        homepage: remoteMovie['homepage'],
                        isFavorite: false,
                        genres: remoteMovie['genres']
                    };
                });
            } else {
                this.movie = movie;
            }
        });
    }

    addToFavorite(movie: Movie): void {
        this.movieService.addToFavorite(movie).subscribe(newMovie => {
            this.movie = newMovie;
        });
    }

    removeFromFavorite(id: number): void {
        this.movieService.removeFromFavorite(id).subscribe(res => this.movie.isFavorite = false);
    }

    goBack(): void {
        this.location.back();
    }

}
