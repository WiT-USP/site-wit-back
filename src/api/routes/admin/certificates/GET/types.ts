export interface Certificate {
  certificateId: number;
  certificateName: string;
  workload: number;
  hasTemplate: boolean;
}

export interface Body {}

export interface Query {
  searchParam: string;
}
