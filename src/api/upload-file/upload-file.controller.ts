import {
  Controller,
  Logger,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  AzureStorageFileInterceptor,
  UploadedFileMetadata,
  AzureStorageService,
} from '@nestjs/azure-storage';

/**
 * Upload file controller
 *
 * @export
 * @class UploadFileController
 */
@Controller('api')
export class UploadFileController {

  /**
   *Creates an instance of UploadFileController.
   * @param {AzureStorageService} azureStorage azure storage service
   * @memberof UploadFileController
   */
  constructor(private readonly azureStorage: AzureStorageService) { }

  // @Post('azure/upload')
  // @UseInterceptors(
  //   AzureStorageFileInterceptor('file', null, {
  //     containerName: 'cloudservices',
  //     accountName: 'zencloudservicesstore',
  //     sasKey: '?sv=2018-03-28&ss=bfqt&srt=sco&sp=rwdlacup&se=2023-11-29T16:30:34Z&st=2019-10-02T08:30:34Z&spr=https,http&sig=2Mi0z8FFOAapLcyr%2FWKsWsQEF84dBBe%2B0zTaWaaMzBY%3D'
  //   }),
  // )
  // UploadedFilesUsingInterceptor(
  //   @UploadedFile()
  //   file: UploadedFileMetadata,
  // ) {
  //   console.log(file);
  //   Logger.log(`Storage URL: ${file.storageUrl}`, 'AppController');
  // }

  /**
   * Upload file
   *
   * @param {UploadedFileMetadata} file
   * @memberof UploadFileController
   */
  @Post('azure/upload')
  @UseInterceptors(FileInterceptor('file'))
  async UploadedFilesUsingService(
    @UploadedFile()
    file: UploadedFileMetadata,
  ) {
    file = {
      ...file,
      originalname: 'eleave/' + file.originalname,
    };
    const storageUrl = await this.azureStorage.upload(file);
    Logger.log(`Storage URL: ${storageUrl}`, 'AppController');
  }


}