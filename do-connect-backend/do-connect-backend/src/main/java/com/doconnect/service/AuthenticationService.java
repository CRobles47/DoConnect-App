package com.doconnect.service;

import java.util.List;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.doconnect.config.auth.AuthenticationRequest;
import com.doconnect.config.auth.AuthenticationResponse;
import com.doconnect.config.auth.RegisterRequest;
import com.doconnect.entity.Role;
import com.doconnect.entity.Token;
import com.doconnect.entity.TokenType;
import com.doconnect.entity.User;
import com.doconnect.repository.TokenRepository;
import com.doconnect.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
	
	private final UserRepository userRepository;
	private final TokenRepository tokenRepository;
	private final PasswordEncoder passwordEncoder;
	private final JwtService jwtService;
	private final AuthenticationManager authenticationManager;
	
	/* Register new user, build user, save into db, generate token */
	
	public AuthenticationResponse register(RegisterRequest request) {
		User user = User.builder()
						.name(request.getName())
						.username(request.getUsername())
						.email(request.getEmail())
						.password(passwordEncoder.encode(request.getPassword()))
						.role(Role.valueOf(request.getRole().toUpperCase()))
						.build();
		
		User savedUser = userRepository.save(user);
		String jwtToken = jwtService.generateToken(user);
		saveUserToken(savedUser, jwtToken);
		return AuthenticationResponse.builder()
				.token(jwtToken)
				.build();
	}
	
	/* Authenticate existing user, generate token */
	
	public AuthenticationResponse authenticate(AuthenticationRequest request) {
		authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
				);
		User user = userRepository.findByUsername(request.getUsername())
				.orElseThrow();
		String jwtToken = jwtService.generateToken(user);
		deleteAllTokens(user);
		saveUserToken(user, jwtToken);
		return AuthenticationResponse.builder()
				.token(jwtToken)
				.build();
	}
	
	private void saveUserToken(User user, String jwtToken) {
		Token token = Token.builder()
							.user(user)
							.token(jwtToken)
							.tokenType(TokenType.BEARER)
							.revoked(false)
							.expired(false)
							.build();
		tokenRepository.save(token);
	}
	
	private void deleteAllTokens(User user) {
		List<Token> tokens = 
				tokenRepository.findAllTokensByUser(user.getId());
		if(tokens.isEmpty()) {
			return;
		}
		tokenRepository.deleteAll(tokens);
	}
}