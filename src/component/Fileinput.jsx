import axios from 'axios';
import { useState } from 'react';
function FileInput() {
	const [fileContent, setFileContent] = useState('');
	const [selectedFile, setSelectedFile] = useState(null);
	const [progress, setProgress] = useState(0);
	// 处理文件选择事件
	// function handleFileChange(event) {
	// 	setSelectedFile(event.target.files[0]);
	// }

	// 处理文件上传事件
	function handleFileUpload() {
		if (selectedFile) {
			// 计算切片数量和每个切片的大小
			const fileSize = selectedFile.size;
			const chunkSize = 1024 * 1024; // 设置切片大小为1MB
			const totalChunks = Math.ceil(fileSize / chunkSize);

			// 创建FormData对象，并添加文件信息
			const formData = new FormData();
			formData.append('file', selectedFile);
			formData.append('totalChunks', totalChunks);

			// 循环上传切片
			for (let chunkNumber = 0; chunkNumber < totalChunks; chunkNumber++) {
				const start = chunkNumber * chunkSize;
				const end = Math.min(start + chunkSize, fileSize);
				const chunk = selectedFile.slice(start, end);
				formData.append(`chunk-${chunkNumber}`, chunk, selectedFile.name);
			}

			// 发起文件上传请求
			axios
				.post('/upload', formData, {
					onUploadProgress: progressEvent => {
						const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
						setProgress(progress);
					},
				})
				.then(response => {
					console.log('文件上传成功:', response.data);
				})
				.catch(error => {
					console.error('文件上传失败:', error);
				});
		}
	}
	// 读取文件内容到ArrayBuffer
	function readFileToArrayBuffer(file) {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();

			// 注册文件读取完成后的回调函数
			reader.onload = function (event) {
				const arrayBuffer = event.target.result;
				resolve(arrayBuffer);
			};

			// 读取文件内容到ArrayBuffer
			reader.readAsArrayBuffer(file);
		});
	}

	// 将ArrayBuffer转为十六进制字符串
	function arrayBufferToHexString(arrayBuffer) {
		const uint8Array = new Uint8Array(arrayBuffer);
		let hexString = '';
		for (let i = 0; i < uint8Array.length; i++) {
			const hex = uint8Array[i].toString(16).padStart(2, '0');
			hexString += hex;
		}
		return hexString;
	}

	// 处理文件选择事件
	function handleFileChange(event) {
		const file = event.target.files[0]; // 获取选中的文件

		if (file) {
			readFileToArrayBuffer(file)
				.then(arrayBuffer => {
					const hexString = arrayBufferToHexString(arrayBuffer);
					setFileContent(hexString);
				})
				.catch(error => {
					console.error('文件读取失败:', error);
				});
		} else {
			setFileContent('请选择一个文件');
		}
	}
	// 处理文件下载事件
	function handleFileDownload() {
		axios
			.get('/download', {
				responseType: 'blob',
				onDownloadProgress: progressEvent => {
					const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
					setProgress(progress);
				},
			})
			.then(response => {
				// 创建一个临时的URL对象用于下载
				const url = window.URL.createObjectURL(new Blob([response.data]));
				const link = document.createElement('a');
				link.href = url;
				link.setAttribute('download', 'file.txt');
				document.body.appendChild(link);
				link.click();
				document.body.removeChild(link);
			})
			.catch(error => {
				console.error('文件下载失败:', error);
			});
	}

	return (
		<div>
			<input type='file' onChange={handleFileChange} />
			<div>
				<h4>文件内容：</h4>
				<pre>{fileContent}</pre>
			</div>

			<button onClick={handleFileDownload}>下载文件</button>
			<div>进度：{progress}%</div>
		</div>
	);
}

export default FileInput;
