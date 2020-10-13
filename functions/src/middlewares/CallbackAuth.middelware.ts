import * as passport from 'passport';
import { functionConfig } from '../common/utils';
const config = functionConfig();
export async function CallBackAuth(req: Request, res: Response, next: Function): Promise<any> {
    return passport.authenticate("auth0", (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.redirect("/login");
        }
        req.logIn(user, (err) => {
            if (err) {
                return next(err);
            }
            const returnTo = req.session.returnTo;
            delete req.session.returnTo;
            res.redirect(returnTo || "/");
        });
    })(req, res, next);
}
