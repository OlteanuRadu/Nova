import * as mongoose from "mongoose";
import {DbService} from "./dbService/DbService";

import * as rx from "rx";

export module GenericRepository {

    export interface IRepository<T> {
        listById(_id: string): rx.Observable<any>;
        listAll(queryCondition?: () => Object): rx.Observable<any>;
        create(entity: T): rx.Observable<any>;
        delete(_id: string): rx.Observable<any>;
        update(_id: string, entity: T): rx.Observable<any>;
    }

    export abstract class GenericRepository<T extends mongoose.Model<mongoose.Document>> implements IRepository<T> {

        public constructor(public model: T) {
        }


        public create(entity: T): rx.Observable<any> {
            return rx.Observable.create((observer) => {
                this.model.create(entity, (error, result) => {

                    if (result) {
                        rx.Observable.of(result).subscribe(observer);
                    }
                    if (error) {
                        observer.onError(error);
                    }
                });
            });
        }

        public delete(_id: string): rx.Observable<any> {
            return rx.Observable.create((observer) => {
                this.model.findByIdAndRemove({ _id: _id }, (error, result) => {
                    if (result) {
                        rx.Observable.of(result).subscribe(observer);
                    }
                    if (error) {
                        observer.onError(error);
                    }
                    if (result == null) {
                        observer.onError(result);
                    }
                });
            });
        }

        public update(_id: string, entity :T): rx.Observable<any> {
            return rx.Observable.create((observer) => {
                this.model.findByIdAndUpdate({ _id: _id }, entity, (error, result) => {
                    if (result) {
                        rx.Observable.just(result).subscribe(observer);
                    }
                    if (error) {
                        observer.onError(error);
                    }
                });
            });
        }

        public listAll(queryCondition?: () => Object): rx.Observable<any> {
            return rx.Observable.create((observer) => {
                this.model.find(this.interpretFilter(queryCondition), (error, result) => {
                    if (result) {
                        rx.Observable.from(result).subscribe(observer);
                    }
                    if (error) {
                        observer.onError(error);
                    }
                    if (result == null)
                        observer.onCompleted();
                });
            });
        }

        public listById(_id: string): rx.Observable<any> {
            return rx.Observable.create((observer) => {
                this.model.findById({ _id: _id }, (error, result) => {
                    if (result) {
                        rx.Observable.just(result).subscribe(observer);
                    }
                    if (error) {
                        observer.onError(error);
                    }
                    if (result == null)
                        observer.onError(result);
                });
            });
        }

        private interpretFilter(queryCondition: () => Object): Object {
            let filter = {};

            if (queryCondition === undefined) {
                return filter;
            }
            return queryCondition();
        }
    }
}