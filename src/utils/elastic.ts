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
    } catch (error:any) {
      this.message = `Elastic Error: ${error.toString()}`
      Exceptions.captureInfo(this.message)
      return error
    }
  }

  static search = async (index: string, status: object) => {
    const query: RequestParams.Search = {
      index,
      body: {
        query: { match: status }
      }
    }

    try {
      const response = await elasticClient.search(query)
      return response
    } catch (error) {
      return error
    }
  }

  static searchByParam = async (index: string, id: string) => {
    const query: RequestParams.Get = {
      index,
      id
    }

    try {
      const response = await elasticClient.get(query)
      return response
    } catch (error:any) {
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
    } catch (error:any) {
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
    } catch (error:any) {
      this.message = `Elastic Error: ${error.toString()}`
      Exceptions.captureInfo(this.message)
      return error
    }
  }
}
