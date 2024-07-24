import {Roles} from "./roles";

export class User {
  firstName?: string;
  lastName?: string;
  email: string;
  phoneNumber?: string;
  password: string;
  roles?: Roles[] | undefined;


  constructor(firstName: string, lastName: string, email: string, phoneNumber: string, password: string, roles: Roles[]) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.password = password;
    this.roles = roles;
  }
}
