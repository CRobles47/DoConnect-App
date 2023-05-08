package com.doconnect.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.doconnect.entity.Answer;
import com.doconnect.repository.AnswerRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AnswerService {
	
	@Autowired
	private AnswerRepository answerRepository;

	public List<Answer> getAllAnswers() {
		return this.answerRepository.findAll();
	}

	public Answer save(Answer answer) {
		return this.answerRepository.save(answer);
	}
	
	public Optional<Answer> getById(Integer id){
		return this.answerRepository.findById(id);
	}

	public Answer update(Integer id, Answer updatedAnswer) {
		Answer answer = this.answerRepository.findById(id).orElse(null);
		answer = updatedAnswer;
		return this.answerRepository.save(answer);
	}

	public String delete(Integer id) {
		Answer answer = this.answerRepository.findById(id).orElse(null);
		this.answerRepository.delete(answer);
		return "Successfully Deleted!" + answer.getId();
	}

	public List<Answer> getAllByQuestionId(Integer id) {
		return this.answerRepository.findAllByQuestion(id);
	}

}
