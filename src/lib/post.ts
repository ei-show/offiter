import { readdir, readFile } from 'fs/promises'

/**
 * 対象ディレクトリから投稿を全件取得する関数
 * @param targetDir 投稿を取得する対象のディレクトリ
 * ディレクトリ構成は以下を想定している。
 * targetDir/**\/index.md
 * @example
 * const posts = await getPosts('./contents/posts')
 * @returns 投稿の配列
 */
export const getPosts = async (targetDir = './contents/posts') => {
  const entries = await readdir(targetDir, { withFileTypes: true })
  console.log(entries)
  return entries.filter(entry => entry.isDirectory()).map(entry => entry.name)
}

/**
 * 対象ディレクトリから投稿を1件取得する関数
 * @param targetDir 投稿を取得する対象のディレクトリ
 * @example
 * const post = await getPost('./contents/posts/hello-world')
 * @returns 投稿の情報
 */
export const getPost = async (targetDir = './contents/posts', slug: string) => {
  const content = await readFile(`${targetDir}/${slug}/index.md`, 'utf-8')
  console.log(content)
  return content
}
