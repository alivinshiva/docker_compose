import 'dotenv/config';
import express from 'express';
import { PrismaClient } from './generated/prisma/client.js';

const app = express();
const port = 3000;

const prismaClient = new PrismaClient();

// Parse incoming JSON bodies
app.use(express.json());

app.get('/', async (req: any, res: any) => {
    const data = await prismaClient.user.findMany();
    res.send(`<h1>hello world</h1> <br/> ${JSON.stringify(data)}`);

});
    
app.post('/users', async (req: any, res: any) => {
    const { username, password } = req.body || {};
    if (!username || !password) {
        return res.status(400).json({ error: 'username and password are required' });
    }

    const user = await prismaClient.user.create({
        data: { username, password },
    });
    res.status(201).json({ message: 'user created', user });
});

async function start() {
    await prismaClient.$connect();

    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}

start().catch((err) => {
    console.error(err);
    process.exit(1);
});