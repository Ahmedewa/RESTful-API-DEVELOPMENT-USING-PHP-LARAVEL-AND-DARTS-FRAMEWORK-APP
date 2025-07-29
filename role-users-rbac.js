


 **C. Role-Based Access Control (RBAC)**
RBAC ensures that only authorized users can access restricted resources.

**1. Implement RBAC in Laravel**
1. **Create Roles and Assign Permissions**:
   - Migration for the `roles` table:
     ```php
     Schema::create('roles', function (Blueprint $table) {
         $table->id();
         $table->string('name')->unique();
         $table->timestamps();
     });
     ```

   - Migration for the `role_user` pivot table:
     ```php
     Schema::create('role_user', function (Blueprint $table) {
         $table->id();
         $table->foreignId('role_id')->constrained();
         $table->foreignId('user_id')->constrained();
         $table->timestamps();
     });
     ```

2. **Assign Roles to Users**:
   ```php
   $user = User::find(1);
   $user->roles()->attach($roleId);
   ```

3. **Protect Routes with Middleware**:
   Create a custom middleware:
   ```bash
   php artisan make:middleware RoleMiddleware
   ```
   Add logic to check user roles:
   ```php
   public function handle($request, Closure $next, $role)
   {
       if (!$request->user() || !$request->user()->hasRole($role)) {
           return response()->json(['message' => 'Forbidden'], 403);
       }
       return $next($request);
   }
   ```

