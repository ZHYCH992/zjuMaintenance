import html2canvas from 'html2canvas';

/** 这个文件中封装了一些常用的工具函数 **/
/**
    保留N位小数
    @param {Number|String} str 待处理数字
    @param {Number} x 保留几位小数点
    @return {Number|String} 处理成功返回字符串，处理失败返回原值
  */
const pointX = (str, x = 0) => {
	if (!str && str !== 0) {
		return str;
	}
	const temp = Number(str);
	if (temp === 0) {
		return temp.toFixed(x);
	}
	return temp ? temp.toFixed(x) : str;
};
/**
								去掉字符串两端空格
								@param {String} str 待处理字符串
								@return {String} 处理后的字符串
					*/
const trim = str => {
	const reg = /^\s*|\s*$/g;
	return str.replace(reg, '');
};

/**
							给字符串打马赛克
							如：将123456转换为1****6，最多将字符串中间6个字符变成*
							如果字符串长度小于等于2，将不会有效果
							@param {String} str 待处理字符串
							@return {String} 处理后的字符串
					*/
const addMosaic = str => {
	const s = String(str);
	const lenth = s.length;
	const howmuch = (() => {
		if (s.length <= 2) {
			return s.length;
		}
		const l = s.length - 2;
		if (l <= 6) {
			return l;
		}
		return 6;
	})();
	const start = Math.floor((lenth - howmuch) / 2);
	const ret = s.split('').map((v, i) => {
		if (i >= start && i < start + howmuch) {
			return '*';
		}
		return v;
	});
	return ret.join('');
};

/**
							字符串加密 简单的加密方法
							@param {String} code 待处理字符串
							@param {String} 加密后的字符串
					*/
const compile = code => {
	let c = String.fromCharCode(code.charCodeAt(0) + code.length);
	for (let i = 1; i < code.length; i++) {
		c += String.fromCharCode(code.charCodeAt(i) + code.charCodeAt(i - 1));
	}
	return c;
};
/**
    字符串解谜 对应上面的字符串加密方法
    @param {String} code 加密的字符串
    @param {String} 解密后的字符串
  */
const uncompile = code => {
	let c = String.fromCharCode(code.charCodeAt(0) - code.length);
	for (let i = 1; i < code.length; i++) {
		c += String.fromCharCode(code.charCodeAt(i) - c.charCodeAt(i - 1));
	}
	return c;
};
//base64转二进制
const base64toBlob = (dataurl, filename) => {
	var arr = dataurl.split(','),
		mime = arr[0].match(/:(.*?);/)[1],
		bstr = atob(arr[1]),
		n = bstr.length,
		u8arr = new Uint8Array(n);
	while (n--) {
		u8arr[n] = bstr.charCodeAt(n);
	}
	return new File([u8arr], filename, { type: mime });
};
/**
 * Description
 * @author ZHYCH
 * @date 2023-10-09
 * @param {any} element=document.body
 * @returns {any}
 */
const toImg = (element = document.body) => {
	return new Promise((resolve, reject) => {
		html2canvas(element)
			.then(e => {
				const imgUrl = e.toDataURL('image/png');
				resolve(imgUrl);
			})
			.catch(e => {
				console.log('html2canvas转图片失败', e);
				reject(e);
			});
	});
};
export { addMosaic, base64toBlob, compile, pointX, toImg, trim, uncompile };
