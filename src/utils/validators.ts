import { passwordStrength } from 'check-password-strength'


export const myValidator =
{
  notNumber: {
    validator: (e: string) => {
      return e.search(/\d/) == -1
    },
    message: "First name must not have a number"
  },
  isPassword:{
    validator: (e: string) => {
      return passwordStrength(e).value == 'Medium' || passwordStrength(e).value == 'Strong' ? true : false
    },
    message: "Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character"
  }
  
}




