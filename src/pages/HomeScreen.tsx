import React from "react";
import { TextField, Button, Box, Typography, Container } from "@mui/material";
import { useUser } from "../utils/UserContext";
import { useNavigate } from "react-router-dom";

const HomeScreen: React.FC = () => {
  const { login } = useUser();
  const navigate = useNavigate();

  const handleSubmit = (formData: any) => {
    login(formData);
    localStorage.setItem("user", JSON.stringify(formData));
    navigate("/second");
  };

  return (
    <Container maxWidth="sm">
      <UserForm onSubmit={handleSubmit} />
    </Container>
  );
};

interface UserFormProps {
  onSubmit: (formData: any) => void;
}

const UserForm: React.FC<UserFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = React.useState({
    name: "",
    phone: "",
    email: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mt: 4,
      }}
    >
      <Typography variant="h4" mb={3}>
        User Details
      </Typography>
      <TextField
        label="Name"
        name="name"
        type="text"
        value={formData.name}
        onChange={handleChange}
        margin="normal"
        variant="outlined"
        fullWidth
        required
      />
      <TextField
        label="Phone"
        name="phone"
        type="number"
        value={formData.phone}
        onChange={handleChange}
        margin="normal"
        variant="outlined"
        fullWidth
        required
      />
      <TextField
        label="Email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        margin="normal"
        variant="outlined"
        fullWidth
        required
      />
      <Box mt={3}>
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default HomeScreen;
