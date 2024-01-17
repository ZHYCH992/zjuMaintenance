const Svg = ({ title, width = 128, height = 128, text, block, ...otherProps }) => {
	const svgList = {
		icon: `<svg xmlns="http://www.w3.org/2000/svg" style="${block ? 'display:block' : 'display:inline-block'}" width="${width}" height="${
			height || width
		}" viewBox="0 0 40.017 40.394">
  <g id="jiqiren-3" transform="translate(-151.1 -136)">
    <path id="路径_1" data-name="路径 1" d="M183.869,146.282l2.468-3.128a3.661,3.661,0,1,0-2.562-3.483,3.623,3.623,0,0,0,.543,1.9l-2.518,3.189a19.634,19.634,0,0,0-21.384,0l-2.518-3.189a3.623,3.623,0,0,0,.543-1.9,3.736,3.736,0,1,0-2.562,3.483l2.468,3.128a19.812,19.812,0,0,0-7.082,15.151v13.581c0,.466.039.921.072,1.381h39.54c.033-.46.072-.915.072-1.381V161.432A19.812,19.812,0,0,0,183.869,146.282Zm3.743,16.354a4.847,4.847,0,0,1-4.836,4.836H159.441a4.836,4.836,0,0,1,0-9.671h23.336A4.847,4.847,0,0,1,187.612,162.635Z" fill="#fff"/>
    <path id="路径_2" data-name="路径 2" d="M310.419,550.633a2.026,2.026,0,0,0-2.019,2.019v3.178a2.019,2.019,0,0,0,4.037,0v-3.178A2.019,2.019,0,0,0,310.419,550.633Zm18.533-.033a2.026,2.026,0,0,0-2.019,2.019V555.8a2.019,2.019,0,1,0,4.037,0v-3.178A2.026,2.026,0,0,0,328.952,550.6Z" transform="translate(-148.577 -391.608)" fill="#fff"/>
  </g>
</svg>`,
		headBG: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="1920" height="90" viewBox="0 0 1920 90">
<defs>
		<filter id="矩形_29" x="-30" y="-27" width="1980" height="150" filterUnits="userSpaceOnUse">
				<feOffset dy="3" input="SourceAlpha"/>
				<feGaussianBlur stdDeviation="10" result="blur"/>
				<feFlood flood-color="#3869c6" flood-opacity="0.11"/>
				<feComposite operator="in" in2="blur"/>
				<feComposite in="SourceGraphic"/>
		</filter>
		<clipPath id="clip-path">
				<g transform="matrix(1, 0, 0, 1, 0, 0)" filter="url(#矩形_29)">
						<rect id="矩形_29-2" data-name="矩形 29" width="1920" height="90" fill="#383cf8"/>
				</g>
		</clipPath>
</defs>
<g id="蒙版组_3" data-name="蒙版组 3" clip-path="url(#clip-path)">
		<g id="矩形_26" data-name="矩形 26" transform="translate(349 -433)" fill="none" stroke="#48dacb" stroke-width="80" opacity="0.1">
				<rect width="261" height="456" rx="83" stroke="none"/>
				<rect x="-40" y="-40" width="341" height="536" rx="123" fill="none"/>
		</g>
		<g id="矩形_27" data-name="矩形 27" transform="translate(836.745 12)" fill="none" stroke="#48dacb" stroke-width="80" opacity="0.1">
				<rect width="261" height="456" rx="83" stroke="none"/>
				<rect x="-40" y="-40" width="341" height="536" rx="123" fill="none"/>
		</g>
		<g id="矩形_28" data-name="矩形 28" transform="translate(1827 -25) rotate(90)" fill="none" stroke="#48dacb" stroke-width="80" opacity="0.1">
				<rect width="261" height="456" rx="83" stroke="none"/>
				<rect x="-40" y="-40" width="341" height="536" rx="123" fill="none"/>
		</g>
</g>
</svg>
`,
	};
	return (
		<>
			<div style={otherProps && otherProps.style} onClick={otherProps.onClick} dangerouslySetInnerHTML={{ __html: svgList[title] }}>
				{text}
			</div>
		</>
	);
};
export { Svg };
