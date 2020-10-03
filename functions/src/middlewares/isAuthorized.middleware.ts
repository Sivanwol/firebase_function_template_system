import { Request, Response } from "express";
import AclService from "../services/acl.service";

// tslint:disable-next-line: typedef
export function isAuthorized(opts: { hasRoles: string[], hasPermissions: string[], allowSameUser?: boolean }) {
    // tslint:disable-next-line: ban-types
    return (req: Request, res: Response, next: Function) => {
        const { roles, permissions, uid } = res.locals;
        const { id } = req.params;

        if (opts.allowSameUser && id && uid === id) {
            return next();
        }

        if (!roles || !permissions) {
            return res.status(403).send();
        }

        if (AclService.hasMatchRolesOrPermissions(roles, opts.hasRoles, permissions, opts.hasPermissions)) {
            return next();
        }
        return res.status(403).send();
    };
}
