import {models} from "./../models/person";
import {GenericRepository} from "./../../core/database/genericRepository";
import * as mongoose from 'mongoose';


export var person = models.person;

export module PersonRepository {

    export class PersonRepository<person> extends GenericRepository.GenericRepository<any>{
        constructor() {
            super(person);
        }
    }
}