# central-perk
## Technology Used 

| Technology Used | Resource URL | 
| ------------- |:-------------:| 
| Git | [https://git-scm.com/](https://git-scm.com/) | 
| Node | [https://developer.mozilla.org/en-US/docs/Glossary/Node.js](https://developer.mozilla.org/en-US/docs/Glossary/Node.js) | 
| SQL | [https://developer.mozilla.org/en-US/docs/Glossary/SQL](https://developer.mozilla.org/en-US/docs/Glossary/SQL) |

## Description 
In this project I created a command line application using node.js, and SQL, that allows users to input employee, department, role and salaray information for their company.  

[Walkthrough Video](https://watch.screencastify.com/v/dBfQ9cFhkzumlUv4SjJU)


## Code Example 


 
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



This homework was challenging, but manageable. Given what I had already learned when working on the README.md generator challenege, in combination with what I've had to learn as far as SQL was concerned, I was able to grasp the requirements necessary to get started, and build gradually from there. I had some difficulty when it came to assigning employees managers. but eventually, and with the help of my tutor I was able to navigate through..

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
  connection.query('select id as value, title as name from role', (err, res) => {

    if (err) throw err;
   const roleChoices = res;
    // const roleChoices = res.map(role => role.title);
    connection.query('select id as value, concat(first_name, " ", last_name) as name from employee', (err, res) => {
      let employees = res
      employees = [{ value: null, name: 'no manager' }, ...employees]
      


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
          {
            type: 'list',
            name: 'employee_id',
            message: 'Select employee manager',
            choices: employees
          }
        ])
        .then(answer => {
          // const selectedRole = res.find(role => role.title === answer.roleTitle);

          connection.query(
            'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)',
            [answer.first_name, answer.last_name, answer.roleTitle, answer.employee_id],
            (err, res) => {
              if (err) throw err;
              console.log('Employee added successfully!');
              startApp();
            }
          );
        });
    });
  })
}



## Learning Points 


This project deepened my growing comfort when it comes to navigating node.js as well as command-line verbage and syntax needed to facilitate the functionality of this app. Understanding SQL and it's unique conventions was new and different, but not overly difficult or complex relatively speaking. I'm growing more and more interested in this particular module of the class.


## Author Info
Armand Araujo
Age: 28
Location: Santa Barbara, CA

 
* [LinkedIn](https://www.linkedin.com/in/armand-araujo-a82ba2291/) 
* [Github](https://github.com/Armand57araujo) 


## Credits 