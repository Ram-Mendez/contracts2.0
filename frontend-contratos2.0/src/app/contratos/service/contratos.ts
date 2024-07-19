export class Contratos {
  id: number;
  name: string;
  contractor: number;
  authority: number;
  startDate: Date;

  constructor(id: number, name: string, contractor: number, authority: number, startDate: Date) {
    this.id = id;
    this.name = name;
    this.contractor = contractor;
    this.authority = authority;
    this.startDate = startDate;
  }
}
