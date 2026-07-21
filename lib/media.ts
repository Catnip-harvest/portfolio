import { Project } from '../types';

const MEDIA_PREVIEWS: Record<string, string> = {
  '/capstone-arm-picking.gif': '/capstone-arm-picking-poster.webp',
  '/capstone-arm-picking-preview.mp4': '/capstone-arm-picking-poster.webp',
  '/turtlebot-3d-model.gif': '/turtlebot-3d-model-poster.webp',
  '/turtlebot-teleoperating.gif': '/turtlebot-teleoperating-poster.webp',
  '/turtlebot-teleoperating-preview.mp4': '/turtlebot-teleoperating-poster.webp',
  '/2-dof-robot-arm.gif': '/2-dof-robot-arm-poster.webp',
  '/2-dof-robot-arm-preview.mp4': '/2-dof-robot-arm-poster.webp',
  '/mira-demo-preview.mp4': '/mira-demo-poster.webp',
};

export const getMediaPreview = (url: string) => MEDIA_PREVIEWS[url] || url;

export const isVideoMedia = (url: string) => /\.(mp4|webm)$/i.test(url);

export const getProjectMedia = (project: Project) => {
  const media: string[] = [];
  if (project.previewVideoUrl) media.push(project.previewVideoUrl);
  media.push(project.imageUrl);
  if (project.videoUrl && !project.videoUrl.includes('youtube.com/embed')) media.push(project.videoUrl);
  if (project.secondaryImageUrl) media.push(project.secondaryImageUrl);
  if (project.additionalMedia) media.push(...project.additionalMedia);
  return Array.from(new Set(media.filter(Boolean)));
};
