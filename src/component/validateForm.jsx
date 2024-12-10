export const validateForm = (name, value) => {
  let error = "";

  switch (name) {
    case "doctorName":
      error =
        value.length < 3
          ? "Doctor name must be at least 3 characters long"
          : "";
      break;
    case "doctorId":
      error = value ? "" : "Doctor ID is required";
      break;
    case "doctorType":
      error = value ? "" : "Please select a department";
      break;
    case "doctorLicense":
      error = value ? "" : "License number is required";
      break;
    case "profileImage":
    case "signImage":
      error = value ? "" : "Please upload an image";
      break;
    default:
      break;
  }

  return error;
};
