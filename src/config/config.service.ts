import { TypeOrmModuleOptions } from '@nestjs/typeorm';

require('dotenv').config();

class ConfigService {
    constructor(private env: { [k: string]: string | undefined }) {}
    // ...
    public getTypeOrmConfig(): TypeOrmModuleOptions {
        return {
        type: 'postgres',
        host: 'ella.db.elephantsql.com',
        port: 5432,
        username: 'rznxxxik',
        password: 'KglnrpHzwmCZu0HbYNvSrCM1ERh3OWs0',
        database: 'rznxxxik',
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: true,
        };
    }
}

const configService = new ConfigService(process.env);

export { configService };