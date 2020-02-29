# ShiftShop System Project

ShiftShop is a system for shops without a fixed store location.

## Web Service

Web Service developed with Spring Framework

***Requeriments:***

- Java 11+
- Maven 3+
- MySQL 8+

***Database creation:***

```
Start Mysql server if not running (e.g. mysqld).

mysqladmin -u root create shiftshop

mysql -u root
    CREATE USER 'ss'@'localhost' IDENTIFIED BY 'ss';
    GRANT ALL PRIVILEGES ON shiftshop.* to 'ss'@'localhost' WITH GRANT OPTION;
    exit
```

***Database clean (Don't use on production!):***

```
Test: mvn flyway:clean@clean-test-db
Dev: mvn flyway:clean@clean-db
```

***Execution:***

```
cd shiftshop-service
mvn spring-boot:run
```



------

## SPA

Web page SPA

***Requeriments:***

- Node 8+

***Execution:***

```
cd shiftshop-spa
npm install (only first time to download libraries)
npm start
```



------

## PoS App

Desktop App

***Requeriments:***

- Node 8+

***Execution:***

```
cd shiftshop-pos
npm install (only first time to download libraries)
npm start
```



------

