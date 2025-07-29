RABBITMQ[MESSAGE-BROKER/MESSAGE QUEUE].
1. Setting Up RabbitMQ with Docker**

RabbitMQ is a message broker that enables communication between microservices asynchronously.

 **Step 1: Install Docker**
1. Install Docker on your system:
   - [Docker Installation Guide](https://docs.docker.com/get-docker/).

2. Verify the installation:
   ```bash
   docker --version
   ```

**Step 2: Set Up RabbitMQ Using Docker**
1. Pull the RabbitMQ Docker image:
   ```bash
   docker pull rabbitmq:management
   ```

2. Run RabbitMQ with Docker:
   ```bash
   docker run -d --name rabbitmq \
     -p 5672:5672 -p 15672:15672 \
     rabbitmq:management
   ```

3. Access RabbitMQ Management Dashboard:
   - Open `http://localhost:15672` in your browser.
   - Default username/password: `guest/guest`.

---

**Step 3: Configure RabbitMQ in Laravel**
1. Install a RabbitMQ package in Laravel:
   ```bash
   composer require php-amqplib/php-amqplib
   ```

2.  Code for Sending a Message:
   ```php
   use PhpAmqpLib\Connection\AMQPStreamConnection;
   use PhpAmqpLib\Message\AMQPMessage;

   function sendMessage()
   {
       $connection = new AMQPStreamConnection('localhost', 5672, 'guest', 'guest');
       $channel = $connection->channel();

       $channel->queue_declare('task_queue', false, true, false, false);

       $messageBody = 'Hello, RabbitMQ!';
       $msg = new AMQPMessage($messageBody, ['delivery_mode' => 2]); // Persistent message
       $channel->basic_publish($msg, '', 'task_queue');

       echo " [x] Sent '$messageBody'\n";

       $channel->close();
       $connection->close();
   }
   ```


3. Code for Receiving a Message:

   ```php
   use PhpAmqpLib\Connection\AMQPStreamConnection;

   function receiveMessage()
   {
       $connection = new AMQPStreamConnection('localhost', 5672, 'guest', 'guest');
       $channel = $connection->channel();

       $channel->queue_declare('task_queue', false, true, false, false);

       echo ' [*] Waiting for messages. To exit press CTRL+C', "\n";

       $callback = function ($msg) {
           echo ' [x] Received ', $msg->body, "\n";
       };

       $channel->basic_consume('task_queue', '', false, true, false, false, $callback);

       while ($channel->is_consuming()) {
           $channel->wait();
       }

       $channel->close();
       $connection->close();
   }
   ```

---

 
