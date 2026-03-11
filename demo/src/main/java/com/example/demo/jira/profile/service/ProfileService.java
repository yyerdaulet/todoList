package com.example.demo.jira.profile.service;

import com.example.demo.jira.log.LogExecutionTime;
import com.example.demo.jira.profile.dto.*;
import com.example.demo.jira.profile.model.ArticleEntity;
import com.example.demo.jira.profile.model.ProfileEntity;
import com.example.demo.jira.profile.mapper.ProfileMapper;
import com.example.demo.jira.profile.repo.ArticleRepository;
import com.example.demo.jira.profile.repo.ProfileRepository;
import com.example.demo.jira.profile.tool.TextBuilder;
import com.example.demo.jira.user.UserEntity;
import com.example.demo.jira.user.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.stream.Stream;


@AllArgsConstructor
@Service
public class ProfileService {
    private final ProfileRepository repository;
    private final UserRepository userRepository;
    private final ArticleRepository articleRepository;
    private final ProfileMapper mapper;
    private final FileStorageService fileService;
    private final OpenAlexService alexService;
    private final IEEExploreApi exploreService;
    private final TextBuilder textBuilder;

    public List<ArticleResponse> getArticles(Long id) {
        var profile = repository.findById(id).orElseThrow(
                () -> new EntityNotFoundException("Profile not found")
        );

        String orcid = profile.getOrcid();


        List<ArticleResponse> openAlexArticles = alexService.searchArticles(orcid);

        List<ArticleResponse> dbArticles = articleRepository.findAllByProfileId(id)
                .stream()
                .map(
                        (entity) -> new ArticleResponse(
                                entity.getDescription(),
                                entity.getAuthors(),
                                entity.getTitle(),
                                entity.getCitationCount(),
                                entity.getReferenced_works_count(),
                                entity.getDoi(),
                                entity.getPublication_year(),
                                entity.getId().toString()
                        )
                )
                .toList();



       return Stream.concat(dbArticles.stream(),openAlexArticles.stream()).toList();
    }


    @LogExecutionTime
    @GetMapping
    public List<ProfileResponse> getAllProfiles() {
        return repository.findAll().stream().map(mapper::toDomain).toList();
    }



    @LogExecutionTime()
    public ProfileResponse getProfileById(Long id) {
        ProfileEntity profile = repository
                .findById(id)
                .orElseThrow( () -> new EntityNotFoundException("Student Entity not found"));
        return mapper.toDomain(profile);
    }

    @Transactional
    @LogExecutionTime()
    public ProfileCreateResponse createProfile(@Valid ProfileCrReq profileToCreate) {

        UserEntity user = userRepository.findById(profileToCreate.user_id()).orElseThrow(
                () -> new EntityNotFoundException("User not found")
        );

        var newProfile = new ProfileEntity(
                null,
                profileToCreate.orcid(),
                profileToCreate.name(),
                profileToCreate.lastName(),
                profileToCreate.birthday(),
                profileToCreate.degree(),
                user
        );
        repository.save(newProfile);


        return mapper.toProfileCreateResponse(newProfile);
    }

    @Transactional
    @LogExecutionTime()
    @PutMapping
    public ProfileResponse updateProfile(Long id,
                                         @Valid ProfileRequest profileToUpdate) {
            var profile = repository.findById(id).orElseThrow(
                    () -> new EntityNotFoundException("Student not found")
            );

            profile.setName(profileToUpdate.name());
            profile.setLastName(profile.getLastName());
            profile.setBirthday(profileToUpdate.birthday());
            profile.setDegree(profileToUpdate.degree());

            repository.save(profile);
            return mapper.toDomain(profile);
    }

    @Transactional
    @LogExecutionTime()
    public void deleteStudent(Long id) {
        if(!repository.existsById(id)){
            throw new EntityNotFoundException("Profile not found ");
        }
        UserEntity user = userRepository.findById(id)
                        .orElseThrow(
                                () -> new EntityNotFoundException("User not found")
                        );
        user.setProfile(null);
        userRepository.save(user);
        repository.deleteById(id);

    }


    public ProfileFileResponse uploadProfilePhoto(Long id, MultipartFile file) throws IOException {
        ProfileEntity profile = repository.findById(id).orElseThrow(
                () ->  new EntityNotFoundException("Profile not found")
        );

        String fileName = fileService.saveFile(file);

        repository.save(profile);

        return mapper.toProfileFileResponse(id,fileName);
    }

    public ProfileFileResponse uploadProfileMedicalPage(Long id, MultipartFile file) throws IOException {
        ProfileEntity profile = repository.findById(id).orElseThrow(
                () -> new EntityNotFoundException("Student not found")
        );

        String fileName = fileService.saveFile(file);

        repository.save(profile);

        return mapper.toProfileFileResponse(id,fileName);
    }


    public ArticleResponse getArticle(String link) throws Exception {
        if(link.startsWith("W")){
            ArticleAlexFetch articleFromAlex = alexService.getArticle(link);

            String abstractText = textBuilder.BuildTextFromIndex(articleFromAlex.abstract_inverted_index());

            String authors = textBuilder.getAuthors(articleFromAlex.authorships());


            return new ArticleResponse(
                    abstractText,
                    authors,
                    articleFromAlex.title(),
                    articleFromAlex.cited_by_count(),
                    articleFromAlex.referenced_works_count(),
                    articleFromAlex.doi(),
                    articleFromAlex.publication_year(),
                    articleFromAlex.id()

            );
        }else if(link.matches("\\d+") && Long.parseLong(link) < 100){

            ArticleEntity article = articleRepository.findById(Long.parseLong(link))
                    .orElseThrow(
                            () -> new EntityNotFoundException("Article not found")
                    );
            System.out.println(article.getId().toString());
            return new ArticleResponse(
                    article.getDescription(),
                    article.getAuthors(),
                    article.getTitle(),
                    article.getCitationCount(),
                    article.getReferenced_works_count(),
                    article.getDoi(),
                    article.getPublication_year(),
                    article.getId().toString()
            );
        }
        return exploreService.getArticle(link);
    }



    public ArticleResponse createArticle(Long profile_id, ArticleResponse request) {
        ProfileEntity profile = repository.findById(profile_id).orElseThrow(
                () -> new EntityNotFoundException("Profile not found")
        );

        ArticleEntity article = new ArticleEntity(
                null,
                request.description(),
                request.authors(),
                request.title(),
                request.cited_by_count(),
                request.referenced_works_count(),
                request.doi(),
                request.publication_year(),
                profile
        );

        articleRepository.save(article);

        ArticleEntity article2 = articleRepository.findByDoi(request.doi());

        return new ArticleResponse(
                request.description(),
                request.authors(),
                request.title(),
                request.cited_by_count(),
                request.referenced_works_count(),
                request.doi(),
                request.publication_year(),
                article2.getId().toString()
        );
    }
}
