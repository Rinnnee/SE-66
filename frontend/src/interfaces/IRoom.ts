import { RoomstatusInterface } from "./IRoomstatus";
import { RoomTypeInterface } from "./IRoomtype";
import { RoomDormitoryInterface } from "./Idormitorys";

export interface RoomInterface {
    ID?: number;
    RoomName?: string;
	Capacity?: number;
	Price?: number;
    dormitory_name?: string;
    room_type_name?: string;
    room_status_name?: string;
    Occupancy?: number;
    
    RoomStatusID?: number;
    Roomstatus?: RoomstatusInterface;
    RoomTypeID?: number;
    RoomType?: RoomTypeInterface;
    DormitoryID?: number;
    Dormitory?:RoomDormitoryInterface


}