import {Contractor} from "../../common/header/components/administration/service/contractor";
import {Authority} from "../../common/header/components/administration/service/authority";

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
