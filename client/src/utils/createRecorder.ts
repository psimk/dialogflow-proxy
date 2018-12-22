const defaultOptions: MediaTrackConstraintSet = {
  sampleRate: 16000,
  channelCount: 1,
  echoCancellation: true,
};

export default async (context: AudioContext, options: MediaTrackConstraintSet = defaultOptions) => {
  const microphone = await navigator.mediaDevices
    .getUserMedia({
      audio: options,
      video: false,
    })
    .catch(console.error);

  if (microphone) return context.createMediaStreamSource(microphone);
  return null;
};
