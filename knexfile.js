module.exports = {
    development: {
        client: 'pg',
        connection: {
            host: 'localhost',
            user: 'me',
            password: 'ninia',
            database: 'api',
        },
        migrations: {
            tableName: 'knex_migrations',
            directory: './migrations',
        },
    },
};
