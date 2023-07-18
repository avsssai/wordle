function Icon({
	height = 300,
	width = 280,
}: {
	height?: number;
	width?: number;
}) {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width={width}
			height={height}
			fill='none'
			viewBox='0 0 216 344'>
			<path
				stroke='#565656'
				d='M118.832 210.668c-.303-1.664 1.957-3.622 6.067-3.682 1.354.184 4.171-.156 4.608-2.986'></path>
			<path
				fill='#ff8fa3'
				d='M114.482 202.773a3.64 3.64 0 016.696-2.516l4.961 8.15c.24.394.429.816.562 1.257l.638 2.106a5.409 5.409 0 01-3.255 6.624 5.408 5.408 0 01-7.119-3.555L116 211.5l-1.518-8.727z'></path>
			<circle cx='115.5' cy='106.5' r='98.5' fill='#ff4d6d'></circle>
			<g filter='url(#filter0_f_1_10)'>
				<ellipse
					cx='97'
					cy='105.5'
					fill='#ff4d6d'
					rx='77'
					ry='85.5'></ellipse>
			</g>
			<g filter='url(#filter1_f_1_10)'>
				<ellipse
					cx='63.54'
					cy='103'
					fill='#fff'
					fillOpacity='0.99'
					rx='21.041'
					ry='27.887'
					transform='rotate(3.146 63.54 103)'></ellipse>
			</g>
			<g filter='url(#filter2_f_1_10)'>
				<ellipse
					cx='199.16'
					cy='121.996'
					fill='#fff'
					rx='3.551'
					ry='18.706'
					transform='rotate(14.627 199.16 121.996)'></ellipse>
			</g>
			<ellipse
				cx='123.187'
				cy='214.975'
				fill='#c9184a'
				rx='3.5'
				ry='5.136'
				transform='rotate(50.268 123.187 214.975)'></ellipse>
			<path
				stroke='#565656'
				d='M116.499 209.962S108.409 239 113.5 260c5.091 21 16.5 29 14 49.5s-1.001 33.462-1.001 33.462'></path>
			<path
				stroke='#565656'
				d='M116.5 210.5c0-2 3.3-3.8 8.5-3 1.667.5 5.3.7 6.5-2.5'></path>
			<defs>
				<filter
					id='filter0_f_1_10'
					width='194'
					height='211'
					x='0'
					y='0'
					colorInterpolationFilters='sRGB'
					filterUnits='userSpaceOnUse'>
					<feFlood
						floodOpacity='0'
						result='BackgroundImageFix'></feFlood>
					<feBlend
						in='SourceGraphic'
						in2='BackgroundImageFix'
						result='shape'></feBlend>
					<feGaussianBlur
						result='effect1_foregroundBlur_1_10'
						stdDeviation='10'></feGaussianBlur>
				</filter>
				<filter
					id='filter1_f_1_10'
					width='102.133'
					height='115.739'
					x='12.474'
					y='45.13'
					colorInterpolationFilters='sRGB'
					filterUnits='userSpaceOnUse'>
					<feFlood
						floodOpacity='0'
						result='BackgroundImageFix'></feFlood>
					<feBlend
						in='SourceGraphic'
						in2='BackgroundImageFix'
						result='shape'></feBlend>
					<feGaussianBlur
						result='effect1_foregroundBlur_1_10'
						stdDeviation='15'></feGaussianBlur>
				</filter>
				<filter
					id='filter2_f_1_10'
					width='31.683'
					height='56.244'
					x='183.318'
					y='93.874'
					colorInterpolationFilters='sRGB'
					filterUnits='userSpaceOnUse'>
					<feFlood
						floodOpacity='0'
						result='BackgroundImageFix'></feFlood>
					<feBlend
						in='SourceGraphic'
						in2='BackgroundImageFix'
						result='shape'></feBlend>
					<feGaussianBlur
						result='effect1_foregroundBlur_1_10'
						stdDeviation='5'></feGaussianBlur>
				</filter>
			</defs>
		</svg>
	);
}

export default Icon;
