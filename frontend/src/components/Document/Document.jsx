// ! modules
import { useRef, useState } from 'react';

// ? styles
import s from './Document.module.css';

// ? assets
// * images
import uploadImage from './../../assets/images/upload_type_color.png';
//   icons
import addIcon from './../../assets/images/icons/add.svg';

function Document({
  handleSubmit,
  handleDelete,
  isActive,
  title,
  icon,
  typeOfFile,
  openFile,
  expansionOfFile,
}) {
  const fileInputRef = useRef(null);
  const [isFileUpload, setFileUpload] = useState(isActive);

  //
  function uploadFile(e) {
    fileInputRef.current.click();
  }

  function handleFileChange(e) {
    const selectedFile = fileInputRef.current.files[0];

    setFileUpload(true);
    // Здесь можно выполнить операции с выбранным файлом
    console.log('Файл:', selectedFile);
  }

  function uploadFileToServer() {
    const data = {
      file: fileInputRef.current.files[0],
      'Content-Type': fileInputRef.current.files[0].type,
      typeOfFile: typeOfFile,
    };

    handleSubmit(data);
    setFileUpload(false);
  }

  return (
    <div className={s.main}>
      <div className={s.buttons}>
        {isActive && (
          <button
            type='button'
            onClick={() => {
              openFile({
                type: expansionOfFile,
                src: icon.url,
                alt: icon.alt,
                title: title,
              });
            }}
            className={`button subhead ${s.button}`}
          >
            Watch
          </button>
        )}
        {isFileUpload && (
          <button
            type='button'
            onClick={uploadFileToServer}
            className={`button subhead ${s.button}`}
          >
            Upload
          </button>
        )}
      </div>
      <img
        className={`button ${s.icon}`}
        alt={isActive ? icon.alt : 'upload document'}
        src={isActive ? icon.src : uploadImage}
        onClick={uploadFile}
      />
      <input
        id='file-upload'
        ref={fileInputRef}
        onChange={handleFileChange}
        hidden
        alt='upload file'
        type='file'
      />
      <h6 className={`${s.name} caption`}>{title}</h6>
      <div className={s.buttons}>
        {isActive && (
          <button
            type='button'
            onClick={(e) => {
              handleDelete(e, typeOfFile);
            }}
            className={`button subhead ${s.button} ${s.button_type_delete}`}
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
}

export default Document;
