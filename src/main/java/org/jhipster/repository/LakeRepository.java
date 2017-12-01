package org.jhipster.repository;

import org.jhipster.domain.Lake;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Lake entity.
 */
@SuppressWarnings("unused")
@Repository
public interface LakeRepository extends JpaRepository<Lake, Long> {

}
