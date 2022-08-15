export default function actionCreator(actionName: string) {
	return {
		REQUEST: `${actionName}_REQUEST`,
		SUCCESS: `${actionName}_SUCCESS`,
		FAIL: `${actionName}_FAIL`,
	};
}

export const getURL = (selectedOption: any, id = '') => `${id}?filter=${selectedOption}`;
