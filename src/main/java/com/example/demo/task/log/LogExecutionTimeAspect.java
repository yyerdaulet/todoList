package com.example.demo.task.log;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class LogExecutionTimeAspect{
    private final static Logger log = LoggerFactory.getLogger(LogExecutionTimeAspect.class);
    @Around("@annotation(com.example.demo.task.annotation.LogExecutionTime)")
    public Object logExecutionTime(ProceedingJoinPoint pjt) throws Throwable{
        long startTime = System.nanoTime();
        try{
            return pjt.proceed();
        }finally{

            log.info("Method: {} executed in : {}ms",
                    pjt.getSignature().getName(),
                    System.nanoTime() - startTime
                    );
        }

    }
}