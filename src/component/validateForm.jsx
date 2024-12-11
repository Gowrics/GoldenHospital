export const validateForm = (fieldName, value) => {
  let error = "";

  switch (fieldName) {
    case "docterName":
      if (!value) {
        error = "Doctor Name is required";
      }
      break;
    case "docterId":
      if (!value) {
        error = "Doctor ID is required";
      }
      break;
    case "departmentType":
      if (!value) {
        error = "Department Type is required";
      }
      break;
    case "licenseNum":
      if (!value) {
        error = "License Number is required";
      }
      break;
    case "profileImg":
      if (!value) {
        error = "Profile Image is required";
      }
      break;
    case "signImg":
      if (!value) {
        error = "Sign Image is required";
      }
      break;
    default:
      break;
  }

  return error;
};
