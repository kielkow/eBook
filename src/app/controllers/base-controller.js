const LivroController = require('./livro-controller')
const templates = require('../views/templates')

class BaseController {

    static rotas() {
        return {
            home: '/',
            login: '/login'
        }
    }

    buscaHome() {
        return function (req, resp) {
            resp.marko(
                templates.base.home
            );
        }
    }

    login() {
        return function (req, resp) {
            resp.marko(
                templates.base.login
            )
        }
    }

    efetuaLogin() {
        return function (req, resp, next) {

            passport.authenticate('local', (erro, usuario, info) => {
                if (info) {
                    return resp.marko(templates.base.login)
                }

                if (erro) {
                    return next(erro)
                }

                req.login(usuario, (erro) => {
                    if (erro) {
                        return next(erro)
                    }

                    return resp.redirect(LivroController.rotas().lista)
                })
            })
            (req, resp, next)
        }
    }
}

module.exports = BaseController