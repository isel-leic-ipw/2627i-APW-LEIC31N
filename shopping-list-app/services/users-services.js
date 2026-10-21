export default function createUsersServices(usersData) {
    return {
        validateUser: (username, password) => usersData.validateCredentials(username, password),
        validateApiToken: token => usersData.validateApiToken(token)
    };
}