import { call } from "@decky/api";
import DeckyLogger from "./deps/logger";

class Logger extends DeckyLogger {
    async info(...args: any[]) {
        super.log(this.now(), ...args);
        call<[msg: string], void>("log_info", args.join(' '));
    }

    async error(...args: any[]) {
        super.error(this.now(), ...args);
        call<[msg: string], void>("log_error", args.join(' '));
    }

    async warning(...args: any[]) {
        super.warn(this.now(), ...args);
        call<[msg: string], void>("log_warning", args.join(' '));
    }

    private now(): string {
        return (new Date).toISOString();
    }
}

const logger = new Logger("DeckAutoUpdate");

export default logger;
