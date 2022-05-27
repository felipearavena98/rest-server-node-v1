const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        // Endpoints
        this.paths = {
            auth: '/api/auth',
            category: '/api/category',
            users: '/api/users',
            product: '/api/products',
            search: '/api/search'
        }

        // Conect Data Base
        this.cnnDB();

        // Middlewares
        this.middlewares();
        // Rutas de mi app

        this.routes();
    }

    async cnnDB() {
        await dbConnection()
    }

    middlewares() {
        // CORS
        this.app.use(cors());

        // Parseo y lectura del body
        this.app.use(express.json());

        // Directorio Publico
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.paths.auth, require('../routes/auth'));
        this.app.use(this.paths.category, require('../routes/category'));
        this.app.use(this.paths.product, require('../routes/product'));
        this.app.use(this.paths.users, require('../routes/user'));
        this.app.use(this.paths.search, require('../routes/search'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en el puerto', this.port);
        });
    }

}

module.exports = Server;