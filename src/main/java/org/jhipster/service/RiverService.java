package org.jhipster.service;

import org.jhipster.domain.River;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing River.
 */
public interface RiverService {

    /**
     * Save a river.
     *
     * @param river the entity to save
     * @return the persisted entity
     */
    River save(River river);

    /**
     * Get all the rivers.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<River> findAll(Pageable pageable);

    /**
     * Get the "id" river.
     *
     * @param id the id of the entity
     * @return the entity
     */
    River findOne(Long id);

    /**
     * Delete the "id" river.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
