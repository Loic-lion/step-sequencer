import React from "react";

type AudioFileUploaderProps = {
  onFileUpload: (file: File) => void;
};

const AudioFileUploader: React.FC<AudioFileUploaderProps> = ({
  onFileUpload,
}) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      onFileUpload(file);
    }
  };

  return (
    <div>
      <input
        type="file"
        accept="audio/*"
        onChange={handleFileChange}
        className="input__upload"
      />
    </div>
  );
};

export default AudioFileUploader;
