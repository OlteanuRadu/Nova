import * as mongoose from "mongoose";

export module DbService {
    export interface IDbService {
        connect(): mongoose.Connection;
        getDbContext(): mongoose.Connection;
    }

    export class DbServiceImpl implements IDbService {

        public static _instance: DbServiceImpl = new DbServiceImpl("mongodb://noru:noru@ds057386.mlab.com:57386/heroku_4lflqfnf");
        private dbContext: any = null;

        constructor(public connectionString: string) {
            if (DbServiceImpl._instance) {
                throw new Error("Error: Instantiation failed ...");
            }
            DbServiceImpl._instance = this;
        }

        public getDbContext(): mongoose.Connection {
            if (this.dbContext) {
                return this.dbContext;
            }
        }

        public connect(): any {

            this.dbContext = mongoose.connection.once("open", (r) => {
                console.log("You're now connected ... ");
            });
            this.dbContext = mongoose.connect(this.connectionString, (err) => { });
            return this.dbContext;
        }
    }
}