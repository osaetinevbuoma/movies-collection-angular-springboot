package com.modnsolutions.moviedb_app_server.entity;

import lombok.Data;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Data
@Entity
public class Movie {

    @Id
    @Column(nullable = false)
    private Integer id;

    @Column(nullable = false)
    private String backdropPath;

    @Column
    private Double budget;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false, length = 30000)
    private String overview;

    @Column(nullable = false)
    private String posterPath;

    @Column
    private Integer runtime;

    @Column(nullable = false)
    private Date releaseDate;

    @Column
    private String status;

    @Column
    private Double voteAverage;

    @Column
    private String homepage;

    @Column
    private Boolean isFavorite;

    @ManyToMany
    @JoinTable(name = "movie_genres", joinColumns = @JoinColumn(name = "movie_id"),
            inverseJoinColumns = @JoinColumn(name = "genre_id"))
    private List<Genre> genres;

    public Movie() {
    }

    public Movie(Integer id, String backdropPath, String title, String overview, String posterPath,
                 Date releaseDate) {
        this.id = id;
        this.backdropPath = backdropPath;
        this.title = title;
        this.overview = overview;
        this.posterPath = posterPath;
        this.releaseDate = releaseDate;
    }
}
