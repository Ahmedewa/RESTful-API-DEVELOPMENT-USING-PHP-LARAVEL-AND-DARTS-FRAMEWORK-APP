ERROR MONITORING & HANDLING (USING GRAFANA & PROMETHUS)


Using Grafana for Visualization and Prometheus for Metrics**

### **Step 1: Set Up Prometheus with Docker**
1. Create a `prometheus.yml` configuration file:
   ```yaml
   global:
     scrape_interval: 15s

   scrape_configs:
     - job_name: 'prometheus'
       static_configs:
         - targets: ['localhost:9090']
   ```

2. Run Prometheus in Docker:
   ```bash
   docker run -d --name=prometheus \
     -p 9090:9090 \
     -v $(pwd)/prometheus.yml:/etc/prometheus/prometheus.yml \
     prom/prometheus
   ```

3. Access Prometheus at `http://localhost:9090`.

---


**Step 2: Set Up Grafana**

1. Run Grafana with Docker:
   ```bash
   docker run -d --name=grafana \
     -p 3000:3000 grafana/grafana
   ```

2. Access Grafana at `http://localhost:3000`.

3. Add Prometheus as a Data Source:
   - URL: `http://prometheus:9090`.

4. Create Dashboards:
   - Use Prometheus queries (e.g., `up{job="prometheus"}`) to visualize metrics.

---

