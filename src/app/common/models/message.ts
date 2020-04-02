import { User } from "../../core/auth/_models/user.model";

export class Message {
	constructor(private from: User, private content: string) {}
}
