class Handler{
    constructor({container}){
        this._container = container;

        this.getAccessTokenHandler = this.getAccessTokenHandler.bind(this);
        this.loginHandler = this.loginHandler.bind(this);
    }
    async getAccessTokenHandler(req, res, next){
        try {
            const { token } = req.query;
            const getAccessTokenUsecase = this._container.getInstance('GetAccessTokenUsecase');
            const result = await getAccessTokenUsecase.execute(token);
            res.send({
                status: 'success',
                data: result, 
            });
        } catch (error) {
            next(error);
        }
    }
    async loginHandler(req, res, next){
        try {
            const loginUserUseCase = this._container.getInstance('LoginUserUseCase')
            const result = await loginUserUseCase.execute(req.body);
            res.send({
                status: 'success',
                data: result, 
            });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = Handler;