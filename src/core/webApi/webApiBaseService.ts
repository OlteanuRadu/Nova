
import * as mongoose from "mongoose";
import * as db from "./../database/genericRepository";
import {Router} from "express";
import express = require("express");

export module WebApiBaseService {

    export abstract class WebApiBaseService<T extends mongoose.Model<mongoose.Document>>{

        public constructor(public repo: db.GenericRepository.IRepository<T>) {

        }

        public configRoutes() {
            const router = Router();

            var dataBuffer = [];

            router.get("/", (request: express.Request, response: express.Response) => {
                this.repo.listAll()
                        .subscribe(_ =>
                        this.onNext(dataBuffer, _),
                        (e) => this.onError(e, response),
                        () => this.onCompleted(dataBuffer, response));

                router.get("/:key", (request: express.Request, response: express.Response) => {
                    this.repo.listById(request.params.key).subscribe(_ => {
                        response.json(_);
                    });
                });
            });

            return router;
        }

        private onError(error: any, response: express.Response) {
            response.send(error).end();
        }
        private onNext(dataBuffer: any[], data: any) {
            dataBuffer.push(data);
        }
        private onCompleted(dataBuffer: any[], response: express.Response ) {
            response.json(dataBuffer);
            dataBuffer = [];
        }
    }
}