FIREBASE FIRESTRORE EMULATOR[For Local Testing of theAPP].

 Firebase
 Setting Up Firebase
Create a Firebase Project:

Go to Firebase Console.
Create a new project and configure it.
Add Firebase to Your App:

Download the google-services.json (for Android) or GoogleService-Info.plist (for iOS).
Backend Integration (Laravel):
Install the Firebase SDK for PHP:

bash
Copy
composer require kreait/firebase-php
Example Code:

php
Copy
use Kreait\Firebase\Factory;

$firebase = (new Factory)
    ->withServiceAccount('path/to/firebase_credentials.json')
    ->create();

$auth = $firebase->getAuth();
4. Firebase Firestore Emulator (For Local Testing)
Firestore Emulator allows you to test Firestore queries locally without affecting the live database.

 Set Up Firestore Emulator
Install the Firebase CLI:

bash
Copy
npm install -g firebase-tools
Initialize the Emulator:

bash
Copy
firebase init emulators
Start the Emulator:

bash
Copy
firebase emulators:start
Connect to the Emulator in Flutter:

dart
Copy
import 'package:cloud_firestore/cloud_firestore.dart';

void main() {
  FirebaseFirestore.instance.useFirestoreEmulator('localhost', 8080);
}
