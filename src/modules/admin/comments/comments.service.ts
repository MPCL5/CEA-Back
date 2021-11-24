import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from 'src/domain/Comment';
import { FindOneOptions, Repository } from 'typeorm';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private commentsRepository: Repository<Comment>,
  ) {}

  getComments(take: number, skip: number) {
    const result = this.commentsRepository.find({
      take,
      skip,
      relations: ['news', 'event'],
    });
    const count = this.commentsRepository.count();

    return Promise.all([result, count]);
  }

  getCommentById(id: number, loadReplies = true): Promise<Comment> {
    const findOptions: FindOneOptions<Comment> = {
      loadRelationIds: { relations: ['replyTo'] },
    };

    if (loadReplies) {
      findOptions.relations = ['replies'];
    }

    return this.commentsRepository.findOne(id, findOptions);
  }

  async replyToCommnet(
    sourceComment: Comment,
    replyComment: Comment,
  ): Promise<Comment> {
    await this.commentsRepository.save(replyComment);

    sourceComment.replies = [...sourceComment.replies, replyComment];
    await this.commentsRepository.save(sourceComment);

    return sourceComment;
  }

  async updateComment(comment: Comment): Promise<Comment> {
    await this.commentsRepository.save(comment);
    return comment;
  }
}
