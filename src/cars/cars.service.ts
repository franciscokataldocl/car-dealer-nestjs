import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { Car } from './interfaces/car.interface';
import {v4 as uuid} from 'uuid';
import { CreateCarDto, UpdateCarDto } from './dto';


@Injectable()
export class CarsService {

    private cars: Car[] = [
        {id: uuid(), brand: 'toyota',model: 'Corolla'},
        {id: uuid(), brand: 'Honda', model: 'Civic'},
        {id: uuid(), brand: 'Jeep', model: 'Cherokee'}
    ];

    public findAll(){
        return this.cars;
    }

    public findOneById(id: string){
        const car = this.cars.find((car) => car.id === id);

        if(!car){
            throw new NotFoundException(`No existe un automovil con el id: ${id}`);
        }

        return car
    }


    public create(createCardDto: CreateCarDto){
       const newCar: Car = {
           id: uuid(),
           ...createCardDto
        //    brand: createCardDto.brand,
        //    model: createCardDto.model
       }

       this.cars.push(newCar)

       return newCar;
    }

    public update(id:string, updateCarDto: UpdateCarDto){

        let carDB = this.findOneById(id);

        if(updateCarDto.id && updateCarDto.id !== id){
            throw new BadRequestException('car id is not valid')
        }

        //con this.cars, editamos el arreglo de autos creado arriba
        this.cars = this.cars.map((car)=>{
            if(car.id === id){
                carDB = {
                    //todas las propiedades del elemento que encontramos en DB
                ...carDB,
                //Sobreescribimos todas las propiedades que vengan como "nuevas"
                ...updateCarDto,
                //si viniera un id, lo sobre escribimos
                id
                }
                return carDB;
            }
            return car;
        })
        return carDB; //auto actualizado

    }

    public delete(id:string){
        const car = this.findOneById(id);

        this.cars = this.cars.filter(car => car.id !== id);




    }


}
