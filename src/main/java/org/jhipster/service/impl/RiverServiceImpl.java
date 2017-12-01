package org.jhipster.service.impl;

import org.jhipster.service.RiverService;
import org.jhipster.domain.River;
import org.jhipster.repository.RiverRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing River.
 */
@Service
@Transactional
public class RiverServiceImpl implements RiverService{

    private final Logger log = LoggerFactory.getLogger(RiverServiceImpl.class);

    private final RiverRepository riverRepository;

    public RiverServiceImpl(RiverRepository riverRepository) {
        this.riverRepository = riverRepository;
    }

    /**
     * Save a river.
     *
     * @param river the entity to save
     * @return the persisted entity
     */
    @Override
    public River save(River river) {
        log.debug("Request to save River : {}", river);
        return riverRepository.save(river);
    }

    /**
     * Get all the rivers.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<River> findAll(Pageable pageable) {
        log.debug("Request to get all Rivers");
        return riverRepository.findAll(pageable);
    }

    /**
     * Get one river by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public River findOne(Long id) {
        log.debug("Request to get River : {}", id);
        return riverRepository.findOne(id);
    }

    /**
     * Delete the river by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete River : {}", id);
        riverRepository.delete(id);
    }
}
