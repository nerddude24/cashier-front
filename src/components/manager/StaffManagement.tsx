"use client";

import React, { useState } from "react";
import type { Employee, Machine, Cashier } from "@/types/entities";
import ShiftManagement from "./ShiftManagement";

interface StaffManagementProps {
	onAddEmployee?: (employee: Employee) => void;
	onRemoveEmployee?: (employeeId: number) => void;
}

export default function StaffManagement({
	onAddEmployee,
	onRemoveEmployee,
}: StaffManagementProps) {
	const [machines, setMachines] = useState<Machine[]>([]);
	const [employees, setEmployees] = useState<Employee[]>([]);
	const [showAddForm, setShowAddForm] = useState(false);
	const [showConfirmation, setShowConfirmation] = useState(false);
	const [formType, setFormType] = useState<"machine" | "cashier">("cashier");
	const [newEmployee, setNewEmployee] = useState<Partial<Employee>>({});
	const [showPassword, setShowPassword] = useState(false);
	const [newMachine, setNewMachine] = useState<Partial<Machine>>({});
	const [showPasswordMap, setShowPasswordMap] = useState<
		Record<number, boolean>
	>({});

	const togglePasswordVisibility = (employeeId: number) => {
		setShowPasswordMap((prev) => ({
			...prev,
			[employeeId]: !prev[employeeId],
		}));
	};

	const handleAddItem = () => {
		if (formType === "machine") {
			const machine: Machine = {
				id: Date.now(),
			};

			setMachines([...machines, machine]);
			setShowConfirmation(false);
		} else {
			if (
				!newEmployee.username ||
				!newEmployee.email ||
				!newEmployee.password
			) {
				alert("Please fill in all required fields");
				return;
			}

			const employee: Cashier = {
				id: Date.now(),
				username: newEmployee.username!,
				email: newEmployee.email!,
				password: newEmployee.password!,
			};

			setEmployees([...employees, employee]);
			if (onAddEmployee) onAddEmployee(employee);
		}

		setShowAddForm(false);
		setNewEmployee({});
		setNewMachine({});
	};

	const handleRemoveItem = (id: number, type: "machine" | "employee") => {
		if (type === "machine") {
			setMachines(machines.filter((machine) => machine.id !== id));
		} else {
			setEmployees(employees.filter((emp) => emp.id !== id));
			if (onRemoveEmployee) onRemoveEmployee(id);
		}
	};

	return (
		<div className="w-full h-full flex flex-col border border-[#595959]/45 p-6 rounded-lg shadow-lg bg-[#1A1A1A]">
			<div className="flex justify-between items-center mb-6">
				<h2 className="text-2xl font-semibold text-white">Staff Management</h2>
				<div className="flex gap-4">
					<button
						onClick={() => {
							setFormType("cashier");
							setShowAddForm(true);
						}}
						className="px-4 py-2 bg-green-600/20 text-green-500 hover:bg-green-600/30 transition-colors rounded-md flex items-center gap-2"
					>
						<svg
							width="20"
							height="20"
							viewBox="0 0 24 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M19 13H13V19H11V13H5V11H11V5H13V11H19V13Z"
								fill="currentColor"
							/>
						</svg>
						Add Cashier
					</button>

					<button
						onClick={() => {
							setFormType("machine");
							setShowConfirmation(true);
						}}
						className="px-4 py-2 bg-violet-600/20 text-violet-500 hover:bg-violet-600/30 transition-colors rounded-md flex items-center gap-2"
					>
						<svg
							width="20"
							height="20"
							viewBox="0 0 24 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M19 13H13V19H11V13H5V11H11V5H13V11H19V13Z"
								fill="currentColor"
							/>
						</svg>
						Add Machine
					</button>
				</div>
			</div>
			{showConfirmation && (
				<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
					<div className="bg-[#232323] p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
						<h3 className="text-white text-xl mb-4 font-medium">
							Add New Machine
						</h3>
						<p className="text-[#A0A0A0] mb-6">
							Are you sure you want to add a new cash machine?
						</p>
						<div className="flex gap-4 justify-end">
							<button
								onClick={() => setShowConfirmation(false)}
								className="px-6 py-3 bg-red-600/20 text-red-500 hover:bg-red-600/30 transition-colors rounded-md"
							>
								Cancel
							</button>
							<button
								onClick={handleAddItem}
								className="px-6 py-3 bg-green-600/20 text-green-500 hover:bg-green-600/30 transition-colors rounded-md"
							>
								Confirm
							</button>
						</div>
					</div>
				</div>
			)}
			{showAddForm && (
				<div className="mb-6 p-6 border border-[#595959]/45 rounded-lg bg-[#232323]/50 shadow-inner">
					<h3 className="text-white text-xl mb-4 font-medium">
						Add New {formType === "machine" ? "Machine" : "Cashier"}
					</h3>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						{formType === "machine" ? (
							<div className="flex flex-col gap-2">
								<label className="text-[#A0A0A0] text-sm">Machine Number</label>
								<input
									type="number"
									placeholder="Enter machine number"
									className="bg-[#2A2A2A] text-white p-3 rounded-md border border-[#3A3A3A] focus:border-blue-500 focus:outline-none transition-colors"
									value={newMachine.id || ""}
									onChange={(e) =>
										setNewMachine({
											...newMachine,
											id: parseInt(e.target.value),
										})
									}
								/>
							</div>
						) : (
							<>
								<div className="flex flex-col gap-2">
									<label className="text-[#A0A0A0] text-sm">Username</label>
									<input
										type="text"
										placeholder="Enter username"
										className="bg-[#2A2A2A] text-white p-3 rounded-md border border-[#3A3A3A] focus:border-blue-500 focus:outline-none transition-colors"
										value={newEmployee.username || ""}
										onChange={(e) =>
											setNewEmployee({
												...newEmployee,
												username: e.target.value,
											})
										}
									/>
								</div>

								<div className="flex flex-col gap-2">
									<label className="text-[#A0A0A0] text-sm">
										Email Address
									</label>
									<input
										type="email"
										placeholder="Enter email address"
										className="bg-[#2A2A2A] text-white p-3 rounded-md border border-[#3A3A3A] focus:border-blue-500 focus:outline-none transition-colors"
										value={newEmployee.email || ""}
										onChange={(e) =>
											setNewEmployee({ ...newEmployee, email: e.target.value })
										}
									/>
								</div>
								<div className="flex flex-col gap-2">
									<label className="text-[#A0A0A0] text-sm">Password</label>
									<div className="relative">
										<input
											type={showPassword ? "text" : "password"}
											placeholder="Enter password"
											className="bg-[#2A2A2A] text-white p-3 rounded-md border border-[#3A3A3A] focus:border-blue-500 focus:outline-none transition-colors w-full"
											value={newEmployee.password || ""}
											onChange={(e) =>
												setNewEmployee({
													...newEmployee,
													password: e.target.value,
												})
											}
										/>
										<button
											type="button"
											onClick={() => setShowPassword(!showPassword)}
											className="absolute right-3 top-1/2 -translate-y-1/2 text-[#A0A0A0] hover:text-white transition-colors"
										>
											{showPassword ? (
												<svg
													width="20"
													height="20"
													viewBox="0 0 24 24"
													fill="none"
													xmlns="http://www.w3.org/2000/svg"
												>
													<path
														d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"
														fill="currentColor"
													/>
												</svg>
											) : (
												<svg
													width="20"
													height="20"
													viewBox="0 0 24 24"
													fill="none"
													xmlns="http://www.w3.org/2000/svg"
												>
													<path
														d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"
														fill="currentColor"
													/>
												</svg>
											)}
										</button>
									</div>
								</div>
							</>
						)}
					</div>
					<div className="flex gap-4 mt-6">
						<button
							onClick={handleAddItem}
							className="px-6 py-3 bg-green-600/20 text-green-500 hover:bg-green-600/30 transition-colors rounded-md flex items-center gap-2"
						>
							<svg
								width="20"
								height="20"
								viewBox="0 0 24 24"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"
									fill="currentColor"
								/>
							</svg>
							Save
						</button>
						<button
							onClick={() => {
								setShowAddForm(false);
								setNewEmployee({});
								setNewMachine({});
							}}
							className="px-6 py-3 bg-red-600/20 text-red-500 hover:bg-red-600/30 transition-colors rounded-md flex items-center gap-2"
						>
							<svg
								width="20"
								height="20"
								viewBox="0 0 24 24"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
									fill="currentColor"
								/>
							</svg>
							Cancel
						</button>
					</div>
				</div>
			)}

			<div className="flex-1 overflow-auto">
				{/* Machines Section - Grid View */}
				<div className="mb-8">
					<h3 className="text-xl font-medium text-white mb-4">Machines</h3>
					<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
						{machines.length === 0 ? (
							<div className="col-span-full text-center py-8 text-[#595959] bg-[#232323]/30 rounded-lg">
								No machines found. Add your first machine using the button
								above.
							</div>
						) : (
							machines.map((machine) => (
								<div
									key={machine.id}
									className="bg-[#232323] p-4 rounded-lg border border-[#3A3A3A] hover:border-purple-500/50 transition-all flex flex-col items-center"
								>
									<div className="flex flex-col items-center gap-2 mb-8">
										<div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center text-purple-400">
											<svg
												width="32"
												height="32"
												viewBox="0 0 24 24"
												fill="none"
												xmlns="http://www.w3.org/2000/svg"
											>
												<path
													d="M20 4H4C2.89 4 2.01 4.89 2.01 6L2 18C2 19.11 2.89 20 4 20H20C21.11 20 22 19.11 22 18V6C22 4.89 21.11 4 20 4ZM20 18H4V12H20V18ZM20 8H4V6H20V8Z"
													fill="currentColor"
												/>
											</svg>
										</div>
										<div className="text-[#A0A0A0] text-sm">
											ID: {machine.id}
										</div>
									</div>
									<button
										onClick={() => handleRemoveItem(machine.id, "machine")}
										className="text-red-500 hover:text-red-400 transition-colors flex items-center gap-1 text-sm"
									>
										<svg
											width="16"
											height="16"
											viewBox="0 0 24 24"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"
												fill="currentColor"
											/>
										</svg>
										Remove
									</button>
								</div>
							))
						)}
					</div>
				</div>

				{/* Cashiers Section - List View */}
				<div className="mb-8">
					<h3 className="text-xl font-medium text-white mb-4">Cashiers</h3>
					<div className="grid grid-cols-4 p-4 bg-[#232323] text-sm mb-4 text-left gap-4 text-white font-medium rounded-t-lg">
						<div>Username</div>
						<div>Email</div>
						<div>Password</div>
						<div>Actions</div>
					</div>
					{employees.length === 0 ? (
						<div className="text-center py-8 text-[#595959]">
							No cashiers found. Add your first cashier using the button above.
						</div>
					) : (
						employees.map((employee) => (
							<div
								key={employee.id}
								className="grid grid-cols-4 items-center text-white text-sm mb-2 p-4 hover:bg-[#232323]/50 rounded-md border border-transparent hover:border-[#3A3A3A] transition-all"
							>
								<div className="font-medium">{employee.username}</div>
								<div>{employee.email}</div>
								<div className="flex items-center gap-2">
									<span>
										{showPasswordMap[employee.id]
											? employee.password
											: "••••••••"}
									</span>
									<button
										onClick={() => togglePasswordVisibility(employee.id)}
										className="text-[#A0A0A0] hover:text-white transition-colors"
									>
										{showPasswordMap[employee.id] ? (
											<svg
												width="16"
												height="16"
												viewBox="0 0 24 24"
												fill="none"
												xmlns="http://www.w3.org/2000/svg"
											>
												<path
													d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"
													fill="currentColor"
												/>
											</svg>
										) : (
											<svg
												width="16"
												height="16"
												viewBox="0 0 24 24"
												fill="none"
												xmlns="http://www.w3.org/2000/svg"
											>
												<path
													d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"
													fill="currentColor"
												/>
											</svg>
										)}
									</button>
								</div>
							</div>
						))
					)}
				</div>

				{/* Shifts Section */}
				<ShiftManagement machines={machines} employees={employees} />
			</div>
		</div>
	);
}
