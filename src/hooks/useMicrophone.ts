import {useState} from "react";

const useMicrophone = () => {
  const [recorder, setRecorder] = useState<MediaRecorder>()

  // const audioCtx = new AudioContext();
  if (navigator.mediaDevices) {
    navigator.mediaDevices
      // Only audio is to be captured for our dictaphone
      .getUserMedia({"audio": true})
      .then((stream) => {
        // const microphone = audioCtx.createMediaStreamSource(stream);
        // `microphone` can now act like any other AudioNode
        // console.log('Microphone', microphone)

        // Instantiate the media recorder.
        const mediaRecorder = new MediaRecorder(stream);

        // Create a buffer to store the incoming data.
        let chunks: BlobPart[] = [];
        mediaRecorder.ondataavailable = (event) => {
          chunks.push(event.data);
          console.log('useMicrophone - ondataavailable:', event.data);
        }

        // Create an audio file once you stop the recorder.
        mediaRecorder.onstop = () => {
          // A "blob" combines all the audio chunks into a single entity
          const blob = new Blob(chunks, {"type": "audio/ogg; codecs=opus"});
          chunks = []; // clear buffer

          // One of many ways to use the blob
          const audio = new Audio();
          audio.src = URL.createObjectURL(blob);
          console.log('useMicrophone - onStop audio.src', audio.src);
        }

        setRecorder(mediaRecorder);
        // mediaRecorder.start();

      })
      .catch((err) => {
        // browser unable to access microphone
        // (check to see if microphone is attached)
        console.error(`The following getUserMedia error occurred: ${err}`);
      });
  } else {
    // browser unable to access media devices
    console.log("getUserMedia not supported on your browser!");
  }

  return recorder;
}

export default useMicrophone
