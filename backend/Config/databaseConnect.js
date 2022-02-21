const mongoose = require('mongoose');

const databaseConnect = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL, {
            // useUnifiedToplogy: true,
            useNewUrlParser: true,
            // useCreateIndex: true
        });

        console.log(`MongoDB is Connected : ${conn.connection.host}`);

    } catch (error) {
        console.error(`Error Message : ${error}`);
        process.exit();
    }
}

module.exports = databaseConnect;