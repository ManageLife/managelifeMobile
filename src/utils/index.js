import passwordValidator from 'password-validator'

const passwordSchema = new passwordValidator()
   .is()
   .min(8)
   .is()
   .max(100)
   .has()
   .digits()
   .has()
   .not()
   .spaces()

const generateUniqueID = () => {
   return Math.random()
      .toString(36)
      .substr(2, 9)
}

const toSnakeCase = str =>
   str
      .toLowerCase()
      .split(' ')
      .join('_')

const capitalize = str => str.slice(0, 1).toUpperCase() + str.slice(1)
const capitalizeSentence = str =>
   str
      .split(' ')
      .map(word => `${str.charAt(0).toUpperCase()}${str.slice(0)}`)
      .join(' ')

export { passwordSchema, generateUniqueID, toSnakeCase, capitalize }
