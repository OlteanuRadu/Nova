import {personService} from './services/personService';
import {cityService} from './services/cityService';
import {DbService} from './../core/database/dbService/dbService';
import {CityRepository} from './repositories/cityRepository';
import {PersonRepository} from './repositories/personRepository';
import {models} from "./models/person";
import {Router} from 'express';

var Resource = require('odata-resource');





export default function route() {
    let t = DbService.DbServiceImpl._instance.connect()
    let api = Router();
    api.use('/persons', new personService.PersonService(new PersonRepository.PersonRepository()).configRoutes());
    api.use('/cities', new cityService.CityService(new CityRepository.CityRepository()).configRoutes());
    console.log("Routing ... ");

    return api;
}