const StartAudioSource = (): AudioBufferSourceNode => {
  const audioCtx = new window.AudioContext();

  // Create an empty three-second stereo buffer at the sample rate of the AudioContext
  const myArrayBuffer = audioCtx.createBuffer(
    2,
    audioCtx.sampleRate * 1,
    audioCtx.sampleRate
  );

  // Fill the buffer with white noise;
  // just random values between -1.0 and 1.0
  for (let channel = 0; channel < myArrayBuffer.numberOfChannels; channel++) {
    // This gives us the actual array that contains the data
    const nowBuffering = myArrayBuffer.getChannelData(channel);
    for (let i = 0; i < myArrayBuffer.length; i++) {
      // Math.random() is in [0; 1.0]
      // audio needs to be in [-1.0; 1.0]
      nowBuffering[i] = i * 0.00001;
    }
  }

  // Get an AudioBufferSourceNode.
  // This is the AudioNode to use when we want to play an AudioBuffer
  const IndexAudioSource = audioCtx.createBufferSource();

  // set the buffer in the AudioBufferSourceNode
  IndexAudioSource.buffer = myArrayBuffer;

  // connect the AudioBufferSourceNode to the
  // destination so we can hear the sound
  IndexAudioSource.connect(audioCtx.destination);

  // start the source playing
  return IndexAudioSource;
};

export default StartAudioSource;
