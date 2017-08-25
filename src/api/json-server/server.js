const jsonServer = require('json-server')

const defaultAccounts = [{
  id: 'acct1',
  offerId: 'acct1',
  name: 'Name',
  avatar: '',
  isConsumer: false,
  isMerchant: true,
  operators: [{
    id: 'profile1'
  }],
  _links: []
}]

const server = jsonServer.create()
const dataPersist = false
const router = jsonServer.router(dataPersist ? 'db.json'
  : {
    accounts: defaultAccounts
  }
)

const middlewares = jsonServer.defaults()

// console.log(`middlewares: ${middlewares.map(f => f.name || f.toString()).join(' : ')}`)  // eslint-disable-line no-console

server.use(middlewares)

// ////////////////////// ACCOUNTS //////////////////////

server.get('/accounts/:id', (req, res, next) => {
  next()
})

function accountsWrapper (array) {
  return {
    accounts: array,
    _links: []
  }
}

server.get('/accounts', (req1, res1, next) => {
  const origRender = router.render
  router.render = (req, res) => {
    res.jsonp(accountsWrapper(res.locals.data))
  }

  next()
  router.render = origRender
})

server.put('/accounts/:id', (req, res, next) => {
  console.log('1231231234444')
  req.body._links = [{ // eslint-disable-line no-underscore-dangle
    method: 'GET',
    url: `/accounts/${req.params.id}`,
    rel: 'self'
  }, {
    method: 'PUT',
    url: `/accounts/${req.params.id}`,
    rel: 'update'
  }]

  next()
})

server.post('/accounts', (req, res, next) => {
  console.log('123123123')
  req.body.id = `TRAC-ACCT-${Math.round(Math.random() * 1000000000)}`
  req.body._links = [{ // eslint-disable-line no-underscore-dangle
    method: 'GET',
    url: `/accounts/${req.body.id}`,
    rel: 'self'
  }, {
    method: 'PUT',
    url: `/accounts/${req.body.id}`,
    rel: 'update'
  }]

  next()
})

server.use(router)

module.exports = server
