


type statusNumber = {
  unAuthorized: 401,
  alreadyRegistered: 409,
  internalServerError: 500,
  badRequest: 400,
  successfulRegistration: 201,
  successfulLogin: 200
}


const Status: statusNumber = {
  unAuthorized: 401,
  alreadyRegistered: 409,
  internalServerError: 500,
  badRequest: 400,
  successfulRegistration: 201,
  successfulLogin: 200
}
export default Status