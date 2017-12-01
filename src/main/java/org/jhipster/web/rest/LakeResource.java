package org.jhipster.web.rest;

import com.codahale.metrics.annotation.Timed;
import org.jhipster.domain.Lake;
import org.jhipster.service.LakeService;
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
 * REST controller for managing Lake.
 */
@RestController
@RequestMapping("/api")
public class LakeResource {

    private final Logger log = LoggerFactory.getLogger(LakeResource.class);

    private static final String ENTITY_NAME = "lake";

    private final LakeService lakeService;

    public LakeResource(LakeService lakeService) {
        this.lakeService = lakeService;
    }

    /**
     * POST  /lakes : Create a new lake.
     *
     * @param lake the lake to create
     * @return the ResponseEntity with status 201 (Created) and with body the new lake, or with status 400 (Bad Request) if the lake has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/lakes")
    @Timed
    public ResponseEntity<Lake> createLake(@Valid @RequestBody Lake lake) throws URISyntaxException {
        log.debug("REST request to save Lake : {}", lake);
        if (lake.getId() != null) {
            throw new BadRequestAlertException("A new lake cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Lake result = lakeService.save(lake);
        return ResponseEntity.created(new URI("/api/lakes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /lakes : Updates an existing lake.
     *
     * @param lake the lake to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated lake,
     * or with status 400 (Bad Request) if the lake is not valid,
     * or with status 500 (Internal Server Error) if the lake couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/lakes")
    @Timed
    public ResponseEntity<Lake> updateLake(@Valid @RequestBody Lake lake) throws URISyntaxException {
        log.debug("REST request to update Lake : {}", lake);
        if (lake.getId() == null) {
            return createLake(lake);
        }
        Lake result = lakeService.save(lake);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, lake.getId().toString()))
            .body(result);
    }

    /**
     * GET  /lakes : get all the lakes.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of lakes in body
     */
    @GetMapping("/lakes")
    @Timed
    public ResponseEntity<List<Lake>> getAllLakes(Pageable pageable) {
        log.debug("REST request to get a page of Lakes");
        Page<Lake> page = lakeService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/lakes");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /lakes/:id : get the "id" lake.
     *
     * @param id the id of the lake to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the lake, or with status 404 (Not Found)
     */
    @GetMapping("/lakes/{id}")
    @Timed
    public ResponseEntity<Lake> getLake(@PathVariable Long id) {
        log.debug("REST request to get Lake : {}", id);
        Lake lake = lakeService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(lake));
    }

    /**
     * DELETE  /lakes/:id : delete the "id" lake.
     *
     * @param id the id of the lake to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/lakes/{id}")
    @Timed
    public ResponseEntity<Void> deleteLake(@PathVariable Long id) {
        log.debug("REST request to delete Lake : {}", id);
        lakeService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
