
import {WebApiBaseService} from './../../core/webApi/webApiBaseService';

export module cityService{

    export class CityService<city> extends WebApiBaseService.WebApiBaseService<any>{
        constructor(repo) {
            super(repo);
        }
    }
}