global.___loader = {
  enqueue: jest.fn(),
}
global.requestAnimationFrame = cb => cb()
process.env.GATSBY_EARTHBUCKET_HOSTNAME = 'test-domain.com'
process.env.GATSBY_TINYLETTER_USERNAME = 'foo'
