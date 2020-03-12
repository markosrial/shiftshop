# Instalation & Deployment

This document will guide you on the process to install and deploy the system. 

Necessary artifacts:

- **shiftshop-service.jar**
- **shiftshop-spa.zip**
- **shiftshop.exe** (*Windows*), **shiftshop-pos.deb** (*Linux*) or **shiftshop-pos.zip** (*MacOs*)

[TOC]
______

## First steps

Enviroment SO: **Ubuntu 18.04 LTS**.

***Requeriments***:

- *Java 11*:
```bash
  apt install openjdk-11-jre-headless
  java -version
```

- *NodeJS*:
```bash
  apt install nodejs
  nodejs -v
```

- *MySQL*:
```bash
  apt install mysql-server
```

***Database creation:***

```
mysql
Start Mysql server if not running (e.g. mysqld).

mysqladmin -u root create shiftshop

mysql -u root
    CREATE USER 'ss'@'localhost' IDENTIFIED BY 'ss';
    GRANT ALL PRIVILEGES ON shiftshop.* to 'ss'@'localhost' WITH GRANT OPTION;
    exit
```

***Extras***: To improve the **security** of our service we hace to add an user with no shell access (will be used in the *systemd* service file):
```
adduser --no-create-home shiftshop
usermod -s /usr/sbin/nologin shiftshop
```



------

## Web Service

1. Create directory who will contain the **.jar** service
```bash
   mkdir -p /var/shiftshop/service/latest
```

2. Add service to the directory created recently
```bash
   mv shiftshop-ws.jar /var/shiftshop/service/latest/shiftshop-ws.jar
```

3. Allow execute and change file permissions
```bash
   chmod +x shiftshop-ws.jar
   chown shiftshop:shiftshop shiftshop-ws.jar
```

4. Create systemd script:
```bash
   nano /etc/systemd/system/shiftshop-ws.service
```

​       With content:

```
   [Unit]
   Description=shiftshop-ws
   After=syslog.target
   
   [Service]
   User=shiftshop
   ExecStart=/var/shiftshop/service/latest/shiftshop-ws.jar --server.port=6565
   SuccessExitStatus=143
   
   [Install]
   WantedBy=multi-user.target
```

5. Enable start on boot:
```bash
   systemctl enable shiftshop-ws.service
```



------

## Single Page Application

1. Create directory who will contain the spa
```bash
   mkdir -p /var/shiftshop/spa/
```

2. Add spa to the directory created recently
```bash
   mv shiftshop-spa.zip /var/shiftshop/spa/shiftshop-spa.zip
```

3. Unzip file
```bash
   unzip /var/shiftshop/spa/shiftshop-spa.zip
```
> This will result in: `/var/shiftshop/spa/build/<spa_content>`



------

## NGINX Reverse Proxy

First of all our machine **must have** "*shiftshop*" as name on our Router DNS resolver.

In our case the LAN DNS name is "*home*", so all request to our machine will go as: **shiftshop.home**.

**Steps**:

1. Install Nginx:
```bash
   apt install nginx
```

2. Remove default `/` website:

   - Comment line `include /etc/nginx/sites-enabled/*`

3. Add file `shiftshop.conf`:
```bash
   nano /etc/nginx/conf.d/shiftshop.conf
```

​       With content:

```
   server {
      listen 80;
      listen [::]:80;
  
      server_name shiftshop.* shiftshop;

      location /ws {
         rewrite           /ws/(.*) /$1       break;
         proxy_set_header  X-Forwarded-For    $proxy_add_x_forwarded_for;
         proxy_set_header  X-Forwarded-Proto  $scheme;
         proxy_set_header  X-Forwarded-Port   $server_port;
         proxy_pass        http://localhost:6565;
      }

      location / {
         try_files $uri /index.html =404;
              
         root /var/shiftshop/spa/build;
         index index.html index.htm;      
      }
   }
```

4. Add SSL:
```
   shifshop.*:443
   shifshop.*/ws -> 6565 con ssl
   
   // Hacer esto tras securebot
   ufw allow 'Nginx HTTPS'
```



-----

### External links:

[Java11]: https://www.digitalocean.com/community/tutorials/como-instalar-java-con-apt-en-ubuntu-18-04-es	"Install Java 11 - Ubuntu 18.04"
[NodeJS]: https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-18-04	"Install NodeJS - Ubuntu 18.04"
[MySQL]: https://www.digitalocean.com/community/tutorials/how-to-install-mysql-on-ubuntu-18-04	"Install MySQL - Ubuntu 18.04"
