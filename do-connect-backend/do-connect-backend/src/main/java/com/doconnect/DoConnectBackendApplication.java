package com.doconnect;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.doconnect.repository.FileStorageRepository;

import jakarta.annotation.Resource;

@SpringBootApplication
public class DoConnectBackendApplication implements CommandLineRunner{

	@Resource
	FileStorageRepository fileRepository;
	
	public static void main(String[] args) {
		SpringApplication.run(DoConnectBackendApplication.class, args);
	}
	
	@Override
	public void run(String... args) throws Exception {
		fileRepository.init();
	}

}