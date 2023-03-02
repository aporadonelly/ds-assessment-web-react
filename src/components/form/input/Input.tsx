import { ReactElement, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import { get } from "lodash";

type InputProps = TextFieldProps & {
  name: string;
};

function Input(props: InputProps): ReactElement {
  const { type, name, ...rest } = props;
  const { register, unregister, formState } = useFormContext();
  const error = get(formState.errors, name);

  useEffect(() => {
    return () => {
      unregister(name);
    };
  }, [unregister, name]);

  return (
    <TextField
      {...rest}
      {...register(name, { valueAsNumber: type === "number" })}
      inputProps={{
        "data-testid": name,
      }}
      type={type}
      name={name}
      error={Boolean(error)}
      helperText={error?.message as string}
    />
  );
}

export default Input;