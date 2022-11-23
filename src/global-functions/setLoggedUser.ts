function setLoggedUser(loggedUser: string) {
	return localStorage.setItem('LoggedUser', JSON.stringify(loggedUser))
}

export default setLoggedUser
