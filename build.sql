CREATE DATABASE IF NOT EXISTS greatBay;

USE greatbay;

-- Drop table bidItems;

CREATE TABLE IF NOT EXISTS bidItems (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(256) NOT NULL,
    detail VARCHAR(4096) NULL,
    cat INT NULL DEFAULT 0,
    strtBid DEC NULL DEFAULT 0,
    currBid DEC NULL DEFAULT 0,
    bidStatus VARCHAR(32) NULL DEFAULT "Open",
    bidWinner INT NULL DEFAULT 0,  -- fk bidder.id
    PRIMARY KEY (id)
);

-- DROP TABLE bidHistory
CREATE TABLE IF NOT EXISTS bidHistory(
    id INT NOT NULL AUTO_INCREMENT,
    bidder VARCHAR(256) NOT NULL,
    amount DEC NOT NULL DEFAULT 0,
    bidTIME BIGINT DEFAULT 0,
    bidItems INT NOT NULL,  -- fk bidItems.id
    PRIMARY KEY (id)
);

-- DROP TABLE bidder
CREATE TABLE IF NOT EXISTS bidder(
    id INT NOT NULL AUTO_INCREMENT,
    email VARCHAR(1024) NOT NULL,
    passwd VARCHAR(32) NULL,
    PRIMARY KEY (id)
);

DELETE  FROM `bidItems` WHERE id != 0;

INSERT INTO bidItems(title,detail,cat,strtBid,currBid,bidStatus)
VALUES("2018 Acura Sedan, Blue","Clean, near mint condition, with 15k miles. It's a beautiful car.",1,0,0,"Open"),
("2017 Cadillac Escalade, Black","Roll up in this top of the line, fully featured SUV. Custom sound system with bluetooth integration.",1,0,0,"Open"),
("2019 Vespa","Ex-left and said I could keep it. Seriously, I live in Montana and own 12 differnt guns. When am I ever going to ride this? Buy it cheap and you're doing me a favor.",1,0,0,"Open"),
("Duct Tape Wallet","These come in many styles. Win and contact me for a full catalog.", 5,0,0,"Open")
