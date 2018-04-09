// 需要登录权限
module.exports = options => {
    return async (ctx, next) => {
        if (ctx.session && ctx.session.user && ctx.session.user == 'admin'){
            await next();
        }else{
            ctx.redirect("/login");
        }
    }
}