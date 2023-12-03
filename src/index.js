import {app} from "./application/app.js";

const port = process.env.PORT || 5000
app.listen(port, '192.168.100.88', () => {
	console.log("server running");
})