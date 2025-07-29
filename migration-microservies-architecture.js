MIGRATION TO MICROSERVICES ARCITECTURE

**1. Migrating to a Microservice Architecture**

**Why Migrate?**
1. **Improved Scalability**:
   - Each service can scale independently based on demand (e.g., scaling the authentication service during peak login times).
2. **Independent Development**:
   - Teams can work on separate services without impacting each other.
3. **Fault Isolation**:
   - Failure in one service doesn’t bring down the entire system.
4. **Technology Flexibility**:
   - Different services can use different technologies (e.g., Node.js for notifications, Laravel for authentication).
   
---

**Steps to Migrate**

**1. Split the Application into Services**
Break your monolithic application into smaller, independent services. Each service focuses on a specific domain.

1. **Authentication Service**:
   - Handles user login, registration, token issuance, and validation.
   - Example Routes:
     ```php
     // Laravel routes/api.php for Authentication Service
     Route::post('/login', [AuthController::class, 'login']);
     Route::post('/register', [AuthController::class, 'register']);
     Route::post('/logout', [AuthController::class, 'logout']);
     Route::get('/user', [AuthController::class, 'user'])->middleware('auth:sanctum');
     ```

2. **Task Service**:
   - Manages tasks and their CRUD operations.
   - Expose endpoints like:
     ```php
     // Laravel routes/api.php for Task Service
     Route::middleware('auth:sanctum')->group(function () {
         Route::apiResource('tasks', TaskController::class);
     });
     ```

3. **Notification Service**:
   - Sends real-time updates (e.g., task status updates, reminders).
   - Built using WebSockets or message brokers like **RabbitMQ** or **Redis Pub/Sub**.

---

#### **2. Use a Message Broker for Communication**
Microservices often need to communicate asynchronously. A **message broker** like **RabbitMQ** or **Apache Kafka** ensures reliable delivery of messages between services.

1. **Install RabbitMQ**:
   - Install RabbitMQ on your system or use Docker:
     ```bash
     docker run -d --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:management
     ```
   - Access the RabbitMQ dashboard at `http://localhost:15672`.

2. **Send and Receive Messages**:
   - **Producer** (Laravel example for sending messages):
     ```php
     use PhpAmqpLib\Connection\AMQPStreamConnection;
     use PhpAmqpLib\Message\AMQPMessage;

     $connection = new AMQPStreamConnection('localhost', 5672, 'guest', 'guest');
     $channel = $connection->channel();

     $channel->queue_declare('task_updates', false, false, false, false);

     $msg = new AMQPMessage('Task Created: Task ID 123');
     $channel->basic_publish($msg, '', 'task_updates');

     $channel->close();
     $connection->close();
     ```

   - **Consumer** (Node.js example for receiving messages):
     ```javascript
     const amqp = require('amqplib');

     async function receiveMessages() {
         const connection = await amqp.connect('amqp://localhost');
         const channel = await connection.createChannel();

         const queue = 'task_updates';
         await channel.assertQueue(queue, { durable: false });

         console.log(`Waiting for messages in ${queue}`);
         channel.consume(queue, (msg) => {
             console.log(`Received: ${msg.content.toString()}`);
         }, { noAck: true });
     }

     receiveMessages();
     ```

---

# **3. Deploy Services Independently Using Docker**
1. **Create Dockerfiles for Each Service**:
   - **Example Dockerfile for Laravel Authentication Service**:
     ```dockerfile
     FROM php:8.1-fpm
     WORKDIR /var/www
     COPY . .
     RUN docker-php-ext-install pdo pdo_mysql
     CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]
     EXPOSE 8000
     ```

   - **Example Dockerfile for Notification Service (Node.js)**:
     ```dockerfile
     FROM node:16
     WORKDIR /usr/src/app
     COPY package*.json ./
     RUN npm install
     COPY . .
     CMD ["node", "index.js"]
     EXPOSE 3000
     ```

2. **Run Services Using Docker Compose**:
   - Create a `docker-compose.yml` file:
     ```yaml
     version: '3.8'
     services:
       auth-service:
         build:
           context: ./auth-service
         ports:
           - "8000:8000"
         networks:
           - microservices

       task-service:
         build:
           context: ./task-service
         ports:
           - "8001:8000"
         networks:
           - microservices

       rabbitmq:
         image: rabbitmq:management
         ports:
           - "5672:5672"
           - "15672:15672"
         networks:
           - microservices

     networks:
       microservices:
         driver: bridge
     ```

   - Start all services:
     ```bash
     docker-compose up --build
     ```

---

