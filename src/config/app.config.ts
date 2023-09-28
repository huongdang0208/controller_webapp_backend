import * as process from "process";

export const appConfig = () => ({
    session: {
        secret: process.env.SESSION_SECRET,
    },
    jwt: {
        secret: process.env.JWT_SECRET,
        liveTime: process.env.JWT_LIVE_TIME || "7d",
        refreshTokenLiveTime: process.env.JWT_REFRESH_TOKEN_LIVE_TIME || "30d",
    },
});
