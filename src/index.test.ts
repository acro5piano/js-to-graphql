import { QueryOpertaion, Query, Field } from './'

const gql = (literals: any) =>
  literals[0]
    .replace(/\n/g, '')
    .replace(/ +/g, ' ')
    .replace(/^ /, '')
    .replace(/ $/, '')

class FooOperation extends QueryOpertaion {
  operationName = 'query foo'
  query = BarQuery
}

class BarQuery extends Query {
  name = 'bar'
  field = BazField
}

class BazField extends Field {
  id = Field.number
  name = Field.string
}

describe('jsToGraphQL', () => {
  it('QueryOperation render GraphQL', () => {
    const renderer = new FooOperation()
    expect(renderer.render()).toEqual(gql`
      query foo {
        bar(id: $id) {
          id
          name
        }
      }
    `)
  })

  it('Query render query', () => {
    const renderer = new BarQuery()
    expect(renderer.render()).toEqual(gql`
        bar(id: $id) {
          id
          name
        }
      `)
  })

  it('Field render filelds', () => {
    const renderer = new BazField()
    expect(renderer.render()).toEqual('id name')
  })
})
