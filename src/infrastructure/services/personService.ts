
import {WebApiBaseService} from './../../core/webApi/webApiBaseService';

import {Router} from 'express';


export module personService {

    export class PersonService<person> extends WebApiBaseService.WebApiBaseService<any> {
        constructor(repo) {
            super(repo);
        }

        public hello() {

        }
    }
}