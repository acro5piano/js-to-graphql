import { QueryOpertaion, Query, Field, Result } from './src'

// This is mock api, should be Apollo or Relay
// returns `any` as usual
const executeGraphql = (q: any): any => q

class UserField extends Field {
  id = Field.number
  name = Field.string
  isActive = Field.boolean
}

class UserQuery extends Query {
  name = 'user'
  field = UserField
}

class GetUserOperation extends QueryOpertaion {
  name = 'getUser'
  query = UserQuery
}

const getUser = new GetUserOperation()
const gqlString = getUser.render()

// `gqlString` is a plain string, so feel free to tag it
console.log(gqlString)

// We would like to type this!
const result: Result<GetUserOperation> = executeGraphql(gqlString)

// Now, `result` type looks like this:
// interface result {
//   user: {
//     id: number
//     name: string
//     isActive: boolean
//   }
// }
console.log(result)
