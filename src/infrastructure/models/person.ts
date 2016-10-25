import * as mongoose from "mongoose";

export module models {

    export var schema = new mongoose.Schema({
        name: String,
        age: Number
    });

    export var person = mongoose.model<mongoose.Document>("People", schema);
}


