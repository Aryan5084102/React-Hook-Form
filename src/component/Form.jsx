import React, { useState } from 'react';
import {
    Button, FormControl, FormControlLabel, FormLabel, InputLabel,
    MenuItem, Radio, RadioGroup, Select, TextField, Container,
    Paper, Typography, Box, Grid
} from '@mui/material';
import { useForm } from 'react-hook-form';
import textFieldData from '../data/textFieldData'

const Form = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [jobRole, setJobRole] = useState("");
    const [select, setSelect] = useState('')

    const handleChange = (e) => {
        setJobRole(e.target.value);
    };

    const onSelect = (e) =>{
        setSelect(e.target.value)
    }

    const onSubmit = async (data) => {
        let response = fetch("http://localhost:3000/", {method: "POST", headers: {"Content-Type" : "application/json"}, body: JSON.stringify(data) })
        let result = response.text()
        console.log(result,data);
    };

    return (
        <Box sx={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundImage: 'url("https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2070")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            py: 4
        }}>
            <Container maxWidth="sm">
                <Paper elevation={10} sx={{
                    p: 4,
                    borderRadius: 4,
                    backgroundColor: 'rgba(255, 255, 255, 0.92)',
                    backdropFilter: 'blur(10px)',
                    boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)'
                }}>
                    <Typography variant="h4" align="center" gutterBottom sx={{ mb: 3, fontWeight: 700, color: '#1a237e' }}>
                        Join Our Team
                    </Typography>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Grid container spacing={2}>
                            {textFieldData.map((field, index) => (
                                <Grid item xs={12} key={index}>
                                    <TextField
                                        fullWidth
                                        label={field.label}
                                        variant="filled"
                                        {...register(field.registerField, { required: `${field.label} is required` })}
                                        error={!!errors[field.registerField]}
                                        helperText={errors[field.registerField]?.message }
                                        sx={{ backgroundColor: 'white', borderRadius: 1 }}
                                    />
                                </Grid>
                            ))}

                            <Grid item xs={12}>
                                <FormControl error={!!errors.gender} component="fieldset" sx={{ mt: 1, width: 230 }}>
                                    <FormLabel component="legend" >Gender</FormLabel>
                                    <RadioGroup row {...register('gender', {required: "Please select your gender"})} onChange={(e) =>{
                                        onSelect(e);
                                        register("gender").onChange(e)
                                    }} >
                                        <FormControlLabel value="female" control={<Radio />} label="Female" />
                                        <FormControlLabel value="male" control={<Radio />} label="Male" />
                                        <FormControlLabel value="other" control={<Radio />} label="Other" />
                                    </RadioGroup>
                                </FormControl>
                                    {errors.gender && <Typography color="error" variant="caption">Please select your Gender</Typography>}
                            </Grid>

                            <Grid item xs={12}>
                                <FormControl fullWidth error={!!errors.jobRole} variant="filled" sx={{ width: 233 }}>
                                    <InputLabel id="job-role-label">Job Role</InputLabel>
                                    <Select
                                        labelId="job-role-label"
                                        value={jobRole}
                                        label="Job Role"
                                        {...register('jobRole', { required: "Please select a job Role" })}
                                        onChange={handleChange}
                                        sx={{ backgroundColor: '#F4F4F4' }}
                                    >
                                        <MenuItem value=""><em>None</em></MenuItem>
                                        <MenuItem value="frontendDeveloper">Frontend Developer</MenuItem>
                                        <MenuItem value="backendDeveloper">Backend Developer</MenuItem>
                                        <MenuItem value="fullstackDeveloper">Fullstack Developer</MenuItem>
                                    </Select>
                                    {errors.jobRole && <Typography color="error" variant="caption">Please select a job Role</Typography>}
                                </FormControl>
                            </Grid>

                            <TextField
                                fullWidth
                                multiline
                                rows={2}
                                label="Address"
                                variant="filled"
                                {...register("textarea",{
                                    required: "Address is required",
                                    minLength: {value: 10, message: "Minimum 10 characters required"},
                                    maxLength: {value: 100, message: "Maximum 100 characters required"},
                                })}
                                error={!!errors.textarea}
                                helperText={errors.textarea?.message}
                                sx={{ backgroundColor: 'white', borderRadius: 1 }}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                size="large"
                                sx={{
                                    mt: 2,
                                    py: 1.5,
                                    fontWeight: 'bold',
                                    fontSize: '1.1rem',
                                    textTransform: 'none',
                                    borderRadius: 2,
                                    boxShadow: '0 4px 14px 0 rgba(0,118,255,0.39)'
                                }}
                            >
                                Submit Registration
                            </Button>
                        </Grid>
                    </form>
                </Paper>
            </Container>
        </Box>
    );
};

export default Form;