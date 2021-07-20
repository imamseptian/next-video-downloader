// import axios from "axios";
// import { useEffect, useState } from "react";
// import Navbar from "../components/Navbar";

// export default function Youtube() {
//   const webUrl = "http://localhost:3000/";

//   const [videoInfo, setVideoInfo] = useState([]);
//   const [videoURL, setVideoURL] = useState("");
//   const [videoList, setVideoList] = useState([]);
//   const [isLoading, setisLoading] = useState(false);

//   const downloadVideo = (url) => {
//     window.open(`${webUrl}api/twitter/download?videoURL=${url}`);
//   };

//   const VideoList = () => {
//     return (
//       <div>
//         <ul>
//           {videoInfo.variants.map((vid, i) => {
//             if (vid.resolution !== null) {
//               return (
//                 <li>
//                   {`${vid.resolution} - ${vid.fileSize}`} [
//                   <a
//                     className="download_link"
//                     href="/"
//                     onClick={(e) => {
//                       e.preventDefault();
//                       downloadVideo(vid.url);
//                     }}
//                   >
//                     Download
//                   </a>
//                   ]
//                 </li>
//               );
//             }
//           })}
//         </ul>
//       </div>
//     );
//   };

//   const getVideoInfo = async () => {
//     setisLoading(true);
//     setVideoList([]);
//     try {
//       let response = await axios.get(
//         `${webUrl}api/twitter/videoinfo?videoURL=${videoURL}`
//       );
//       let data = response.data;
//       console.log(data);
//       setVideoInfo(data);
//       setisLoading(false);
//     } catch (e) {
//       console.log(e.message);
//       alert("error");
//       setisLoading(false);
//     }
//   };

//   return (
//     <div>
//       <Navbar />
//       <div className="page-content">
//         <h1>Twitter Video Downloader</h1>
//         <input
//           type="text"
//           name="videoURL"
//           id="videoURL"
//           value={videoURL}
//           onChange={(e) => setVideoURL(e.target.value)}
//         />
//         <button onClick={getVideoInfo}>Submit</button>
//         <div>
//           <h2>{isLoading ? "Loading" : null}</h2>
//         </div>

//         <p>{videoInfo.full_text ? videoInfo.full_text : null}</p>
//         {videoInfo.variants ? <VideoList /> : null}
//       </div>
//     </div>
//   );
// }

import axios from "axios";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Navbar,
  Spinner,
  VerticalVideoDetails,
  UrlField,
  ErrorVideo,
  TwitterVideoDetails,
} from "../components";

export default function Twitter() {
  const webUrl = process.env.BASE_URL;

  const [videoInfo, setVideoInfo] = useState(null);
  const [videoURL, setVideoURL] = useState("");
  const [videoList, setVideoList] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [thumbnail, setThumbnail] = useState("");
  const [errorStatus, setErrorStatus] = useState({
    isError: false,
    message: "",
  });

  const downloadVideo = (url, title) => {
    window.open(`${webUrl}api/twitter/download?videoURL=${url}&title=${title}`);
  };

  const getVideoInfo = async () => {
    setisLoading(true);
    setVideoList([]);
    try {
      let response = await axios.get(
        `${webUrl}api/twitter/videoinfo?videoURL=${videoURL}`
      );
      let data = response.data;
      let maxBit = 0;
      let thumbs = "";
      data.variants.forEach((e) => {
        if (parseInt(e.bitrate) > maxBit) {
          maxBit = parseInt(e.bitrate);
          thumbs = e.url;
        }
      });

      let videoku = data.variants;
      videoku = videoku.sort((a, b) => (a.bitrate > b.bitrate ? 1 : -1));
      console.log(videoku);
      setVideoList(videoku);

      setThumbnail(thumbs);
      console.log(data);
      setVideoInfo(data);
      setisLoading(false);
    } catch (e) {
      console.log(e.message);
      alert("error");
      setisLoading(false);
    }
  };

  const DetailVideo = () =>
    videoInfo !== null ? (
      <TwitterVideoDetails
        thumbnail={thumbnail}
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
          <h1 className="page-title">Twitter Video Downloader </h1>
          <FontAwesomeIcon icon={["fab", "twitter"]} size="2x" />
        </div>

        <UrlField
          urlChange={setVideoURL}
          getVideo={getVideoInfo}
          videoURL={videoURL}
          logo="twitter"
          placeholder="Paste a Twitter video URL here"
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
