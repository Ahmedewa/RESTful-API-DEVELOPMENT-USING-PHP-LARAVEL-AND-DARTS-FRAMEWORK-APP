

 TESTINGy **RESTful API's idempotency**
-using **Postman** and **Newman**, 
including :**setup instructions, detailed steps, and best practices**.

---

**1. Why Use Postman and Newman for Testing?**

- **Postman**: A popular tool for designing, testing, and automating API workflows.
- **Newman**: A command-line tool that allows running Postman collections in CI/CD pipelines or local scripts.

---

 **2. Setting Up Postman**

 **2a) Install Postman**
- Download and install Postman from [Postman Download](https://www.postman.com/downloads/).

---

**2b) Create a Postman Collection**
1. **Create a New Collection**:
   - Open Postman, click on **Collections** > **New Collection**.
   - Name it (e.g., "Idempotency API Test").

2. **Add a Request to Test Idempotency**:
   - Click **Add Request** in the collection.
   - Configure the request:
     - **Method**: `POST`
     - **URL**: `http://your-api.com/create-resource`
     - **Headers**:
       - `Content-Type`: `application/json`
       - `Idempotency-Key`: `{{idempotencyKey}}` (a variable we'll set later).
     - **Body** (Example):
       ```json
       {
         "name": "Sample Resource",
         "type": "example"
       }
       ```

3. **Add Tests to Validate Idempotency**:
   Add the following script in the **Tests** tab:
   ```javascript
   pm.test("Status code is 201", function () {
       pm.response.to.have.status(201);
   });

   pm.test("Response contains resource ID", function () {
       const jsonData = pm.response.json();
       pm.expect(jsonData).to.have.property("id");
   });

   pm.collectionVariables.set("responseBody", JSON.stringify(pm.response.json()));
   ```

4. **Duplicate the Request for Idempotency Test**:
   - Right-click the request and select **Duplicate**.
   - Rename it to "Duplicate Request".

5. **Update the Duplicate Request Test**:
   - In the **Tests** tab, verify that the second request returns the same result:
     ```javascript
     pm.test("Status code is 200 or 201", function () {
         pm.expect(pm.response.code).to.be.oneOf([200, 201]);
     });

     pm.test("Response matches the first request", function () {
         const firstResponse = JSON.parse(pm.collectionVariables.get("responseBody"));
         const currentResponse = pm.response.json();
         pm.expect(currentResponse).to.eql(firstResponse);
     });
     ```

---

**2c) Set Variables for Idempotency Key**
1. Go to the **Pre-request Script** tab of the first request.
2. Generate a unique `Idempotency-Key`:
   ```javascript
   const uuid = require('uuid');
   pm.collectionVariables.set("idempotencyKey", uuid.v4());
   ```

---

**3. Running the Postman Collection**

1. **Run Collection in Postman**:
   - Click on the collection name > **Run Collection**.
   - Set the environment and click **Run**.

2. **Verify Results**:
   - Ensure the results for duplicate requests are identical and idempotency is maintained.

---

**4. Using Newman to Automate Testing**

**4a) Install Newman**
Newman is a command-line runner for Postman collections.

1. Install Node.js:
   - Download from [Node.js](https://nodejs.org/).
2. Install Newman:
   ```bash
   npm install -g newman
   ```

---

 **4b) Export Postman Collection**
1. Click on the collection in Postman.
2. Select **Export** and choose the format (v2.1 recommended).
3. Save the `.json` file.

---

**4c) Run Collection with Newman**
Run the exported collection:
```bash
newman run path/to/collection.json
```

---

 **4d) Test Idempotency in CI/CD**
You can integrate Newman with CI/CD pipelines to automate idempotency checks.


**Code GitHub Actions Workflow**

```yaml
name: API Idempotency Test

on:
  push:
    branches:
      - main

jobs:
  newman-test:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Install Newman
        run: npm install -g newman

      - name: Run Postman Collection
        run: newman run path/to/collection.json
```

---

**5. Best Practices for Testing Idempotency**

1. **Use Unique Idempotency Keys**:
   - Ensure each test run generates a unique key to avoid conflicts.

2. **Simulate Concurrent Requests**:
   - Use Postman’s **collection runner** or Newman to send duplicate requests simultaneously.

3. **Validate Data Consistency**:
   - Ensure that duplicate requests return identical responses.

4. **Automate Tests**:
   - Use Newman in CI/CD pipelines to run idempotency tests after every code change.

5. **Log and Monitor**:
   - Log idempotency key usage on the backend and monitor for issues like cache expiry or collisions.

---

**6. Example Postman Collection for Idempotency**

Here’s a JSON snippet for a Postman collection to test idempotency:
```json
{
  "info": {
    "name": "Idempotency API Test",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Create Resource",
      "request": {
        "method": "POST",
        "header": [
          {
            "key": "Content-Type",
            "value": "application/json"
          },
          {
            "key": "Idempotency-Key",
            "value": "{{idempotencyKey}}"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\n  \"name\": \"Sample Resource\",\n  \"type\": \"example\"\n}"
        },
        "url": {
          "raw": "http://your-api.com/create-resource",
          "protocol": "http",
          "host": [
            "your-api",
            "com"
          ],
          "path": [
            "create-resource"
          ]
        }
      },
      "response": []
    },
    {
      "name": "Duplicate Request",
      "request": {
        "method": "POST",
        "header": [
          {
            "key": "Content-Type",
            "value": "application/json"
          },
          {
            "key": "Idempotency-Key",
            "value": "{{idempotencyKey}}"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\n  \"name\": \"Sample Resource\",\n  \"type\": \"example\"\n}"
        },
        "url": {
          "raw": "http://your-api.com/create-resource",
          "protocol": "http",
          "host": [
            "your-api",
            "com"
          ],
          "path": [
            "create-resource"
          ]
        }
      },
      "response": []
    }
  ]
}
```

---

**Resources for Learning**

1. **Postman Documentation**: [Postman API Testing Guide](https://learning.postman.com/docs/getting-started/introduction/)
2. **Newman Documentation**: [Newman CLI Docs](https://www.npmjs.com/package/newman)
3. **Idempotency Concepts**: [Idempotency by Stripe](https://stripe.com/docs/idempotency)

---

## **Summary**

| **Tool**          | **Purpose**                                                                 |
|--------------------|-----------------------------------------------------------------------------|
| **Postman**        | Design and manually test API idempotency with variables and duplicate requests. |
| **Newman**         | Automate Postman collections via CLI and integrate into CI/CD pipelines.   |
| **GitHub Actions** | Run automated idempotency tests as part of the CI/CD pipeline.             |

