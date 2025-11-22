import { Controller, Get, Post, Body, Param, Delete, Patch } from '@nestjs/common'; // Agregamos Param, Delete, Patch
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from './employee.entity';

@Controller('employees')
export class EmployeeController {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
  ) {}

  @Post()
  create(@Body() body: { fullName: string; role: string }) {
    const newEmployee = this.employeeRepository.create(body);
    return this.employeeRepository.save(newEmployee);
  }

  @Get()
  findAll() {
    return this.employeeRepository.find({ order: { id: 'DESC' } });
  }

  // --- NUEVOS ENDPOINTS ---

  // 1. Editar (PATCH permite enviar solo los campos que cambiaron)
  @Patch(':id')
  update(@Param('id') id: string, @Body() body: Partial<Employee>) {
    return this.employeeRepository.update(+id, body);
  }

  // 2. Eliminar
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.employeeRepository.delete(+id);
  }
}