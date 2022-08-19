export default function actionCreator(actionName: string) {
	return {
		REQUEST: `${actionName}_REQUEST`,
		SUCCESS: `${actionName}_SUCCESS`,
		FAIL: `${actionName}_FAIL`,
	};
}

export const getURL = (selectedOption: any, id?: string) => {
	if (id) return `/todos/${id}?filter=${selectedOption}`;

	return `/todos?filter=${selectedOption}`;
};
