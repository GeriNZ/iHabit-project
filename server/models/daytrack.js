const SQL = require("sql-template-strings");
const db = require('../db/config');

const moment = require('moment');


class Daytrack {
    constructor(data){
        this.id = data.id;
        this.habit = data.habit_id;
        this.user = data.user_id;
        this.completion = data.completion;
        this.day = data.day;
        this.currentdate = data.currentdate;
        this.streak = data.streak;
        this.streakDay = data.streak_day;
    }

    static all(id){
        return new Promise (async (resolve, reject) => {
            try {
                const result = await db.run(SQL`SELECT * FROM daytrack 
                                                    WHERE user_id = ${id};`);
                const dailyhabits = result.rows.map(a => new Daytrack(a));
                resolve(dailyhabits);
            }catch(err){
                reject('daily habits could not be found.')
            }
        })
    }

    static findById(id) {
        return new Promise (async (resolve, reject) => {
            try {
                console.log('problem ahoy');
                let dailyHabitData = await db.run(SQL`SELECT * FROM daytrack WHERE habit_id = ${id};`);
                let dailyHabit = new Daytrack(dailyHabitData.rows[0]);
                console.log('solution ahoy');
                resolve(dailyHabit); 
            } catch (err) {
                reject("Daily habit has not been found");
            }
        })
    };
    
    // weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    // weekdays[Date.getDay()]
    
    static createNewHabit(habitId, userId, dailyNum) {
        return new Promise (async (resolve, reject) => {
            try {
                const date= moment().format().toString();
                const day = new Date().toDateString().slice(0,4);
                //console.log(date, day);
                let habitData = await db.run(SQL`INSERT INTO daytrack (habit_id, user_id, completion, day, currentdate, streak, streak_day)
                                                    VALUES (
                                                        ${habitId},
                                                        ${userId},
                                                        ${dailyNum},
                                                        ${day},
                                                        ${date},
                                                        FALSE,
                                                        0) RETURNING *;`);
                //console.log("end line");
                // let newDayHabit = new Daytrack(habitData.rows[0]);
                // resolve(newDayHabit);
                resolve (habitData.rows[0]);
            } catch(err) {
                reject ('New daytrack habit couldnt be created')
            }
        })
    };

    destroy(id){
        return new Promise( async(resolve, reject)=> {
            try{
                const result = await db.run(SQL`DELETE FROM daytrack WHERE id = ${id};`);
                resolve('Daily habit has been deleted');
            }catch(err){
                reject('Daily habit could not be deleted')
            }
        })
    };


}

module.exports = Daytrack