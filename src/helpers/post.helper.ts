import { constants, access, mkdir, readdir } from "node:fs/promises";
import { join as joinPaths } from "node:path";
import { config } from "telebuilder/config";
import { HelperException } from "telebuilder/exceptions";
import type { ChannelPost } from "../types.js";

class PostHelper {
  private readonly repoDir = config.get<string>("git.repoDir");
  private readonly postsDir = joinPaths(
    this.repoDir,
    config.get<string>("git.postsDir")
  );
  private readonly relPostsDir = config.get<string>("git.postsDir");
  private readonly channelId = config.get<string>('botConfig.channelId');

  private readonly frontMatter = '+++\ntitle = "$title"\ndate = $date\n\n[extra]\nimages: [$images]\n+++\n\n';

  setTitle: (content?: string) => string = () => this.channelId;
  extraContentProcessor?: (content: string) => string;

  addFrontMatter(post: ChannelPost): void {
    const images = post.mediaSource.map((m, i) => {
      const fileName = `image_${i}.${m.split('.').pop()}`;
      const dest = joinPaths(this.postsDir, post.id.toString(), fileName);
      const relDest = joinPaths(this.relPostsDir, post.id.toString(), fileName);
      post.mediaDestination.push(dest);
      post.relMediaDestination.push(relDest);
      return `"${fileName}"`;
    });

    post.content = `${this.frontMatter
      .replace('$title', post.title)
      .replace('$date', new Date(Number(post.date) * 1000).toISOString())
      .replace('$images', images.join(', ')) + post.content}\n`;
  }

  async getEditablePostId(post: ChannelPost): Promise<number> {
    const postFiles: number[] = (await readdir(this.postsDir)).map((fileOrDir) => {
      if (fileOrDir.includes('.')) {
        return Number.parseInt(fileOrDir.split('.')[0], 10);
      } else {
        return Number.parseInt(fileOrDir, 10);
      }
    });

    return postFiles.reduce((prev, curr) => {
      const prevDifference = Math.abs(curr - post.id);
      const currDifference = Math.abs(prev - post.id);
      return prevDifference < currDifference ? curr : prev;
    });
  }

  async getPostImageNames(postId: number | string): Promise<string[]> {
    const postImages = await readdir(joinPaths(this.postsDir, postId.toString())).catch(() => []);
    return postImages.filter((image) => image.startsWith('image_'));
  }

  async checkAndCreateDirectory(dir: string): Promise<void> {
    try {
      await access(dir, constants.F_OK);
    } catch (error) {
      try {
        await mkdir(dir, { recursive: true });
      } catch (mkdirError) {
        // we can't continue without the directory
        throw new HelperException(`Error creating directory: ${(<Error>mkdirError).message}`);
      }
    }
  }
}

export default new PostHelper;
