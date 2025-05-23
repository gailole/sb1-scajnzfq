export const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  });
};

export const preloadImages = async (imageSources: string[]): Promise<void[]> => {
  const preloadPromises = imageSources.map(src => preloadImage(src));
  return Promise.all(preloadPromises);
};