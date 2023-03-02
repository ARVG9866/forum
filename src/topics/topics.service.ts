import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateTopicDto } from './dto/create-topic-dto';
import { UpdateTopicDto } from './dto/update-topic-dto';
import { Topic } from './topics.model';

@Injectable()
export class TopicsService {
  constructor (@InjectModel(Topic) private topicRepository: typeof Topic) {}

  async createTopic(dto: CreateTopicDto) {
    const topic = await this.topicRepository.create(dto);

    return topic;
  }

  async getAllTopic() {
    const topics = await this.topicRepository.findAll();

    return topics;
  }

  async getTopic(id: number) {
    const topic = await this.topicRepository.findOne({ where: { id } })
    
    if (topic)
      return topic;
    
    throw new HttpException("Тема не найдена", HttpStatus.NOT_FOUND) 

  }

  async updateTopic(dto: UpdateTopicDto, id: number) {
    const updated = await this.topicRepository.update(dto, {where: {id: id}});
    const topic = await this.getTopic(id)

    return topic;
  }

  async removeTopic(id: number) {
    const topic = await this.getTopic(id);

    await topic.destroy();

    return '[ "OK" ]';
  }
}
