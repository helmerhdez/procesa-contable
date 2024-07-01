import { ClaritySuccessStandardSolid, MaterialSymbolsBrightnessAlertOutline } from "@/components/icons";
import { FormAlertType } from "@/types/auth/auth-types";

export const FormErrorAlert = ({ message }: FormAlertType) => {
  if (!message) return null;
  return (
    <div className={"py-3 rounded-md flex items-center gap-x-2 text-sm"}>
      <MaterialSymbolsBrightnessAlertOutline className="h-4 w-4 text-yellow-500" />
      <p>{message}</p>
    </div>
  );
};

export const FormSuccessAlert = ({ message }: FormAlertType) => {
  if (!message) return null;
  return (
    <div className={"py-3 rounded-md flex items-center gap-x-2 text-sm"}>
      <ClaritySuccessStandardSolid className="h-4 w-4 text-lime-500" />
      <p>{message}</p>
    </div>
  );
};
