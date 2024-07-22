export class Authority {
  id: number
  name: string;
  isGlobal: boolean;
  priority: number;

  constructor(id: number, name: string, isGlobal: boolean, priority: number) {
    this.id = id;
    this.name = name;
    this.isGlobal = isGlobal;
    this.priority = priority;
  }
}
