import {models} from "./../models/city";
import {GenericRepository} from "./../../core/database/genericRepository";
import * as mongoose from 'mongoose';


export var city = models.city;

export module CityRepository {

    export class CityRepository<city> extends GenericRepository.GenericRepository<any>{
        constructor() {
            super(city);
        }
    }
}