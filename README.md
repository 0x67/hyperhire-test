<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest.

## Description

[Nest](https://github.com/nestjs/nest) API template created with love by [0x67](https://github.com/0x67). This template is created for myself to have ready with everything I could possibly need.

## TODO

- [x] Extend NestJs default HttpException
  - [x] NotFound
  - [x] BadRequest
  - [ ] more exceptions
- [x] Global exception filters
- [ ] Global interceptors
- [x] Redis connection using [ioredis](https://www.npmjs.com/package/ioredis)
- [x] [Cache manager](https://github.com/jaredwray/cacheable/blob/main/packages/cache-manager/READMEv5.md) v5 + [redis store](https://www.npmjs.com/package/cache-manager-ioredis-yet)
- [x] Logging using [Pino](https://github.com/iamolegga/nestjs-pino)
  - [ ] Custom logger
  - [ ] Transport logs to 3rd party (platform TBD)
- [x] S3 service for (multipart uploads)[https://docs.aws.amazon.com/AmazonS3/latest/userguide/mpuoverview.html]
  - [ ] ACL + CORS
  - [ ] Some kind of DRM?
- [ ] Sentry
- [ ] Prometheus
- [ ] Health check
- [ ] Elasticsearch + Logstash + Kibana
  - [ ] Clustering
- [ ] Cassandra or ScyllaDB
  - [ ] Clustering
- [x] Postgres database schema and migrations using [Prisma](https://docs.nestjs.com/recipes/prisma) andd [Kysely](https://kysely.dev/docs/getting-started) for handling query
  - [ ] Clustering
- [ ] Queue producer and consumer\
- [ ] Websocket
  - [ ] Connection upgrade
  - [ ] Auth
- [ ] Authorization > need to decide between keycloak, auth0 or custom implementation
  - [ ] Access token
  - [ ] Refresh token cycle
- [ ] Socials
  - [ ] Google
  - [ ] Github
  - [ ] Apple
  - [ ] Facebook
- [ ] Dockerfile
-

## IMPORTANT NOTES!

Locked dependencies versions until NestJs v11

1. cache-manager@5.7.6 > [#508](https://github.com/nestjs/cache-manager/pull/508)
2. fastify@^4 > [#13990](https://github.com/nestjs/nest/pull/13990)

## Environment Variables

```
NODE_ENV=development | staging | production
PORT=3001
DATABASE_URL=postgresql://user:password@localhost:5432/dbname

## REDIS
## url will always be used if supplied
REDIS_URL=redis(s)://user:password@host:6379 or redis(s)://host:6379
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_USERNAME=user
REDIS_PASSWORD=password

## S3
S3_REGION=us-east-1
S3_ACCESS_KEY=
S3_SECRET_ACCESS=
S3_ENDPOINT=<http(s)://endpoint-without.bucket
S3_BUCKET=bucketname

```

## Project setup

```bash
$ pnpm install
```

## Compile and run the project

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run dev

# production mode
$ pnpm run start:prod
```

## Run tests

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ pnpm install -g mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
