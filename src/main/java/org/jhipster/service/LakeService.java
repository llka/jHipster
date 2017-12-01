package org.jhipster.service;

import org.jhipster.domain.Lake;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing Lake.
 */
public interface LakeService {

    /**
     * Save a lake.
     *
     * @param lake the entity to save
     * @return the persisted entity
     */
    Lake save(Lake lake);

    /**
     * Get all the lakes.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<Lake> findAll(Pageable pageable);

    /**
     * Get the "id" lake.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Lake findOne(Long id);

    /**
     * Delete the "id" lake.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
