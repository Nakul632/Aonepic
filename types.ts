
import { Timestamp } from 'firebase/firestore';

export interface Group {
  id: string;
  name: string;
  createdAt: Timestamp;
  coverImage?: string;
  userId: string;
}

export interface UserProfile {
  uid: string;
  email: string | null;
  displayName: string | null;
}
