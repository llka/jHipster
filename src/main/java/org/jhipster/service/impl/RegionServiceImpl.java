package org.jhipster.service.impl;

import org.jhipster.service.RegionService;
import org.jhipster.domain.Region;
import org.jhipster.repository.RegionRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

/**
 * Service Implementation for managing Region.
 */
@Service
@Transactional
public class RegionServiceImpl implements RegionService{

    private final Logger log = LoggerFactory.getLogger(RegionServiceImpl.class);

    private final RegionRepository regionRepository;

    public RegionServiceImpl(RegionRepository regionRepository) {
        this.regionRepository = regionRepository;
    }

    /**
     * Save a region.
     *
     * @param region the entity to save
     * @return the persisted entity
     */
    @Override
    public Region save(Region region) {
        log.debug("Request to save Region : {}", region);
        return regionRepository.save(region);
    }

    /**
     * Get all the regions.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<Region> findAll(Pageable pageable) {
        log.debug("Request to get all Regions");
        return regionRepository.findAll(pageable);
    }


    /**
     *  get all the regions where Lake is null.
     *  @return the list of entities
     */
    @Transactional(readOnly = true) 
    public List<Region> findAllWhereLakeIsNull() {
        log.debug("Request to get all regions where Lake is null");
        return StreamSupport
            .stream(regionRepository.findAll().spliterator(), false)
            .filter(region -> region.getLake() == null)
            .collect(Collectors.toList());
    }

    /**
     * Get one region by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Region findOne(Long id) {
        log.debug("Request to get Region : {}", id);
        return regionRepository.findOne(id);
    }

    /**
     * Delete the region by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Region : {}", id);
        regionRepository.delete(id);
    }
}
