"use client";

import { getShifts } from "@/actions/shift";
import type { Shift } from "@/types/shift";
import React, { useState, useEffect } from "react";

function useLoadShifts(
	setShifts: (shifts: Shift[]) => void,
	setLoading: (loading: boolean) => void,
	setError: (error: string | null) => void,
) {
	useEffect(() => {
		const fetchShifts = async () => {
			try {
				setLoading(true);
				const shifts = await getShifts();
				if (!shifts) throw new Error("Failed to fetch shifts");
				setShifts(shifts);
				setError(null);
			} catch (err) {
				setError(
					`Failed to fetch shifts: ${
						err instanceof Error ? err.message : String(err)
					}`,
				);
			} finally {
				setLoading(false);
			}
		};

		fetchShifts();
	}, [setShifts, setLoading, setError]);
}

export default function ShiftManagement() {
	const [shifts, setShifts] = useState<Shift[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useLoadShifts(setShifts, setLoading, setError);

	if (loading) {
		return (
			<div className="flex items-center justify-center py-8 text-[#595959]">
				Loading shifts...
			</div>
		);
	}

	if (error) {
		return (
			<div className="flex items-center justify-center py-8 text-red-500">
				{error}
			</div>
		);
	}

	return (
		<div className="mb-8">
			<h3 className="text-xl font-medium text-white mb-4">Shifts</h3>
			<div className="grid grid-cols-4 p-4 bg-[#232323] text-sm mb-4 text-left gap-4 text-white font-medium rounded-t-lg">
				<div>Machine</div>
				<div>Cashier</div>
				<div>Start Time</div>
				<div>End Time</div>
			</div>
			{shifts.length === 0 ? (
				<div className="text-center py-8 text-[#595959]">
					No shifts available.
				</div>
			) : (
				shifts.map((shift) => (
					<div
						key={shift.cash_register_id}
						className="grid grid-cols-4 items-center text-white text-sm mb-2 p-4 hover:bg-[#232323]/50 rounded-md border border-transparent hover:border-[#3A3A3A] transition-all"
					>
						<div className="font-medium">Machine {shift.cash_register_id}</div>
						<div>{shift.cashier_name}</div>
						<div>{shift.start_at}</div>
						<div>{shift.end_at}</div>
					</div>
				))
			)}
		</div>
	);
}
