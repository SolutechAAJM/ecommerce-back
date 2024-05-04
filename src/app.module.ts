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
      host: 'localhost',
      port: 5432,
      username: 'mantum',
      password: 'gatostem123',
      database: 'pdo22',
      autoLoadEntities: true,
      synchronize: true, 
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