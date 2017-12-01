package org.jhipster.repository;

import org.jhipster.domain.River;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the River entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RiverRepository extends JpaRepository<River, Long> {

}
