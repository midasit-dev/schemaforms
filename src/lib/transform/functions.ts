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
  };
}

/**
 * @description GPT에 의해 만들어진 function schema를 moaui schema로 변환
 * @param schema GPT에 의해 만들어진 function schema
 * @returns moaui schema
 */
export function toMoauiSchema(schema: any): object {
  const {
    name,
    description,
    parameters: { properties },
  } = schema;

	const repWidth = 640;

  // 초기 UI 스키마 설정
  const uiSchema: any = {
    canvas: {
      width: repWidth,
      height: 0, // 초기값 0으로 설정, 추후에 계산하여 업데이트
      layers: [],
    },
  };

  let currentY = 0; // y좌표 초기화

  // 공통 FloatingBox 추가 함수
  const addFloatingBox = (idPrefix: any, y: any, height: any, children: any) => {
    uiSchema.canvas.layers.push({
      id: `${idPrefix}-FloatingBox`,
      type: "FloatingBox",
      props: {
        x: 0,
        y,
        width: repWidth,
        height,
        guideBoxProps: {
          width: "inherit",
          height: "inherit",
          id: `${idPrefix}-FloatingBox`,
          spacing: 1,
          center: true,
        },
      },
      children,
      parent: null,
    });
    currentY += height; // y좌표를 높이만큼 증가시킨다
  };

	//공통 Typography 추가 함수
	const typography = (idPrefix: any, children: any, variant: any, size: any) => {
		return {
			id: `${idPrefix}-Typography`,
			type: "Typography",
			props: {
				children,
				width: "auto",
				height: "auto",
				variant,
				color: "primary",
				size,
			},
			children: [],
		};
	};

	//공통 textfield 추가 함수
	const textField = (idPrefix: any, title: any, placeholder: any, wrappedWidth: any, width: any, height: any) => {
		return {
			id: `${idPrefix}-TextField`,
			type: "TextField",
			props: {
				title,
				placeholder,
				wrappedWidth,
				width,
				height,
			},
			children: [],
		};
	};

	//공통 button 추가 함수
	const button = (idPrefix: any, children: any, width: any, variant: any, color: any) => {
		return {
			id: `${idPrefix}-Button`,
			type: "Button",
			props: {
				children,
				width,
				variant,
				color,
			},
			children: [],
		};
	}

  // 제목 및 설명을 위한 FloatingBox 추가
  addFloatingBox("1", 0, 64, [ // currentY는 여기서 업데이트!
		typography("1", name, "h1", "large"),
		typography("2", description, "body1", "small"),
  ]);

  // parameters의 properties를 순회하며 FloatingBox 추가
  Object.entries(properties).forEach(([key, value], index) => {
    if ((value as any).type === "string") {
      addFloatingBox(`${index + 2}`, currentY, 64, [
				textField(`${index + 2}`, key, "Placeholder", "200px", "150px", "30px")
			])
    }}
		//string이 아닌 경우 아래에 추가!
  );

  // 실행 버튼 추가
  addFloatingBox(`${uiSchema.canvas.layers.length + 2}`, currentY, 64, [
		button(`${uiSchema.canvas.layers.length + 2}`, "실행하기", "100px", "contained", "negative")
  ]);

  // currentY 값을 최종적으로 canvas의 height로 설정
  uiSchema.canvas.height = currentY;

  return uiSchema;
}