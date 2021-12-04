import { Client } from '@elastic/elasticsearch'

// Cloud Elastic Search
// const cloudClient = new Client({
//   cloud: {
//     id:
//       "cloud:",
//   },
//   auth: {
//     username: "elastic",
//     password: "jMJnrihr26aQAHuIpgz7X8MQ",
//   },
// })
// Local Elastic Search

const configClient = new Client({
  node: process.env.ELASTIC_HOST,
  // maxRetries: 5,
  // requestTimeout: 1000 * 60 * 60,
})

export default configClient
