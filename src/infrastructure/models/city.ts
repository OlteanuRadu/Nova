import * as mongoose from "mongoose";

export module models {

    export var city = mongoose.model<mongoose.Document>("City", new mongoose.Schema({
        name: String,
        description: String
    }));
}

