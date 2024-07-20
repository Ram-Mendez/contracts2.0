import {Contractor} from "./contractor";
import {Authority} from "./authority";

export class Contratos {
  id: number;
  name: string;
  contractor: Contractor
  authority: Authority;
  startDate: Date;

  constructor(id: number, name: string, contractor: Contractor, authority: Authority, startDate: Date) {
    this.id = id;
    this.name = name;
    this.contractor = contractor;
    this.authority = authority;
    this.startDate = startDate;
  }
}
