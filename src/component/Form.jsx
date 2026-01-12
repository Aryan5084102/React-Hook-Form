import { Button, FormControl, FormControlLabel, FormLabel, InputLabel, MenuItem, Radio, RadioGroup, Select, TextareaAutosize, TextField } from '@mui/material'
import React, { useState } from 'react'
import '../index.css'
import { useForm } from 'react-hook-form'

const Form = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const [jobRole, setJobRole] = useState()

    const handleChange = (e) => {
        setJobRole(e.target.value)
    }

    const textField = [
        {
            fields: "First Name",
            registerField: "firstName",
        },
        {
            fields: "Last Name",
            registerField: "lastName",
        },
        {
            fields: "Email",
            registerField: "email",
        },
        {
            fields: "Mobile Number",
            registerField: "mobileNumber",
        }]

    const onSubmit = (data) => {
        console.log(data)
    }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='name-row'>
                    {textField.map((field, index) =>
                        <TextField
                            id="outlined-basic"
                            style={{ width: '300px' }}
                            key={index}
                            label={field.fields}
                            ariant="outlined"
                            {...register(field.registerField, { required: true })}
                            />
                        // {errors.field.registerField && <span className='red'>This field is required</span>}
                    )}
                </div>
                <div className='name-row'>
                    <div style={{ marginTop: '20px' }} className='fieldBox'>
                        <FormControl>
                            <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                                {...register("gender", {required: true})}
                            >
                                <FormControlLabel value="female" control={<Radio />} label="Female" />
                                <FormControlLabel value="male" control={<Radio />} label="Male" />
                                <FormControlLabel value="other" control={<Radio />} label="Other" />
                            </RadioGroup>
                        </FormControl>
                        {errors.gender && <span className='red'>Gender is Required.</span>}
                    </div>
                    <div style={{ marginTop: '20px' }} className='fieldBox'>
                        <InputLabel id="demo-simple-select-helper-label">Job Role</InputLabel>
                        <Select
                            labelId="demo-simple-select-helper-label"
                            style={{ width: '300px' }}
                            id="demo-simple-select-helper"
                            value={jobRole}
                            label="Job Role"
                            onChange={handleChange}
                            {...register('jobRole', { required: 'true' })}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value="frontendDeveloper">Frontend Developer </MenuItem>
                            <MenuItem value="backendDeveloper">Backend Develoeper</MenuItem>
                            <MenuItem value="fullstackDeveloper">Fullstack Developer</MenuItem>
                        </Select>
                        {errors.jobRole && <span className='red'>Job Role is Required.</span>}
                    </div>
                </div>
                <div className='name-row'>
                    <div className='fieldBox'>
                        <TextareaAutosize
                            aria-label="minimum height"
                            minRows={5}
                            placeholder="Address"
                            style={{ width: 300, background: "white", marginTop: '20px' }}
                            {...register("textarea", { required: true })}
                        />
                        {errors.textarea && <span className='red'>Address is Required.</span>}
                    </div>
                </div>
                <div className='name-row'>
                    <input type="submit" style={{ marginTop: '20px', padding: '10px' }} />
                </div>
            </form>
        </div>
    )
}

export default Form