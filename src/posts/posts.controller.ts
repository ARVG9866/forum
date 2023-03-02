import { Controller, Post, Get, Put, Delete, Param, Body } from '@nestjs/common';
import { UploadedFile, UseInterceptors } from '@nestjs/common/decorators';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreatePostDto } from './dto/create-post-dto';
import { UpdatePostDto } from './dto/update-post-dto';
import { PostsService } from './posts.service';

@ApiTags('Посты')
@Controller('posts')
export class PostsController {
  constructor(private postService: PostsService) {}

  @ApiOperation({ summary: 'Создать пост' } )
  @ApiResponse({ status: 200 })
  @Post('/create')
  @UseInterceptors(FileInterceptor('image'))
  create(@Body() postDto: CreatePostDto,
         @UploadedFile() image) {
    return this.postService.createPost(postDto, image);
  }

  @ApiOperation({ summary: 'Получить список постов' } )
  @ApiResponse({ status: 200 })
  @Get('/get/all')
  getAll() {
    return this.postService.getAllPosts();
  }

  @ApiOperation({ summary: 'Получить пост' } )
  @ApiResponse({ status: 200 })
  @Get('/get/byId/:id')
  get(@Param('id') id: number) {
    return this.postService.getPostById(id);
  }

  @ApiOperation({ summary: 'Получить посты по теме' } )
  @ApiResponse({ status: 200 })
  @Get('/get/byTopic/:topicId')
  getByTopic(@Param('topicId') topicId: number) {
    return this.postService.getPostsByTopic(topicId);
  }

  @ApiOperation({ summary: 'Получить посты по пользователю' } )
  @ApiResponse({ status: 200 })
  @Get('/get/byUser/:userId')
  getByUser(@Param('userId') userId: number) {
    return this.postService.getPostsByUser(userId);
  }

  @ApiOperation({ summary: 'Обновить пост' } )
  @ApiResponse({ status: 200 })
  @Put('/update/:id')
  update(@Param('id') id: number, @Body() dto: UpdatePostDto) {
    return this.postService.updatePost(dto, id);
  }

  @ApiOperation({ summary: 'Удалить пост' } )
  @ApiResponse({ status: 200 })
  @Delete('/delete/:id')
  delete(@Param('id') id: number) {
    return this.postService.removePost(id);
  }
}
