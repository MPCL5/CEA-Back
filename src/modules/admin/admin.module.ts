import { Module } from '@nestjs/common';
import { EventsModule } from './events/events.module';
import { NewsModule } from './news/news.module';
import { GalleriesModule } from './galleries/galleries.module';
import { QuestionsModule } from './questions/questions.module';
import { UsersModule } from './users/users.module';
import { CommentsModule } from './comments/comments.module';

@Module({
  imports: [
    EventsModule,
    NewsModule,
    GalleriesModule,
    QuestionsModule,
    UsersModule,
    CommentsModule,
  ],
})
export class AdminModule {}
