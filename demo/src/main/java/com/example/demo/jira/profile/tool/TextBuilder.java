package com.example.demo.jira.profile.tool;

import com.example.demo.jira.profile.dto.Authorship;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;

@Component
public class TextBuilder {
    public String BuildTextFromIndex(Map<String, List<Integer>> index){
        if(index == null){
            return null;
        }
        int max = index.values().stream()
                .flatMap(List::stream)
                .max(Integer::compareTo)
                .orElse(0);

        String[] words = new String[max+1];

        index.forEach((word,positions) -> {
            for(Integer p : positions){
                words[p] = word;
            }
        });

        return String.join(" ",words);


    }

    public String getAuthors(List<Authorship> authorships){
        List<String> authors = authorships
                .stream()
                .map(a -> a.author().display_name())
                .toList();

        return String.join(" ,", authors);

    }


}
