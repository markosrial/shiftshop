ALTER TABLE Sale
    ADD total DECIMAL(11,2) NOT NULL AFTER creationTimestamp,
    ADD cash DECIMAL(11,2) AFTER discount,
    ADD cost DECIMAL(11,2) NOT NULL AFTER cash;

ALTER TABLE SaleItem
    RENAME COLUMN unitROI TO unitCost;
