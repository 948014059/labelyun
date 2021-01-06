const isPro = Object.is(process.env.NODE_ENV, 'production')

// console.log(isPro);

module.exports = {
  baseUrl: isPro ? 'http://test.smartyg.com:6001/api/' : '/api'
}
