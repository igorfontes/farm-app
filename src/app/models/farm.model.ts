import { Glebe } from "./glebe.model";

export interface Farm {
    id: string;
    name: string;
    glebes: Glebe[];
    productivity: number;
}