package com.doconnect.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.doconnect.entity.Answer;
import com.doconnect.service.AnswerService;

@RestController
@RequestMapping("/api/answer")
public class AnswerController {
	
	@Autowired
	private AnswerService answerService;
	
	@GetMapping("/getall")
	public ResponseEntity<List<Answer>> getAllAnswers() {
		return ResponseEntity.ok(answerService.getAllAnswers());
	}
	
	@GetMapping("/{id}")
	public Optional<Answer> getAnswerById(@PathVariable(value="id") Integer id) {
		return this.answerService.getById(id);
	}
	
	@GetMapping("/getall/byquestion/{id}")
	public List<Answer> getAllByQuestionId(@PathVariable(value="id") Integer id){
		return this.answerService.getAllByQuestionId(id);
	}
	
	@PostMapping("/add")
	public Answer addAnswer(@Validated @RequestBody Answer answer) {
		return this.answerService.save(answer);
	}
	
	@PutMapping("/update/{id}")
	public Answer updateAnswer(
			@PathVariable(value="id") Integer id, 
			@Validated @RequestBody Answer updatedAnswer){
		return this.answerService.update(id, updatedAnswer);
	}
	
	@DeleteMapping("/delete/{id}")
	public String deleteAnswer(@PathVariable(value="id") Integer id) {
		return this.answerService.delete(id);
	}
	
}
