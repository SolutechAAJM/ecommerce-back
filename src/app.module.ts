import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule} from './modules/users/users.module';
import { ProductModule } from './modules/products/product.module';
import { CategoryModule } from './modules/category/category.module';
import { TypeModule } from './modules/types/type.module';
import { ShoppingModule } from './modules/shopping/shopping.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'ep-young-surf-a5hioq57.us-east-2.aws.neon.tech',
      port: 5432,
      username: 'ecommerce_owner',
      password: 'TYzoCfF9RP7g',
      database: 'ecommerce',
      autoLoadEntities: true,
      synchronize: true,
      ssl: {
        rejectUnauthorized: false, 
      },
      extra: {
        options: 'project=ep-young-surf-a5hioq57', 
      },
    }),
    AuthModule,
    UsersModule,
    ProductModule,
    CategoryModule,
    TypeModule,
    ShoppingModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
