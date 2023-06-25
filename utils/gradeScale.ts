export const percentageToGrade = (percentage: number) =>
	percentage >= 86
		? "A"
		: percentage >= 73
		? "B"
		: percentage >= 67
		? "C+"
		: percentage >= 60
		? "C"
		: percentage >= 50
		? "C-"
		: "I";
