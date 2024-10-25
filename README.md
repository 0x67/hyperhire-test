<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest.

## How to run

### Docker

1. Copy `.env.example` and rename to `.env`. Only need to change `MORALIS_API_KEY` to your own key, rest can be used as is
2. Run `docker-compose up -d`
3. Access the API

## Clarification

The test requirements provided [here](https://hyperhire.notion.site/Blockchain-Nest-js_241007-1187ac1c0f2f80cd8c1fde63e979ec4d) is a bit ambiguous regarding few term and I've not received a reply from the recruiter so I make few assumptions and make some slight changes to the API

- Token here is the ERC20 token deployed on EVM chain, so in the API need to specify which token to access
- Some symbol might be altered to satisfy the requirements, i.e. WETH > ETH, WBTC > BTC (I choose WBTC instead of BTCb)
- Price of a chain increases (feature no. 2) > This one is also ambiguous, so right now it alerts for every token
- API - setting alert for specific price.(parameters are chain, dollar, email) > I added one additional params `symbol` to specificy which token to track the alerts

## Feature

- [x] Automatically save the Price of Ethereum and Polygon every 5 minutes
  - [x] Save WETH, POL, and WBTC on Etherum
  - [x] Save POL on Polygon
- [x] Automatically send an email to “hyperhire_assignment@hyperhire.in” if the price of a chain increases by more than 3%
- [x] User alert (create alert + sending email)
- [x] Price chart
- [ ] Swagger
- [x] Postman

## Environment Variables

```
NODE_ENV=development | staging | production
PORT=3001
TZ=UTC
DATABASE_URL=postgresql://user:password@localhost:5432/dbname

## REDIS
## url will always be used if supplied
REDIS_URL=redis(s)://user:password@host:6379 or redis(s)://host:6379
MORALIS_API_KEY=your_moralis_api_key

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
