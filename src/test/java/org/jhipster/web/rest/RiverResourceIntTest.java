package org.jhipster.web.rest;

import org.jhipster.FishingApp;

import org.jhipster.domain.River;
import org.jhipster.repository.RiverRepository;
import org.jhipster.service.RiverService;
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
 * Test class for the RiverResource REST controller.
 *
 * @see RiverResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = FishingApp.class)
public class RiverResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final Integer DEFAULT_AVERAGE_SPEED = 1;
    private static final Integer UPDATED_AVERAGE_SPEED = 2;

    private static final Integer DEFAULT_LENGTH_IN_KM = 1;
    private static final Integer UPDATED_LENGTH_IN_KM = 2;

    @Autowired
    private RiverRepository riverRepository;

    @Autowired
    private RiverService riverService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restRiverMockMvc;

    private River river;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final RiverResource riverResource = new RiverResource(riverService);
        this.restRiverMockMvc = MockMvcBuilders.standaloneSetup(riverResource)
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
    public static River createEntity(EntityManager em) {
        River river = new River()
            .name(DEFAULT_NAME)
            .averageSpeed(DEFAULT_AVERAGE_SPEED)
            .lengthInKm(DEFAULT_LENGTH_IN_KM);
        return river;
    }

    @Before
    public void initTest() {
        river = createEntity(em);
    }

    @Test
    @Transactional
    public void createRiver() throws Exception {
        int databaseSizeBeforeCreate = riverRepository.findAll().size();

        // Create the River
        restRiverMockMvc.perform(post("/api/rivers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(river)))
            .andExpect(status().isCreated());

        // Validate the River in the database
        List<River> riverList = riverRepository.findAll();
        assertThat(riverList).hasSize(databaseSizeBeforeCreate + 1);
        River testRiver = riverList.get(riverList.size() - 1);
        assertThat(testRiver.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testRiver.getAverageSpeed()).isEqualTo(DEFAULT_AVERAGE_SPEED);
        assertThat(testRiver.getLengthInKm()).isEqualTo(DEFAULT_LENGTH_IN_KM);
    }

    @Test
    @Transactional
    public void createRiverWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = riverRepository.findAll().size();

        // Create the River with an existing ID
        river.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restRiverMockMvc.perform(post("/api/rivers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(river)))
            .andExpect(status().isBadRequest());

        // Validate the River in the database
        List<River> riverList = riverRepository.findAll();
        assertThat(riverList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = riverRepository.findAll().size();
        // set the field null
        river.setName(null);

        // Create the River, which fails.

        restRiverMockMvc.perform(post("/api/rivers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(river)))
            .andExpect(status().isBadRequest());

        List<River> riverList = riverRepository.findAll();
        assertThat(riverList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllRivers() throws Exception {
        // Initialize the database
        riverRepository.saveAndFlush(river);

        // Get all the riverList
        restRiverMockMvc.perform(get("/api/rivers?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(river.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].averageSpeed").value(hasItem(DEFAULT_AVERAGE_SPEED)))
            .andExpect(jsonPath("$.[*].lengthInKm").value(hasItem(DEFAULT_LENGTH_IN_KM)));
    }

    @Test
    @Transactional
    public void getRiver() throws Exception {
        // Initialize the database
        riverRepository.saveAndFlush(river);

        // Get the river
        restRiverMockMvc.perform(get("/api/rivers/{id}", river.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(river.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.averageSpeed").value(DEFAULT_AVERAGE_SPEED))
            .andExpect(jsonPath("$.lengthInKm").value(DEFAULT_LENGTH_IN_KM));
    }

    @Test
    @Transactional
    public void getNonExistingRiver() throws Exception {
        // Get the river
        restRiverMockMvc.perform(get("/api/rivers/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateRiver() throws Exception {
        // Initialize the database
        riverService.save(river);

        int databaseSizeBeforeUpdate = riverRepository.findAll().size();

        // Update the river
        River updatedRiver = riverRepository.findOne(river.getId());
        // Disconnect from session so that the updates on updatedRiver are not directly saved in db
        em.detach(updatedRiver);
        updatedRiver
            .name(UPDATED_NAME)
            .averageSpeed(UPDATED_AVERAGE_SPEED)
            .lengthInKm(UPDATED_LENGTH_IN_KM);

        restRiverMockMvc.perform(put("/api/rivers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedRiver)))
            .andExpect(status().isOk());

        // Validate the River in the database
        List<River> riverList = riverRepository.findAll();
        assertThat(riverList).hasSize(databaseSizeBeforeUpdate);
        River testRiver = riverList.get(riverList.size() - 1);
        assertThat(testRiver.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testRiver.getAverageSpeed()).isEqualTo(UPDATED_AVERAGE_SPEED);
        assertThat(testRiver.getLengthInKm()).isEqualTo(UPDATED_LENGTH_IN_KM);
    }

    @Test
    @Transactional
    public void updateNonExistingRiver() throws Exception {
        int databaseSizeBeforeUpdate = riverRepository.findAll().size();

        // Create the River

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restRiverMockMvc.perform(put("/api/rivers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(river)))
            .andExpect(status().isCreated());

        // Validate the River in the database
        List<River> riverList = riverRepository.findAll();
        assertThat(riverList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteRiver() throws Exception {
        // Initialize the database
        riverService.save(river);

        int databaseSizeBeforeDelete = riverRepository.findAll().size();

        // Get the river
        restRiverMockMvc.perform(delete("/api/rivers/{id}", river.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<River> riverList = riverRepository.findAll();
        assertThat(riverList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(River.class);
        River river1 = new River();
        river1.setId(1L);
        River river2 = new River();
        river2.setId(river1.getId());
        assertThat(river1).isEqualTo(river2);
        river2.setId(2L);
        assertThat(river1).isNotEqualTo(river2);
        river1.setId(null);
        assertThat(river1).isNotEqualTo(river2);
    }
}
