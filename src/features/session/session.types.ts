export interface SessionFamily {
  id: string;
  name: string;
  note: string | null;
  sessionRate: number;
  createdAt: string;
  updatedAt: string;
  userId: string;
}

export interface Session {
  id: string;
  amount: number;
  date: string;
  isAttended: boolean;
  createdAt: string;
  updatedAt: string;
  familyId: string;
  family: SessionFamily;
}

export interface CreateSessionDto {
  amount: number;
  date: string;
  isAttended: boolean;
  familyId: string;
}

export interface UpdateSessionDto {
  amount?: number;
  date?: string;
  isAttended?: boolean;
  familyId?: string;
}

export interface SessionResponse {
  data: Session[];
  metadata: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}