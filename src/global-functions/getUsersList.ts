import User from '../global-types/TUser'

function getUsersList(): Array<User> {
	return JSON.parse(localStorage.getItem('UsersList') || '[]')
}

export default getUsersList
