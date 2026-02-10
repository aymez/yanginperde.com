module.exports = {
    apps: [
        {
            name: "yanginperde",
            script: "npm",
            args: "start",
            cwd: "/home/gespera/web/yanginperde.com/app",
            instances: 1,
            autorestart: true,
            watch: false,
            max_memory_restart: "1G",
            env: {
                NODE_ENV: "production",
                PORT: 3002,
                HOSTNAME: "127.0.0.1",
            },
        },
    ],
};
