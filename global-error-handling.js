GLOBAL ERROR HANDLING-'CONSISTENT ERRORS'

 ** Error Consistency**
**Why Use Consistent Errors?**
- Makes debugging easier for developers.
- Improves user experience with clear error messages.

**Implement Global Error Handling in Laravel**
Update the `App\Exceptions\Handler.php` file:

```php
public function render($request, Throwable $exception)
{
    if ($exception instanceof ModelNotFoundException) {
        return response()->json(['error' => 'Resource not found'], 404);
    }

    if ($exception instanceof AuthenticationException) {
        return response()->json(['error' => 'Unauthenticated'], 401);
    }

    return response()->json(['error' => 'Internal Server Error'], 500);
}
```

