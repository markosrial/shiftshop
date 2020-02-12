-- Indexes for primary keys have been explicitly created.

CREATE TABLE User (
    id BIGINT NOT NULL AUTO_INCREMENT,
    userName VARCHAR(30) COLLATE latin1_bin NOT NULL,
    password VARCHAR(90) NOT NULL,
    active TINYINT NOT NULL,
    CONSTRAINT UserPK PRIMARY KEY (id),
    CONSTRAINT UserNameUniqueKey UNIQUE (userName)
) ENGINE = InnoDB;

CREATE INDEX UserIndexByUserName ON User (userName);

CREATE TABLE UserRole (
    userId BIGINT NOT NULL,
    role TINYINT NOT NULL,
    CONSTRAINT UserRolePK PRIMARY KEY (userId, role),
    CONSTRAINT UserRoleUserIdFK FOREIGN KEY (userId)
        REFERENCES User(id) ON UPDATE CASCADE
) ENGINE = InnoDB;

CREATE TABLE Category (
    id BIGINT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) COLLATE latin1_bin NOT NULL,
    CONSTRAINT CategoryPK PRIMARY KEY (id),
    CONSTRAINT CategoryNameUniqueKey UNIQUE (name)
) ENGINE = InnoDB;

CREATE TABLE Product (
    id BIGINT NOT NULL AUTO_INCREMENT,
    name VARCHAR(60) COLLATE latin1_bin NOT NULL,
    providerPrice DECIMAL(11,2) NOT NULL,
    salePrice DECIMAL(11,2) NOT NULL,
    barcode VARCHAR(26) NOT NULL,
    active TINYINT NOT NULL,
    creationTimestamp DATETIME(3) NOT NULL,
    updateTimestamp DATETIME(3) NOT NULL,
    categoryId BIGINT NOT NULL,
    CONSTRAINT ProductPK PRIMARY KEY (id),
    CONSTRAINT ProductNameUniqueKey UNIQUE (name),
    CONSTRAINT ProductBarcodeUniqueKey UNIQUE (barcode),
    CONSTRAINT ProductCategoryIdFK FOREIGN KEY (categoryId)
        REFERENCES Category(id) ON UPDATE CASCADE
) ENGINE = InnoDB;

CREATE TABLE Sale (
    id BIGINT NOT NULL AUTO_INCREMENT,
    barcode VARCHAR(26) NOT NULL,
    date DATETIME NOT NULL,
    creationTimestamp DATETIME(3) NOT NULL,
    discount DECIMAL(11,2) NOT NULL,
    active TINYINT NOT NULL,
    sellerId BIGINT NOT NULL,
    CONSTRAINT SalePK PRIMARY KEY (id),
    CONSTRAINT SaleBarcodeUniqueKey UNIQUE (barcode),
    CONSTRAINT SaleSellerIdFK FOREIGN KEY (sellerId)
        REFERENCES User(id) ON UPDATE CASCADE
) ENGINE = InnoDB;

CREATE TABLE SaleItem (
    id BIGINT NOT NULL AUTO_INCREMENT,
    unitPrice DECIMAL(11,2) NOT NULL,
    unitROI DECIMAL(11,2) NOT NULL,
    quantity SMALLINT NOT NULL,
    productId BIGINT NOT NULL,
    saleId BIGINT NOT NULL,
    CONSTRAINT SaleItemPK PRIMARY KEY (id),
    CONSTRAINT SaleItemProductIdFK FOREIGN KEY(productId)
        REFERENCES Product(id) ON UPDATE CASCADE,
    CONSTRAINT SaleItemSaleIdFK FOREIGN KEY(saleId)
        REFERENCES Sale(id) ON UPDATE CASCADE
) ENGINE = InnoDB;
