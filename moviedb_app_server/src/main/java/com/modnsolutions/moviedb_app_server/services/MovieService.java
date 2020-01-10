package com.modnsolutions.moviedb_app_server.services;

import com.modnsolutions.moviedb_app_server.entity.Genre;
import com.modnsolutions.moviedb_app_server.entity.Movie;
import com.modnsolutions.moviedb_app_server.repository.GenreRepository;
import com.modnsolutions.moviedb_app_server.repository.MovieRepository;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.logging.Logger;

@Service
public class MovieService {
    private final GenreRepository genreRepository;
    private final MovieRepository movieRepository;

    private final static Logger log = Logger.getLogger(MovieService.class.getName());

    public MovieService(GenreRepository genreRepository, MovieRepository movieRepository) {
        this.genreRepository = genreRepository;
        this.movieRepository = movieRepository;
    }

    private Map<String, Object> buildMovieMap(Movie movie) {
        List<Map<String, Object>> genreList = new ArrayList<>();

        Map<String, Object> map = new HashMap<>();
        map.put("id", movie.getId());
        map.put("backdropPath", movie.getBackdropPath());
        map.put("budget", movie.getBudget());
        map.put("title", movie.getTitle());
        map.put("overview", movie.getOverview());
        map.put("posterPath", movie.getPosterPath());
        map.put("runtime", movie.getRuntime());
        map.put("releaseDate", movie.getReleaseDate());
        map.put("status", movie.getStatus());
        map.put("voteAverage", movie.getVoteAverage());
        map.put("homepage", movie.getHomepage());
        map.put("isFavorite", movie.getIsFavorite());
        movie.getGenres().forEach(genre -> {
            Map<String, Object> genreMap = new HashMap<>();
            genreMap.put("id", genre.getId());
            genreMap.put("name", genre.getName());

            genreList.add(genreMap);
        });
        map.put("genres", genreList);

        return map;
    }

    public List<Map<String, Object>> favorites() {
        List<Map<String, Object>> favoriteList = new ArrayList<>();
        List<Movie> movies = movieRepository.findAllByIsFavoriteIsTrue();
        movies.forEach(movie -> favoriteList.add(buildMovieMap(movie)));

        return favoriteList;
    }

    public Movie addToFavorite(Movie movie) {
        movie.getGenres().forEach(genre -> {
            if (!movieRepository.findById(genre.getId()).isPresent()) {
                genre = new Genre(genre.getId(), genre.getName());
                genreRepository.save(genre);
            }
        });

        movie.setIsFavorite(true);
        movieRepository.save(movie);
        return movie;
    }

    public void removeFromFavorite(int id) {
        Optional<Movie> movie = movieRepository.findById(id);
        movie.ifPresent(movieRepository::delete);
    }

    public Map<String, Object> getMovieDetails(int id) {
        Map<String, Object> movieObj = new HashMap<>();
        List<Map<String, Object>> genreList = new ArrayList<>();
        Optional<Movie> movieOptional = movieRepository.findById(id);

        return movieOptional.map(this::buildMovieMap).orElse(null);

    }
}
