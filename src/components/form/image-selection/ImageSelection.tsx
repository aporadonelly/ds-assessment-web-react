import { MouseEvent, useState, useCallback } from "react";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import { useController } from "react-hook-form";
import { useUpdateEffect } from "react-use";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";
import { get, xor } from "lodash";

import { getOption } from "../utils";

type ImageButtonProps = {
  error?: boolean;
  selected: boolean;
};

type ImageProps = {
  src: string;
};

type ImageSelectionProps<TOption extends object, TValue = unknown> = {
  name: string;
  defaultValue?: TValue[];
  options?: TOption[];
  optionValueKey: keyof TOption;
  optionImgSrcKey: keyof TOption;
};

const ImageButton = styled(ButtonBase, {
  shouldForwardProp: (prop) => prop !== "error" && prop !== "selected",
})<ImageButtonProps>(({ theme, error, selected }) => ({
  position: "relative",
  border: "3px solid",
  borderColor: theme.palette.divider,
  ...(error && {
    border: "3px solid",
    borderColor: theme.palette.error.main,
  }),
  ...(selected && {
    border: "3px solid",
    borderColor: theme.palette.primary.dark,
  }),
}));

const Image = styled("span", {
  shouldForwardProp: (prop) => prop !== "src",
})<ImageProps>(({ src }) => ({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: "cover",
  backgroundPosition: "center center",
  backgroundImage: `url(${src})`,
}));

function ImageSelection<TOption extends object, TValue = unknown>(
  props: ImageSelectionProps<TOption, TValue>
) {
  const {
    name,
    defaultValue = [],
    options,
    optionValueKey,
    optionImgSrcKey,
  } = props;

  const [selectedImages, setSelectedImages] = useState<TValue[]>([]);
  const { field, formState } = useController({ name, defaultValue });
  const error = get(formState.errors, name);

  const createClickHandler = useCallback(
    (newValue: TValue) => (_event: MouseEvent<HTMLButtonElement>) => {
      setSelectedImages((prevState) => xor(prevState, [newValue]));
    },
    []
  );

  const getOptionValue = getOption<TOption>(optionValueKey);
  const getOptionImgSrc = getOption<TOption>(optionImgSrcKey);

  useUpdateEffect(() => {
    field.onChange(selectedImages);
  }, [selectedImages]);

  return (
    <FormControl error={Boolean(error)}>
      <Box
        ref={field.ref}
        display="grid"
        gridAutoRows="100px"
        gridTemplateColumns="100px 100px 100px"
        gap={0.5}
      >
        {options?.map((option) => (
          <ImageButton
            key={getOptionValue(option)}
            error={Boolean(error)}
            selected={field.value.includes(getOptionValue(option))}
            onClick={createClickHandler(getOptionValue(option))}
          >
            <Image src={`http://localhost:3000/${getOptionImgSrc(option)}`} />
          </ImageButton>
        ))}
      </Box>
      {typeof error?.message === "string" && (
        <FormHelperText>{error.message}</FormHelperText>
      )}
    </FormControl>
  );
}

export default ImageSelection;