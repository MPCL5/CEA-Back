import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from 'src/domain/Comment';
import Factory from 'src/seed/Factory';
import { Repository } from 'typeorm';
import { fakeCommentGenrator } from './data';

@Injectable()
export class CommentSeederService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentsRepository: Repository<Comment>,
  ) {}

  createMany(
    count: number,
    modifier: () => Partial<Comment>,
    haveReplies = true,
  ): Array<Promise<Comment>> {
    const factory = new Factory<Comment>(fakeCommentGenrator);
    const created = factory.createMany(count, modifier);

    return created.map(async (item) => {
      const result = await this.commentsRepository.save(item);

      // add reply to comment.
      if (haveReplies && Math.random() > 0.6) {
        await Promise.all(
          this.createMany(
            1 + Math.ceil(Math.random() * 6),
            () => {
              const parentResult = modifier();
              return {
                ...parentResult,
                replyTo: result,
              };
            },
            false,
          ),
        );
      }

      return result;
    });
  }
}
