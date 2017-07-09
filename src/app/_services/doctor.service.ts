import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

import { AuthenticationService } from '../_services/index';
import { AppConfig } from '../app.config';
import { Patient } from '../_models/index';
import {Doctor} from "../_models/doctor";

@Injectable()
export class DoctorService {
    constructor(
        private http: Http,
        private config: AppConfig) {
    }

    //TODO dodac wywołania endpointów

    allDoctors:Doctor[] = [{
        _id: "1",
        firstName:"Marcin",
        lastName: "Matys",
        specialization:"Ortopeda"
    },{
        _id: "5",
        firstName:"Aleksander",
        lastName: "Lejkowski",
        specialization:"Pediatra"
    }];

    getAll():Doctor[] {
        return this.allDoctors;
    }

    getById(_id: string): Doctor {
        for(var i = 0; i < this.allDoctors.length; i++){
            if(this.allDoctors[i]._id === _id) {
                return this.allDoctors[i];
            }
        }
        return {
          _id: _id,
            firstName:"Nieznany",
            lastName: "Lekarz"+_id,
            specialization:"Niewiadomolog"
        };
    }


}