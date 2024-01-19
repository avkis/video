import {MediaPlayer, MediaProvider, Poster} from '@vidstack/react';
// import useMicrophone from "../../hooks/useMicrophone.ts";
// import {useEffect} from "react";
import {DionVideoLayout} from "../../widgets/media-player/layout";
// import '@vidstack/react/player/styles/base.css';
import '@vidstack/react/player/styles/default/theme.css';
import './Video.css'

function Video() {
  // const recorder =  useMicrophone();

  // useEffect(() => {
  //   recorder?.start();
  //   console.log('Recorder state: ', recorder?.state);
  //   return () => recorder?.stop();
  // }, [recorder])

  return (
    <div>
      <MediaPlayer title="Sprite Fight" playsinline src="https://stream.mux.com/VZtzUzGRv02OhRnZCxcNg49OilvolTqdnFLEqBsTwaxU/low.mp4">
        <MediaProvider />
          <Poster
              className="vds-poster"
              src="https://media-files.vidstack.io/sprite-fight/poster.webp"
              alt="Girl walks into campfire with gnomes surrounding her friend ready for their next meal!"
          />
        <DionVideoLayout thumbnails="https://image.mux.com/VZtzUzGRv02OhRnZCxcNg49OilvolTqdnFLEqBsTwaxU/storyboard.vtt" />
      </MediaPlayer>
    </div>
  )
}

export default Video
