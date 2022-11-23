function getLoggedUser(): string {
	return JSON.parse(localStorage.getItem('LoggedUser')!)
}

export default getLoggedUser
