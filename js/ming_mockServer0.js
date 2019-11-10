+async function () {
    M = await new Promise((v) => require('https').get("https://minglie.github.io/js/ming_node.js", (q) => { d = ''; q.on('data', (a) => d += a); q.on('end', () => v(eval(d))) }))

    var app = M.server();
    app.listen(8888);

    M.map_path = "map_path.json";
    M.log_path = "log_path.log";
    M.database_path = "database_path.json";

    app.get("/", async (req, res) => {
        app.redirect("https://minglie.github.io/html/ming_mockServer0/ming_mockServer0.html", req, res)
    })
    app.post("/_run_", async (req, res) => {
        eval(req.params.fun)
        res.send(M.result("ok"))
    })

    app.get("/_clean_", async (req, res) => {
        M.writeFile(M.map_path, "{}")
        M.writeFile(M.database_path, "{}")
        M.writeFile(M.log_path, "{}")
        res.send(M.result("ok"))
    })

    app.get("/_ls", async (req, res) => {
        let s = await M.exec("ls")
        res.send(M.result(s.replace(/\n/g, "   ")))
    })





}();