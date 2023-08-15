import fastify from 'fastify'

const server = fastify()


interface IQuerystring {
  username: string;
  password: string;
}

interface IHeaders {
  'h-Custom': string;
}

interface IReply {
  200: { success: boolean };
  302: { url: string };
  '4xx': { error: string };
}


server.get('/ping', async (request, reply) => {
  return 'pong\n'
})

server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})

server.get<{
  Querystring: IQuerystring,
  Headers: IHeaders,
  Reply: IReply
}>('/auth', (request, reply) => {
  const { username, password } = request.query
  const customerHeader = request.headers['h-Custom']

  console.log({
    username,
    password,
    customerHeader
  })

  reply.code(200).send({ success: true });

})