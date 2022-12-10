import { Image } from "expo";
import { Asset } from "expo-asset";

const IMAGES = [
  // require('./walkthrough-going-out-android.png'),
  // require('./walkthrough-going-out-ios.png'),
  // require('./walkthrough-notifications-android.png'),
  // require('./walkthrough-notifications-ios.png'),
  // require('./walkthrough-overview-android.png'),
  // require('./walkthrough-overview-ios.png'),
  // require('./logo-IH_blue_gold-small.png'),
  // require('./logo-IH_blue_gold.png'),
  // require('./splash.jpg'),
  // require('./welcome-screen.jpg'),
  // require('./welcome.jpg'),
];

export function cacheImages(images) {
  return images.map((image) => {
    if (typeof image === "string") {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

export async function loadImages() {
  return await cacheImages(IMAGES);
}
