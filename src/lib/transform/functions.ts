/**
 * @description GPT에 의해 만들어진 function schema를 react-jsonschema-form schema로 변환
 * @param schema GPT에 의해 만들어진 function schema
 * @returns react-jsonschema-form schema
 */
export function toRJSFSchema(schema: any): any {
	const { name, parameters, description } = JSON.parse(JSON.stringify(schema));
	return {
		title: name,
		description,
		type: parameters.type,
		properties: parameters.properties,
		required: parameters.required,
	}
}

/**
 * @description GPT에 의해 만들어진 function schema를 moaui schema로 변환
 * @param schema GPT에 의해 만들어진 function schema
 * @returns moaui schema
 */
export function toMoauiSchema(schema: any): any {
	console.log('작성이 필요합니다.');
}