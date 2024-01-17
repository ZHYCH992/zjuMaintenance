import html2canvas from 'html2canvas';
const canvas = () => {
	html2canvas(document.body).then(e => {
		return e.toDataURL('image/png') || void 0;
	});
};
export default canvas;
