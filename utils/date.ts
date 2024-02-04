import { monthWord } from './month'

export const shortDate = (date: string) => {
	return (
		new Date(date).getDate() +
		' ' +
		monthWord[new Date(date).getMonth()] +
		' ' +
		new Date(date).getFullYear()
	)
}
