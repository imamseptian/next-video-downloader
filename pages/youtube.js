import axios from "axios";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Navbar,
  Spinner,
  VerticalVideoDetails,
  UrlField,
  ErrorVideo,
} from "../components";

export default function TikTok() {
  const webUrl = process.env.BASE_URL;
  // const webUrl = "http://localhost:3000/";

  const [videoInfo, setVideoInfo] = useState(null);
  const [videoURL, setVideoURL] = useState("");
  const [videoList, setVideoList] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [errorStatus, setErrorStatus] = useState({
    isError: false,
    message: "",
  });

  const downloadVideo = (url, itag, quality) => {
    let mime = "mp4";
    let qual = quality;
    if (quality == null) {
      mime = "mp3";
      let qual = "music";
    }

    window.open(
      // `${webUrl}api/youtube/download?videoURL=${videoURL}&selectedURL=${url}&itag=${itag}&mime=${mime}`
      `${webUrl}api/youtube/download?videoURL=${videoURL}&quality=${qual}`
    );
  };

  const getVideoInfo = async () => {
    setErrorStatus({
      ...errorStatus,
      isError: false,
      message: "",
    });
    setVideoInfo(null);
    setisLoading(true);
    try {
      let response = await axios.get(
        `${webUrl}api/youtube/videoinfo?videoURL=${videoURL}`
      );
      let data = response.data;
      // let orderedSize = data.filteredVideo;
      // orderedSize = orderedSize.sort((a, b) =>
      //   a.fullSize > b.fullSize ? 1 : -1
      // );

      setVideoList(data.filteredVideo);
      // setVideoList(orderedSize);
      console.log(data);
      setVideoInfo(data);
      setisLoading(false);
    } catch (e) {
      console.log(e.message);
      setErrorStatus({
        ...errorStatus,
        isError: true,
        message: "e.response.data.message",
      });
      setVideoInfo(null);
      setisLoading(false);
    }
  };

  const DetailVideo = () =>
    videoInfo !== null ? (
      <VerticalVideoDetails
        videoURL={videoURL}
        videoInfo={videoInfo}
        videoList={videoList}
        downloadFunction={downloadVideo}
      />
    ) : null;

  return (
    <div>
      <Navbar />
      <div className="page-content">
        <div className="title-section-wrapper">
          <h1 className="page-title">YouTube Video Downloader </h1>
          <FontAwesomeIcon icon={["fab", "youtube"]} size="2x" />
        </div>

        <UrlField
          urlChange={setVideoURL}
          getVideo={getVideoInfo}
          videoURL={videoURL}
          logo="youtube"
          placeholder="Paste a Youtube video URL here"
        />

        {!isLoading ? <DetailVideo /> : <Spinner />}
        <ErrorVideo
          errorStatus={errorStatus}
          dismissAlert={() => {
            setErrorStatus({
              ...errorStatus,
              isError: false,
              message: "",
            });
          }}
        />
      </div>
    </div>
  );
}
