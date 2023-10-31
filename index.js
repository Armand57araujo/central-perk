// RIP Matthew Perry - Thank you for Chandler the Chan Chan Man

const inquirer = require('inquirer');
const mysql = require('mysql2');
// add require fs
// const fs = require('fs'); <--- do I need this?
// check later
// require ('console.table') <--- use this one
// const cTable = require('console.table');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Mellokitty2',
  database: 'employee_db' 
});

function startApp() {
  inquirer
    .prompt([
      {
        type: 'list',

        name: 'action',

        message: 'How would you like to proceed?',



        choices: [

          'View all departments',

          'View all roles',

          'View all employees',

          'Add a department',

          'Add a role',

          'Add an employee',

          'Update an employee role',

          'Exit'

        ]
      }
    ])
    .then(answer => {
      switch (answer.action) {



        case 'View all departments':
          viewDepartments();
          break;


        case 'View all roles':
          viewRoles(); break;

        case 'View all employees':
          viewEmployees(); break;



        case 'Add a department': addDepartment();
          break;

        case 'Add a role':

          addRole();

          break;



        case 'Add an employee':
          addEmployee();
          break;

        case 'Update an employee role':
          updateEmployeeRole();
          break;

        case 'Exit':
          connection.end();
          break;

      }

    });

}

// Function to view all departments
function viewDepartments() {

  connection.query('SELECT * FROM department', (err, res) => {
    if (err) throw err;
    console.table(res);
    startApp();
  });
}

// Function to view all roles
function viewRoles() {
  connection.query('SELECT role.id, role.title, role.salary, department.name AS department FROM role INNER JOIN department ON role.department_id = department.id',
    (err, res) => {
      if (err) throw err;
      console.table(res);
      startApp();
    }
  );
}

// Function to view all employees
function viewEmployees() {
  connection.query(`SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, " ", manager.last_name) AS manager FROM employee INNER JOIN role ON employee.role_id = role.id INNER JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON employee.manager_id = manager.id`,
    (err, res) => {
      if (err) throw err;
      console.table(res);
      startApp();
    }
  );
}





// Function to add a department


function updateEmployeeRole() {
   connection.query('select id as value, concat(first_name, " ", last_name) as name from employee', (err, res) => {
    const employees = res
    connection.query('select id as value, title as name from role', (err, res) => {
const roles = res

      inquirer
        .prompt([
         {
            type: 'list',
            name: 'name',
            message: 'Choose an employee to update:',
            choices: employees
          },
          {
            type: 'list',
            name: 'role',
            message: 'Choose a new employee role:',
            choices: roles
          }, 
        ])

        .then(answer => {
          connection.query('update employee set role_id = ? where id = ?', [answer.role, answer.name], (err, res) => {
            if (err) throw err;
            console.log('Employee role update successfully!');
            startApp();
          });
        });

    })
  })
}

// UPDATE TERMS UN PLURALIZE - done
// add list of new departments 
// syntax is ID AS VALUE, NAME AS NAME, 

function addDepartment() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Enter the name of the department:'
      }
    ])
    .then(answer => {
      connection.query('INSERT INTO department (name) VALUES (?)', answer.name, (err, res) => {
        if (err) throw err;
        console.log('Department added successfully!');
        // console.table(res);
        startApp();
      });
    });
}








function addEmployee() {
  connection.query('select id, title from role', (err, res) => {
    if (err) throw err;

    const roleChoices = res.map(role => role.title);
    
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'first_name',
          message: 'Enter the first name of the employee:'
        },
        {
          type: 'input',
          name: 'last_name',
          message: 'Enter the last name of the employee:'
        },
        {
          type: "list",
          name: "roleTitle", 
          message: "What is the employee's role?",
          choices: roleChoices
        },
      ])
      .then(answer => {
        const selectedRole = res.find(role => role.title === answer.roleTitle);
        
        connection.query(
          'INSERT INTO employee (first_name, last_name, role_id) VALUES (?, ?, ?)',
          [answer.first_name, answer.last_name, selectedRole.id],
          (err, res) => {
            if (err) throw err;
            console.log('Employee added successfully!');
            startApp();
          }
        );
      });
  });
}


// function addEmployee() {
//   connection.query('select id, title from role', (err, res) => {


//     const roleChoices = role.map(role => role.choices);
//     const selectedRole = roles.find(role => role.title === roleAnswer.role);
//     // const roleChoices = res
//   inquirer
//     .prompt([
//       {
//         type: 'input',
//         name: 'first_name',
//         message: 'Enter the first name of the employee:'
//       },
//       {
//         type: 'input',
//         name: 'last_name',
//         message: 'Enter the last name of the employee:'
//       },
//       {
//         type: "list",
//         name: "roleId",
//         message: "What is the employee's role?",
//         choices: roleChoices
//       },
//     ])
//     .then(answer => {
//       connection.query('INSERT INTO employee (first_name, last_name) VALUES (?, ?)', [answer.first_name, answer.last_name, selectedRole.id], (err, res) => {
//         if (err) throw err;
//         console.log('Employee added successfully!');
//         // console.table(res);
//         startApp();
//       });
//     });
// })}

// connection.query('select id as value, title as name from role', (err, res) => {
//   const roles = res



function addRole() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Enter the name of the Role:'
      },
      {
        type: 'number',
        name: 'salary',
        message: 'Select a salary'
      },
      {
        name: 'department_id',
        message: 'Enter the name of the Department'
      }
    ])
    .then(answer => {
      connection.query('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)', [answer.name, answer.salary, answer.department_id], (err, res) => {
        if (err) throw err;
        console.log('Role added successfully!');
        // console.table(res);

        startApp();
      });
    });
}



startApp();