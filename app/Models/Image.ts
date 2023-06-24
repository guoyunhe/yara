import Drive from '@ioc:Adonis/Core/Drive';
import Env from '@ioc:Adonis/Core/Env';
import { column, computed } from '@ioc:Adonis/Lucid/Orm';
import driveConfig from 'Config/drive';
import { readFile } from 'fs/promises';
import { imageSize } from 'image-size';
import { nanoid } from 'nanoid';
import sharp from 'sharp';
import Model from './Model';

interface ImageCreateFromFileOptions {
  filePath: string;
  folder?: string;
  userId: number;
  resizeOptions: { width: number; height: number; fit: 'contain' | 'cover' };
}

export default class Image extends Model {
  @column()
  public userId: number;

  @column()
  public path: string;

  @column()
  public size: number;

  @column()
  public width: number;

  @column()
  public height: number;

  @computed()
  public get url(): string {
    return `${Env.get('APP_URL')}${driveConfig.disks.local.basePath}/${this.path}`;
  }

  public async delete() {
    await super.delete();
    if (await Drive.exists(this.path)) {
      await Drive.delete(this.path);
    }
  }

  public static async createFromFile({
    filePath,
    userId,
    resizeOptions,
  }: ImageCreateFromFileOptions) {
    let buffer = await readFile(filePath);
    buffer = await sharp(buffer).webp().resize(resizeOptions).toBuffer();
    const path = await Image.makeFilePath();
    await Drive.put(path, buffer);
    const size = buffer.byteLength;
    const { width, height } = imageSize(buffer);
    const image = await Image.firstOrCreate({
      userId,
      path,
      size,
      width,
      height,
    });
    return image;
  }

  public static async makeFilePath(): Promise<string> {
    const path = `images/${nanoid()}.webp`;

    if (await Drive.exists(path)) {
      return await Image.makeFilePath();
    } else {
      return path;
    }
  }
}
