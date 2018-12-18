export class QueryOpertaion {
  operationName!: string
  query!: new () => Query

  render() {
    const query = new this.query()

    return `${this.operationName} { ${query.render()} }`
  }
}

export class Variable {}

export class Query {
  name!: string
  field!: new () => Field

  render() {
    const field = new this.field()

    return `${this.name}(id: $id) { ${field.render()} }`
  }
}

export class Field {
  static number: number
  static string: string

  render() {
    return Object.keys(this).join(' ')
  }
}
