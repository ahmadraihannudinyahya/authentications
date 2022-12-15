const createRouter = ({express, handler}) => {
    const router = express.Router();
    router.get('/tokenize', handler.getAccessTokenHandler);
    router.post('/login', handler.loginHandler);
    return router;
}

module.exports = createRouter;