export interface Request {
    userEmail: string;
    amount: number;
    method: 'cash' | 'credit';
    type: 'inspection' | 'servicing' | 'repairs' | 'maintenance';
    createdAt: string;
  }
  