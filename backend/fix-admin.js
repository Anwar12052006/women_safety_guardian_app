import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
dotenv.config();

const URI = process.env.MONGO_URI;

async function fixAdmin() {
    try {
        console.log('Connecting to DB...');
        await mongoose.connect(URI);
        const db = mongoose.connection.db;

        console.log('Finding user by regex...');
        const collection = db.collection('users');
        const user = await collection.findOne({ email: { $regex: /raza@gmail.com/i }, role: 'admin' });

        if (!user) {
            console.log('User not found!');
            process.exit(1);
        }

        console.log('Found user:', user.email);

        const hash = await bcrypt.hash("Raza@786#", 10);

        await collection.updateOne(
            { _id: user._id },
            {
                $set: {
                    email: "raza@gmail.com",
                    password: hash
                }
            }
        );

        console.log('Successfully updated user email to lowercase and rehashed password!');
        process.exit(0);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}

fixAdmin();
