# Server Base - Proyecto ONG

## Envinroment setup

1. Create database
2. Copy .env.example to .env and fill with database credentials.

To install dependencies, run

```bash
npm install
```

3. Migrations:

```bash
npx sequelize-cli db:migrate
```

4. Seeders:

```bash
npx sequelize-cli db:seed:all
```

## Start local server

```bash
npm start
```

## Run development mode

```bash
npm run dev
```

## About 'Users' seeder:

This seeder creates 20 users, 10 admin and 10 standard, named as:
name: usuario01 to usuario20
lastName: test01 to test20
email: test01@test.com to test20@test.com

The first 10 are admin, remaining are standard.

Their clear passwords are allways 'Abc1234' . The password is stored encrypted.
