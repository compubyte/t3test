import { CustomToasterError, CustomToasterValidation } from "./CustomToaster";

export const MutationError = (error: any) => {
  if (error?.code === "CONFLICT") {
    CustomToasterValidation(error.message);
  } else if (error?.code === "VALIDATION_ERROR") {
    CustomToasterValidation(error.message);
  } else if (error?.code === "INTERNAL_SERVER_ERROR") {
    CustomToasterError(error.message);
  } else {
    CustomToasterError("Ocurrió un error inesperado");
  }
};
