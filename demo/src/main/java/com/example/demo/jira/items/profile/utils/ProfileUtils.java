package com.example.demo.jira.items.profile.utils;

import lombok.experimental.UtilityClass;
import java.util.Collection;
import java.util.List;
import java.util.Objects;

@UtilityClass
public class ProfileUtils {
    public List<String>  fetchListORCID(
            Collection<? extends OrcidHolder> profiles
    ){
        return profiles.stream()
                .map(OrcidHolder::getOrcid)
                .filter(Objects::nonNull)
                .toList();
    }


}
