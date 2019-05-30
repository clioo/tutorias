export interface Grupos{
    id:string,
    data:DataGroup,
    materiasDominadas:any[],
    integrantes:any[],
    clases:any[],
    unido:boolean
}

interface DataGroup{
    id:string,
    nombre:string,
    fecha:Date,
    usuario:string
}