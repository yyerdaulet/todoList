package com.example.demo.jira.tools;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.*;

@Component
@AllArgsConstructor
public class CollectionUtils {
    public static <T> Set<T> toSet(Collection<T> collection){
        return new HashSet<>(collection);
    }

    public static <T> List<T> toList(Collection<T> collection){
        return new ArrayList<>(collection);
    }
}
