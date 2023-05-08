package com.doconnect.controller;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.doconnect.entity.ChatMessage;
import com.doconnect.entity.ChatRoom;
import com.doconnect.repository.ChatMessageRepository;
import com.doconnect.repository.ChatRoomRepository;

@RestController
@RequestMapping("/api")
public class ChatController {
	
	private SimpMessagingTemplate messagingTemplate;
	private ChatMessageRepository chatMessageRepository;
	private ChatRoomRepository chatRoomRepository;
	
	@MessageMapping("/chat/{to}")
	public void sendMessage(@DestinationVariable String to, ChatMessage chatMessage) {
		chatMessage.setChatId(createOrGetChat(to));
		chatMessage.setDatetime(String.valueOf(new Date()));
		chatMessage = chatMessageRepository.save(chatMessage);
		messagingTemplate.convertAndSend("/topic/messages/" + to, chatMessage);
	}

    
    private String createOrGetChat(String name) {
    	ChatRoom chatRoom = chatRoomRepository.findByName(name);
    	
    	if(chatRoom != null) {
    		return chatRoom.getId();
    	} else {
    		ChatRoom newChatRoom = new ChatRoom(name);
    		return chatRoomRepository.save(newChatRoom).getId();
    	}
    }
}
