## Installation

Open up your browser of choice to [http://localhost:8080](http://localhost:8080) and you should see your Laravel app running as intended.

- `docker-compose up -d --build`
- `docker-compose run --rm composer install`
- `docker-compose run --rm npm install`
- `docker-compose run --rm npm run dev`
- `docker-compose run --rm artisan migrate:refresh --seed`

Containers created and their ports (if used) are as follows:

- **nginx** - `:8080`
- **mysql** - `:3306`
- **php** - `:9000`
- **npm**
- **composer**
- **artisan**

## Using Local Installations

You can also use Laravel's internal HTTP Server

- `php artisan serve`

But before this you need local composer, php and npm installations. You also need a Database server which you can use WAMP,XAMPP, etc. In that case you need to change database configurations in .env file accordingly.

- `php composer install`
- `npm install`
- `php artisan migrate:refresh --seed`
- `npm run dev`
- `php artisan serve`

## Persistent MySQL Storage

By default, whenever you bring down the docker-compose network, your MySQL data will be removed after the containers are destroyed. If you would like to have persistent data that remains after bringing containers down and back up, do the following:

1. Create a `mysql` folder in the project root, alongside the `nginx` and `src` folders.
2. Under the mysql service in your `docker-compose.yml` file, add the following lines:

```
volumes:
  - ./mysql:/var/lib/mysql
```
