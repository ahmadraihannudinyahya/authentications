const Handler = require('./Handler');
const createRouter = require('./createRouter');

module.exports = ({express, container}) => {
    const handler = new Handler({container});
    return createRouter({express, handler})
}