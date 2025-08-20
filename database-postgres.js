import { sql } from './db.js'

export class DatabasePostgres {

    async list(search) {
       let videos
       
       if(search) {
        videos = await sql`select * from videos where title ilike ${'%'+search+'%'}` 
       } else {
        videos = await sql`select * from videos`
       }
       
       return videos
    }
    
    async create(video) {
        const {title, description, duration} = video
        try {
            await sql`
                INSERT INTO videos (title, description, duration)
                VALUES (${title}, ${description}, ${duration});
                `;
        } catch (error) {
            console.error('Erro na inserção:', error);
            throw error;
        }
    }

    async update(id, video) {
        const {title, description, duration} = video

        await sql`update videos set title = ${title}, description = ${description}, duration = ${duration} where id = ${id}`
    }

    async delete(id) {
        await sql`delete from videos where id = ${id}`
    }
}