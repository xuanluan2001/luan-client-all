import { FormikHelpers } from "formik";
import { WrapperResponse } from "service-sdk/lib/types/BaseType";

interface Values {
  description?: string;
  orgId: string;
  createdBy?: string;
}

class ClientAddOrgFormik {
  initValue: Values = {
    description: "",
    createdBy: "",
    orgId: "",
  };

  handleSubmit = (
    actions: FormikHelpers<Values>,
    errors: WrapperResponse | undefined
  ) => {
    actions.setSubmitting(false);

    if (errors && typeof errors.data !== "string") {
      actions.setFieldError("orgId", errors.data?.orgId);
    }
    setTimeout(() => {
      actions.setErrors({});
    }, 5000);
  };
}

export default new ClientAddOrgFormik();
