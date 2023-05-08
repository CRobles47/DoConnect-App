package com.doconnect.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.doconnect.entity.Question;
import com.doconnect.repository.QuestionRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class QuestionService {
	
	@Autowired
	private final QuestionRepository questionRepository;

	public List<Question> getAllQuestions() {
		return this.questionRepository.findAll();
	}

	public Optional<Question> getById(Integer id) {
		return this.questionRepository.findById(id);
	}

	public List<Question> getByCategory(String category) {
		return this.questionRepository.findByCategory(category);
	}

	public Question save(Question question) {
		return this.questionRepository.save(question);
	}

	public Question update(Integer id, Question updatedQuestion) {
		Question question = this.questionRepository.findById(id).orElse(null);
		question = updatedQuestion;
		return this.questionRepository.save(question);
	}

	public String delete(Integer id) {
		Question question = this.questionRepository.findById(id).orElse(null);
		this.questionRepository.delete(question);
		return "Delete was successful!";
	}
	
	public List<Question> getByKeyword(String keyword) {
		return this.questionRepository.findByQuestionBodyContaining(keyword);
	}
	
}
