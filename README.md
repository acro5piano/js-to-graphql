# js-to-graphql

JavaScript class that render GraphQL. Better TypeScript + GraphQL experience.

# Usage

```ts
import { QueryOpertaion, Query, Field, Result } from 'js-to-graphql'
import { executeGraphql } from 'some-graphql-request-library'

// Define Fields
class BankAccount extends Field {
  id = Field.number
  branch = Field.string
}

class UserField extends Field {
  id = Field.number
  name = Field.string
  isActive = Field.boolean
  bankAccount = Field.of(BankAccount)
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

// Create renderer operation instance
const getUserOperation = new GetUserOperation()

// `gqlString` is a plain string, so feel free to tag it
const gqlString = getUserOperation.render()

console.log(gqlString)
// =>
//   query getUser {
//     user {
//       id
//       name
//       isActive
//       bankAccount {
//         id
//         name
//       }
//     }
//   }

// We would like to type this!
const result: Result<GetUserOperation> = executeGraphql(gqlString)

// Now, `result` type looks like this:
// interface result {
//   user: {
//     id: number
//     name: string
//     isActive: boolean
//     bankAccount: {
//       id: number
//       name: string
//     }
//   }
// }
```

![image](https://github.com/acro5piano/js-to-graphql/blob/master/screenshot.png)
