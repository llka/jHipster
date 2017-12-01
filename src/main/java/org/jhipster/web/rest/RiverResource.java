package org.jhipster.web.rest;

import com.codahale.metrics.annotation.Timed;
import org.jhipster.domain.River;
import org.jhipster.service.RiverService;
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
 * REST controller for managing River.
 */
@RestController
@RequestMapping("/api")
public class RiverResource {

    private final Logger log = LoggerFactory.getLogger(RiverResource.class);

    private static final String ENTITY_NAME = "river";

    private final RiverService riverService;

    public RiverResource(RiverService riverService) {
        this.riverService = riverService;
    }

    /**
     * POST  /rivers : Create a new river.
     *
     * @param river the river to create
     * @return the ResponseEntity with status 201 (Created) and with body the new river, or with status 400 (Bad Request) if the river has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/rivers")
    @Timed
    public ResponseEntity<River> createRiver(@Valid @RequestBody River river) throws URISyntaxException {
        log.debug("REST request to save River : {}", river);
        if (river.getId() != null) {
            throw new BadRequestAlertException("A new river cannot already have an ID", ENTITY_NAME, "idexists");
        }
        River result = riverService.save(river);
        return ResponseEntity.created(new URI("/api/rivers/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /rivers : Updates an existing river.
     *
     * @param river the river to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated river,
     * or with status 400 (Bad Request) if the river is not valid,
     * or with status 500 (Internal Server Error) if the river couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/rivers")
    @Timed
    public ResponseEntity<River> updateRiver(@Valid @RequestBody River river) throws URISyntaxException {
        log.debug("REST request to update River : {}", river);
        if (river.getId() == null) {
            return createRiver(river);
        }
        River result = riverService.save(river);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, river.getId().toString()))
            .body(result);
    }

    /**
     * GET  /rivers : get all the rivers.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of rivers in body
     */
    @GetMapping("/rivers")
    @Timed
    public ResponseEntity<List<River>> getAllRivers(Pageable pageable) {
        log.debug("REST request to get a page of Rivers");
        Page<River> page = riverService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/rivers");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /rivers/:id : get the "id" river.
     *
     * @param id the id of the river to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the river, or with status 404 (Not Found)
     */
    @GetMapping("/rivers/{id}")
    @Timed
    public ResponseEntity<River> getRiver(@PathVariable Long id) {
        log.debug("REST request to get River : {}", id);
        River river = riverService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(river));
    }

    /**
     * DELETE  /rivers/:id : delete the "id" river.
     *
     * @param id the id of the river to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/rivers/{id}")
    @Timed
    public ResponseEntity<Void> deleteRiver(@PathVariable Long id) {
        log.debug("REST request to delete River : {}", id);
        riverService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
