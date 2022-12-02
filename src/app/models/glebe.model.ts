import { Production } from "./production.model";

export interface Glebe {
    id: string,
    name: string, 
    area: number, 
    productivity: number, 
    productions: Production[]
}