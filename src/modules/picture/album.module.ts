import { Module } from '@nestjs/common';
import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';
import { HttpClient } from '../../framework/httpclient/http.client';

@Module({
  imports: [],
  controllers: [AlbumController],
  providers: [AlbumService,HttpClient],
  
})
export class AlbumModule {}
