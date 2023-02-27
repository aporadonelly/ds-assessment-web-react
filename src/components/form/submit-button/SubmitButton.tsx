import { ReactElement, PropsWithChildren } from "react";
import { UseFormReturn, SubmitHandler, FieldValues } from "react-hook-form";
import Button from "@mui/material/Button";

type SubmitButtonProps<TFieldValues extends FieldValues> = {
  onSubmit: SubmitHandler<TFieldValues>;
} & UseFormReturn<TFieldValues>;

function SubmitButton<TFieldValues extends FieldValues>(
  props: PropsWithChildren<SubmitButtonProps<TFieldValues>>
): ReactElement {
  const { children, onSubmit, ...formMethods } = props;
  const { formState, handleSubmit } = formMethods;
  const isButtonDisabled = !formState.isDirty || !formState.isValid;

  return (
    <Button
      variant="contained"
      disabled={isButtonDisabled}
      onClick={handleSubmit(onSubmit)}
    >
      {children}
    </Button>
  );
}

export default SubmitButton;