//un dto es como esperamos que luzca la data

import { IsString,  MinLength } from "class-validator";

export class CreateCarDto {

    @IsString()
    readonly brand: string;

    @IsString()
    @MinLength(3, {message: 'el modelo debe tener por lo menos 3 letras'})
    readonly model: string;

}