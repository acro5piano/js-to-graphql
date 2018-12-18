import { QueryOpertaion, Query, Field } from './src'

// This is mock api, should be Apollo or Relay
// returns "any" as usual
const executeGraphql = (q: any): any => q

class UserField extends Field {
  id = Field.number
  name = Field.string
}

class UserQuery extends Query {
  name = 'user'
  field = UserField
}

class GetUserOperation extends QueryOpertaion {
  operationName = 'getUser'
  query = UserQuery
}

const getUser = new GetUserOperation()
const gqlString = getUser.render()

// This is a plain string, so feel free to tag it
console.log(gqlString)

// We would like to type this!
const result: UserQuery = executeGraphql(gqlString)

console.log(result)
