const Pool = require('pg').Pool
let validator = require('email-validator')
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
})



function validateNumber(number) {
    let regex = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
    return regex.test(number)
}

// GET request - SQL will touch the api database inside pool.query()
// select all users and order by id


const getUsers = (request, response) => {
    pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows);
    })
}

// get a single user by id - use WHERE clause to display the result


const getUserById = (request, response) => {
    const id = parseInt(request.params.id);

    pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows);
    })
}


// POST a new user - extracting the properties and inserting the values with INSERT


const createUser = (request, response) => {
    const { name, phone, email } = request.body;
    if (!validator.validate(email)) {
        return response.status(400).send('invalid email')
    };

    if (!validateNumber(phone)) {
        return response.status(400).send('invalid phone number')
    }

    pool.query('INSERT INTO users (name, phone, email) VALUES ($1, $2, $3) RETURNING *', [name, phone, email], (error, results) => {
        if (error) {
            throw error;
        }
        response.status(201).send(`User added with ID: ${results.rows[0].id}`)
    })
}

// PUT updated data in an existing user


const updateUser = (request, response) => {
    const id = parseInt(request.params.id)
    const { name, phone, email } = request.body
    if (!validator.validate(email)) {
        return response.status(400).send('invalid email')
    };

    if (!validateNumber(phone)) {
        return response.status(400).send('invalid phone number')
    }
    pool.query(
        'UPDATE users SET name = $1, phone = $2, email = $3 WHERE id = $4',
        [name, phone, email, id],
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(202).send(`User modified with ID: ${id}`)
        }
    )
}

// DELETE a user

const deleteUser = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(`User deleted with ID: ${id}`)
    })
}

// to access these function from index.js they need to be exported

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
}
