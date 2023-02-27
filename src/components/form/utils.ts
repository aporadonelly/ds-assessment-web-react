import { get } from "lodash";

export function getOption<Type extends object>(
  path: keyof Type
): (option: Type) => any {
  return (option: Type): any => get(option, path);
}