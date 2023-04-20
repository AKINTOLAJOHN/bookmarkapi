import { Module } from '@nestjs/common';
import { Authservice } from 'src/auth/auth.service';
import { BookmarkController } from './bookmark.controller';
import { BookmarkService } from './bookmark.service';

@Module({
  controllers: [BookmarkController],
  providers: [Authservice,BookmarkService]
})
export class BookmarkModule {}