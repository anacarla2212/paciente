import { randomUUID } from "crypto"

export class DatabaseMemory{
#consultas = new Map()

list(search){
    return Array.from(this.#consultas.entries()).map((consultasArray) =>{
    // acessando primeira posição
        const id = consultasArray[0]
        const data = consultasArray[1]

        return{
            id,
            ...data
        }
    })
    .filter(consulta => {
        if (search){
            return consulta.paciente.includes(search)
        }
        return true
    })
}
create(consulta){
    const consultaId = randomUUID()
    this.#consultas.set(consultaId, consulta)
}
update(id, consulta){
    this.#consultas.set(id, consulta)
}
delete(id, consulta){
    this.#consultas.delete(id, consulta)
}
}