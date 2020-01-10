package com.modnsolutions.moviedb_app_server.controller;

import com.modnsolutions.moviedb_app_server.entity.Movie;
import com.modnsolutions.moviedb_app_server.services.MovieService;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.logging.Logger;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping(value = "/api/movie")
public class MovieController {
    private final MovieService movieService;
    private final static Logger log = Logger.getLogger(MovieController.class.getName());

    public MovieController(MovieService movieService) {
        this.movieService = movieService;
    }

    @GetMapping(value = "/favorites", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Map<String, Object>> favorites() {
        return movieService.favorites();
    }

    @PostMapping(value = "/favorite/add", consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public Movie addToFavorite(@RequestBody Movie movie) {
        return movieService.addToFavorite(movie);
    }

    @DeleteMapping(value = "/favorite/remove/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> removeFromFavorite(@PathVariable("id") int id) {
        movieService.removeFromFavorite(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping(value = "/favorite/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public Map<String, Object> movieDetails(@PathVariable("id") int id) {
        return movieService.getMovieDetails(id);
    }
}
