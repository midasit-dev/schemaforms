import Form from '@rjsf/core';
import { RJSFSchema, UiSchema, WidgetProps, RegistryWidgetsType, FieldTemplateProps, TitleFieldProps } from '@rjsf/utils';
import validator from '@rjsf/validator-ajv8';
import moa from '@midasit-dev/moaui';
import { toRJSFSchema } from '../transform';

const CustomTextField = function (props: WidgetProps) {
	return (
    <div id={props.id} style={{ display: "flex", width: "100%", alignItems: 'center' }}>
      <div style={{ flex: "0 1 auto", marginRight: 10 }}>
				<moa.Typography variant='h1'>
					{props.name}
				</moa.Typography>
			</div>
      <div style={{ flex: "1 1 0" }}>
        <moa.TextFieldV2 />
      </div>
    </div>
  );
}

const CustomCheckbox = function (props: WidgetProps) {
  return (
    <button
      id="custom"
      className={props.value ? "checked" : "unchecked"}
      onClick={() => props.onChange(!props.value)}
    >
      {String(props.value)}
    </button>
  );
};

const widgets: RegistryWidgetsType = {
	TextWidget: CustomTextField,
  CheckboxWidget: CustomCheckbox,
};

function CustomFieldTemplate(props: FieldTemplateProps) {
  const { id, classNames, style, label, help, required, description, errors, children } = props;
	console.log(props);

  return (
    // <div className={classNames} style={style}>
    //   <label htmlFor={id}>
    //     {label}
    //     {required ? '*' : null}
    //   </label>
    //   {children}
    //   {description}
    //   {errors}
    //   {help}
    // </div>
		<moa.GuideBox>
			{children}
			{/* {children}
			<moa.Typography color="#b1b1b1">{description}</moa.Typography>
			{errors} */}
		</moa.GuideBox>
  );
}

const Tester = () => {
	return (
    <Form
      schema={testSchema}
      validator={validator}
      widgets={widgets}
      templates={{ FieldTemplate: CustomFieldTemplate }}
    />
  );
}

export default Tester;

const testSchema = {
	title: "text_to_plate_mesh",
	description: "Convert the text to a plate mesh and upload the image as a triangular mesh to MIDAS CIVIL.",
	type: "object",
	properties: {
		"text": {
			"type": "string",
			"description": "The text to convert"
		},
	},
	required: ["text"]
} as any;