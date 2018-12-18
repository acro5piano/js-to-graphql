// type ReturnType<T> = T extends (...args: any[]) => infer R ? R : any

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

type OmitFunction<T extends { render: () => string }> = Omit<T, 'render'>

type PickQueryNameFromQueryOperation<T extends QueryOpertaion> = T['query']['prototype']['name']

export type Result<T extends QueryOpertaion> = {
  [key in PickQueryNameFromQueryOperation<T>]: OmitFunction<
    T['query']['prototype']['field']['prototype']
  >
}

export class QueryOpertaion {
  name!: string
  type!: 'query' | 'mutation'
  query!: typeof Query

  static query = 'query' as 'query'
  static mutation = 'mutation' as 'mutation'

  render() {
    const { name, type } = this
    const query = new this.query()

    return `${type || 'query'} ${name} { ${query.render()} }`
  }
}

export class Query {
  name!: string
  field!: typeof Field
  variables!: string | string[]

  render() {
    const field = new this.field()

    const variables =
      typeof this.variables === 'string'
        ? `${this.variables}: $${this.variables}`
        : this.variables.map(v => `${v}: $${v}`)

    return `${this.name}(${variables}) { ${field.render()} }`
  }
}

export type IDMap = <T>(k: T) => T

export class Field {
  static number: number
  static string: string
  static boolean: boolean
  static of: IDMap = <T extends OmitFunction<Field>>(c: T) => c

  render() {
    return Object.keys(this)
      .map(key => {
        const field = (this as any)[key]
        if (typeof field === 'function') {
          const renderer = new field()
          return `${key} { ${renderer.render()} }`
        }
        return key
      })
      .join(' ')
  }
}
