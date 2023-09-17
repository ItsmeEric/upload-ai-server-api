import { FastifyInstance } from "fastify"
import { prisma } from '../lib/prisma'
import { fastifyMultipart } from "@fastify/multipart"
import path from "node:path"
import { randomUUID } from "node:crypto"

export async function uploadVideoRoute(app: FastifyInstance) {
    app.register(fastifyMultipart, {
        limits: {
            fileSize: 1_848_576 * 35, // Now we have 35MB of space
        }
    })
        
        
    app.post("/videos", async (request, reply) => {
        const data = await request.file();

        if (!data) {
            return reply.status(404).send({ error: "Missing file input!" })
        }

        const extension = path.extname(data.filename);

        if (extension != '.mp3') {
            return reply.status(404).send({ error: "invalid input type, please upload na mp3" })
        }

        const fileBaseName = path.basename(data.filename, extension)
        const fileUploadName = `${fileBaseName}-${randomUUID()}.${extension}`

        const uploadDestination = path.resolve(__dirname, '../../tmp', fileUploadName)
    })

}
