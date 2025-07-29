HORIZONTAL SCALING 

SCALABILITY**

** Horizontal Scaling**

1. **Add More Servers**:
   - Use multiple Laravel backend servers behind the Nginx load balancer.
   - Example setup:
     - Server 1: `192.168.1.101`
     - Server 2: `192.168.1.102`

2. **Session Sharing**:
   - Use a shared session store like **Redis** or **Database**.
   - Update `config/session.php`:
     ```php
     'driver' => 'redis',  // Or 'database'
     ```

3. **Database Replication**:
   - Set up **primary-replica** database replication for read-heavy applications.
   - Configure Laravel’s `config/database.php`:
     ```php
     'connections' => [
         'mysql' => [
             'read' => [
                 'host' => [
                     '192.168.1.201',  // Replica 1
                     '192.168.1.202',  // Replica 2
                 ],
             ],
             'write' => [
                 'host' => '192.168.1.200',  // Primary
             ],
             'driver' => 'mysql',
             'database' => env('DB_DATABASE', 'forge'),
             'username' => env('DB_USERNAME', 'forge'),
             'password' => env('DB_PASSWORD', ''),
         ],
     ],
     ```

---

### **2b) Database Optimizations**
1. **Indexing**:
   - Add indexes to frequently queried columns:
     ```sql
     CREATE INDEX idx_user_id ON orders(user_id);
     ```

2. **Caching**:
   - Use Laravel’s **query caching**.
     ```php
     $users = User::remember(60)->get();
     ```

3. **Optimize Queries**:
   - Avoid N+1 issues using **Eager Loading**:
     ```php
     $users = User::with('posts')->get();
     ```

---
