const defaultOptions: MediaTrackConstraintSet = {
  sampleRate: 41000,
  channelCount: 1,
};

export default async (options: MediaTrackConstraintSet = defaultOptions) => {
  try {
    return navigator.mediaDevices.getUserMedia({
      audio: options,
    });
  } catch (err) {
    console.error(err);
  }
};
