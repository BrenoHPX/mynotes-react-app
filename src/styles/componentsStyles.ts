import TableCell from '@mui/material/TableCell/TableCell'
import tableCellClasses from '@mui/material/TableCell/tableCellClasses'
import TableRow from '@mui/material/TableRow/TableRow'
import styled from 'styled-components'

export const myFont = 'Marhey'

export const BirdImg = styled.img`
	width: 50%;
	height: 60vh;
	background-color: ${(props) => props.theme.colors.primary};
	border-top-left-radius: 4px;
	border-bottom-left-radius: 4px;
	padding: 2vw;
`
export const Title = styled.h1`
	font-family: 'HelloFlarinda', 'Marhey', cursive;
	color: ${(props) => props.theme.colors.text};
	margin-bottom: 4vh;
	font-size: 4vw;
	align-self: center;
	margin-top: 2vh;
	text-align: center;
`
export const MyContainer = styled.div`
	background-color: ${(props) => props.theme.colors.primary};
	box-sizing: border-box;
	height: 19vh;
	display: grid;
	grid-template-columns: 1fr 20fr 1fr;
	/* border-bottom: solid 1px; */
	box-shadow: 5px 10px 20px;
	margin: 10px;
	border-radius: 10px;
`
export const SwitchContainer = styled.div`
	margin-right: 1vw;
	margin-top: 3vh;
`

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
	[`&.${tableCellClasses.head}`]: {
		backgroundColor: theme.colors.text,
		color: theme.colors.text
	},
	[`&.${tableCellClasses.body}`]: {
		fontSize: 14
	}
}))

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
	'&:nth-of-type(odd)': {
		backgroundColor: theme.colors.background
	},
	// hide last border
	'&:last-child td, &:last-child th': {
		border: 0
	}
}))
