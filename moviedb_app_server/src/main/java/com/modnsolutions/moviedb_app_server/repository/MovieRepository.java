package com.modnsolutions.moviedb_app_server.repository;

import com.modnsolutions.moviedb_app_server.entity.Movie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MovieRepository extends JpaRepository<Movie, Integer> {
    Optional<Movie> findById(Integer id);
    List<Movie> findAllByIsFavoriteIsTrue();
}
