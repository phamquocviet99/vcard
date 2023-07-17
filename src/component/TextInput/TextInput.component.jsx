import { TextField } from "@mui/material";

export const TextInput = ({ label, value, onChange, className, require }) => {
  return (
    <TextField
      id="outlined-basic"
      label={label}
      value={value}
      onChange={(e) => onChange(e?.target?.value)}
      className={"my-2 w-full " + className}
      variant="outlined"
      required={require}
    />
  );
};
