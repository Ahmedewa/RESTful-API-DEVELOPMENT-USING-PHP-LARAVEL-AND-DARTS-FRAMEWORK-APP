 Firebase**

**Frontend Integration with Firebase**
1. Add Firebase dependencies to `pubspec.yaml`:
   ```yaml
   dependencies:
     firebase_core: ^2.17.0
     firebase_auth: ^4.8.0
   ```

2. Initialize Firebase in Flutter:
   ```dart
   import 'package:firebase_core/firebase_core.dart';

   void main() async {
     WidgetsFlutterBinding.ensureInitialized();
     await Firebase.initializeApp();
     runApp(MyApp());
   }
   ```

 **Automate Firebase Deployments**
1. Use Firebase CLI to initialize the project:
   ```bash
   firebase init
   ```

2. Add Firebase deployment to GitHub Actions:
   ```yaml
   name: Firebase Deployment

   on:
     push:
       branches:
         - main

   jobs:
     deploy:
       runs-on: ubuntu-latest

       steps:
         - name: Checkout code
           uses: actions/checkout@v3

         - name: Install Firebase CLI
           run: npm install -g firebase-tools

         - name: Deploy to Firebase
           run: firebase deploy --only hosting
   ```

---

