import User from '../global-types/TUser'

function setNewUsersList(newList: Array<User>) {
	return localStorage.setItem('UsersList', JSON.stringify(newList))
}

export default setNewUsersList
