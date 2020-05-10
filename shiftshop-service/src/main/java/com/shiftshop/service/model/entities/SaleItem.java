package com.shiftshop.service.model.entities;

import javax.persistence.*;
import java.math.BigDecimal;

@Entity
public class SaleItem {

    private Long id;
    private BigDecimal productPrice;
    private BigDecimal cost;
    private int quantity;
    private Product product;
    private Sale sale;

    public SaleItem() {}

    public SaleItem(BigDecimal productPrice, int quantity, Product product) {
        this.productPrice = productPrice;
        this.quantity = quantity;
        this.product = product;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long getId() { return id; }

    public void setId(Long id) { this.id = id; }

    @Column(name = "unitPrice")
    public BigDecimal getProductPrice() { return productPrice; }

    public void setProductPrice(BigDecimal productPrice) { this.productPrice = productPrice; }

    @Column(name = "unitCost")
    public BigDecimal getCost() {
        return cost;
    }

    public void setCost(BigDecimal cost) {
        this.cost = cost;
    }

    public int getQuantity() { return quantity; }

    public void setQuantity(int quantity) { this.quantity = quantity; }

    @ManyToOne(optional=false, fetch= FetchType.LAZY)
    @JoinColumn(name="productId")
    public Product getProduct() { return product; }

    public void setProduct(Product product) { this.product = product; }

    @ManyToOne(optional=false, fetch= FetchType.LAZY)
    @JoinColumn(name="saleId")
    public Sale getSale() { return sale; }

    public void setSale(Sale sale) { this.sale = sale; }

    @Transient
    public BigDecimal getTotalPrice() {
        return productPrice.multiply(new BigDecimal(quantity));
    }

    @Transient
    public BigDecimal getTotalCost() {
        return cost.multiply(new BigDecimal(quantity));
    }

    @Transient
    public BigDecimal getTotalProfit() {
        return getTotalPrice().subtract(getTotalCost());
    }
}
