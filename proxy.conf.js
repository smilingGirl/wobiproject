const PROXY_CONFIG = [
    {
        context: [
            "/worlds",
            "/many",
            "/endpoints",
            "/i",
            "/need",
            "/to",
            "/proxy",
        ],
        target: "http://localhost:8080",
        secure: false,
    }
]

module.exports = PROXY_CONFIG;