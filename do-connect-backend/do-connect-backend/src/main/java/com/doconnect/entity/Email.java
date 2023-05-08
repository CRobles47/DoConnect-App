package com.doconnect.entity;

import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
public class Email {
	private String recipient;
	private String subject;
	private String message;
}
