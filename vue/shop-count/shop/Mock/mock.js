import mock from './index'
import list from './data/shoplist.json'
const bootstrap = () => {
  mock.onPost('/list').reply((config) => {
    return new Promise((resolve, reject) => {
      resolve([200, list])
    })
  })
}
export default {
  bootstrap
}
