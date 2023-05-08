package com.doconnect.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import com.doconnect.entity.Question;

public interface QuestionRepository extends JpaRepository<Question, Integer>{
	
	List<Question> findByCategory(@Param("category") String category);
	
	List<Question> findByQuestionBodyContaining(@Param("name") String name);
}
