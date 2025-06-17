import {Ratelimit} from "@upstash/ratelimit"
import {Redis} from "@upstash/redis"

// ratelimiter that allows ten request per ten seconds.
import dotenv from "dotenv";

dotenv.config();

const ratelimit = new Ratelimit({
	redis:Redis.fromEnv(),
	limiter:Ratelimit.slidingWindow(10, "20 s"),
});

export default ratelimit;