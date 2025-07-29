    SWAGGER DOCUMENTATION

 **Documentation and Monitoring**

**A. Using Swagger for API Documentation**

1. **Install Swagger in Laravel**:
   ```bash
   composer require darkaonline/l5-swagger
   php artisan vendor:publish --provider="L5Swagger\L5SwaggerServiceProvider"
   ```

2. **Access Swagger Documentation**:
   - Visit `http://localhost:8000/api/documentation`.

3. **Annotate Controllers for Swagger**:
   ```php
   /**
    * @OA\Post(
    *     path="/login",
    *     tags={"Authentication"},
    *     summary="Login user",
    *     @OA\RequestBody(
    *         @OA\JsonContent(
    *             required={"email","password"},
    *             @OA\Property(property="email", type="string", example="user@example.com"),
    *             @OA\Property(property="password", type="string", example="123456")
    *         ),
    *     ),
    *     @OA\Response(response=200, description="Successful Login"),
    *     @OA\Response(response=401, description="Unauthorized")
    * )
    */
   ```

---

**B. Continuous Integration/Deployment (CI/CD)**
  
1. **Set Up GitHub Actions**:
   Create a `.github/workflows/ci.yml` file:
   ```yaml
   name: CI Pipeline

   on:
     push:
       branches:
         - main

   jobs:
     build-and-test:
       runs-on: ubuntu-latest

       steps:
         - name: Checkout code
           uses: actions/checkout@v3

         - name: Set up PHP
           uses: shivammathur/setup-php@v2
           with:
             php-version: '8.1'

         - name: Install dependencies
           run: composer install

         - name: Run tests
           run: php artisan test
   ```

---

**C. Monitor Performance**
  
1. **Laravel Telescope**:
   - Install Telescope for monitoring:
     ```bash
     composer require laravel/telescope
     php artisan telescope:install
     php artisan migrate
     php artisan serve
     ```
   - Access Telescope at `http://localhost:8000/telescope`.

2. **Grafana  & Prometheus**:
  
   -  to monitor application performance, logs, and errors in real-time.

---

