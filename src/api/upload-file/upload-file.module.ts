import { UploadFileController } from './upload-file.controller';
import { Module } from '@nestjs/common';
import { AzureStorageModule } from '@nestjs/azure-storage';

@Module({
  controllers: [UploadFileController],
  imports: [
    AzureStorageModule.withConfig({
      sasKey: '?sv=2018-03-28&ss=bfqt&srt=sco&sp=rwdlacup&se=2023-11-29T16:30:34Z&st=2019-10-02T08:30:34Z&spr=https,http&sig=2Mi0z8FFOAapLcyr%2FWKsWsQEF84dBBe%2B0zTaWaaMzBY%3D',// process.env['AZURE_STORAGE_SAS_KEY'],
      accountName: 'zencloudservicesstore',// process.env['AZURE_STORAGE_ACCOUNT'],
      containerName: 'cloudservices',
    }),
  ],
})
export class UploadFileModule { }