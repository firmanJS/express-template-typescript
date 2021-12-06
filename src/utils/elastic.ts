import { RequestParams } from '@elastic/elasticsearch'
import elasticClient from '../config/elastic'
import { Exceptions } from '.'

export class Elastic {
  static message: string

  static add = async (index: string, body: object) => {
    const document: RequestParams.Index = {
      index,
      body
    }

    try {
      const response = await elasticClient.index(document)
      return response
    } catch (error: any) {
      this.message = `Elastic Error: ${error.toString()}`
      Exceptions.captureInfo(this.message)
      return error
    }
  }

  static updateByQuery = async (index: string, status: object, doc:any) => {
    const theScript = {
      inline: `ctx._source.name = '${doc.name}'; ctx._source.code = '${doc.code}';`
    }
    const query: RequestParams.UpdateByQuery = {
      index,
      refresh: true,
      body: {
        query: { match: status },
        script: theScript
      }
    }

    try {
      const response = await elasticClient.updateByQuery(query)
      return response
    } catch (error: any) {
      this.message = `Elastic Error: ${error.toString()}`
      Exceptions.captureInfo(this.message)
      return error
    }
  }

  static updateById = async (index: string, id:string, doc: object) => {
    const document: RequestParams.Update = {
      index,
      id,
      body: {
        doc
      }
    }

    try {
      const response = await elasticClient.update(document)
      return response
    } catch (error: any) {
      this.message = `Elastic Error: ${error.toString()}`
      Exceptions.captureInfo(this.message)
      return error
    }
  }

  // static bulkAdd = async () => {
  //   const data = [
  //     {
  //       name: 'name',
  //       code: 'code',
  //     }, {
  //       name: 'name2',
  //       code: 'code2',
  //     }
  //   ]
  //   const body = {
  //     index: { _index: 'country', _type: '_doc' },
  //     data
  //   }
  //   try {
  //     const response = await elasticClient.bulk(body)
  //     return response
  //   } catch (error: any) {
  //     this.message = `Elastic Error: ${error.toString()}`
  //     Exceptions.captureInfo(this.message)
  //     return error
  //   }
  // }

  static search = async (index: string, status: any) => {
    let queryParams: object
    if (Object.keys(status).length !== 0) {
      queryParams = {
        query: { match: status },
        suggest: {
          'my-suggestion': {
            text: status.name,
            term: {
              field: 'name'
            }
          }
        }
      }
    } else {
      queryParams = {}
    }
    const query: RequestParams.Search = {
      index,
      body: {
        // size: 100,
        ...queryParams,
        // source: ['*'], // columns to return
        // sort: [{ date: { order: 'desc' } }],
        from: 0,
        size: 10
      }
    }

    try {
      const response = await elasticClient.search(query)
      return response
    } catch (error) {
      return error
    }
  }

  static searchByIdDoc = async (index: string, id: string) => {
    const query: RequestParams.Get = {
      index,
      id
    }

    try {
      const response = await elasticClient.get(query)
      return response
    } catch (error: any) {
      this.message = `Elastic Error: ${error.toString()}`
      Exceptions.captureInfo(this.message)
      return error
    }
  }

  static deleteByIdDoc = async (index: string, id: string) => {
    const query: RequestParams.Delete = {
      index, id
    }

    try {
      const response = await elasticClient.delete(query)
      return response
    } catch (error: any) {
      this.message = `Elastic Error: ${error.toString()}`
      Exceptions.captureInfo(this.message)
      return error
    }
  }

  static deletedByQuery = async (index: string, status: object) => {
    const query: RequestParams.DeleteByQuery = {
      index,
      body: {
        query: { match: status }
      }
    }

    try {
      const response = await elasticClient.deleteByQuery(query)
      return response
    } catch (error: any) {
      this.message = `Elastic Error: ${error.toString()}`
      Exceptions.captureInfo(this.message)
      return error
    }
  }
}
