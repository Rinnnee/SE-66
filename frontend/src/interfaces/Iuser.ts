import { AddressInterface } from "./IAddress";
import { BloodTypeInterface} from "./IBloodtype";
import { MajorInterface } from "./IMajor";
import { RoomInterface} from "./IRoom";

export interface UserInterface {
    ID?: number;
	FirstName?: string;
	LastName?: string;
	StudentID?: string;
	CitizenID?: string;
	Password?: string;
	Email?: string;
	Birthday?: Date;
	Year?: number;
	Tel?: string;
	Disease?: string;
	Allergy?: string;
	Photo?: string;

   
    AddressID?: number;
    Address?: AddressInterface;
    BloodTypeID?: number;
    BloodType?: BloodTypeInterface;
    MajorID?: number;
    Major?: MajorInterface;
    RoomID?: number;
    Room?: RoomInterface;

}