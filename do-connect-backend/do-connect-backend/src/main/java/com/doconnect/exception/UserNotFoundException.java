package com.doconnect.exception;

@SuppressWarnings("serial")
public class UserNotFoundException extends RuntimeException {
	
	public UserNotFoundException(Integer id){
		super("Could not find user with ID: " + id);
	}
	
	public UserNotFoundException(String username){
		super("Could not find user with username: " + username);
	}
	
}