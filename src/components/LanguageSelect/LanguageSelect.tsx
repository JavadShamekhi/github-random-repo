import "./LanguageSelect.css";

interface LanguageSelectProps {
	value: string;
	onChange: (value: string) => void;
}

const languages = [
	"JavaScript",
	"TypeScript",
	"Python",
	"Java",
	"Go",
	"Rust",
	"C++",
	"C#",
	"PHP",
	"Ruby",
];

function LanguageSelect({ value, onChange }: LanguageSelectProps) {
	return (
			<div className="language-select">
				<label htmlFor="language">Choose a programming language</label>

				<select
						id="language"
						value={value}
						onChange={(event) => onChange(event.target.value)}
				>
					{languages.map((language) => (
							<option key={language} value={language}>
								{language}
							</option>
					))}
				</select>
			</div>
	);
}

export default LanguageSelect;