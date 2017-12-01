package org.jhipster.service.impl;

import org.jhipster.service.LakeService;
import org.jhipster.domain.Lake;
import org.jhipster.repository.LakeRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing Lake.
 */
@Service
@Transactional
public class LakeServiceImpl implements LakeService{

    private final Logger log = LoggerFactory.getLogger(LakeServiceImpl.class);

    private final LakeRepository lakeRepository;

    public LakeServiceImpl(LakeRepository lakeRepository) {
        this.lakeRepository = lakeRepository;
    }

    /**
     * Save a lake.
     *
     * @param lake the entity to save
     * @return the persisted entity
     */
    @Override
    public Lake save(Lake lake) {
        log.debug("Request to save Lake : {}", lake);
        return lakeRepository.save(lake);
    }

    /**
     * Get all the lakes.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<Lake> findAll(Pageable pageable) {
        log.debug("Request to get all Lakes");
        return lakeRepository.findAll(pageable);
    }

    /**
     * Get one lake by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Lake findOne(Long id) {
        log.debug("Request to get Lake : {}", id);
        return lakeRepository.findOne(id);
    }

    /**
     * Delete the lake by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Lake : {}", id);
        lakeRepository.delete(id);
    }
}
