#!/bin/bash

read -p "Enter domain name: " domain
read -p "Enter port number: " port

# Create Nginx configuration file
sudo tee /etc/nginx/sites-available/$domain.conf >/dev/null <<EOF
server {
    server_name $domain www.$domain;

    location / {
        proxy_pass http://localhost:$port;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
    }
}
EOF

# Create a symbolic link to enable the site
sudo ln -s /etc/nginx/sites-available/$domain.conf /etc/nginx/sites-enabled/
echo "sudo ln -s /etc/nginx/sites-available/$domain.conf /etc/nginx/sites-enabled/"

# Test Nginx configuration
nginx_result=$(sudo nginx -t 2>&1)

# Check if Nginx test was successful
if [[ $nginx_result == *"syntax is okay"* ]]; then
	# Reload Nginx to apply changes
	sudo systemctl reload nginx
else
	echo "Nginx configuration test failed"
	exit 1
fi

# Run Certbot to get SSL certificates and automatically configure Nginx
sudo certbot --nginx -d $domain -d www.$domain

# Enable Nginx to start on boot
sudo systemctl enable nginx

echo "Nginx and SSL setup completed successfully!"
