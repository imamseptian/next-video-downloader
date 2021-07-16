import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const VerticalVideoDetails = ({
  videoURL,
  videoList,
  videoInfo,
  downloadFunction,
}) => {
  const downloadFile = (url, itag, quality) => {
    downloadFunction(url, itag, quality);
  };

  return (
    <div className="video-details-wrapper-vertical">
      <div className="video-details-top-vertical">
        <img
          src={videoInfo.videoDetails.thumbnails[3].url}
          alt=""
          className="video-thumbnails-vertical"
        />
      </div>

      <h3>{videoInfo.videoDetails.title}</h3>

      {videoList.map((vid, index) => {
        return (
          <div key={index} className="download-options">
            <div style={{ display: "flex" }}>
              <div style={{ marginRight: "10px" }}>{`${index + 1}. `}</div>
              <div>{vid.qualityLabel ? vid.qualityLabel : "Mp3"}</div>
            </div>
            <a
              className="custom-btn btn-3"
              onClick={(e) => {
                e.preventDefault();
                // downloadVideo(videoURL, vid.itag, vid.qualityLabel);
                downloadFile(videoURL, vid.itag, vid.qualityLabel);
              }}
            >
              <div className="btn-div">
                <FontAwesomeIcon
                  icon={["fas", "download"]}
                  style={{ marginRight: "5px" }}
                  size="lg"
                />
                Download {vid.totalSize}
              </div>
            </a>
          </div>
        );
      })}
      <div style={{ width: "100%" }}>
        <h2>Video Description</h2>
        <p className="video-description-vertical">
          {videoInfo.videoDetails.description}
        </p>
      </div>
    </div>
  );
};

export default VerticalVideoDetails;
