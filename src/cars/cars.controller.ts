import { 
    Controller, 
    Get,
    Post,
    Body,
    Patch,
    Delete, 
    Param, 
    ParseIntPipe, 
    ParseUUIDPipe,
    UsePipes,
    ValidationPipe } from '@nestjs/common';
//importacion de service CarsService
import { CarsService } from './cars.service';
import { CreateCarDto, UpdateCarDto } from './dto/';

@Controller('cars')

// @UsePipes(ValidationPipe)
export class CarsController {

    constructor(
        //dependencia inyectada desde CarsService
        private readonly carsService: CarsService
    ){}

    @Get()
    getAllCars() {
        return this.carsService.findAll();
    }

    @Get(':id')
    getCarById(@Param('id',ParseUUIDPipe) id:string) {
        return this.carsService.findOneById(id);
    }
    
    @Post()
    creatCar(@Body() createCarDto:CreateCarDto){
        return this.carsService.create(createCarDto);
    }

    @Patch(':id')
    updateCar(@Param('id',ParseUUIDPipe) id:string, 
    @Body() updateCarDto: UpdateCarDto){
        //aca enviamos la data al servicio update
        return this.carsService.update(id, updateCarDto)
    }

    @Delete(':id')
    deleteCar(@Param('id',ParseUUIDPipe) id:string){
        return this.carsService.delete(id)    
    }

    

}
