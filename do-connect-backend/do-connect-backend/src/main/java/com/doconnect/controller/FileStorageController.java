package com.doconnect.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.doconnect.service.FileStorageService;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api/image")
public class FileStorageController {

	@Autowired
	FileStorageService fileService;
	
	@PostMapping("/upload")
	public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile file){
		
		try {
			fileService.save(file);
			
			return ResponseEntity.ok("Uploaded file successfully: " + file.getOriginalFilename());
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body("Could not upload the file: " + file.getOriginalFilename());
		}
	}
	
	@GetMapping("/files/{filename}")
	public ResponseEntity<Resource> getFile(@PathVariable String filename, HttpServletRequest request){
		Resource file = fileService.load(filename);
		
		String contentType = null;
		
		try {
			contentType = request.getServletContext().getMimeType(file.getFile().getAbsolutePath());
		} catch (Exception e) {
			throw new RuntimeException("Could not get file type");
		}
		
		return ResponseEntity.ok()
								.contentType(MediaType.parseMediaType(contentType))
								.header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getFilename() + "\"")
								.body(file);
	}
	
}
