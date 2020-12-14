import { Module } from '@nestjs/common';
import { GiftController } from './gift.controller';

@Module({
    imports: [],
    controllers: [GiftController],
    providers: [],

})
export class GiftModule { }
