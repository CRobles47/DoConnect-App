package com.doconnect.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.doconnect.entity.Email;
import com.doconnect.entity.User;

import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class EmailController {
	
	@Autowired
	private JavaMailSender javaMailSender;
	private final UserController userController;
	
	@Value("${spring.mail.username}") private String sender;
	
	@PostMapping("/api/sendemail")
	public void sendEmail(@RequestBody Email email) throws MessagingException{
		
		List<User> admins = userController.getUserByType("admin");
		
		admins.forEach(admin -> {
			SimpleMailMessage message = new SimpleMailMessage();
			message.setFrom(sender);
			message.setTo(admin.getEmail());
			message.setSubject(email.getSubject());
			message.setText(email.getMessage() + "\nhttp://localhost:4200/login");
			javaMailSender.send(message);
		});
		
	}
}