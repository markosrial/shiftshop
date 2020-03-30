ALTER TABLE Product
    MODIFY creationTimestamp DATETIME(6) NOT NULL,
    MODIFY updateTimestamp DATETIME(6) NOT NULL;

ALTER TABLE User
    MODIFY creationTimestamp DATETIME(6) NOT NULL,
    MODIFY updateTimestamp DATETIME(6) NOT NULL;
