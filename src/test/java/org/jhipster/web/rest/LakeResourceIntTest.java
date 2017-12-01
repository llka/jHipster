package org.jhipster.web.rest;

import org.jhipster.FishingApp;

import org.jhipster.domain.Lake;
import org.jhipster.repository.LakeRepository;
import org.jhipster.service.LakeService;
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

/**
 * Test class for the LakeResource REST controller.
 *
 * @see LakeResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = FishingApp.class)
public class LakeResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final Integer DEFAULT_AVERAGE_DEPTH = 1;
    private static final Integer UPDATED_AVERAGE_DEPTH = 2;

    private static final Integer DEFAULT_MAX_DEPTH = 1;
    private static final Integer UPDATED_MAX_DEPTH = 2;

    @Autowired
    private LakeRepository lakeRepository;

    @Autowired
    private LakeService lakeService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restLakeMockMvc;

    private Lake lake;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final LakeResource lakeResource = new LakeResource(lakeService);
        this.restLakeMockMvc = MockMvcBuilders.standaloneSetup(lakeResource)
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
    public static Lake createEntity(EntityManager em) {
        Lake lake = new Lake()
            .name(DEFAULT_NAME)
            .averageDepth(DEFAULT_AVERAGE_DEPTH)
            .maxDepth(DEFAULT_MAX_DEPTH);
        return lake;
    }

    @Before
    public void initTest() {
        lake = createEntity(em);
    }

    @Test
    @Transactional
    public void createLake() throws Exception {
        int databaseSizeBeforeCreate = lakeRepository.findAll().size();

        // Create the Lake
        restLakeMockMvc.perform(post("/api/lakes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(lake)))
            .andExpect(status().isCreated());

        // Validate the Lake in the database
        List<Lake> lakeList = lakeRepository.findAll();
        assertThat(lakeList).hasSize(databaseSizeBeforeCreate + 1);
        Lake testLake = lakeList.get(lakeList.size() - 1);
        assertThat(testLake.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testLake.getAverageDepth()).isEqualTo(DEFAULT_AVERAGE_DEPTH);
        assertThat(testLake.getMaxDepth()).isEqualTo(DEFAULT_MAX_DEPTH);
    }

    @Test
    @Transactional
    public void createLakeWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = lakeRepository.findAll().size();

        // Create the Lake with an existing ID
        lake.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restLakeMockMvc.perform(post("/api/lakes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(lake)))
            .andExpect(status().isBadRequest());

        // Validate the Lake in the database
        List<Lake> lakeList = lakeRepository.findAll();
        assertThat(lakeList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = lakeRepository.findAll().size();
        // set the field null
        lake.setName(null);

        // Create the Lake, which fails.

        restLakeMockMvc.perform(post("/api/lakes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(lake)))
            .andExpect(status().isBadRequest());

        List<Lake> lakeList = lakeRepository.findAll();
        assertThat(lakeList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllLakes() throws Exception {
        // Initialize the database
        lakeRepository.saveAndFlush(lake);

        // Get all the lakeList
        restLakeMockMvc.perform(get("/api/lakes?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(lake.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].averageDepth").value(hasItem(DEFAULT_AVERAGE_DEPTH)))
            .andExpect(jsonPath("$.[*].maxDepth").value(hasItem(DEFAULT_MAX_DEPTH)));
    }

    @Test
    @Transactional
    public void getLake() throws Exception {
        // Initialize the database
        lakeRepository.saveAndFlush(lake);

        // Get the lake
        restLakeMockMvc.perform(get("/api/lakes/{id}", lake.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(lake.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.averageDepth").value(DEFAULT_AVERAGE_DEPTH))
            .andExpect(jsonPath("$.maxDepth").value(DEFAULT_MAX_DEPTH));
    }

    @Test
    @Transactional
    public void getNonExistingLake() throws Exception {
        // Get the lake
        restLakeMockMvc.perform(get("/api/lakes/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateLake() throws Exception {
        // Initialize the database
        lakeService.save(lake);

        int databaseSizeBeforeUpdate = lakeRepository.findAll().size();

        // Update the lake
        Lake updatedLake = lakeRepository.findOne(lake.getId());
        // Disconnect from session so that the updates on updatedLake are not directly saved in db
        em.detach(updatedLake);
        updatedLake
            .name(UPDATED_NAME)
            .averageDepth(UPDATED_AVERAGE_DEPTH)
            .maxDepth(UPDATED_MAX_DEPTH);

        restLakeMockMvc.perform(put("/api/lakes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedLake)))
            .andExpect(status().isOk());

        // Validate the Lake in the database
        List<Lake> lakeList = lakeRepository.findAll();
        assertThat(lakeList).hasSize(databaseSizeBeforeUpdate);
        Lake testLake = lakeList.get(lakeList.size() - 1);
        assertThat(testLake.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testLake.getAverageDepth()).isEqualTo(UPDATED_AVERAGE_DEPTH);
        assertThat(testLake.getMaxDepth()).isEqualTo(UPDATED_MAX_DEPTH);
    }

    @Test
    @Transactional
    public void updateNonExistingLake() throws Exception {
        int databaseSizeBeforeUpdate = lakeRepository.findAll().size();

        // Create the Lake

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restLakeMockMvc.perform(put("/api/lakes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(lake)))
            .andExpect(status().isCreated());

        // Validate the Lake in the database
        List<Lake> lakeList = lakeRepository.findAll();
        assertThat(lakeList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteLake() throws Exception {
        // Initialize the database
        lakeService.save(lake);

        int databaseSizeBeforeDelete = lakeRepository.findAll().size();

        // Get the lake
        restLakeMockMvc.perform(delete("/api/lakes/{id}", lake.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Lake> lakeList = lakeRepository.findAll();
        assertThat(lakeList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Lake.class);
        Lake lake1 = new Lake();
        lake1.setId(1L);
        Lake lake2 = new Lake();
        lake2.setId(lake1.getId());
        assertThat(lake1).isEqualTo(lake2);
        lake2.setId(2L);
        assertThat(lake1).isNotEqualTo(lake2);
        lake1.setId(null);
        assertThat(lake1).isNotEqualTo(lake2);
    }
}
