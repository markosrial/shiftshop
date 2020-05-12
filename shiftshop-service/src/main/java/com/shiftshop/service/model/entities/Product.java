package com.shiftshop.service.model.entities;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
public class Product {

    public enum ProductOrderType {

        name, creationTimestamp;

        public static ProductOrderType fromStringOrDefault(String type) {

            if (type == null) {
                return getDefault();
            }

            switch (type) {
                case "date":
                case "creationDate":
                    type = creationTimestamp.name();
                default:
                    break;
            }

            try {
                return ProductOrderType.valueOf(type);
            } catch (IllegalArgumentException e) {
                return getDefault();
            }

        }

        public static ProductOrderType getDefault() {
            return name;
        }

    }

    private Long id;
    private String name;
    private BigDecimal providerPrice;
    private BigDecimal salePrice;
    private String barcode;
    private boolean active;
    private LocalDateTime creationTimestamp;
    private LocalDateTime updateTimestamp;
    private Category category;

    public Product() { }

    public Product(String name, BigDecimal providerPrice, BigDecimal salePrice, Category category) {

        this.name = name;
        this.providerPrice = providerPrice;
        this.salePrice = salePrice;
        this.category = category;

    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public BigDecimal getProviderPrice() {
        return providerPrice;
    }

    public void setProviderPrice(BigDecimal providerPrice) {
        this.providerPrice = providerPrice;
    }

    public BigDecimal getSalePrice() {
        return salePrice;
    }

    public void setSalePrice(BigDecimal salePrice) {
        this.salePrice = salePrice;
    }

    public String getBarcode() {
        return barcode;
    }

    public void setBarcode(String barcode) {
        this.barcode = barcode;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    @CreationTimestamp
    public LocalDateTime getCreationTimestamp() {
        return creationTimestamp;
    }

    public void setCreationTimestamp(LocalDateTime creationTimestamp) {
        this.creationTimestamp = creationTimestamp;
    }

    @UpdateTimestamp
    public LocalDateTime getUpdateTimestamp() {
        return updateTimestamp;
    }

    public void setUpdateTimestamp(LocalDateTime updateTimestamp) {
        this.updateTimestamp = updateTimestamp;
    }

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "categoryId")
    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

}
