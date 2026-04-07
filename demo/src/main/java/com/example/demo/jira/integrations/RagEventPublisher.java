package com.example.demo.jira.integrations;

import com.example.demo.jira.config.RabbitConfig;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class RagEventPublisher {
    private final RabbitTemplate rabbitTemplate;
    private final static Logger log = LoggerFactory.getLogger(RagEventPublisher.class);

    public void publish(String routingKey,Object payload){
        rabbitTemplate.convertAndSend(RabbitConfig.RAG_EXCHANGE,routingKey,payload);
        log.info("Published : {}",routingKey);
    }
}
