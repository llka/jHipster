package org.jhipster.service;

import org.jhipster.domain.Fish;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing Fish.
 */
public interface FishService {

    /**
     * Save a fish.
     *
     * @param fish the entity to save
     * @return the persisted entity
     */
    Fish save(Fish fish);

    /**
     * Get all the fish.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<Fish> findAll(Pageable pageable);

    /**
     * Get the "id" fish.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Fish findOne(Long id);

    /**
     * Delete the "id" fish.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
