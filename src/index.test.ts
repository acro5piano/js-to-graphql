import { QueryOpertaion, Query, Field } from './'

const gql = (literals: any) =>
  literals[0]
    .replace(/\n/g, '')
    .replace(/ +/g, ' ')
    .replace(/^ /, '')
    .replace(/ $/, '')

class GetUserOperation extends QueryOpertaion {
  type = QueryOpertaion.query
  name = 'foo'
  query = GetUserQuery
}

class GetUserQuery extends Query {
  name = 'bar'
  field = BasicUserInfo
  variables = ['id']
}

class BasicUserInfo extends Field {
  id = Field.number
  name = Field.string
  isActive = Field.boolean
  bankAccount = Field.of(BankAccount)
}

class BankAccount extends Field {
  id = Field.number
  bankName = Field.string
  branch = Field.string
}

describe('jsToGraphQL', () => {
  it('QueryOperation render GraphQL', () => {
    const renderer = new GetUserOperation()
    expect(renderer.render()).toEqual(gql`
      query foo {
        bar(id: $id) {
          id
          name
          isActive
          bankAccount {
            id
            bankName
            branch
          }
        }
      }
    `)
  })

  it('Query render query', () => {
    const renderer = new GetUserQuery()
    expect(renderer.render()).toEqual(gql`
        bar(id: $id) {
          id
          name
          isActive
          bankAccount {
            id
            bankName
            branch
          }
        }
      `)
  })

  it('Field render filelds', () => {
    const renderer = new BasicUserInfo()
    expect(renderer.render()).toEqual('id name isActive bankAccount { id bankName branch }')
  })

  it('SubField render filelds', () => {
    const renderer = new BankAccount()
    expect(renderer.render()).toEqual('id bankName branch')
  })
})
