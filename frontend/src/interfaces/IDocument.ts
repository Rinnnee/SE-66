import { DocumentStatusInterface } from "./IDocumentStatus";
import { DocumentTypeInterface } from "./IDocumentType";
import { BankInterface } from "./IBank";
import { RequestInOutInterface } from "./IRequestInOut";
import { UserInterface } from "./Iuser";
import { AdminInterface } from "./IAdmin";

export interface DocumentInterface {
    ID?: number;
    Tel?: string;                                
    BankNumber?: string,           
    RoomBill?: number,             
    ElectricBill?: number,        
    WaterBill?: number,            
    DateTimePay?: Date,                                
    HouseNumber?: string,         
    VillageNumber?: string,       
    Lane?: string,                
    Street?: string,              
    SubDistrict?: string,         
    District?: string,            
    Province?: string,            
    PostalCode?: number,          
    Description?: string,         
    DateTimeResignation?: Date,
    DateTimeSend?: Date,
    CreatedAt?: Date,

    DocumentTypeID?: number,
    DocumentType?: DocumentTypeInterface,
    DocumentStatusID?: number,
    DocumentStatus?: DocumentStatusInterface,
    UserID?: number,
    User?: UserInterface, 
    AdminID?: number,
    Admin?: AdminInterface, 
    BankID?: number,
    Bank?: BankInterface,
    RequestInOutID?: number,
    RequestInOut?: RequestInOutInterface,
}