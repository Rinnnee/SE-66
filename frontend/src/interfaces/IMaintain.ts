import { AdminInterface } from './IAdmin';
import { MaintainStatusInterface } from './IMaintainstatus';
import { MaintainTypeInterface } from './IMaintaintype';
import { UserInterface } from './Iuser';



export interface MaintainInterface {
    ID?: number;
    Title: string;
    Details: string;
    Image?: string ; 
    Location: string;
    Contact: string;
    Date: Date;
    Annotation: string;
    Age: number;
    
    UserID?: number;
    User?: UserInterface;

    MaintainStatusID?: number;
    MaintainStatus?: MaintainStatusInterface;

    MaintainTypeID?: number | null | string ;
    MaintainType?: MaintainTypeInterface;

    AdminID?: number;
    Admin?: AdminInterface;
}