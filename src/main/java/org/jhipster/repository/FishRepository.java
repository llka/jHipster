package org.jhipster.repository;

import org.jhipster.domain.Fish;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Fish entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FishRepository extends JpaRepository<Fish, Long> {

}
