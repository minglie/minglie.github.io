+async function () {
    M = await new Promise((v) => require('https').get("https://minglie.github.io/js/ming_node.js", (q) => { d = ''; q.on('data', (a) => d += a); q.on('end', () => v(eval(d))) }))
    var app = M.server();
    app.listen(8888);
    app.get("/", async (req, res) => {
        app.redirect("https://minglie.github.io/html/ming_mockServer0/ming_mockServer0.html", req, res)
    })
    app.post("/_run_", async (req, res) => {
        eval(req.params.fun)
        res.send(M.result("ok"))
    })
}();