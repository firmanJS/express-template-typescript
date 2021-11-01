import { Op } from 'sequelize'
import Student, { StudentInput, StudentOuput } from '../../db/models/Student'
import { ResultBoolInterface, PaginationResponseInterface } from '../../interface/response'
import { StudentRespositoryInterface } from '../../interface/repository'
import { RequestMetaInterface, RequestParamsInterface } from '../../interface/request'

class StudentRepository implements StudentRespositoryInterface {
  create = async (payload: StudentInput): Promise<StudentOuput> => {
    const rows: StudentOuput = await Student.create(payload)
    return rows
  }

  read = async (request: RequestMetaInterface): Promise<PaginationResponseInterface> => {
    const { limit, offset, search } = request
    const where: any = {}
    if (search) {
      where[Op.or] = {
        name: { [Op.iLike]: `%${search}%` },
        code: { [Op.iLike]: `%${search}%` }
      }
    }

    const result: PaginationResponseInterface = await Student.findAndCountAll({
      limit, offset, where
    })

    return result
  }

  readByParam = async (params: RequestParamsInterface): Promise<StudentOuput> => {
    const response: any = await Student.findOne({
      where: { id: params.id! },
    })

    return response
  }

  update = async (
    params: RequestParamsInterface,
    payload:StudentInput
  ): Promise<ResultBoolInterface> => {
    const rows: any = await Student.update(
      payload, {
        where: { id: params.id! }
      }
    )

    const status: ResultBoolInterface = {
      status: rows[0]
    }

    return status
  }

  hardDelete = async (params: RequestParamsInterface): Promise<ResultBoolInterface> => {
    const rows: any = await Student.destroy({
      where: { id: params.id! }
    })

    const status: ResultBoolInterface = {
      status: rows
    }

    return status
  }
}

export default StudentRepository
