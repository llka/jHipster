package org.jhipster.web.rest;

import com.codahale.metrics.annotation.Timed;
import org.jhipster.domain.Fish;
import org.jhipster.service.FishService;
import org.jhipster.web.rest.errors.BadRequestAlertException;
import org.jhipster.web.rest.util.HeaderUtil;
import org.jhipster.web.rest.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Fish.
 */
@RestController
@RequestMapping("/api")
public class FishResource {

    private final Logger log = LoggerFactory.getLogger(FishResource.class);

    private static final String ENTITY_NAME = "fish";

    private final FishService fishService;

    public FishResource(FishService fishService) {
        this.fishService = fishService;
    }

    /**
     * POST  /fish : Create a new fish.
     *
     * @param fish the fish to create
     * @return the ResponseEntity with status 201 (Created) and with body the new fish, or with status 400 (Bad Request) if the fish has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/fish")
    @Timed
    public ResponseEntity<Fish> createFish(@Valid @RequestBody Fish fish) throws URISyntaxException {
        log.debug("REST request to save Fish : {}", fish);
        if (fish.getId() != null) {
            throw new BadRequestAlertException("A new fish cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Fish result = fishService.save(fish);
        return ResponseEntity.created(new URI("/api/fish/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /fish : Updates an existing fish.
     *
     * @param fish the fish to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated fish,
     * or with status 400 (Bad Request) if the fish is not valid,
     * or with status 500 (Internal Server Error) if the fish couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/fish")
    @Timed
    public ResponseEntity<Fish> updateFish(@Valid @RequestBody Fish fish) throws URISyntaxException {
        log.debug("REST request to update Fish : {}", fish);
        if (fish.getId() == null) {
            return createFish(fish);
        }
        Fish result = fishService.save(fish);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, fish.getId().toString()))
            .body(result);
    }

    /**
     * GET  /fish : get all the fish.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of fish in body
     */
    @GetMapping("/fish")
    @Timed
    public ResponseEntity<List<Fish>> getAllFish(Pageable pageable) {
        log.debug("REST request to get a page of Fish");
        Page<Fish> page = fishService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/fish");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /fish/:id : get the "id" fish.
     *
     * @param id the id of the fish to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the fish, or with status 404 (Not Found)
     */
    @GetMapping("/fish/{id}")
    @Timed
    public ResponseEntity<Fish> getFish(@PathVariable Long id) {
        log.debug("REST request to get Fish : {}", id);
        Fish fish = fishService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(fish));
    }

    /**
     * DELETE  /fish/:id : delete the "id" fish.
     *
     * @param id the id of the fish to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/fish/{id}")
    @Timed
    public ResponseEntity<Void> deleteFish(@PathVariable Long id) {
        log.debug("REST request to delete Fish : {}", id);
        fishService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
