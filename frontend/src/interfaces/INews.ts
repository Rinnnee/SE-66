import { CategoryInterface } from "./ICategory";
import { AdminInterface } from "./IAdmin";

export interface NewsInterface {
    ID?: number;
    Title: string;
    Details: string;
    DatePosted: Date;
    Image: string;
    Link: string;
    
    CategoryID?: number;
    Category?: CategoryInterface; 
    AdminID?: number;
    Admin?: AdminInterface; 
}
