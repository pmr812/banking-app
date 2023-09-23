const express = require('express');
const cors = require("cors");
const data = require('./data/task_data.json');
const app = express();
const port = 3000;

const whitelist = ["http://localhost:3001"];
const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error("Not allowed by CORS"))
        }
    },
    credentials: true,
}
app.use(cors(corsOptions))

app.get('/api/users', (req, res) => {
    res.json({ users: data.users });
})

app.get('/api/user/:id', (req, res) => {
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 50;
    const startIndex = (page - 1) * pageSize;
    const endIndex = page * pageSize;
    const sortByAttr = req.query.sortBy ? req.query.sortBy : 'sourceUserName';
    const sortDesc = !!req.query.desc;
    const id = req.params.id;

    const userTransactions = data.transactions.filter(({ sourceId, targetId }) => sourceId === id || targetId === id);
    const mappedTransactions = userTransactions.map(transaction => ({
        sourceUserName: data.users.find(({ id }) => id === transaction.sourceId).name,
        targetUserName: data.users.find(({ id }) => id === transaction.targetId).name,
        ...transaction
    }))
    const filteredTransactions = mappedTransactions.filter(({ sourceUserName, targetUserName, amount }) => {
        if (req.query.from && !sourceUserName.toLowerCase().includes(req.query.from.toLowerCase())) return false;
        if (req.query.to && !targetUserName.toLowerCase().includes(req.query.to.toLowerCase())) return false;
        if (req.query.minAmount && amount < req.query.minAmount) return false;
        if (req.query.maxAmount && amount > req.query.maxAmount) return false;
        return true;
    });
    const sortedTransactions = filteredTransactions.sort((a, b) => {
        if (sortByAttr === 'amount') return a[sortByAttr] - b[sortByAttr];
        if (sortByAttr === 'sourceUserName' || sortByAttr === 'targetUserName') {
            if (a[sortByAttr] < b[sortByAttr]) {
                return -1;
            }
            if (a[sortByAttr] > b[sortByAttr]) {
                return 1;
            }
            return 0;
        }
    });
    if (sortDesc) sortedTransactions.reverse();
    const paginatedTransactions = sortedTransactions.slice(startIndex, endIndex);

    let accountBalance = 0;
    for (let i = 0; i < userTransactions.length; ++i) {
        if (userTransactions[i].sourceId === id) {
            accountBalance -= userTransactions[i].amount;
        } else {
            accountBalance += userTransactions[i].amount;
        }
    }

    res.json({
        id: id,
        name: data.users.find(user => user.id === id).name,
        balance: accountBalance,
        transactions: {
            items: paginatedTransactions,
            totalPages: Math.ceil(filteredTransactions.length / pageSize)
        }
    });
})

app.listen(port, () => console.log(`Express app running on port ${port}!`));