export interface ITransaction extends Document {
  userName: string;
  email: string;
  slotIds: string[]; // Array of slotIds
  amount: number;
}
