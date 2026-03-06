module.exports = (req, res, next) => {
	if (req.method === "POST" && req.path === "/session/bootstrap") {
		res.cookie("session_id", "mock-session-id");
		res.status(204).end();
		return;

	} else if (req.method === "POST") {
		res.status(200).end();
		return;
	}

	next();
};
