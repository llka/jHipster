package org.jhipster.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;


/**
 * A River.
 */
@Entity
@Table(name = "river")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class River implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Size(min = 3)
    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "average_speed")
    private Integer averageSpeed;

    @Column(name = "length_in_km")
    private Integer lengthInKm;

    @OneToMany(mappedBy = "river")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Region> regions = new HashSet<>();

    @ManyToOne
    private Fish fishRiver;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public River name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getAverageSpeed() {
        return averageSpeed;
    }

    public River averageSpeed(Integer averageSpeed) {
        this.averageSpeed = averageSpeed;
        return this;
    }

    public void setAverageSpeed(Integer averageSpeed) {
        this.averageSpeed = averageSpeed;
    }

    public Integer getLengthInKm() {
        return lengthInKm;
    }

    public River lengthInKm(Integer lengthInKm) {
        this.lengthInKm = lengthInKm;
        return this;
    }

    public void setLengthInKm(Integer lengthInKm) {
        this.lengthInKm = lengthInKm;
    }

    public Set<Region> getRegions() {
        return regions;
    }

    public River regions(Set<Region> regions) {
        this.regions = regions;
        return this;
    }

    public River addRegion(Region region) {
        this.regions.add(region);
        region.setRiver(this);
        return this;
    }

    public River removeRegion(Region region) {
        this.regions.remove(region);
        region.setRiver(null);
        return this;
    }

    public void setRegions(Set<Region> regions) {
        this.regions = regions;
    }

    public Fish getFishRiver() {
        return fishRiver;
    }

    public River fishRiver(Fish fish) {
        this.fishRiver = fish;
        return this;
    }

    public void setFishRiver(Fish fish) {
        this.fishRiver = fish;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        River river = (River) o;
        if (river.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), river.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "River{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", averageSpeed=" + getAverageSpeed() +
            ", lengthInKm=" + getLengthInKm() +
            "}";
    }
}
