// To implement simultaneous audio recording from both the microphone and speaker, we'll need to use the Web Audio API.
// The MediaRecorder API only allows recording from the microphone or screen, not both at the same time.
// The Web Audio API, on the other hand, allows you to create audio sources from both the microphone and the speaker and mix them together for recording.

import { useState, useEffect, useRef } from 'react';
import { Socket } from 'socket.io-client';

interface TranscriptComponentProps {
  roomId: number | string;
}

export const TranscriptComponent = (props: TranscriptComponentProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);

  const socket = useRef<Socket>();

  useEffect(() => {
    socket.current = socket.current?.connect();
    return () => {
      socket.current?.disconnect();
    };
  }, []);

  const startRecording = async (id: string) => {
    console.log("Recording started. id is:", id);
    try {
      // Use the navigator.mediaDevices.getUserMedia to capture audio from the microphone.
      const audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      // Use the navigator.mediaDevices.getDisplayMedia method to capture audio from the speaker.
      const speakerStream = await navigator.mediaDevices.getDisplayMedia({
        audio: true,
        video: false,
      });

      // Create an AudioContext and connect both the microphone and speaker sources
      // to a single destination using createMediaStreamSource and createMediaStreamDestination.
      const audioContext = new window.AudioContext();
      const micSource = audioContext.createMediaStreamSource(audioStream);
      const speakerSource = audioContext.createMediaStreamSource(speakerStream);

      const destination = audioContext.createMediaStreamDestination();
      micSource.connect(destination);
      speakerSource.connect(destination);

      setIsRecording(true);
      setStream(destination.stream);

      const mimeTypes = ["audio/mp4", "audio/webm"].filter((type) =>
        MediaRecorder.isTypeSupported(type)
      );

      if (mimeTypes.length === 0) {
        return alert("Browser not supported");
      }

      // Create a MediaRecorder instance using the combined stream from the destination, which includes both microphone and speaker audio.
      const mediaRecorder = new MediaRecorder(destination.stream, { mimeType: mimeTypes[0] });

      // To send the recorded audio to the server for transcription using Socket.io
      mediaRecorder.ondataavailable = async (event) => {
        if (event.data.size > 0 && socket.current?.connected) {
          socket.current?.emit("audio", { roomId: props.roomId, data: event.data });
        }
      };

      mediaRecorder.onstop =  () => {
        if (stream) {
          stream.getTracks().forEach((track) => track.stop());
        }
        setIsRecording(false);
        socket.current?.emit("stop-transcript", { roomId: props.roomId });
        console.log("Recording stopped");
      };

      mediaRecorder.start(1000);

      return mediaRecorder;

    } catch (error) {
      console.error("Error accessing media devices:", error);
    }
  };

  if (!isRecording) {
    startRecording('1').then(mediaRecorder => {
      console.log('+++ mediaRecorder', mediaRecorder);
    })
  }

  return null;
};
