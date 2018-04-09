const db = require('./app/model/db');
module.exports= app =>{
    console.log('start\n');
    app.beforeStart(async () => {
        await db.connect();
    });
}