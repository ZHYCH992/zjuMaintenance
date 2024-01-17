import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import { useState } from 'react';
import { getToken } from './api/url';
import UseModal from './component/UseModal';
import GlogalContext from './hooks/CountContext';
import useBaseRequest from './hooks/useBaseRequest';
import { Svg } from './utils/svg';
import { toImg } from './utils/tools';
const App = () => {
	const svgStyle = {
		backgroundColor: '#F4B337',
		borderRadius: '50%',
		display: 'inline-block',
		padding: '15px',
		cursor: 'pointer',
	};
	const [modal, setModal] = useState(false);
	const [context, setContext] = useState({ imgUrl: '', token: { id: '2', loginName: '2', name: '2' } });
	const open = async () => {
		await toImg().then(e => setContext(() => Object.assign(context, { imgUrl: e })));
		setModal(true);
	};
	useBaseRequest(getToken, {
		onSuccess: res => {
			setContext(() => Object.assign(context, { token: { id: res.id, loginName: res.loginName, name: res.name } }));
		},
	});
	return (
		<GlogalContext.Provider value={context}>
			<ConfigProvider locale={zhCN}>
				<Svg style={svgStyle} title={'icon'} width={'20px'} height={'20px'} block onClick={open} />
				<UseModal open={modal} setOpen={setModal} />
			</ConfigProvider>
		</GlogalContext.Provider>
	);
};
export default App;
