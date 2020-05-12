package com.shiftshop.service.model.entities;

import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Entity
public class Sale {

    public enum SaleOrderType {

        barcode, date, total;

        public static SaleOrderType fromStringOrDefault(String type) {

            try {
                return SaleOrderType.valueOf(type);
            } catch (IllegalArgumentException | NullPointerException e) {
                return getDefault();
            }

        }

        public static SaleOrderType getDefault() {
            return date;
        }

    }

    private Long id;
    private String barcode;
    private LocalDateTime date;
    private LocalDateTime creationTimestamp;
    private BigDecimal total;
    private BigDecimal cost;
    private BigDecimal discount;
    private BigDecimal cash;
    private boolean active;
    private User seller;
    private Set<SaleItem> items = new HashSet<>();

    public Sale() {}

    public Sale(String barcode, LocalDateTime date, BigDecimal discount, BigDecimal cash) {
        this.barcode = barcode;
        this.date = date;
        this.discount = discount;
        this.cash = cash;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getBarcode() {
        return barcode;
    }

    public void setBarcode(String barcode) {
        this.barcode = barcode;
    }

    public LocalDateTime getDate() {
        return date;
    }

    public void setDate(LocalDateTime date) {
        this.date = date;
    }

    @CreationTimestamp
    public LocalDateTime getCreationTimestamp() {
        return creationTimestamp;
    }

    public void setCreationTimestamp(LocalDateTime creationTimestamp) {
        this.creationTimestamp = creationTimestamp;
    }

    public BigDecimal getTotal() {
        return total;
    }

    public void setTotal(BigDecimal total) {
        this.total = total;
    }

    public BigDecimal getCost() {
        return cost;
    }

    public void setCost(BigDecimal cost) {
        this.cost = cost;
    }

    public BigDecimal getDiscount() {
        return discount;
    }

    public void setDiscount(BigDecimal discount) {
        this.discount = discount;
    }

    public BigDecimal getCash() {
        return cash;
    }

    public void setCash(BigDecimal cash) {
        this.cash = cash;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "sellerId")
    public User getSeller() {
        return seller;
    }

    public void setSeller(User seller) {
        this.seller = seller;
    }

    @OneToMany(mappedBy = "sale")
    public Set<SaleItem> getItems() {
        return items;
    }

    public void setItems(Set<SaleItem> items) {
        this.items = items;
    }

    @Transient
    public Optional<SaleItem> getItem(Long productId) {
        return items.stream().filter(item -> item.getProduct().getId().equals(productId)).findFirst();
    }

    public void addItem(SaleItem item) {

        items.add(item);
        item.setSale(this);

    }

}
