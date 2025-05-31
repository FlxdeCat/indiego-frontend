export interface Game {
  id: string,
  userId: string,
  downloads: number,
  reviewIds: string[],
  name: string,
  description: string,
  genreIds: string[],
  genres: string[],
  link: string,
  rating: number,
  ratingCount: number,
  createdAt: string,
  devName: string,
  cover: File,
  banner: File,
  banners: File[],
  file: File
}