REAL-TIME-COMMUNICATION-LARAVEL-APIs

  Real-Time Communication**
**Problem**: Laravel APIs are not real-time by default.

1. **Install Laravel Echo and Pusher**:
   ```bash
   composer require pusher/pusher-php-server
   npm install --save laravel-echo pusher-js
   ```

2. **Configure Pusher**:
   Update `.env`:
   ```env
   PUSHER_APP_ID=your_app_id
   PUSHER_APP_KEY=your_app_key
   PUSHER_APP_SECRET=your_app_secret
   ```

3. **Set Up Broadcasting**:
   Enable broadcasting in `config/broadcasting.php`:
   ```php
   'default' => env('BROADCAST_DRIVER', 'pusher'),
   ```

4. **Broadcast Code**:

   ```php
   event(new App\Events\MessageSent($message));
   ```

