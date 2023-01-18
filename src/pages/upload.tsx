import axios from "axios";
import {useFormik} from 'formik'

async function uploadToS3(values:any) {
  const files = values.files

  if (!files) {
    return null;
  }


for (const file of files) {
  const { data } :{data: {uploadUrl:string, key:string }} = await axios.get(`/api/aws/upload`);

  const { uploadUrl, key } = data;

  await axios.put(uploadUrl, file);

}


}

function Upload() {
  async function handleSubmit(values: any){
   
    const key = await uploadToS3(values);
   console.log(key)
  }
  const formik= useFormik({
    initialValues: {
       files: [], 
        caption: ""
    },
    onSubmit: values=> {handleSubmit(values);   
      }
})
  return (
    <div className="mt-16 w-10/12 mx-auto h-96 flex flex-col gap-10">
      <p>Please select file to upload</p>
      <form onSubmit={formik.handleSubmit} className="flex flex-row justify-between" >
        <input type="file" accept="image/jpeg image/png" name="file" className="w-[30%] p-2 outline outline-1 outline-slate-400 rounded-md"   
                                onChange={(e) =>
                                  formik.setFieldValue("files", e.currentTarget.files)
                                }
                  multiple/>
        <input id="caption"type="text"  placeholder="caption" className="w-[30%] p-2 outline outline-1 outline-slate-400 rounded-md" onChange={formik.handleChange}  value={formik.values.caption}/>
        <button type="submit" className="p-2 outline outline-1 outline-slate-400 bg-inherit rounded-lg hover:bg-slate-400 w-[20%]">Upload</button>
      </form>
    </div>
  );
}

export default Upload;