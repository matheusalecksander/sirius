/* istanbul ignore file */
import { Module } from '@nestjs/common';
import { TodoModule } from './app/modules/todo/todo.module';

@Module({
  imports: [TodoModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
