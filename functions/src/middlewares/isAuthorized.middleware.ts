import { Request, Response } from "express";
import AclService from "../services/acl.service";

export function isAuthorized(opts: { hasRoles: string[], hasPermissions: string[], allowSameUser?: boolean }) {
    return (req: Request, res: Response, next: Function) => {
        const { roles, permissions, email, uid } = res.locals;
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