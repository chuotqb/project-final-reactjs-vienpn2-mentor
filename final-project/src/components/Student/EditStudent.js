import React, { useState, useContext, useEffect } from 'react';
import { GlobalContext } from '../../context/GlobalState';
import { Link, useNavigate, useParams } from "react-router-dom";
import {
    Form,
    FormGroup,
    Label,
    Input,
    Button
} from "reactstrap";

const EditStudent = (props) => {
    const { editUser, users } = useContext(GlobalContext);
    const [selectedUser, setSelectedUser] = useState({
        id: '',
        name: ''
    })
    const navigate = useNavigate();
    const { id } = useParams();
    const currentUserId = id;

    useEffect(() => {
        const userId = currentUserId;
        const selectedUser = users.find(user => user.id === userId);
        setSelectedUser(selectedUser);
    }, [currentUserId, users])

    const onChange = (e) => {
        setSelectedUser({ ...selectedUser, [e.target.name]: e.target.value })
    }

    const onSubmit = (e) => {
        e.preventDefault();
        editUser(selectedUser);
        navigate("/student/list")
    }

    return (
        <div>
            <h1 className="text-center">Trang Sửa Sinh Viên</h1>
            <Form onSubmit={onSubmit}>
                <FormGroup>
                    <Label>Name</Label>
                    <Input type="text" value={selectedUser.name} onChange={onChange} name="name" placeholder="Enter user" required></Input>
                </FormGroup>
                <Button type="submit">Edit Name</Button>
                <Link to="/" className="btn btn-danger mx-2">Cancel</Link>
            </Form>
        </div>
    )
}

export default EditStudent;