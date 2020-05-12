package com.shiftshop.service.model.entities;

import com.shiftshop.service.model.entities.Product.ProductOrderType;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.SliceImpl;
import org.springframework.data.domain.Sort.Direction;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.util.List;

public class CustomizedProductDaoImpl implements CustomizedProductDao {

    @PersistenceContext
    private EntityManager entityManager;

    private String[] getTokens(String keywords) {

        if (keywords == null || keywords.length() == 0) {
            return new String[0];
        } else {
            return keywords.split("\\s");
        }

    }

    @SuppressWarnings("unchecked")
    @Override
    public Slice<Product> find(Long categoryId, String keywords, boolean onlyActive,
                               ProductOrderType orderType, Direction order, int page, int size) {

        String[] tokens = getTokens(keywords);
        String queryString = "FROM Product p";

        if (categoryId != null || tokens.length > 0 || onlyActive) {
            queryString += " WHERE ";
        }

        if (categoryId != null) {
            queryString += "p.category.id = :categoryId";
        }

        if (tokens.length != 0) {

            if (categoryId != null) {
                queryString += " AND ";
            }

            for (int i = 0; i < tokens.length - 1; i++) {
                queryString += "LOWER(p.name) LIKE LOWER(:token" + i + ") AND ";
            }

            queryString += "LOWER(p.name) LIKE LOWER(:token" + (tokens.length - 1) + ")";

        }

        if (onlyActive) {

            if (categoryId != null || tokens.length > 0) {
                queryString += " AND ";
            }

            queryString += "p.active IS TRUE";
        }

        if (orderType == null) {
            orderType = ProductOrderType.getDefault();
        }

        queryString += " ORDER BY p." + orderType.name();

        if (order != null)
            queryString += " " + order.name();

        Query query = entityManager.createQuery(queryString).setFirstResult(page * size).setMaxResults(size + 1);

        if (categoryId != null) {
            query.setParameter("categoryId", categoryId);
        }

        if (tokens.length != 0) {

            for (int i = 0; i < tokens.length; i++) {
                query.setParameter("token" + i, '%' + tokens[i] + '%');
            }

        }

        List<Product> products = query.getResultList();
        boolean hasNext = products.size() == (size + 1);

        if (hasNext) {
            products.remove(products.size() - 1);
        }

        return new SliceImpl<>(products, PageRequest.of(page, size), hasNext);

    }

}
