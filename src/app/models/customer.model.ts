import { Request } from './request.model';

export interface Customer {
  id?: number;
  userEmail?: string;
  balance?: number;
  createdAt?: string;
  updatedAt?: string;
  requests?: Request[];
}
