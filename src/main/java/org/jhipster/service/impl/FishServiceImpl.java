package org.jhipster.service.impl;

import org.jhipster.service.FishService;
import org.jhipster.domain.Fish;
import org.jhipster.repository.FishRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing Fish.
 */
@Service
@Transactional
public class FishServiceImpl implements FishService{

    private final Logger log = LoggerFactory.getLogger(FishServiceImpl.class);

    private final FishRepository fishRepository;

    public FishServiceImpl(FishRepository fishRepository) {
        this.fishRepository = fishRepository;
    }

    /**
     * Save a fish.
     *
     * @param fish the entity to save
     * @return the persisted entity
     */
    @Override
    public Fish save(Fish fish) {
        log.debug("Request to save Fish : {}", fish);
        return fishRepository.save(fish);
    }

    /**
     * Get all the fish.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<Fish> findAll(Pageable pageable) {
        log.debug("Request to get all Fish");
        return fishRepository.findAll(pageable);
    }

    /**
     * Get one fish by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Fish findOne(Long id) {
        log.debug("Request to get Fish : {}", id);
        return fishRepository.findOne(id);
    }

    /**
     * Delete the fish by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Fish : {}", id);
        fishRepository.delete(id);
    }
}
