# js-to-graphql

JavaScript class that render GraphQL. Better TypeScript + GraphQL experience.

# Usage

```ts
import { QueryOpertaion, Query, Field, Result } from 'js-to-graphql'
import { executeGraphql } from 'some-graphql-request-library'

// Define Field
class UserField extends Field {
  id = Field.number
  name = Field.string
  isActive = Field.boolean
}

// Define Query
class UserQuery extends Query {
  name = 'user'
  field = UserField
}

// Define Operation
class GetUserOperation extends QueryOpertaion {
  name = 'getUser'
  query = UserQuery
}

const getUserOperation = new GetUserOperation()
const gqlString = getUserOperation.render()

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
```
