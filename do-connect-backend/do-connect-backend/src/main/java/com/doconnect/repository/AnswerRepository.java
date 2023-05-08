package com.doconnect.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.doconnect.entity.Answer;

@Repository
public interface AnswerRepository extends JpaRepository<Answer, Integer>{
	
	@Query(value = "SELECT a FROM Answer a JOIN a.question q WHERE a.question.id = :q_id")
	List<Answer> findAllByQuestion(Integer q_id);
}