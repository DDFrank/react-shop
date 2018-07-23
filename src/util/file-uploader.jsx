import React from "react";
import FileUpload from './FileUpload.jsx';

class FileUploader extends React.Component{
    render() {
        const options = {
            baseUrl:'/manage/product/upload.do',
            fileFieldName:'upload_file',
            dataType:'json',
            chooseAndUpload : true,
            uploadSuccess : (res) => {
                this.props.onSuccess(res.data);
            },
            uploadError : (err) => {
                this.props.onError(err.msg || '上传图片出错啦');
            }
        };

        return (
            <FileUpload options={options}>
                <button className="btn btn-xs btn-default" type="button" ref="chooseAndUpload">请选择图片</button>
            </FileUpload>
        )
    }
}

export default FileUploader;
