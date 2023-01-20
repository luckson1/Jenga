import Image from 'next/image';
import React, {useEffect, useState} from 'react';
import {useDropzone} from 'react-dropzone';
import { BsCloudUpload } from 'react-icons/bs';
 export interface MediaData extends Blob {
    name:string
 }



function Previews() {
  const [files, setFiles] = useState<((MediaData ) & { preview: string, })[]>([]);
  const {getRootProps, getInputProps, isDragActive} = useDropzone({
    accept: {
      'image/*': []
    },
    onDrop: (acceptedFiles: MediaData[] ) => {
      setFiles(acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
       
      })));
    }
  });
  
  const thumbs = files.map(file => (
    <div className='inline-flex border-2 border-slate-300 rounded mb-2 mr-2 w-16 h-16 lg:w-24 lg:h-24 p-1 border-box' key={file.name}>
      <div className='flex overflow-hidden '>
        <img
        alt="furniture"
          src={file.preview}

         className='block w-auto h-full'
          // Revoke data uri after image is loaded
          onLoad={() => { URL.revokeObjectURL(file.preview) }}
        />
      </div>
    </div>
  ));

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach(file => URL.revokeObjectURL(file.preview));
  }, [files]);

  return (
    <section className=" w-full   h-fit bg-slate-100  rounded-md flex flex-col  item-center py-4 px-2 border-violet-300 border-2 border-dashed ">
      <div {...getRootProps({className: 'dropzone'})} className='cursor-pointer  '>
        <input {...getInputProps()} />
 <div className='flex flex-row gap-3 w-full justify-center items-center align-baseline'>
 <BsCloudUpload className='text-xl'/> {isDragActive ? (
          <p>Drop the files here ...</p>
        ): (<p>Drag & drop images here, or click to select files</p>)}
 </div>
      </div>
      <aside className='flex flex-row flex-wrap mt-2 md:mt-6 w-full h-fit'>
        {thumbs}
      </aside>
    </section>
  );
}

export default Previews