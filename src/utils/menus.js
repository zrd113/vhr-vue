import {getRequest} from "@/utils/api";

export const initMenu = (router, store) => {
    if (store.state.routes.length > 0) {
        return;
    }
    getRequest("/system/config/menu")
        .then(data => {
            if (data) {
                let fmtRoutes = formatRouter(data);
                router.addRoutes(fmtRoutes);
                store.commit('initRoutes', fmtRoutes);
            }
        })

}

export const formatRouter = (routes) => {
    let fmtRoutes = [];

    routes.forEach(router => {
        let {
            path,
            component,
            name,
            meta,
            iconCls,
            children
        } = router;

        if (children && children instanceof Array) {
            children = formatRouter(children);
        }

        let fmtRouter = {
            path: path,
            name: name,
            iconCls: iconCls,
            meta: meta,
            children: children,
            component(resolve) {
                if (component.startsWith("Home")) {
                    require(['../views/' + component + '.vue'], resolve);
                } else if (component.startsWith("Emp")) {
                    require(['../views/emp/' + component + '.vue'], resolve);
                } else if (component.startsWith("Per")) {
                    require(['../views/per/' + component + '.vue'], resolve);
                } else if (component.startsWith("Sal")) {
                    require(['../views/sal/' + component + '.vue'], resolve);
                } else if (component.startsWith("Sta")) {
                    require(['../views/sta/' + component + '.vue'], resolve);
                } else if (component.startsWith("Sys")) {
                    require(['../views/sys/' + component + '.vue'], resolve);
                }
            }
        }

        fmtRoutes.push(fmtRouter);
    })

    return fmtRoutes;
}