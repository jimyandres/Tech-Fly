# Tech & Fly

---

## Instalación

Para instalar el proyecto clona este repositorio con el comando:

```
git clone https://github.com/jimyandres/Tech-Fly.git
```

Una vez clonado el proyecto se deben instalar las dependencias ejecutando en la carpeta del proyecto:

```
npm install
```

Para este proyecto se utilizó MongoDB. Para instalarlo sigue las siguientes [instrucciones oficiales](https://docs.mongodb.com/manual/administration/install-community/).

## Ejecución

Antes de ejecutar el proyecto se debe asegurar que el demonio de base de datos de MongoDB se haya [iniciado correctamente](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/#verify-that-mongodb-has-started-successfully).

Para iniciar el proyecto con información inicial, es posible ejecutar el siguiente comando en la carpeta del proyecto:

```
mongo localhost:27017/techandfly --quiet data-script.js
```

Este proyecto tiene dos modos de ejecución:

- Development mode:

  1. Puedes iniciar directamente con el comando

      ```
      npm run start
      ```
      o simplemente
      ```
      npm start
      ```

- Production mode:

  1. Construye el proyecto para producción

      ```
      npm run build-prod
      ```
  2. Inicia el proyecto:
      ```
      npm run start-prod
      ```

Ahora puedes iniciar en tu navegar de preferencia e ir a la dirección:
http://localhost:3000/


## Información adicional

### RESTful API - ENDPOINTS

|ENDPOINTS  |MÉTODO  |FUNCIONALIDAD |
|---|:---:|---|
|`api/aircrafts`| `POST`| Añadir un nuevo avión|
|`api/airlines`| `POST`| Añadir una nueva aerolínea|
|`api/airports`| `POST`| Añadir un nuevo aeropuerto|
|`api/airports/locations`| `GET`| Obtener todas las localizaciones|
|`api/flights`| `GET`| Obtener los vuelos|
|`api/flights`| `POST`| Añadir un nuevo vuelo|
|`api/users`| `POST`| Añadir un nuevo usuario|
|`api/users/user_id`| `GET`| Obtener un usuario específico|
|`api/users/user_id/reservations`| `GET`| Obtener todas las reservaciones hechas por un usuario|
|`api/users/user_id/reservations`| `POST`| Realizar una nueva reservación|

## Problemas y Vulnerabilidades de Seguridad

Si descubres algún bug o vulnerabilidad de seguridad, por favor envíame un e-mail a Jimy Andres Alzate via [jimyandres.ar@gmail.com](mailto:jimyandres.ar@gmail.com), o abre un nuevo Issue describiendo el proceso a seguir para replicar el problema.

## Licencia

Este proyecto es un software open-source licenciado bajo la [licencia MIT](https://opensource.org/licenses/MIT).
