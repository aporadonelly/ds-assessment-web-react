import { ReactElement, PropsWithChildren } from "react";
import {
  UseFormReturn,
  SubmitHandler,
  FieldValues,
  FormProvider,
} from "react-hook-form";

import Input from "./input";
import ImageSelection from "./image-selection";
import SubmitButton from "./submit-button";

type FormProps<TFieldValues extends FieldValues> = {
  onSubmit: SubmitHandler<TFieldValues>;
} & UseFormReturn<TFieldValues>;

function Form<TFieldValues extends FieldValues>(
  props: PropsWithChildren<FormProps<TFieldValues>>
): ReactElement {
  const { children, onSubmit, ...formMethods } = props;

  return (
    <FormProvider {...formMethods}>
      <form autoComplete="off" onSubmit={formMethods.handleSubmit(onSubmit)}>
        {children}
      </form>
    </FormProvider>
  );
}

Form.Input = Input;
Form.ImageSelection = ImageSelection;
Form.SubmitButton = SubmitButton;

export default Form;