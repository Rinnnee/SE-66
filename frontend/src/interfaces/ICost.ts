import { RoomInterface} from "./IRoom";
import { PaymentstatusInterface } from "./IPaymentstatus";

export interface CostInterface {
    ID?: number;
    ElectricityBill?: string;
    WaterBill ?: string;
    TotalPrice ?: string;
    
    RoomID?: number;
    Room?: RoomInterface;

}
  