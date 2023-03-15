import React, { Component } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import constants from 'utils/constants';

const Editor = ({onChange,}) => {

    function uploadAdapter(loader) {
        return {
            upload: () => {
                return new Promise((resolve, reject) => {
                    const body = new FormData();
                    loader.file.then((file) => {
                        let baseUrl = process.env.REACT_APP_BASE_URL + `/api/file/upload?token=` + localStorage.getItem(constants.AUTH.TOKEN)
                        body.append("file", file); 
                        fetch(baseUrl, {
                            method: "post",
                            body: body
                            // mode: "no-cors"
                        })
                            .then((res) => res.json())
                            .then((res) => {
                                console.log(res)
                                resolve({
                                    default: res.url
                                });
                            })
                            .catch((err) => {
                                reject(err);
                            });
                    });
                });
            }
        };
    }

    function uploadPlugin(editor) {
        editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
            return uploadAdapter(loader);
        };
    }

    return (
        <div className="App">
            <h2>Using CKEditor 5 build in React</h2>
            <CKEditor
                editor={ClassicEditor}
                config={{
                    extraPlugins: [uploadPlugin]
                }}

                data=""
                onReady={editor => {
                    // You can store the "editor" and use when it is needed.
                    console.log('Editor is ready to use!', editor);
                }}
                onChange={(event, editor) => {
                    const data = editor.getData();
                    onChange({ event, editor, data });
                }}
                onBlur={(event, editor) => {
                    console.log('Blur.', editor);
                }}
                onFocus={(event, editor) => {
                    console.log('Focus.', editor);
                }}
            />
        </div>
    );
}

export default Editor;
