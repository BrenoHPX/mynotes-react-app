import { Box, Button, Grid, Paper, TextField, Typography } from '@mui/material'
import shadows from '@mui/material/styles/shadows'
import { padding } from '@mui/system'
import { url } from 'inspector'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import getLoggedUser from '../../global-functions/getLoggedUser'
import getUsersList from '../../global-functions/getUsersList'
import setLoggedUser from '../../global-functions/setLoggedUser'
import Theme from '../../global-types/TTheme'
import '../../styles/app.css'
import { BirdImg, myFont, Title } from '../../styles/componentsStyles'

const Login: React.FC<Theme> = ({ theme }) => {
	const [email, setEmail] = useState('')
	const [senha, setSenha] = useState('')

	const usersList = getUsersList()
	const userEmail = usersList.find(
		(user) => user.email === email && user.password === senha
	)?.email
	const navigate = useNavigate()

	function resetInputs() {
		setEmail('')
		setSenha('')
	}

	function verificarLogin() {
		//verificar preenchimento dos campos
		if (!email || !senha) {
			alert('Favor preencher todos os campos.')
			resetInputs()
			return
		}

		//verificar email e senha no usersLis
		if (!userEmail) {
			alert('Email e/ou senha não conferem! :P')
			resetInputs()
			return
		}
		setLoggedUser(userEmail!)

		if (userEmail) {
			navigate('/home')
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
								LOGIN
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
											fontFamily: 'Marhey'
										},
									'& .css-1sumxir-MuiFormLabel-root-MuiInputLabel-root':
										{
											color: theme.colors.text,
											fontFamily: 'Marhey'
										},
									'& .css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root':
										{
											color: theme.colors.text,
											fontFamily: 'Marhey'
										},
									'& .css-1e4jl5o-MuiFormControl-root-MuiTextField-root':
										{
											fontFamily: 'Marhey'
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
							<Button
								onClick={verificarLogin}
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
								to={'/cadastro'}
								style={{
									textDecoration: 'none',
									color: theme.colors.text,
									fontFamily: myFont,
									fontSize: '0.8em'
								}}
							>
								Quero me cadastrar!
							</Link>
						</Grid>
					</Paper>
				</Grid>
				<Grid item xs={3} />
			</Grid>
		</>
	)
}

export default Login
