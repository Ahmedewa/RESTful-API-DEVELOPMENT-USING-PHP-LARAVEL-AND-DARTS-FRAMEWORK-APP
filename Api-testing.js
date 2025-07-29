API TESTING & AUTOMATION DURING DEVELOPMENT
-

**4. API Testing During Development**

1. **Automate API Testing with PHPUnit**:

   - Add API tests in `tests/Feature`:
     ```php
     public function testGetUsers() {
         $response = $this->get('/api/users');
         $response->assertStatus(200)
                  ->assertJsonStructure([
                      'status',
                      'message',
                      'data' => [
                          '*' => ['id', 'name', 'email'],
                      ],
                  ]);
     }
     ```

2. **Use Postman/Newman**:
   - Export Postman collections and run them using Newman in CI/CD:
     ```bash
     newman run path/to/collection.json
     ```

---

## **5. API Versioning**

1. **Add Version Prefix to Routes**:
   Update `routes/api.php`:
   ```php
   Route::prefix('v1')->group(function () {
       Route::get('/users', [UserController::class, 'index']);
   });
   ```

2. **Separate Controllers by Version**:
   Use versioned namespaces:
   ```php
   namespace App\Http\Controllers\API\V1;
   ```

3. **Document Versions**:
   Use tools like **Swagger** to maintain API documentation.

