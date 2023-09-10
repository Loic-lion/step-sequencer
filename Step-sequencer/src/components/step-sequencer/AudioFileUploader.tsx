import React from "react";

type AudioFileUploaderProps = {
  onFileUpload: (file: File) => void;
};

function AudioFileUploader({ onFileUpload }: AudioFileUploaderProps) {
  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files && event.target.files[0];
    if (file) {
      onFileUpload(file);
    }
  }

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
}

export default AudioFileUploader;
