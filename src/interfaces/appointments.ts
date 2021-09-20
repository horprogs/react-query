export interface ServiceInterface {
  id: number;
  name: string;
}

export interface HistoryInterface {
  date: string;
  comment: string;
}

export interface AppointmentListItemInterface {
  id: number;
  name: string;
  appointment_date: string;
}

export interface AppointmentInterface {
  id: number;
  name: string;
  appointment_date: string;
  services: number[];
  address: string;
  vehicle: string;
  comment: string;
  history: HistoryInterface[];
  hasInsurance: boolean;
}

export interface CarDetailInterface {
  id: number;
  number: string;
  model: string;
}

export interface InsuranceDetailsInterface {
  allCovered: boolean;
}

export interface JobInterface {
  id?: number;
  name: string;
}
