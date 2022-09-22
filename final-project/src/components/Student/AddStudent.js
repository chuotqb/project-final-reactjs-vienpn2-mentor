import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { v4 as uuid } from 'uuid';

import {
    Form,
    FormGroup,
    Label,
    Input,
    Button
} from "reactstrap";

import { GlobalContext } from "../../context/GlobalState";

const AddStudent = () => {
    const [name, setName] = useState('');
    const { addUser } = useContext(GlobalContext);
    const navigate = useNavigate();

    const onSubmit = () => {
        const newUser = {
            id: uuid(),
            name
        }
        addUser(newUser);
        navigate('/student/list');
    }

    const onChange = (e) => {
        setName(e.target.value);
    }

    return (
        <>
            <h1 className="text-center">Trang Thêm Sinh Viên</h1>
            <Form onSubmit={onSubmit}>
                <FormGroup>
                    <Label>Name</Label>
                    <Input type="text" value={name} onChange={onChange} name="name" placeholder="Enter user" required></Input>
                </FormGroup>
                <Button type="submit">Add New</Button>
                <Link to="/" className="btn btn-danger mx-2">Cancel</Link>
            </Form>
        </>

    )
}

export default AddStudent;