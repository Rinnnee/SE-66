import { CostInterface } from "./ICost";
import { UserInterface} from "./Iuser";
import { RoomInterface} from "./IRoom";
import { PaymentstatusInterface } from "./IPaymentstatus";

export interface PaymentInterface {
 
    ID?: number;
    PaymentDate?: Date;
    PaymentEndDate?: Date;
    Slip?: string;

    CostID?: number;
    Cost?: CostInterface;
    UserID?: number;
    User?: UserInterface;
    RoomID?: number;
    Room?: RoomInterface;
    PaymentStatusID?: number;
    PaymentStatus?: PaymentstatusInterface;
}
  