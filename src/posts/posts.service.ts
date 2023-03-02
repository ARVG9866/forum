import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FilesService } from 'src/files/files.service';
import { CreatePostDto } from './dto/create-post-dto';
import { UpdatePostDto } from './dto/update-post-dto';
import { Post } from './posts.model';

@Injectable()
export class PostsService {
  constructor(@InjectModel(Post) private postRepository: typeof Post,
              private fileServise: FilesService) {}

  async createPost(dto: CreatePostDto, image) {
    const fileName = await this.fileServise.createFile(image)
    const post = await this.postRepository.create({...dto, image: fileName});

    return post;
  }

  async getAllPosts() {
    const posts = await this.postRepository.findAll();

    return posts;
  }

  async getPostById(id: number) {
    const post = await this.postRepository.findByPk(id);

    if(post)
      return post;

      throw new HttpException("Пост не найден", HttpStatus.NOT_FOUND);
  }
  
  async getPostsByTopic(topicId: number) {
    const posts = await this.postRepository.findAll({ where:{ topicId } });

    return posts;
  }

  async getPostsByUser(userId: number) {
    const posts = await this.postRepository.findAll({ where: { userId } });

    return posts;
  }

  async updatePost(dto: UpdatePostDto, postId: number) {
    const updated = await this.postRepository.update(dto, {where: {id: postId}});
    const post = await this.getPostById(postId)

    return post;
  }

  async removePost(id: number) {
    const post = await this.getPostById(id)
    
    await post.destroy()
  
    return '[ "OK" ]';
  }
}
