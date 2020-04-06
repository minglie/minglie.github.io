+async function () {
    M = await new Promise((v) => require('https').get("https://minglie.github.io/js/ming_node.js", (q) => { d = ''; q.on('data', (a) => d += a); q.on('end', () => v(eval(d))) }))
    var app = M.server();
    app.listen(8888);
    app.get("/", async (req, res) => {
       app.redirect("/index.html", req, res)
    })

	app.get("/pagelist",async (req,res)=>{ 
		//如果是linux系统应改用 M.exec("ls static")
		let s= await M.exec("dir static /b")
		res.send(M.result(s))
	})
}();