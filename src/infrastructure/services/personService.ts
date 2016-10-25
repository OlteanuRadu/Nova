
import {WebApiBaseService} from './../../core/webApi/webApiBaseService';


export module personService {

    export class PersonService<person> extends WebApiBaseService.WebApiBaseService<any> {
        constructor(repo) {
            super(repo);
        }
    }
}