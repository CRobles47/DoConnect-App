package com.doconnect.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.doconnect.entity.Token;

@Repository
public interface TokenRepository extends JpaRepository<Token, Integer>{

	@Query(value = "SELECT t FROM Token t JOIN t.user u WHERE t.user.id = :userId")
	List<Token> findAllTokensByUser(Integer userId);
	
	Optional<Token> findByToken(String token);
}
