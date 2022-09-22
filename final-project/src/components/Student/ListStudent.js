import React, { useContext } from "react";
import { Link } from "react-router-dom";
import {
    ListGroup,
    Table,
    Button
} from "reactstrap";
import { GlobalContext } from '../../context/GlobalState';


const ListStudent = () => {
    const { users, removeUser } = useContext(GlobalContext);
    return (
        <ListGroup className="mt-4">
            {users.length > 0 ? (
                <>
                    <Table
                    >
                        <thead>
                            <tr>
                                <th>
                                    Name
                                </th>
                                <th>
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user.id}>
                                    <th scope="row">
                                        {user.name}
                                    </th>
                                    <td>
                                        <div>
                                            <Link color="warning" className="btn btn-warning mx-2" to={`/student/edit/${user.id}`}>Edit</Link>
                                            <Button onClick={() => removeUser(user.id)} color="danger">Delete</Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </>
            ) : (
                <h4 className="text-center">No Users</h4>
            )}
        </ListGroup>
    )
}

export default ListStudent;