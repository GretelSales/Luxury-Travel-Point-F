import { toast } from "react-toastify";
import { serviceInterestTexts } from "../i18n/serviceInterestTexts";

export const showServiceToast = (type, language = "es") => {
  const t = serviceInterestTexts[language] || serviceInterestTexts.es;

  if (type === "success") {
    toast.success(
      <>
        <strong>{t.successTitle}</strong>
        <div>{t.successBody}</div>
      </>,
    );
  }

  if (type === "error") {
    toast.error(
      <>
        <strong>{t.errorTitle}</strong>
        <div>{t.errorBody}</div>
      </>,
    );
  }
};
