package com.doconnect.service;

import java.util.Optional;

import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.logout.LogoutHandler;
import org.springframework.stereotype.Service;

import com.doconnect.entity.Token;
import com.doconnect.repository.TokenRepository;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class LogoutService implements LogoutHandler {
	
	private final TokenRepository tokenRepository;
	
	@Override
	public void logout(HttpServletRequest request, HttpServletResponse response, Authentication authentication) {
		final String authHeader = request.getHeader("authorization");
		final String jwt;
		if(authHeader == null || !authHeader.startsWith("Bearer ")) {
			return;
		}
		jwt = authHeader.substring(7);
		Token token = tokenRepository.findByToken(jwt).orElse(null);
		if(token != null) {
			token.setExpired(true);
			token.setRevoked(true);
			tokenRepository.delete(token);
		}
	}
}
