import * as mongoose from "mongoose";

export module models {

    export var person = mongoose.model<mongoose.Document>("People", new mongoose.Schema({
        name: String,
        age: Number
    }));
}


