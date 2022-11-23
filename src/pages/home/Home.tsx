import React, { useEffect, useState } from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { Box, Button, TextField, Typography } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import { Stack } from '@mui/system'
import getLoggedUser from '../../global-functions/getLoggedUser'
import getUsersList from '../../global-functions/getUsersList'
import TMessage from '../../global-types/TMessage'
import setNewUsersList from '../../global-functions/setNewUsersList'
import Theme from '../../global-types/TTheme'
import {
	myFont,
	StyledTableCell,
	StyledTableRow
} from '../../styles/componentsStyles'
import { Link, useNavigate } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import deleteLoggedUser from '../../global-functions/deleteLoggedUser'

const Home: React.FC<Theme> = ({ theme }) => {
	const loggedUserEmail = getLoggedUser()
	const usersList = getUsersList()

	let loggedUserMessages: TMessage[] = usersList.find(
		(user) => user.email === loggedUserEmail
	)?.messages!

	const [tituloInput, setTituloInput] = useState('')
	const [tituloEditModeInput, setTituloEditModeInput] = useState('')
	const [tarefaEditModeInput, setTarefaEditModeInput] = useState('')
	const [tarefaInput, setTarefaInput] = useState('')
	const [status, setStatus] = useState('Status:')

	const [editField, setEditField] = useState({ id: '', editMode: false })
	const [msgEdit, setMsgEdit] = useState('')

	useEffect(() => {
		if (msgEdit) editMessage(msgEdit)
	}, [msgEdit])

	function salvarMensagem() {
		const newMessage: TMessage = {
			id: loggedUserMessages.reduce(
				(prev, curr) => (prev = curr.id + 1),
				1
			),
			titulo: tituloInput,
			descricao: tarefaInput,
			uid: uuidv4(),
			editMode: false
		}

		usersList
			.find((user) => user.email === loggedUserEmail)
			?.messages.push(newMessage)

		setNewUsersList(usersList)
		setTituloInput('')
		setTarefaInput('')
	}

	const deleteMessage = (msgUid: string) => {
		const targetMsgIndex = loggedUserMessages.findIndex(
			(msg) => msg.uid === msgUid
		)
		usersList
			.find((user) => user.email === loggedUserEmail)
			?.messages.splice(targetMsgIndex, 1)
		setNewUsersList(usersList)
		//força renderização
		setStatus(uuidv4())
	}

	function editMessage(msgUid: string) {
		const usuarioLogado = usersList.find(
			(user) => user.email === loggedUserEmail
		)
		if (!usuarioLogado) {
			return null
		}

		const targetMsg = usuarioLogado?.messages.find((m) => m.uid === msgUid)
		if (!targetMsg) {
			return null
		}

		targetMsg.editMode = true
		setEditField({ id: targetMsg.uid, editMode: targetMsg.editMode })

		loggedUserMessages.map((m) => {
			if (m.uid === msgUid) {
				setTituloEditModeInput(m.titulo)
				setTarefaEditModeInput(m.descricao)
			}
			return
		})
	}

	function editDone(msgUid: string) {
		const usuarioLogado = usersList.find(
			(user) => user.email === loggedUserEmail
		)
		const targetMsg = usuarioLogado?.messages.find((m) => m.uid === msgUid)
		if (!targetMsg) {
			return null
		}

		targetMsg.titulo = tituloEditModeInput
		targetMsg.descricao = tarefaEditModeInput
		setNewUsersList(usersList)
		setMsgEdit('')
		setEditField({ id: '', editMode: false })
		setTarefaEditModeInput('')
		setTituloEditModeInput('')
	}

	function logout() {
		deleteLoggedUser()
		navigate('/')
	}

	const navigate = useNavigate()

	return (
		<>
			{!loggedUserEmail && (
				<>
					<Typography variant='h1' textAlign={'center'}>
						Usuário não logado.
					</Typography>
					<Link
						to={'/'}
						style={{
							textDecoration: 'none',
							color: theme.colors.text,
							fontFamily: myFont,
							fontSize: '2em',
							marginLeft: '5vw'
						}}
					>
						Voltar ao Login
					</Link>
				</>
			)}
			{loggedUserEmail && (
				<>
					{/* APP BAR --------------------------------------------------------- */}
					<Box
						sx={{
							marginTop: '5vh',
							marginBottom: '2vh',
							textAlign: 'center'
						}}
					>
						<Button
							onClick={logout}
							variant='contained'
							sx={{
								width: '10vw',
								borderRadius: '15px',
								backgroundColor: theme.colors.primary,
								color: theme.colors.text,
								'&:hover': {
									backgroundColor: theme.colors.primary
								},
								'&': {
									fontFamily: myFont
								}
							}}
						>
							Logout
						</Button>
					</Box>

					{/*INPUTS --------------------------------------------------------- */}
					<Stack
						paddingY={2}
						paddingX={2}
						direction='row'
						spacing={2}
						justifyContent='center'
					>
						<TextField
							fullWidth
							id='titulo'
							label='Titulo'
							variant='outlined'
							value={tituloInput}
							onChange={(e) => setTituloInput(e.target.value)}
							sx={{
								'& .css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline':
									{
										borderColor: theme.colors.text
									},
								'& .css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline':
									{
										borderColor: theme.colors.primary
									},
								'& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input':
									{
										color: theme.colors.text,
										fontFamily: myFont
									},
								'& .css-1sumxir-MuiFormLabel-root-MuiInputLabel-root':
									{
										color: theme.colors.text,
										fontFamily: myFont
									},
								'& .css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root':
									{
										color: theme.colors.text,
										fontFamily: myFont
									},
								'& .css-1e4jl5o-MuiFormControl-root-MuiTextField-root':
									{
										fontFamily: myFont
									}
							}}
						/>
						<TextField
							fullWidth
							id='tarefa'
							label='Tarefa'
							variant='outlined'
							value={tarefaInput}
							onChange={(e) => setTarefaInput(e.target.value)}
							sx={{
								'& .css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline':
									{
										borderColor: theme.colors.text
									},
								'& .css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline':
									{
										borderColor: theme.colors.primary
									},
								'& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input':
									{
										color: theme.colors.text,
										fontFamily: myFont
									},
								'& .css-1sumxir-MuiFormLabel-root-MuiInputLabel-root':
									{
										color: theme.colors.text,
										fontFamily: myFont
									},
								'& .css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root':
									{
										color: theme.colors.text,
										fontFamily: myFont
									},
								'& .css-1e4jl5o-MuiFormControl-root-MuiTextField-root':
									{
										fontFamily: myFont
									}
							}}
						/>
						<Button
							onClick={salvarMensagem}
							sx={{
								width: '10vw',
								backgroundColor: theme.colors.secundary,
								color: theme.colors.text,
								'&:hover': {
									backgroundColor: theme.colors.primary
								},
								'&': {
									fontFamily: myFont
								}
							}}
							variant='contained'
						>
							Salvar
						</Button>
					</Stack>

					{/* TABLE ----------------------------------------------------------- */}
					<TableContainer component={Paper}>
						<Table
							sx={{ minWidth: 700 }}
							aria-label='customized table'
						>
							<TableHead>
								<TableRow>
									<StyledTableCell sx={{ width: 110 }}>
										Nº
									</StyledTableCell>
									<StyledTableCell>Título</StyledTableCell>
									<StyledTableCell>Tarefa</StyledTableCell>
									<StyledTableCell
										align='center'
										sx={{ width: 300 }}
									>
										Ações
									</StyledTableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{loggedUserMessages.map((message) => (
									<StyledTableRow key={message.id}>
										<StyledTableCell
											component='th'
											scope='row'
										>
											{message.id}
										</StyledTableCell>

										{editField.editMode &&
											editField.id === message.uid && (
												<>
													<StyledTableCell
														component='th'
														scope='row'
													>
														<TextField
															id='tituloEditMode'
															label={
																message.titulo
															}
															variant='outlined'
															value={
																tituloEditModeInput
															}
															onChange={(e) =>
																setTituloEditModeInput(
																	e.target
																		.value
																)
															}
															sx={{
																'& .css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline':
																	{
																		borderColor:
																			theme
																				.colors
																				.text
																	},
																'& .css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline':
																	{
																		borderColor:
																			theme
																				.colors
																				.primary
																	},
																'& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input':
																	{
																		color: theme
																			.colors
																			.text,
																		fontFamily:
																			myFont
																	},
																'& .css-1sumxir-MuiFormLabel-root-MuiInputLabel-root':
																	{
																		color: theme
																			.colors
																			.text,
																		fontFamily:
																			myFont
																	},
																'& .css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root':
																	{
																		color: theme
																			.colors
																			.text,
																		fontFamily:
																			myFont
																	},
																'& .css-1e4jl5o-MuiFormControl-root-MuiTextField-root':
																	{
																		fontFamily:
																			myFont
																	}
															}}
														/>
													</StyledTableCell>
												</>
											)}
										{(editField.id !== message.uid ||
											!editField.id) && (
											<StyledTableCell>
												{message.titulo}
											</StyledTableCell>
										)}

										{editField.editMode &&
											editField.id === message.uid && (
												<StyledTableCell>
													<TextField
														id='tarefaEditMode'
														label={
															message.descricao
														}
														variant='outlined'
														value={
															tarefaEditModeInput
														}
														onChange={(e) =>
															setTarefaEditModeInput(
																e.target.value
															)
														}
														sx={{
															'& .css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline':
																{
																	borderColor:
																		theme
																			.colors
																			.text
																},
															'& .css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline':
																{
																	borderColor:
																		theme
																			.colors
																			.primary
																},
															'& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input':
																{
																	color: theme
																		.colors
																		.text,
																	fontFamily:
																		myFont
																},
															'& .css-1sumxir-MuiFormLabel-root-MuiInputLabel-root':
																{
																	color: theme
																		.colors
																		.text,
																	fontFamily:
																		myFont
																},
															'& .css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root':
																{
																	color: theme
																		.colors
																		.text,
																	fontFamily:
																		myFont
																},
															'& .css-1e4jl5o-MuiFormControl-root-MuiTextField-root':
																{
																	fontFamily:
																		myFont
																}
														}}
													/>
												</StyledTableCell>
											)}

										{(editField.id !== message.uid ||
											!editField.id) && (
											<StyledTableCell>
												{message.descricao}
											</StyledTableCell>
										)}
										{(editField.id !== message.uid ||
											!editField.id) && (
											<StyledTableCell align='center'>
												<Button
													variant='outlined'
													color='info'
													sx={{ marginX: 1 }}
													onClick={() =>
														setMsgEdit(message.uid)
													}
												>
													Editar
												</Button>
												<Button
													variant='outlined'
													color='error'
													startIcon={<DeleteIcon />}
													onClick={() =>
														deleteMessage(
															message.uid
														)
													}
												>
													Apagar
												</Button>
											</StyledTableCell>
										)}
										{editField.editMode &&
											editField.id === message.uid && (
												<StyledTableCell align='center'>
													<Button
														variant='outlined'
														color='info'
														sx={{ marginX: 1 }}
														onClick={() =>
															editDone(
																message.uid
															)
														}
													>
														OK
													</Button>
												</StyledTableCell>
											)}
									</StyledTableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
				</>
			)}
		</>
	)
}

export default Home
