import { AdminResponseInterface } from "./IAdminResponse";
import { UserInterface } from "./Iuser";

export interface ContactLogInterface {
    ID?: number;
    Title: string;
    IssueType: string;
    Description: string;
    TimeAt: Date;
    UserID?: number;
    User?: UserInterface
    AdminResponseID?: number;
    AdminResponse?: AdminResponseInterface;
  }