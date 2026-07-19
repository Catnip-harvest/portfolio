const MEDIA_PREVIEWS: Record<string, string> = {
  '/capstone-arm-picking.gif': '/capstone-arm-picking-poster.webp',
  '/turtlebot-3d-model.gif': '/turtlebot-3d-model-poster.webp',
  '/turtlebot-teleoperating.gif': '/turtlebot-teleoperating-poster.webp',
  '/2-dof-robot-arm.gif': '/2-dof-robot-arm-poster.webp',
};

export const getMediaPreview = (url: string) => MEDIA_PREVIEWS[url] || url;

export const isVideoMedia = (url: string) => /\.(mp4|webm)$/i.test(url);
