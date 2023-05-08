export class User {
    id: number=0;
    username: string='';
    password: string='';
    constructor(username: string, password: string){this.username = username; this.password=password;}
}