const requestUrlPrefix = 'http://localhost:8080/api';

if (!document.querySelector('.messages')) {
    const container = document.createElement('div');
    container.classList.add('messages');
    container.style.cssText = 'position: fixed; top: 50%; left: 0; right: 0; max-width: 240px; margin: 0 auto;';
    document.body.appendChild(container);
}
const messages = document.querySelector('.messages');

const renderUserInfoTableRowContent = (user) => {
    let content = `
        <td>${user.id}</td>
        <td>${user.lastName}</td>
        <td>${user.age == null ? '' : user.age}</td>
        <td>${user.username}</td>
        <td>
    `;
    user.roles.forEach(role => {
        const authority = role.authority;
        content += `
            <span>${authority.substring(authority.lastIndexOf('_') + 1)}</span>
        `;
    });
    content += '</td>';
    document.getElementById('userInfoTableRow').innerHTML = content;
}

sendRequest('GET', '/user').then(user => renderUserInfoTableRowContent(user))

if (document.getElementById('v-pills-admin')) {
    const renderAllUsersTableContent = (users) => {
        users.forEach(user => tableAddRowContent(user))
    };

    const tableAddRowContent = (user) => {
        let rowContent = `
            <tr id="allUsersTableRow${user.id}">
                <td>${user.id}</td>
                <td>${user.lastName}</td>
                <td>${user.age == null ? '' : user.age}</td>
                <td>${user.username}</td>
                <td>
        `;
        user.roles.forEach(role => {
            const authority = role.authority;
            rowContent += `
                <span>${authority.substring(authority.lastIndexOf('_') + 1)}</span>
            `;
        });
        rowContent += `
                </td>
                <td>
                    <button type="button" class="btn btn-info text-white" data-bs-toggle="modal" data-bs-target="#editModal" data-bs-userId="${user.id}">
                        Edit
                    </button>
                </td>
                <td>
                    <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#deleteModal" data-bs-userId="${user.id}">
                        Delete
                    </button>
                </td>
            </tr>
        `;
        document.getElementById('usersListTableBody').innerHTML += rowContent;
    }

    const allUsersTableRowUpdate = (user) => {
        let allUsersTableRowContent = `
            <td>${user.id}</td>
            <td>${user.lastName}</td>
            <td>${user.age == null ? '' : user.age}</td>
            <td>${user.username}</td>
            <td>
    `;
        user.roles.forEach(role => {
            const authority = role.authority;
            allUsersTableRowContent += `
            <span>${authority.substring(authority.lastIndexOf('_') + 1)}</span>
        `;
        });
        allUsersTableRowContent += `
            </td>
            <td>
                <button type="button" class="btn btn-info text-white" data-bs-toggle="modal" data-bs-target="#editModal" data-bs-userId="${user.id}">
                    Edit
                </button>
            </td>
            <td>
                <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#deleteModal" data-bs-userId="${user.id}">
                    Delete
                </button>
            </td>
    `;
        document.getElementById('allUsersTableRow' + user.id).innerHTML = allUsersTableRowContent;
    };

    const allUsersTableRowDelete = (id) => {
        document.getElementById('allUsersTableRow' + id).remove();
    }

    const renderEditModalFormContent = (user) => {
        document.getElementById('editForm').innerHTML = `
        <label class="d-block mx-auto pt-1 mt-2 mb-0 text-center fs-5 fw-bold">ID
            <input id="idEdit" value="${user.id}" type="text" disabled class="form-control mx-auto" style="width: 250px;"></label>
        <label class="form-label d-block mx-auto pt-1 mt-3 mb-0 text-center fs-5 fw-bold">Username
            <input id="lastNameEdit" value="${user.lastName}" type="text" class="form-control mx-auto" style="width: 250px;"></label>
        <label class="form-label d-block mx-auto pt-1 mt-3 mb-0 text-center fs-5 fw-bold">Age
            <input id="ageEdit" min="0" max="200" value="${user.age}" type="number" class="form-control mx-auto" style="width: 250px;"></label>
        <label class="form-label d-block mx-auto pt-1 mt-3 mb-0 text-center fs-5 fw-bold">Email
            <input id="usernameEdit" value="${user.username}" required type="email" class="form-control mx-auto" style="width: 250px;"></label>
        <label class="form-label d-block mx-auto pt-1 mt-3 mb-0 text-center fs-5 fw-bold">Password
            <input id="passwordEdit" value="" type="text" class="form-control mx-auto" style="width: 250px;" placeholder="Type new password"></label>
        <label class="form-label d-block mx-auto pt-1 mt-3 mb-0 text-center fs-5 fw-bold">Role
            <select size="2" multiple required class="form-select mx-auto" style="width: 250px;">
                <option id="optionAdmin">ADMIN</option>
                <option id="optionUser">USER</option>
            </select></label>
    `;
        user.roles.forEach(role => {
            if (role.id === 1) document.getElementById('optionUser').selected = true;
            if (role.id === 2) document.getElementById('optionAdmin').selected = true;
        });
    };

    const renderDeleteModalContent = (user) => {
        let content = `
        <label class="d-block mx-auto pt-1 mt-2 mb-0 text-center fs-5 fw-bold">ID</label>
        <input id="deleteUserId" value="${user.id}" disabled type="text" class="form-control mx-auto" style="width: 250px;">
        <label class="form-label d-block mx-auto pt-1 mt-3 mb-0 text-center fs-5 fw-bold">Username</label>
        <input value="${user.lastName}" disabled type="text" class="form-control mx-auto" style="width: 250px;">
        <label class="form-label d-block mx-auto pt-1 mt-3 mb-0 text-center fs-5 fw-bold">Age</label>
        <input value="${user.age}" disabled type="number" class="form-control mx-auto" style="width: 250px;">
        <label class="form-label d-block mx-auto pt-1 mt-3 mb-0 text-center fs-5 fw-bold">Email</label>
        <input value="${user.username}" disabled type="text" class="form-control mx-auto" style="width: 250px;">
        <label class="form-label d-block mx-auto pt-1 mt-3 mb-0 text-center fs-5 fw-bold">Role</label>
        <select size="2" disabled class="form-select mx-auto" style="width: 250px;">
    `;
        user.roles.forEach(role => {
            const authority = role.authority;
            content += `
            <option label="${authority.substring(authority.lastIndexOf('_') + 1)}"></option>
        `;
        });
        content += `
        </select>
    `;
        document.getElementById('deleteModalContent').innerHTML = content;
    };

//Fill the "All users" table of admin tab
    sendRequest('GET', '/admin').then(users => renderAllUsersTableContent(users));

//Create new user, save it in DB and add the row in the "All Users" table after button "Add new user" pressed in "New user" tab
    document.getElementById('createUserForm').addEventListener('submit', (event) => {
        event.preventDefault();
        //Gather new user info into object
        const newUserRoles = [];
        if (document.getElementById('newRoleUser').selected) newUserRoles.push({id: 1, authority: 'ROLE_USER'});
        if (document.getElementById('newRoleAdmin').selected) newUserRoles.push({id: 2, authority: 'ROLE_ADMIN'});
        const newUser = {
            lastName: document.getElementById('newUserLastName').value,
            age: document.getElementById('newUserAge').value,
            username: document.getElementById('newUserEmail').value,
            password: document.getElementById('newUserPassword').value,
            roles: newUserRoles
        };
        //Clear form values
        document.getElementById('newUserLastName').value = '';
        document.getElementById('newUserAge').value = '';
        document.getElementById('newUserEmail').value = '';
        document.getElementById('newUserPassword').value = '';
        document.getElementById('newRoleUser').selected = true;
        document.getElementById('newRoleAdmin').selected = false;
        sendRequest('POST', '/admin', newUser).then(user => {
            if (user.id) tableAddRowContent(user)
        });
        //Switch to All users tab
        bootstrap.Tab.getInstance(document.querySelector('#nav-tab a[href="#nav-usersTable"]')).show();
    });

//Show the Edit modal window
    document.getElementById('editModal').addEventListener('show.bs.modal', (event) => {
        const userId = event.relatedTarget.getAttribute('data-bs-userId');
        // Fill the form of Edit modal with user data
        sendRequest('GET', '/admin/' + userId).then(user => renderEditModalFormContent(user));
    });

//Update the user in the DB and update the corresponding row of the "All Users" table after button EDIT pressed in Edit modal
    document.getElementById('editForm').addEventListener('submit', (event) => {
        event.preventDefault();
        const userRolesEdited = [];
        if (document.getElementById('optionUser').selected) userRolesEdited.push({id: 1, authority: 'ROLE_USER'});
        if (document.getElementById('optionAdmin').selected) userRolesEdited.push({id: 2, authority: 'ROLE_ADMIN'});
        const userEdited = {
            id: document.getElementById('idEdit').value,
            lastName: document.getElementById('lastNameEdit').value,
            age: document.getElementById('ageEdit').value,
            username: document.getElementById('usernameEdit').value,
            password: document.getElementById('passwordEdit').value,
            roles: userRolesEdited
        };
        sendRequest('PUT', '/admin', userEdited).then(user => {
            if (user) allUsersTableRowUpdate(user)
        });
        document.getElementById('buttonCloseModal').click();
    });

//Show the Delete modal window
    document.getElementById('deleteModal').addEventListener('show.bs.modal', (event) => {
        const userId = event.relatedTarget.getAttribute('data-bs-userId');
        // Fill the content of Delete modal with user data
        sendRequest('GET', '/admin/' + userId).then(user => renderDeleteModalContent(user));
    });

//Delete the user from the DB and delete the corresponding row of the "All Users" table after button DELETE pressed in Delete modal
    document.getElementById('deleteForm').addEventListener('submit', (event) => {
        event.preventDefault();
        sendRequest('DELETE', '/admin/' + document.getElementById('deleteUserId').value).then(id => allUsersTableRowDelete(id));
    });
}

function sendRequest(method, url, body = null) {
    const options = {
        method: method,
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json'
        }
    };

    return fetch(requestUrlPrefix + url, method === 'GET' ? null : options).then(response => {
        if (!response.ok) {
            response.status === 409 ? showAlert('Data not saved!\nUser with this email already exists in the database!') :
                                    showAlert('Something went wrong')
            throw new Error('Server response: ' + response.status);
        }
        return response.json();
    });
}

function showAlert(message) {
    const alert = document.createElement('div');
    alert.className = 'alert alert-danger alert-dismissible role="alert" fade show';
    alert.innerHTML = `<div class="fs-5">${message}</div><button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>`;
    messages.appendChild(alert);
}