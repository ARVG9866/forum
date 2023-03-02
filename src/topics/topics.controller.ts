import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateTopicDto } from './dto/create-topic-dto';
import { UpdateTopicDto } from './dto/update-topic-dto';
import { Topic } from './topics.model';
import { TopicsService } from './topics.service';


@ApiTags('Темы')
@Controller('topics')
export class TopicsController {
  constructor(private topicService: TopicsService) {}

  @ApiOperation({ summary: 'Создать тему' } )
  @ApiResponse({ status: 200, type: Topic})
  @Post('/create')
  create(@Body() topicDto: CreateTopicDto) {
    return this.topicService.createTopic(topicDto);
  }

  @ApiOperation({ summary: 'Получить список тем' } )
  @ApiResponse({ status: 200, type: [Topic]})
  @Get('/getAll')
  getAll() {
    return this.topicService.getAllTopic();
  }

  @ApiOperation({ summary: 'Получить тему' } )
  @ApiResponse({ status: 200, type: Topic})
  @Get('/get/:id')
  get(@Param('id') id: number) {
    return this.topicService.getTopic(id);
  }

  @ApiOperation({ summary: 'Обновить название' } )
  @ApiResponse({ status: 200})
  @Put('/update/:id')
  update(@Body() dto: UpdateTopicDto, @Param('id') id: number) {
    return this.topicService.updateTopic(dto, id);
  }

  @ApiOperation({ summary: 'Удалить тему' } )
  @ApiResponse({ status: 200})
  @Delete('/delete/:id')
  remove(@Param('id') id: number) {
    return this.topicService.removeTopic(id);
  }
}
