import {models} from "./../../models/person";
import {GenericRepository} from "./../genericRepository";
import * as mongoose from 'mongoose';

export var person = models.person;

export module Repositories {

    export class PersonRepository<person> extends GenericRepository.GenericRepository<any>{
        constructor() {
            super(person);
        }
    }
}