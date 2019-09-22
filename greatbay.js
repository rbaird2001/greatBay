var mysql = require("mysql");
var inquirer = require("inquirer");
var dbConn = mysql.createConnection({
  host: "localhost", //Where your DB server is located localhost refers to your computer.

  port: 3306, // Your port; if not 3306. 3306 is the mysql default port for TCPIP.

  user: "root", // The name of the account used to communicate with mysql.

  // Your password
  password: "", //add your password
  database: "greatbay"
});
let itemID = 0
const chooseAction = inquirer //This is Where the majority of action takes place
  .prompt([
    {
      type: "rawlist",
      name: "action",
      message: "what do you want to do?",
      choices: [
        { name: "Post an Item", value: 1 },
        { name: "Bid on Item", value: 2 }
      ]
    }
  ])
  .then(function(resp) {
    console.log(resp);
    if (resp.action === 1) {
      inquirer
        .prompt([
          {
            type: "input",
            name: "detail",
            message: "Add a detailed description of your item: "
          },
          {
            type: "input",
            name: "title",
            message:
              "Enter a title for your item (This will be the headline the bidder reads): "
          },
          {
            type: "rawlist",
            name: "cat",
            choices: [
              { name: "Automobile", value: 1 },
              { name: "Computers", value: 2 },
              { name: "Consumer Electronics", value: 3 },
              { name: "Sporting Goods", value: 4 },
              { name: "AWOD", value: 5 },
              { name: "Backpage", value: 6 }
            ]
          }
        ])
        .then(function(resp) {
          console.log(resp);
          createItem(resp);
        });
    } else {
      inquirer
        .prompt([  //This selection is not being used at the moment it will be in the future
          {
            type: "rawlist",
            name: "cat",
            message: "Select a category",
            choices: [
              { name: "Automobile", value: 1 },
              { name: "Computers", value: 2 },
              { name: "Consumer Electronics", value: 3 },
              { name: "Sporting Goods", value: 4 },
              { name: "Collectibles", value: 5 },
              { name: "Misc", value: 6 }
            ]
          }
        ])
        .then(function(catChoice) {
            // getBidItems returns a promise and you can handle it in the .then of the prompt
          getBidItems(catChoice)
            .then(function(data) {
              //console.log("return data",data);
              inquirer.prompt([
                  {
                      name:"selectedItem",
                      type: "rawlist",
                      message: "current items to bid",
                      choices: data, //The results from getBidItems are populated here
                  }
              ])
                .then(function(resp){  //The selection above creates parameters for this query
                    //console.log(resp.selectedItem);
                    itemID = resp.selectedItem  //This variable is created at the top of the js script so it can be called at various points.
                    let qry = dbConn.query("SELECT detail,currBid FROM bidItems where id = ? ",itemID,function(err,dataset){
                        if(err){
                            console.log(err);
                            console.log(qry.sql);
                            dbConn.end()
                            return false
                        }
                        console.log(`Item description: ${dataset[0].detail}`); //show item detail to the user
                        console.log(`Current high bid: ${dataset[0].currBid}`);
                        inquirer.prompt([
                            {
                                message: "Enter your bid amount.",
                                type:"number",
                                name:"bid",
                            }
                        ])
                            .then(function(resp){
                                let qry=dbConn.query("UPDATE bidItems SET currBid = ? WHERE id = ?",[resp.bid,itemID],function(err){
                                    if(err){
                                        console.log(`Update Error: ${err}`);
                                        console.log(qry.sql);
                                        dbConn.end()
                                        return false
                                    }
                                    console.log("Bid accepted");
                                    dbConn.end();
                                    return true;
                                })
                            })
                    })
                })
            })
            .catch(function(err) {
              console.log(err);
              dbConn.end();
            });
        });
    }
  });

function createItem(bidItem) {
  console.log("Creating a new item...\n");
  var query = dbConn.query("INSERT INTO bidItems SET ?", bidItem, function(
    err,
    res
  ) {
    if (err) {
      console.log(err);
      console.log(query.sql);
      throw err;
    }
    console.log(res.affectedRows + " Items inserted!\n");
    dbConn.end();
  });
}

const getBidItems = function(itemCat) {
  return new Promise(function(resolve, reject) {
    let qry = dbConn.query("SELECT id as value,title as name,detail as message FROM bidItems", function(
      err,
      dataset
    ) {
      if (err) {
        // Resolve or reject not both
        reject(err);
        //resolve(null);
      } else {
        // console.log(resp);
        // reject(null);
        datasetString = JSON.stringify(dataset);
        datasetJson = JSON.parse(datasetString);
        resolve(datasetJson);
      }
    });
  });
};


