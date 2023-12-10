// ! modules
import { useRef } from 'react';

// ? styles
import s from './File.module.css';

// ? assets
// * images
import uploadImage from './../../assets/images/upload_type_color.png';

function File({
  handleSubmit,
  handleDelete,
  openFile,
  isActive,
  title,
  icon,
  typeOfFile,
  expansionOfFile,
}) {
  const fileInputRef = useRef(null);

  async function uploadFileToServer() {
    await new Promise((resolve) => {
      fileInputRef.current.addEventListener('change', resolve, { once: true });
      fileInputRef.current.click();
    });

    const selectedFile = fileInputRef.current.files[0];

    const data = {
      file: selectedFile,
      'Content-Type': selectedFile.type,
      typeOfFile: typeOfFile,
    };

    handleSubmit(data);
  }

  return (
    <div className={s.main}>
      <button
        type='button'
        onClick={uploadFileToServer}
        className={`button subhead ${s.button}`}
      >
        Upload File
      </button>
      <img
        className={`${s.icon} ${isActive ? 'button' : ''}`}
        alt={isActive ? icon.alt : 'upload document'}
        src={isActive ? icon.src : uploadImage}
        onClick={() => {
          isActive &&
            openFile({
              type: expansionOfFile,
              src: icon.url,
              alt: icon.alt,
              title: title,
            });
        }}
      />
      <input
        id='file-upload'
        ref={fileInputRef}
        hidden
        alt='upload file'
        type='file'
      />
      <h6 className={`${s.name} caption`}>{title}</h6>

      {isActive && (
        <button
          type='button'
          onClick={(e) => {
            handleDelete(e, typeOfFile);
          }}
          className={`button subhead ${s.button} ${s.button_type_delete}`}
        >
          Delete File
        </button>
      )}
    </div>
  );
}

export default File;
