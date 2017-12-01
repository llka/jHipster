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

import org.jhipster.domain.enumeration.FishEatingType;

import org.jhipster.domain.enumeration.FishDepth;


/**
 * A Fish.
 */
@Entity
@Table(name = "fish")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Fish implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Size(min = 3)
    @Column(name = "name", nullable = false)
    private String name;

    @Size(max = 200)
    @Column(name = "description", length = 200)
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(name = "eating_type")
    private FishEatingType eatingType;

    @Column(name = "avg_weight")
    private Integer avgWeight;

    @Column(name = "max_weight")
    private Integer maxWeight;

    @Column(name = "avg_length")
    private Integer avgLength;

    @Column(name = "max_length")
    private Integer maxLength;

    @Column(name = "max_age")
    private Integer maxAge;

    @Enumerated(EnumType.STRING)
    @Column(name = "summer_depth")
    private FishDepth summerDepth;

    @OneToMany(mappedBy = "fishRiver")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<River> rivers = new HashSet<>();

    @OneToMany(mappedBy = "fishLake")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Lake> lakes = new HashSet<>();

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

    public Fish name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public Fish description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public FishEatingType getEatingType() {
        return eatingType;
    }

    public Fish eatingType(FishEatingType eatingType) {
        this.eatingType = eatingType;
        return this;
    }

    public void setEatingType(FishEatingType eatingType) {
        this.eatingType = eatingType;
    }

    public Integer getAvgWeight() {
        return avgWeight;
    }

    public Fish avgWeight(Integer avgWeight) {
        this.avgWeight = avgWeight;
        return this;
    }

    public void setAvgWeight(Integer avgWeight) {
        this.avgWeight = avgWeight;
    }

    public Integer getMaxWeight() {
        return maxWeight;
    }

    public Fish maxWeight(Integer maxWeight) {
        this.maxWeight = maxWeight;
        return this;
    }

    public void setMaxWeight(Integer maxWeight) {
        this.maxWeight = maxWeight;
    }

    public Integer getAvgLength() {
        return avgLength;
    }

    public Fish avgLength(Integer avgLength) {
        this.avgLength = avgLength;
        return this;
    }

    public void setAvgLength(Integer avgLength) {
        this.avgLength = avgLength;
    }

    public Integer getMaxLength() {
        return maxLength;
    }

    public Fish maxLength(Integer maxLength) {
        this.maxLength = maxLength;
        return this;
    }

    public void setMaxLength(Integer maxLength) {
        this.maxLength = maxLength;
    }

    public Integer getMaxAge() {
        return maxAge;
    }

    public Fish maxAge(Integer maxAge) {
        this.maxAge = maxAge;
        return this;
    }

    public void setMaxAge(Integer maxAge) {
        this.maxAge = maxAge;
    }

    public FishDepth getSummerDepth() {
        return summerDepth;
    }

    public Fish summerDepth(FishDepth summerDepth) {
        this.summerDepth = summerDepth;
        return this;
    }

    public void setSummerDepth(FishDepth summerDepth) {
        this.summerDepth = summerDepth;
    }

    public Set<River> getRivers() {
        return rivers;
    }

    public Fish rivers(Set<River> rivers) {
        this.rivers = rivers;
        return this;
    }

    public Fish addRiver(River river) {
        this.rivers.add(river);
        river.setFishRiver(this);
        return this;
    }

    public Fish removeRiver(River river) {
        this.rivers.remove(river);
        river.setFishRiver(null);
        return this;
    }

    public void setRivers(Set<River> rivers) {
        this.rivers = rivers;
    }

    public Set<Lake> getLakes() {
        return lakes;
    }

    public Fish lakes(Set<Lake> lakes) {
        this.lakes = lakes;
        return this;
    }

    public Fish addLake(Lake lake) {
        this.lakes.add(lake);
        lake.setFishLake(this);
        return this;
    }

    public Fish removeLake(Lake lake) {
        this.lakes.remove(lake);
        lake.setFishLake(null);
        return this;
    }

    public void setLakes(Set<Lake> lakes) {
        this.lakes = lakes;
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
        Fish fish = (Fish) o;
        if (fish.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), fish.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Fish{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", description='" + getDescription() + "'" +
            ", eatingType='" + getEatingType() + "'" +
            ", avgWeight=" + getAvgWeight() +
            ", maxWeight=" + getMaxWeight() +
            ", avgLength=" + getAvgLength() +
            ", maxLength=" + getMaxLength() +
            ", maxAge=" + getMaxAge() +
            ", summerDepth='" + getSummerDepth() + "'" +
            "}";
    }
}
