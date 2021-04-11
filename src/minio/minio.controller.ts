import { Body, Controller, Delete, Get, Param, Post, Res, UploadedFile, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MinioClientService } from './minio.service';
// import { BucketDto } from './dto/bucketDto';
// import { OpjectDto } from './dto/opjectDto';
// import { MinioClientService } from './minio-client.service';
 
@Controller('minio-client')
export class MinioClientController {
 constructor(private _minioClientService: MinioClientService
 ) { }
 @Get('get-all-buckets')
 getAllBucket() {
 return this._minioClientService.getAllBuckets()
 }
 
 @Post('upload-opject')
 @UseInterceptors(FileInterceptor('file'))
 uploudFile(@UploadedFile() file, @Body() bucket) {
 return this._minioClientService.putOpject(file, bucket)
 }
 
 @Get('download/:bucket/:id')
 async downloadFile(@Param('bucket') bucket, @Param('id') id, @Res() res) {
 return res.send(await this._minioClientService.downloadFile(bucket, id))
 }
 
 @Delete('remove-bucket')
 removeBucket(@Body() bucket) {
 return this._minioClientService.removeBucket(bucket)
 }
 
 @Delete('remove-opject')
 @UsePipes(ValidationPipe)
 removeOpject(@Body() data) {//OpjectDto
 return this._minioClientService.removeOpject(data)
 }
 
 @Post('make-bucket')
 @UsePipes(ValidationPipe)
 makeBucket(@Body() bucket) {
 return this._minioClientService.makeBucket(bucket)
 }
 
 @Post('bucket-exists')
 @UsePipes(ValidationPipe)
 bucketExists(@Body() bucket) {//BucketDto
 return this._minioClientService.bucketExists(bucket)
 }
 
 @Post('list-opjects')
 @UsePipes(ValidationPipe)
 listOpjects(@Body() bucket) {
 return this._minioClientService.listOpjects(bucket)
 }
}