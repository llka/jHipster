package org.jhipster.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;


/**
 * A Lake.
 */
@Entity
@Table(name = "lake")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Lake implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Size(min = 3)
    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "average_depth")
    private Integer averageDepth;

    @Column(name = "max_depth")
    private Integer maxDepth;

    @OneToOne
    @JoinColumn(unique = true)
    private Region region;

    @ManyToOne
    private Fish fishLake;

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

    public Lake name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getAverageDepth() {
        return averageDepth;
    }

    public Lake averageDepth(Integer averageDepth) {
        this.averageDepth = averageDepth;
        return this;
    }

    public void setAverageDepth(Integer averageDepth) {
        this.averageDepth = averageDepth;
    }

    public Integer getMaxDepth() {
        return maxDepth;
    }

    public Lake maxDepth(Integer maxDepth) {
        this.maxDepth = maxDepth;
        return this;
    }

    public void setMaxDepth(Integer maxDepth) {
        this.maxDepth = maxDepth;
    }

    public Region getRegion() {
        return region;
    }

    public Lake region(Region region) {
        this.region = region;
        return this;
    }

    public void setRegion(Region region) {
        this.region = region;
    }

    public Fish getFishLake() {
        return fishLake;
    }

    public Lake fishLake(Fish fish) {
        this.fishLake = fish;
        return this;
    }

    public void setFishLake(Fish fish) {
        this.fishLake = fish;
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
        Lake lake = (Lake) o;
        if (lake.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), lake.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Lake{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", averageDepth=" + getAverageDepth() +
            ", maxDepth=" + getMaxDepth() +
            "}";
    }
}
