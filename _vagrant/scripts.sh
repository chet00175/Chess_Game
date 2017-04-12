#!/bin/bash

sudo apt-get update

# Installing apache
sudo apt-get -y install apache2

# Installing and configuring mysql
export DEBIAN_FRONTEND="noninteractive"
sudo debconf-set-selections <<< "mysql-server mysql-server/root_password password mysql"
sudo debconf-set-selections <<< "mysql-server mysql-server/root_password_again password mysql"
sudo apt-get -y install mysql-server libapache2-mod-auth-mysql
mysql -sfu root < "mysql_secure_install.sql"

# Install PHP5 and configuring with MySQL
sudo apt-get -y install php5 libapache2-mod-php5 php5-mysql

# Restarting apache and mysql
sudo /etc/init.d/apache2 restart
sudo /etc/init.d/mysql restart

exit 0