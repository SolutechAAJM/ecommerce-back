import { Module, Global } from '@nestjs/common';
import { Pool } from 'pg';

@Global()
@Module({
  providers: [
    {
      provide: 'PG_CONNECTION',
      useValue: new Pool({
        // connectionString: 'postgres://mantum:gatostem123@localhost:5432/poo',
        connectionString: 'postgres://ecommerce_owner:TYzoCfF9RP7g@ep-young-surf-a5hioq57.us-east-2.aws.neon.tech:5432/ecommerce',
        ssl: {
          rejectUnauthorized: false,
        },
      }),
    },
  ],
  exports: ['PG_CONNECTION'],
})
export class DatabaseModule {}
