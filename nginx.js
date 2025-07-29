LOAD BALANCER - ['Nginx< 'Frontend', 'Reverse Proxy-Backend'>]


**1. Load Balancer with Nginx**

 **1a) Nginx as the Frontend Load Balancer**
Nginx can distribute traffic across multiple Laravel backend servers for high 
availability and fault tolerance.

**Nginx Load Balancer Configuration**
1. **Install Nginx**:
   ```bash
   sudo apt update
   sudo apt install nginx
   ```

2. **Configure Nginx for Load Balancing**:
   Create a new configuration file for your project:
   ```bash
   sudo nano /etc/nginx/sites-available/myapp
   ```

   Add the following:
   ```nginx
   upstream backend_servers {
       server 192.168.1.101:8000;  # Laravel App Server 1
       server 192.168.1.102:8000;  # Laravel App Server 2
   }

   server {
       listen 80;
       server_name yourdomain.com;

       location / {
           proxy_pass http://backend_servers;
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
       }
   }
   ```

3. **Enable the Configuration**:
   ```bash
   sudo ln -s /etc/nginx/sites-available/myapp /etc/nginx/sites-enabled/
   sudo nginx -t  # Test the configuration
   sudo systemctl reload nginx  # Reload Nginx
   ```

---

**1b) Nginx as a Reverse Proxy for Backend**
To secure the backend, use Nginx as a **reverse proxy**.

1. **Update Nginx Configuration**:
   ```nginx
   server {
       listen 80;
       server_name api.yourdomain.com;

       location / {
           proxy_pass http://localhost:8000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

2. **Restart Nginx**:
   ```bash
   sudo systemctl restart nginx
   ```

