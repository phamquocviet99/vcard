import { TextField } from "@mui/material";

export const TextInput = ({ label, value, onChange, className, require }) => {
  return (
    <div className="my-3">
      <TextField
        id="outlined-basic"
        label={label}
        value={value}
        onChange={(e) => onChange(e?.target?.value)}
        className={" w-full " + className}
        variant="outlined"
        required={require}
      />
    </div>
  );
};
