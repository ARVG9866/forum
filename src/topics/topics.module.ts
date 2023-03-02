import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Post } from 'src/posts/posts.model';
import { PostsService } from 'src/posts/posts.service';
import { User } from 'src/users/users.model';
import { TopicsController } from './topics.controller';
import { Topic } from './topics.model';
import { TopicsService } from './topics.service';

@Module({
  controllers: [TopicsController],
  providers: [TopicsService],
  imports: [
    SequelizeModule.forFeature([User, Post, Topic]),
  ],
})
export class TopicsModule {}
