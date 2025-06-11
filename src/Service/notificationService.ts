import PushNotification from 'react-native-push-notification';
export const createChannel = () => {
  PushNotification.createChannel(
    {
      channelId: 'default-channel-id',
      channelName: 'Default Channel',
      importance: 4,
    },
    (created) => console.log(`createChannel returned '${created}'`)
  );
};
export const showLocalNotification = (title: string, message: string, imageUrl?: string) => {
  PushNotification.localNotification({
    channelId: 'eventfinder-channel',
    title,
    message,
    bigPictureUrl: imageUrl,
    largeIconUrl: imageUrl,
    playSound: true,
    soundName: 'default',
  });
};
