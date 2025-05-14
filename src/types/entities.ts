export interface Cashier {
	id: number;
	name: string;
	email: string;
	password: string;
}

export interface Machine {
	id: number;
}

export type Employee = Cashier;

export type StaffItem = Employee | Machine;
