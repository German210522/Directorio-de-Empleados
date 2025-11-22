import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from './employee.entity';
import { EmployeeController } from './employee.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite', // Base de datos simple en archivo
      entities: [Employee],
      synchronize: true, // Solo para desarrollo: crea tablas automáticamente
    }),
    TypeOrmModule.forFeature([Employee]),
  ],
  controllers: [EmployeeController],
  providers: [],
})
export class AppModule {}
