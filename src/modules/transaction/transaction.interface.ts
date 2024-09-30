export interface ITransaction extends Document {
  email: string;
  slotId: string;
  amount: number;
  tran_id: string;
  paidStatus: boolean;
}
