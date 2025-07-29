Use GitHub Actions to automate the build, test, and deployment processes.

Example Workflow


name: CI/CD Pipeline

on:
  push:
    branches:
      - main

jobs:
  build:
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

      - name: Run Laravel tests
        run: php artisan test

      - name: Deploy to server
        run: |
          ssh user@server "
          cd /path/to/project &&
          git pull &&
          php artisan migrate"
