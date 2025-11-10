"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
exports.router = (0, express_1.Router)();
exports.router.get('/health', (req, res) => {
    res.send('ok');
});
exports.router.get('/users', (req, res) => {
    res.send('List of users');
});
exports.router.get('/users/:id', (req, res) => {
    const userId = req.params.id;
    res.send(`Details of user ${userId}`);
});
exports.router.post('/users', (req, res) => {
    res.send('Create a new user');
});
exports.router.put('/users/:id', (req, res) => {
    const userId = req.params.id;
    res.send(`Update user ${userId}`);
});
exports.router.delete('/users/:id', (req, res) => {
    const userId = req.params.id;
    res.send(`Delete user ${userId}`);
});
