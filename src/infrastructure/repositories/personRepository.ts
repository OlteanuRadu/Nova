import {models} from "./../models/person";
import {GenericRepository} from "./../../core/database/genericRepository";
import * as mongoose from 'mongoose';


export var person = models.person;

export module PersonRepository {

    export class PersonRepository<person> extends GenericRepository.GenericRepository<any> implements IPersonRepository<person> {
        constructor() {
            super(person);
        }

        customQuery() {
        }
    }

    export interface IPersonRepository<person> extends GenericRepository.IRepository<person>  {
        customQuery(): any;
    }
}