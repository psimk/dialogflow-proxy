const defaultOptions: MediaTrackConstraintSet = {
  sampleRate: 41000,
  channelCount: 1,
};

export default async (options: MediaTrackConstraintSet = defaultOptions) => {
  try {
    return navigator.mediaDevices.getUserMedia({
      audio: options,
      video: false,
    });
  } catch (err) {
    console.error(err);
  }
};
