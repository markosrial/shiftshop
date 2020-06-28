# Instalation & Deployment

This document will guide you on the process to install and deploy the system. 

Necessary artifacts:

- **shiftshop-service.jar**
- **shiftshop-spa.zip**
- **shiftshop.exe** (*Windows*), **shiftshop-pos.deb** (*Linux*) or **shiftshop-pos.zip** (*MacOs*)



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
  sudo dpkg -i /PATH/version-specific-package-name.deb
  sudo dpkg -i mysql-apt-config_w.x.y-z_all.deb
  sudo apt-get update
  sudo apt-get install mysql-server
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

2. Creación de directiva para servir contenido:
```bash
   nano /etc/nginx/sites-available/shiftshop.home 
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

3. Create link to sites-enabled:
```bash
   ln -s /etc/nginx/sites-available/shiftshop.home /etc/nginx/sites-enabled/
```

4. In order to avoid posible hash bucket memory its necesary to remove the comment on ```server_names_hash_bucket_size``` directive in the ```/etc/nginx/nginx.conf``` file

At this point we can check the validity of the previous configuration with the commands:
```bash
   nginx -t
   systemctl restart nginx
```

### Enable HTTPS on NGINX

1. Create self-signed keys and private key:
```bash
   sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout /etc/ssl/private/nginx-selfsigned.key -out /etc/ssl/certs/nginx-selfsigned.crt
```
As we stated above, these options will create both a key file and a certificate. We will be asked a few questions about our server in order to embed the information correctly in the certificate. The most important line is the one that requests the Common Name (e.g. server FQDN or YOUR name), where the entry will be **shiftshop.home**.

2. Create a strong Diffie-Hellman group, which is used in negotiating Perfect Forward Secrecy with clients:
```bash
   sudo openssl dhparam -out /etc/nginx/dhparam.pem 4096
```
3. Configuring NGINX to Use SSL:
```bash
   sudo nano /etc/nginx/snippets/self-signed.conf
```

​       With content:

```
   ssl_certificate /etc/ssl/certs/nginx-selfsigned.crt;
   ssl_certificate_key /etc/ssl/private/nginx-selfsigned.key;
```

4. Creating a Configuration Snippet with Strong Encryption Settings
```bash
   sudo nano /etc/nginx/snippets/ssl-params.conf
```

​       With content:

```
   ssl_protocols TLSv1.2;
   ssl_prefer_server_ciphers on;
   ssl_dhparam /etc/nginx/dhparam.pem;
   ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-SHA384;
   ssl_ecdh_curve secp384r1; # Requires nginx >= 1.1.0
   ssl_session_timeout  10m;
   ssl_session_cache shared:SSL:10m;
   ssl_session_tickets off; # Requires nginx >= 1.5.9
   ssl_stapling on; # Requires nginx >= 1.3.7
   ssl_stapling_verify on; # Requires nginx => 1.3.7
   resolver 8.8.8.8 8.8.4.4 valid=300s;
   resolver_timeout 5s;
   # Disable strict transport security for now. You can uncomment the       following
   # line if you understand the implications.
   # add_header Strict-Transport-Security "max-age=63072000; includeSubDomains; preload";
   add_header X-Frame-Options DENY;
   add_header X-Content-Type-Options nosniff;
   add_header X-XSS-Protection "1; mode=block";
```

5. Adjusting the Nginx Configuration to Use SSL
```bash
   sudo nano /etc/nginx/sites-available/shiftshop.home
```

​      Replacing:

```
server {
    listen 443 ssl;
    listen [::]:443 ssl;
    include snippets/self-signed.conf;
    include snippets/ssl-params.conf;

    server_name shiftshop.* shiftshop;
    . . .
}
```

​      And including:

```
. . .
server {
    listen 80;
    listen [::]:80;

    server_name shiftshop.* shiftshop;

    return 301 https://$server_name$request_uri;
}
```

Finally we can check the validity of the previous configuration with the commands:
```bash
   nginx -t
   systemctl restart nginx
```

-----

## External links:

[Java11]: https://www.digitalocean.com/community/tutorials/como-instalar-java-con-apt-en-ubuntu-18-04-es	"Install Java 11 - Ubuntu 18.04"
[NodeJS]: https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-18-04	"Install NodeJS - Ubuntu 18.04"
[MySQL]: https://dev.mysql.com/doc/mysql-apt-repo-quick-guide/en/#apt-repo-fresh-install	"Install MySQL - Ubuntu with ATP"
[NGINX]: https://www.digitalocean.com/community/tutorials/como-instalar-nginx-en-ubuntu-18-04-es	"Install Nginx - Ubuntu 18.04"
[SSL on NGINX]: https://www.digitalocean.com/community/tutorials/how-to-create-a-self-signed-ssl-certificate-for-nginx-in-ubuntu-18-04	"Create a Self-Signed SSL Certificate for Nginx - Ubuntu 18.04"
