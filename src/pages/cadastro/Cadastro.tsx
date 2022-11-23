import { Button, Grid, Paper, TextField, Typography } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import getUsersList from '../../global-functions/getUsersList'
import User from '../../global-types/TUser'
import setNewUsersList from '../../global-functions/setNewUsersList'
import Theme from '../../global-types/TTheme'
import { BirdImg, Title } from '../../styles/componentsStyles'

const Cadastro: React.FC<Theme> = ({ theme }) => {
	const myFont = 'Marhey'

	const [email, setEmail] = useState('')
	const [senha, setSenha] = useState('')
	const [reSenha, setReSenha] = useState('')

	const listaUsuariosBD: Array<User> = getUsersList()

	const verificaUsuarioCadastrado: boolean = listaUsuariosBD.some(
		(user: User) => user.email === email
	)

	function verificarCadastro(): boolean {
		if (!senha || !reSenha || !email) {
			alert('Favor preencher todos os campos.')
			return false
		}
		if (senha !== reSenha) {
			alert('As senhas não conferem!')
			resetInputs()
			return false
		}
		if (verificaUsuarioCadastrado) {
			alert('email já cadastrado')
			resetInputs()
			return false
		}
		return true
	}

	function resetInputs() {
		setEmail('')
		setSenha('')
		setReSenha('')
	}

	const navigate = useNavigate()

	function cadastrar() {
		if (verificarCadastro()) {
			const newUser: User = {
				email: email,
				password: senha,
				messages: [],
				themeMode: 'light'
			}

			console.log(newUser)

			listaUsuariosBD.push(newUser)
			setNewUsersList(listaUsuariosBD)
			resetInputs()
			alert('Usuário cadastrado!')
			navigate('/')
		}
	}

	return (
		<>
			<style>
				url('https://fonts.googleapis.com/css2?family=Marhey:wght@700&display=swap');
			</style>

			<Grid container>
				<Grid item xs={12} sx={{ height: '7vh' }} />
				<Grid item xs={3} />
				<Grid item xs={6}>
					<Paper
						sx={{
							backgroundColor: theme.colors.secundary,
							height: '60vh',
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
							boxShadow: '20px 20px 40px'
						}}
					>
						<BirdImg
							src={
								require('../../../src/images/mainImage.svg')
									.default
							}
							alt='mySvgImage'
						/>
						<Grid
							container
							display='flex'
							justifyContent='center'
							alignItems='center'
							flexDirection='column'
						>
							<Typography
								sx={{
									fontFamily: 'Marhey',
									fontSize: '2em',
									paddingBottom: '0.5em'
								}}
							>
								CADASTRO
							</Typography>

							<TextField
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								id='email'
								label='E-mail'
								variant='outlined'
								sx={{
									margin: 1,
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
								value={senha}
								onChange={(e) => setSenha(e.target.value)}
								type='password'
								id='senha'
								label='Senha'
								variant='outlined'
								sx={{
									margin: 1,
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
								value={reSenha}
								onChange={(e) => setReSenha(e.target.value)}
								type='password'
								id='reSenha'
								label='Repita a senha'
								variant='outlined'
								sx={{
									margin: 1,
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
								onClick={cadastrar}
								variant='contained'
								sx={{
									margin: 2,
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
								OK
							</Button>
							<Link
								to={'/'}
								style={{
									textDecoration: 'none',
									color: theme.colors.text,
									fontFamily: myFont,
									fontSize: '0.8em'
								}}
							>
								Voltar ao Login
							</Link>
						</Grid>
					</Paper>
				</Grid>
				<Grid item xs={3} />
			</Grid>
		</>
	)
}

export default Cadastro
