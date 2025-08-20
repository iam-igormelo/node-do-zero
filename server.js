import { fastify } from 'fastify'
import { DatabasePostgres } from './database-postgres.js'

const server = fastify()
const database = new DatabasePostgres

// GET(Read) -> busca informações
// POST(Create) -> cria algo
// PUT(Update) -> atualiza informações
// DELETE(Delete) -> deleta informações
// PATCH(Update) -> atualiza apenas uma informação específica 

server.get('/videos', async (request)=> {
    const search = request.query.search
    const videos = await database.list(search)

    return videos
})

server.post('/videos', async (request, reply)=> {
    const {title, description, duration} = request.body

    try {
        await database.create({
            title,
            description,
            duration,
        })

        return reply.status(201).send()

    } catch(error) {
        console.error('Erro ao processar a requisição:', error)
        return reply.status(500).send({ error: 'Erro ao inserir vídeo.' })
    }
    
})

server.put('/videos/:id', async (request, reply)=> {
    const {title, description, duration} = request.body
    const videoId = request.params.id

    try {
        await database.update(videoId, {
            title,
            description,
            duration,
        })

        return reply.status(204).send()

    } catch(error) {
        console.error('Erro ao atualizar o vídeo:', error)
        return reply.status(500).send({ error: 'Erro ao atualizar o vídeo.' })
    }
    
})

server.delete('/videos/:id', async (request, reply)=> {
    const videoId = request.params.id

    await database.delete(videoId)

    return reply.status(204).send()
})

server.listen({
    port: process.env.PORT ?? 3000,
})
