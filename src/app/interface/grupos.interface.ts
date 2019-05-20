export interface Grupos{
    id:string,
    data:DataGroup,
    materiasDominadas:any[];
}

interface DataGroup{
    id:string,
    nombre:string,
    fecha:Date,
    usuario:string
}