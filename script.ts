import { PrismaClient } from '@prisma/client'
import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import * as BreakingBad from './breakingbad';


const prisma = new PrismaClient()

const app : Express = express();

app.use(cors());
app.use(express.json());

app.get('/api/v1/games', async (req: Request, res: Response) => {
    const response = await prisma.game.findMany({
        where: {
            published: true
        }
    });

    await prisma.$disconnect();

    res.send(JSON.stringify(response));
})

app.post('/api/v1/games', async(req: Request, res: Response) => {
    const response = await prisma.game.create({
        data: {
            title: req.body.title,
            content: req.body.content,
            image_url: req.body.image_url,
            publisher: req.body.publisher,
            published: true
        }
    });

    await prisma.$disconnect();

    res.send(JSON.stringify(response));
});

app.post('/api/v1/posts', async(req: Request, res: Response) => {
    const response = await prisma.post.create({
        data: {
            title: req.body.title,
            content: req.body.content,
            thumbnail_url: req.body.thumbnail_url
        }
    });

    await prisma.$disconnect();
    res.send(JSON.stringify(response));

});

app.get('/api/v1/posts', async(req: Request, res: Response) => {
    const response = await prisma.post.findMany();

    await prisma.$disconnect();
    res.send(JSON.stringify(response));
});

app.post('/api/v1/findGames', async(req: Request, res: Response) => {
    const response = await BreakingBad.default(req.body.search);
    res.send(JSON.stringify(response));

});
app.listen(3003, () => {
    console.log('🔥 Server Running on http://localhost:3003');
})

