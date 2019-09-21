var mysql = require("mysql");
var inquirer = require('inquirer');
var dbConn = mysql.createConnection({
    host: "localhost", //Where your DB server is located localhost refers to your computer.

    port: 3306,  // Your port; if not 3306. 3306 is the mysql default port for TCPIP. 


    user: "root", // The name of the account used to communicate with mysql. 

    // Your password
    password: "KrazyGlu3",  //add your password
    database: "greatbay"
});
const chooseAction = inquirer.prompt([
    {
        type: 'rawlist',
        name: 'action',
        message: "what do you want to do?",
        choices: [
            {name: 'Post an Item',value:1},
            {name: "Bid on Item",value: 2}
        ]
    }
])
    .then(function (resp) {
        console.log(resp);
        if (resp.action === 1) {
            inquirer.prompt([
                {
                    type: "input",
                    name: "detail",
                    message: "Add a detailed description of your item: "

                },
                {
                    type: "input",
                    name: "title",
                    message: "Enter a title for your item (This will be the headline the bidder reads): "
                },
                {
                    type: "rawlist",
                    name: "cat",
                    choices:[
                        {name:"Automobile",value:1},
                        {name:"Computers",value:2},
                        {name:"Consumer Electronics",value:3},
                        {name:"Sporting Goods",value:4},
                        {name:"AWOD",value:5},
                        {name:"Backpage",value:6}
                    ]
                }
            ])
                .then(function (resp2) {
                    console.log(resp2)
                    createItem(resp2)
                })
        }
    })

function createItem(bidItem) {
    console.log("Creating a new item...\n");
    var query = dbConn.query(
        "INSERT INTO bidItems SET ?", bidItem,
            function (err, res) {
                if (err) {
                    console.log(err);
                    console.log(query.sql);
                    throw err;
                }
                console.log(res.affectedRows + " Items inserted!\n");
                dbConn.end();
        }
    );
}

function updateProduct() {
    console.log("Updating bids ...\n");
    var query = connection.query(
        "UPDATE cars SET ? WHERE ?",
        [{
            bid: 5
        },
        {
            model: 'Chevy'
        }
        ],
        function (err, res) {
            if (err) throw err;
            console.log(res.affectedRows + " cars updated!\n");
            //Call deleteProduct AFTER the UPDATE completes
            //deleteProduct();
            readProducts();
        }
    )
};

function readProducts() {
    console.log("Selecting all products...\n");
    connection.query("SELECT * FROM cars", function (err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        console.log(res);
        connection.end();
    });
}
//createProduct();