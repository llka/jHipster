package org.jhipster.web.rest;

import org.jhipster.FishingApp;

import org.jhipster.domain.Fish;
import org.jhipster.repository.FishRepository;
import org.jhipster.service.FishService;
import org.jhipster.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

import static org.jhipster.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import org.jhipster.domain.enumeration.FishEatingType;
import org.jhipster.domain.enumeration.FishDepth;
/**
 * Test class for the FishResource REST controller.
 *
 * @see FishResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = FishingApp.class)
public class FishResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final FishEatingType DEFAULT_EATING_TYPE = FishEatingType.CARNIVORE;
    private static final FishEatingType UPDATED_EATING_TYPE = FishEatingType.OMNIVORE;

    private static final Integer DEFAULT_AVG_WEIGHT = 1;
    private static final Integer UPDATED_AVG_WEIGHT = 2;

    private static final Integer DEFAULT_MAX_WEIGHT = 1;
    private static final Integer UPDATED_MAX_WEIGHT = 2;

    private static final Integer DEFAULT_AVG_LENGTH = 1;
    private static final Integer UPDATED_AVG_LENGTH = 2;

    private static final Integer DEFAULT_MAX_LENGTH = 1;
    private static final Integer UPDATED_MAX_LENGTH = 2;

    private static final Integer DEFAULT_MAX_AGE = 1;
    private static final Integer UPDATED_MAX_AGE = 2;

    private static final FishDepth DEFAULT_SUMMER_DEPTH = FishDepth.SURFACE;
    private static final FishDepth UPDATED_SUMMER_DEPTH = FishDepth.TOP;

    @Autowired
    private FishRepository fishRepository;

    @Autowired
    private FishService fishService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restFishMockMvc;

    private Fish fish;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final FishResource fishResource = new FishResource(fishService);
        this.restFishMockMvc = MockMvcBuilders.standaloneSetup(fishResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Fish createEntity(EntityManager em) {
        Fish fish = new Fish()
            .name(DEFAULT_NAME)
            .description(DEFAULT_DESCRIPTION)
            .eatingType(DEFAULT_EATING_TYPE)
            .avgWeight(DEFAULT_AVG_WEIGHT)
            .maxWeight(DEFAULT_MAX_WEIGHT)
            .avgLength(DEFAULT_AVG_LENGTH)
            .maxLength(DEFAULT_MAX_LENGTH)
            .maxAge(DEFAULT_MAX_AGE)
            .summerDepth(DEFAULT_SUMMER_DEPTH);
        return fish;
    }

    @Before
    public void initTest() {
        fish = createEntity(em);
    }

    @Test
    @Transactional
    public void createFish() throws Exception {
        int databaseSizeBeforeCreate = fishRepository.findAll().size();

        // Create the Fish
        restFishMockMvc.perform(post("/api/fish")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(fish)))
            .andExpect(status().isCreated());

        // Validate the Fish in the database
        List<Fish> fishList = fishRepository.findAll();
        assertThat(fishList).hasSize(databaseSizeBeforeCreate + 1);
        Fish testFish = fishList.get(fishList.size() - 1);
        assertThat(testFish.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testFish.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testFish.getEatingType()).isEqualTo(DEFAULT_EATING_TYPE);
        assertThat(testFish.getAvgWeight()).isEqualTo(DEFAULT_AVG_WEIGHT);
        assertThat(testFish.getMaxWeight()).isEqualTo(DEFAULT_MAX_WEIGHT);
        assertThat(testFish.getAvgLength()).isEqualTo(DEFAULT_AVG_LENGTH);
        assertThat(testFish.getMaxLength()).isEqualTo(DEFAULT_MAX_LENGTH);
        assertThat(testFish.getMaxAge()).isEqualTo(DEFAULT_MAX_AGE);
        assertThat(testFish.getSummerDepth()).isEqualTo(DEFAULT_SUMMER_DEPTH);
    }

    @Test
    @Transactional
    public void createFishWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = fishRepository.findAll().size();

        // Create the Fish with an existing ID
        fish.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restFishMockMvc.perform(post("/api/fish")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(fish)))
            .andExpect(status().isBadRequest());

        // Validate the Fish in the database
        List<Fish> fishList = fishRepository.findAll();
        assertThat(fishList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = fishRepository.findAll().size();
        // set the field null
        fish.setName(null);

        // Create the Fish, which fails.

        restFishMockMvc.perform(post("/api/fish")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(fish)))
            .andExpect(status().isBadRequest());

        List<Fish> fishList = fishRepository.findAll();
        assertThat(fishList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllFish() throws Exception {
        // Initialize the database
        fishRepository.saveAndFlush(fish);

        // Get all the fishList
        restFishMockMvc.perform(get("/api/fish?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(fish.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].eatingType").value(hasItem(DEFAULT_EATING_TYPE.toString())))
            .andExpect(jsonPath("$.[*].avgWeight").value(hasItem(DEFAULT_AVG_WEIGHT)))
            .andExpect(jsonPath("$.[*].maxWeight").value(hasItem(DEFAULT_MAX_WEIGHT)))
            .andExpect(jsonPath("$.[*].avgLength").value(hasItem(DEFAULT_AVG_LENGTH)))
            .andExpect(jsonPath("$.[*].maxLength").value(hasItem(DEFAULT_MAX_LENGTH)))
            .andExpect(jsonPath("$.[*].maxAge").value(hasItem(DEFAULT_MAX_AGE)))
            .andExpect(jsonPath("$.[*].summerDepth").value(hasItem(DEFAULT_SUMMER_DEPTH.toString())));
    }

    @Test
    @Transactional
    public void getFish() throws Exception {
        // Initialize the database
        fishRepository.saveAndFlush(fish);

        // Get the fish
        restFishMockMvc.perform(get("/api/fish/{id}", fish.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(fish.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.eatingType").value(DEFAULT_EATING_TYPE.toString()))
            .andExpect(jsonPath("$.avgWeight").value(DEFAULT_AVG_WEIGHT))
            .andExpect(jsonPath("$.maxWeight").value(DEFAULT_MAX_WEIGHT))
            .andExpect(jsonPath("$.avgLength").value(DEFAULT_AVG_LENGTH))
            .andExpect(jsonPath("$.maxLength").value(DEFAULT_MAX_LENGTH))
            .andExpect(jsonPath("$.maxAge").value(DEFAULT_MAX_AGE))
            .andExpect(jsonPath("$.summerDepth").value(DEFAULT_SUMMER_DEPTH.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingFish() throws Exception {
        // Get the fish
        restFishMockMvc.perform(get("/api/fish/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateFish() throws Exception {
        // Initialize the database
        fishService.save(fish);

        int databaseSizeBeforeUpdate = fishRepository.findAll().size();

        // Update the fish
        Fish updatedFish = fishRepository.findOne(fish.getId());
        // Disconnect from session so that the updates on updatedFish are not directly saved in db
        em.detach(updatedFish);
        updatedFish
            .name(UPDATED_NAME)
            .description(UPDATED_DESCRIPTION)
            .eatingType(UPDATED_EATING_TYPE)
            .avgWeight(UPDATED_AVG_WEIGHT)
            .maxWeight(UPDATED_MAX_WEIGHT)
            .avgLength(UPDATED_AVG_LENGTH)
            .maxLength(UPDATED_MAX_LENGTH)
            .maxAge(UPDATED_MAX_AGE)
            .summerDepth(UPDATED_SUMMER_DEPTH);

        restFishMockMvc.perform(put("/api/fish")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedFish)))
            .andExpect(status().isOk());

        // Validate the Fish in the database
        List<Fish> fishList = fishRepository.findAll();
        assertThat(fishList).hasSize(databaseSizeBeforeUpdate);
        Fish testFish = fishList.get(fishList.size() - 1);
        assertThat(testFish.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testFish.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testFish.getEatingType()).isEqualTo(UPDATED_EATING_TYPE);
        assertThat(testFish.getAvgWeight()).isEqualTo(UPDATED_AVG_WEIGHT);
        assertThat(testFish.getMaxWeight()).isEqualTo(UPDATED_MAX_WEIGHT);
        assertThat(testFish.getAvgLength()).isEqualTo(UPDATED_AVG_LENGTH);
        assertThat(testFish.getMaxLength()).isEqualTo(UPDATED_MAX_LENGTH);
        assertThat(testFish.getMaxAge()).isEqualTo(UPDATED_MAX_AGE);
        assertThat(testFish.getSummerDepth()).isEqualTo(UPDATED_SUMMER_DEPTH);
    }

    @Test
    @Transactional
    public void updateNonExistingFish() throws Exception {
        int databaseSizeBeforeUpdate = fishRepository.findAll().size();

        // Create the Fish

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restFishMockMvc.perform(put("/api/fish")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(fish)))
            .andExpect(status().isCreated());

        // Validate the Fish in the database
        List<Fish> fishList = fishRepository.findAll();
        assertThat(fishList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteFish() throws Exception {
        // Initialize the database
        fishService.save(fish);

        int databaseSizeBeforeDelete = fishRepository.findAll().size();

        // Get the fish
        restFishMockMvc.perform(delete("/api/fish/{id}", fish.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Fish> fishList = fishRepository.findAll();
        assertThat(fishList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Fish.class);
        Fish fish1 = new Fish();
        fish1.setId(1L);
        Fish fish2 = new Fish();
        fish2.setId(fish1.getId());
        assertThat(fish1).isEqualTo(fish2);
        fish2.setId(2L);
        assertThat(fish1).isNotEqualTo(fish2);
        fish1.setId(null);
        assertThat(fish1).isNotEqualTo(fish2);
    }
}
