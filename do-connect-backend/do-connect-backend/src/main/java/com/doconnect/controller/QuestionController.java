package com.doconnect.controller;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.doconnect.entity.Question;
import com.doconnect.service.QuestionService;


@RestController
@RequestMapping("/api/question")
public class QuestionController {
	
	private static String UPLOAD_FOLDER = "C://Users//drzli//Cogent//MavenWorkspace//do-connect-backend//do-connect-backend//images";
	
	@Autowired
	private QuestionService questionService;
	
	@GetMapping("/getall")
	public ResponseEntity<List<Question>> getAllQuestions() {
		return ResponseEntity.ok(questionService.getAllQuestions());
	}
	
	@GetMapping("/{id}")
	public Optional<Question> getQuestionById(@PathVariable(value="id") Integer id) {
		return this.questionService.getById(id);
	}
	
	@GetMapping("/getall/bycategory/{name}")
	public List<Question> getByCategory(@PathVariable(value="name") String categoryName){
		return this.questionService.getByCategory(categoryName);
	}
	
	@GetMapping("/getall/bykeyword/{name}")
	public List<Question> getByKeyword(@PathVariable(value="name") String keyword){
		return this.questionService.getByKeyword(keyword);
	}
	
	@PostMapping("/add")
	public Question addQuestion(@Validated @RequestBody Question question) {
		return this.questionService.save(question);
	}
	
	@PutMapping("/update/{id}")
	public Question updateQuestion(
			@PathVariable(value="id") Integer id, 
			@Validated @RequestBody Question updatedQuestion){
		return this.questionService.update(id, updatedQuestion);
	}
	
	@DeleteMapping("/delete/{id}")
	public String deleteQuestion(@PathVariable(value="id") Integer id) {
		return this.questionService.delete(id);
	}
	
	@PostMapping("/uploadimg")
	public ResponseEntity<String> uploadImage(@RequestParam("file") MultipartFile file){
		if(file != null && !file.isEmpty()) {
			try {
				String filename = file.getOriginalFilename();
				Path path = Paths.get(UPLOAD_FOLDER + filename);
				Files.write(path, file.getBytes());
				
				return ResponseEntity.ok("File was uploaded successfully");
			} catch(Exception e) {
				return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to upload file");
			}
		} else {
			return ResponseEntity.ok("No File was uploaded");
		}
	
	}
}
