
import * as mongoose from "mongoose";
import * as db from "./../database/genericRepository";
import {Router} from "express";
import express = require("express");

export module WebApiBaseService {

    export abstract class WebApiBaseService<T extends mongoose.Model<mongoose.Document>>{

        public constructor(public repo: db.GenericRepository.IRepository<T>) {

        }

        private dataBuffer = [];

        public configRoutes() {
            const router = Router();

            router.get("/", (request: express.Request, response: express.Response) => {
                this.repo.listAll()
                        .subscribe(_ =>
                        this.onNext(_),
                        (e) => this.onError(e, response),
                        () => {
                            this.onCompleted(response);
                        });

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
        private onNext(data: any) {
            this.dataBuffer.push(data);
        }
        private onCompleted(response: express.Response ) {
            response.json(this.dataBuffer);
            this.dataBuffer.length = 0;
        }
    }
}