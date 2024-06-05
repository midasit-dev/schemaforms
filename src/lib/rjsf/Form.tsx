import React from 'react';
import { default as RjsfForm } from '@rjsf/mui';
import { RJSFSchema } from "@rjsf/utils";
import validator_ajv8 from "@rjsf/validator-ajv8";
import { FormProps as RjsfFormProp } from '@rjsf/core';

type FormProps = Omit<RjsfFormProp<any, RJSFSchema, any>, 'validator'>;

function transformFormProps(props: FormProps): FormProps {
	return {
		...props,
		uiSchema: {
			...props.uiSchema,
			'ui:submitButtonOptions': {
				submitText: '실행하기',
			}
		}
	};
}

const Form = (props: FormProps) => {
  return (
    <RjsfForm
      {...transformFormProps(props)}
			validator={validator_ajv8}
    />
  );
}

export default Form;