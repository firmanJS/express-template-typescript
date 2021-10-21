import Lang from 'i18n'
import path from 'path'

Lang.configure({
  locales: ['en'],
  directory: path.join(__dirname, 'locales')
})

export default Lang
