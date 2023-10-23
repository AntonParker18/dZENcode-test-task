import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import * as cors from 'cors'

const PORT = process.env.PORT || 8080

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.use(cors({
      credentials: true,
      origin: process.env.CLIENT_URL,
    }),
  )

  app.setGlobalPrefix('api')
  await app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
}
bootstrap()
