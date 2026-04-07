package com.example.demo.jira.config;

import org.springframework.amqp.core.Queue;
import org.springframework.amqp.core.TopicExchange;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.support.converter.JacksonJsonMessageConverter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;


@Configuration
public class RabbitConfig {
    public static final String RAG_EXCHANGE = "rag.exchange";
    public static final String RAG_QUEUE = "rag.queue";


    @Bean
    public TopicExchange ragExchange(){
        return new TopicExchange(RAG_EXCHANGE);
    }

    @Bean
    public Queue ragQueue(){
        return new Queue(RAG_QUEUE,true);
    }

    @Bean
    public JacksonJsonMessageConverter messageConverter(){
        return new JacksonJsonMessageConverter();
    }

    @Bean
    public RabbitTemplate rabbitTemplate(ConnectionFactory cf,
                                         JacksonJsonMessageConverter converter){
        RabbitTemplate template = new RabbitTemplate(cf);

        template.setMessageConverter(converter);
        return template;
    }


}
