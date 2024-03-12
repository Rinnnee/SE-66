import { RoomInterface } from "./IRoom";
import { RoomDormitoryInterface } from "./Idormitorys";
import { UserInterface } from "./Iuser";

export interface BookingInterface {
    ID?: number;
    
    RoomID?: number;
    UserID?: number;
    DormitoryID?: number;
    Room?: RoomInterface;
    Dormitory?: RoomDormitoryInterface;
    User?: UserInterface;
}
