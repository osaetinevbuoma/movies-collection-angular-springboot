package com.modnsolutions.moviedb_app_server.repository;

import com.modnsolutions.moviedb_app_server.entity.Genre;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface GenreRepository extends JpaRepository<Genre, Integer> {
    Optional<Genre> findById(Integer id);
    Optional<Genre> findByName(String name);
}
