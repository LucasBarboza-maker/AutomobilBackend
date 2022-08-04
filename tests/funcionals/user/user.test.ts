import UserService from '../../../src/services/userService'

const user = {
	name:"Lucas",
	surname:"Rodrigues Barboza",
	email:"lucasrb18@gmail.com",
	phoneNumber:"5524993017636",
	birth:new Date("1998-03-26"),
	password:"test@123",
	passwordConfirm:"test@123",
	termsAndAgree:true
}

describe('User Service Tests', () => {
  // it('Register User account', async () => {
  //   const result = await UserService.SignUp(user);
  //   expect(result).toBeDefined()
  // });
});