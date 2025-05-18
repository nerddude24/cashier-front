import { Input } from "./input";

export function FormItem({
	name,
	label,
	errors,
	placeholder,
	isOptional,
}: {
	name: string;
	label: string;
	errors?: string[];
	placeholder?: string;
	isOptional?: boolean;
}) {
	return (
		<section className="flex flex-col gap-0.5">
			<label htmlFor={name}>{label}</label>
			{errors && (
				<div>
					{errors.map((error) => (
						<p key={error} className="text-red-500 text-sm">
							{error}
						</p>
					))}
				</div>
			)}
			<Input
				name={name}
				type="text"
				placeholder={placeholder}
				required={!isOptional}
			/>
		</section>
	);
}
