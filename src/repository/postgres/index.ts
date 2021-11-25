import UsersRepository from './users_postgres'
import CountryRepository from './country_postgres'

// interface AttributesInterface {
//   [index: number]: string;
// }
type AttributesInterface = Array<string>
export {
  AttributesInterface,
  UsersRepository,
  CountryRepository
}
