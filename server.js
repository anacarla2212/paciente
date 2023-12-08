import {fastify} from 'fastify'
import { DatabaseMemory } from './database-memory.js'

const database = new DatabaseMemory()
const server = fastify()

server.get('/', () => {
    return 'Rota padrão'
})

server.post('/consulta', (request, reply) => {
// Acessando dados do corpo da requisição
    const {paciente,nome, peso, sintomas, diagnostico} = request.body
// Exibindo dados
//    console.log(body)
   
    // return 'cadastrar'
    database.create({
        paciente: paciente,
        nome: nome,
        peso:peso,
        sintomas: sintomas,
        diagnostico:diagnostico,
    })

    return reply.status(201).send
})

server.get('/consulta', (request) => {
    const search = request.query.search
    console.log(search)
    const consultas = database.list(search)
    console.log(consultas)
    return consultas
})

server.put('/consultas/:id', (request, reply) => {
    const consultaId = request.params.id
    const {paciente, nome, peso, sintomas, diagnostico} = request.body
    const consulta = database.update(consultaId, {
    paciente: paciente,
    nome: nome,
    peso:peso,
    sintomas:sintomas,
    diagnostico:diagnostico,
    })
    return reply.status(204).send()
})

server.delete('/consultas/:id', (request, reply) => {
    const consultaId = request.params.id

    database.delete(consultaId)

    return reply.status(204).send()
}) 

server.listen({
    port: 3333,
})