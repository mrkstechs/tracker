module.exports = {
    production: {
        client: 'pg',
        connection: process.env.DATABASE_URL,
        migrations: {
            directory: './server/db/migrations',
        },
        seeds: { directory: './server/db/seed.sql' },
    }
}