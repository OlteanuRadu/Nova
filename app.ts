
import * as mongoose from 'mongoose';
import {DbService} from  "./src/core/database/dbService/DbService";
import {PersonRepository} from "./src/infrastructure/repositories/personRepository";
import * as express from 'express';
import * as Enumerable from 'linq';
import * as cors from 'cors';
import {KeyedCollection} from './src/collections/KeyedCollection';
import route from './src/infrastructure/routeConfigurator';
import * as bodyParser from 'body-parser';

import * as wapi from './src/infrastructure/services/personService';

import * as chalk from 'chalk';

    var http = require('http');


    var personRepository = new PersonRepository.PersonRepository();

    var a = new wapi.personService.PersonService(personRepository);


    var persons = require('./persons.json');
    var stdin = process.stdin;

    var strategies = new KeyedCollection.KeyedCollection<any>();
    strategies.Add("1", () => {
        let t = DbService.DbServiceImpl._instance.connect();
        Enumerable.from(persons).forEach(_ => {
            personRepository.create(_).subscribe(_ => {
                console.log(chalk.bold.cyan(`${_}  adding to the database ...`));
            },
                (error) => console.log(chalk.red(`${error}`)),
                () => console.log(chalk.bold.green(`${_} created with succes ...`)));
        });

    });
    strategies.Add("2", () => {
        let t = DbService.DbServiceImpl._instance.connect();
        personRepository.listAll().subscribe(_ => {
            console.log(`Retriving item ${_} from the database ... `);
        },
            (error) => console.log(`${error}`),
            () => console.log("All data has been listed! "));
    });
    strategies.Add("3", () => {
        let t = DbService.DbServiceImpl._instance.connect();
        let items = [];
        personRepository.listAll().subscribe(_ => {
            items.push(_);
        },
            (e) => { },
            () => {
                let mathAny = <any>Math;
                var randomIndex = mathAny.floor(mathAny.random() * items.length);
                console.log(chalk.yellow(`Performing delete on item : ${items[randomIndex]}`));
                personRepository.delete(items[randomIndex]._id).subscribeOnCompleted(() => console.log("Succes"));
            });
    });
    strategies.Add("4", () => {
        let t = DbService.DbServiceImpl._instance.connect();
        let items = [];
        personRepository.listAll().subscribe(_ => {
            items.push(_);
        },
            (e) => { },
            () => {
                items.length;
                let mathAny = <any>Math;
                var randomIndex = mathAny.floor(mathAny.random() * items.length);
                console.log(chalk.yellow(`Getting item from database : ${items[randomIndex]}`));
                personRepository.listById(items[randomIndex]._id).subscribe(_ => console.log(chalk.bold.green(`Retrieved item ${_}`)));
            });


    });
    strategies.Add("5", () => {
        let t = DbService.DbServiceImpl._instance.connect();
        let items = [];

        personRepository.listAll().subscribe(_ => {
            items.push(_);
        },
            (e) => { },
            () => {
                items.length;
                let mathAny = <any>Math;
                var randomIndex = mathAny.floor(mathAny.random() * items.length);
                console.log(chalk.yellow(`Editting item from database : ${items[randomIndex]}`));
                personRepository.update(items[randomIndex]._id, { "name": "asda" }).subscribeOnCompleted(() => console.log(chalk.bold.green(`Modified`)));
            });



    });
    strategies.Add("6", () => {
        Enumerable.from(persons).cast<any>().forEach(_ => {
            console.log(chalk.bgCyan(`${_.name} ${_.age}`));
        });
    });
    strategies.Add("7", () => process.exit());


    console.log(chalk.bold.green('Welcome...Please select an action '));
    console.log(chalk.bgBlue("1. Press 1 to create persons to the mongo database"));
    console.log(chalk.bgBlue("2. Press 2 to list all persons from the mongo database"));
    console.log(chalk.bgBlue("3. Press 3 to delete a random person from the mongo database"));
    console.log(chalk.bgBlue("4. Press 4 to get a random person from the mongo database"));
    console.log(chalk.bgBlue("5. Press 5 to edit a random person with some random data"));
    console.log(chalk.bgBlue("6. Press 6 to display the JSON File that will be added to the mongo database"));
    console.log(chalk.bgBlue("7. Exit"));

    stdin.addListener("data", (d) => {
        var found = strategies.ContainsKey(d.toString().trim());
        if (found) {
            strategies.items[d.toString().trim()]();
        }
        else {
            console.log(chalk.red("Unknown command"));
        }
    });

    var app = express();
    app.use(cors({
        exposedHeaders: ['Link']
    }));
    app.use(bodyParser.json({
        limit: '100kb'
    }));
    app.use('/', route());
    app.listen(3000, () => {
        console.log("Server is up and running .... ");
    });