import path from 'path';
import { Worker } from 'worker_threads';

export const uploadFile = async(req,res)=>{
    try {
        const { file } = req;
    if(!req.file){
        return res.status(400).json({success:false,message:"XLSX/CSV File required."});
    }
    const worker = new Worker(path.resolve('workers/uploadWorker.js'), {
      workerData: file.path,
    });
  
    worker.on('message', (msg) => {
      res.status(200).send(msg);
    });
  
    worker.on('error', (err) => {
      res.status(500).send(err.message);
    });
    } catch (error) {
        return res.status(500).json({message:"SOmething went wrong!",error});
    }
}