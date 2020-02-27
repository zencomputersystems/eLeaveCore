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
import { ApiImplicitFile } from '@nestjs/swagger';

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
  @ApiImplicitFile({ name: 'file', required: true, description: 'The file to upload' })
  @UseInterceptors(FileInterceptor('file'))
  async UploadedFilesUsingService(
    @UploadedFile()
    file: UploadedFileMetadata,
  ) {
    var ts = Math.round((new Date()).getTime() / 1000);

    file.originalname = file.originalname.replace(/[^a-zA-Z0-9 .]/gi, '');

    file = {
      ...file,
      originalname: 'eleave/' + ts + '_' + file.originalname,
    };


    const storageUrl = await this.azureStorage.upload(file);
    Logger.log(`Storage URL: ${storageUrl}`, 'AppController');
    let data = {}
    data['link'] = 'https://zencloudservicesstore.blob.core.windows.net/cloudservices/' + file.originalname;

    const fileData: String[] = file.originalname.split("/");

    data['folder'] = fileData[0];
    // data['filename'] = file.originalname;
    data['filename'] = fileData[1];
    return data;
    // return storageUrl;
  }


}