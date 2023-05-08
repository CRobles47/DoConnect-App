package com.doconnect.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.doconnect.entity.Role;
import com.doconnect.entity.User;
import com.doconnect.exception.UserNotFoundException;
import com.doconnect.repository.UserRepository;

import lombok.AllArgsConstructor;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/user")
@AllArgsConstructor
public class UserController {
	@Autowired
	private UserRepository userRepository;
	
	@PostMapping("/add")
	public User addUser(@Validated @RequestBody User user) {
		return this.userRepository.save(user);
	}
	
	@GetMapping("auth/getlogin")
	void getLogin() {
		
	}
	
	@GetMapping("/{id}")
	public User getUserById(@PathVariable(value="id") Integer id) throws UserNotFoundException{
		return this.userRepository.findById(id).orElse(null);
	}
	
	@PostMapping("/update/{id}")
	public User updateUser(@Validated @RequestBody User userUpdated, @PathVariable(value="id")Integer id) throws UserNotFoundException{
		User user = this.userRepository.findById(id).orElseThrow(()-> new UserNotFoundException(id));
		user = userUpdated;
		return this.userRepository.save(user);
	}
	
	@GetMapping("/getbyusername/{name}")
	public Optional<User> getUserByName(@PathVariable(value="name")String name) {
		Optional<User> user= this.userRepository.findByUsername(name);
		return user;
	}
	
	@GetMapping("/getbytype/{type}")
	public List<User> getUserByType(@PathVariable(value="type") String type){
		return this.userRepository.findByRole(Role.valueOf(type.toUpperCase()));
	}
	
	@GetMapping("auth/verifylogin")
	public void verifyLogin() {
		
	}
	
	@GetMapping("/getall")
	public List<User> getAllUsers(){
		return this.userRepository.findAll();
	}
	
}