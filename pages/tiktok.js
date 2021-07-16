import axios from "axios";
import { useEffect, useState } from "react";
import {
  Navbar,
  TikTokVideoDetails,
  Spinner,
  ErrorVideo,
  UrlField,
} from "../components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function TikTok() {
  const webUrl = "http://localhost:3000/";

  const [videoInfo, setVideoInfo] = useState(null);
  const [videoURL, setVideoURL] = useState("");
  const [videoList, setVideoList] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [errorStatus, setErrorStatus] = useState({
    isError: false,
    message: "",
  });

  const downloadVideo = () => {
    window.open(`${webUrl}api/tiktok/download?videoURL=${videoURL}`);
  };

  const getVideoInfo = async () => {
    setisLoading(true);

    try {
      let response = await axios.get(
        `${webUrl}api/tiktok/videoinfo?videoURL=${videoURL}`
      );
      console.log(response.status);
      console.log(response.data);
      setErrorStatus({
        ...errorStatus,
        isError: false,
        message: "",
      });
      setVideoInfo(response.data);
      setisLoading(false);
    } catch (e) {
      console.log(e.message);
      setErrorStatus({
        ...errorStatus,
        isError: true,
        message: e.response.data.message,
      });
      setVideoInfo(null);
      setisLoading(false);
    }
  };

  const DetailVideo = () =>
    videoInfo !== null ? (
      <TikTokVideoDetails videoInfo={videoInfo} downloadVideo={downloadVideo} />
    ) : null;

  return (
    <div>
      <Navbar />
      <div className="page-content">
        <div className="title-section-wrapper">
          <h1 style={{ marginRight: "15px" }}>Tiktok Video Downloader </h1>
          <FontAwesomeIcon icon={["fab", "tiktok"]} size="2x" />
        </div>

        <UrlField
          urlChange={setVideoURL}
          getVideo={getVideoInfo}
          videoURL={videoURL}
          logo="tiktok"
          placeholder="Paste a TikTok video URL here"
        />

        {/* detail video  */}
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
