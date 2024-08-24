import { call } from "@decky/api";
import log from "./logger";

export async function setCron(cron: string) {
    log.info("Updating cron: " + cron);
    call<[cron: string], void>("set_cron", cron);
}

export async function getCron(): Promise<string> {
    try {
        return await call<[], string>("get_cron");
    } catch (e) {
        log.error("Failed to get cron: " + e);
    }

    return "";
}

export async function setMinBattery(minBattery: number) {
    log.info("Updating min_battery: " + minBattery);
    call<[min_battery: number], void>("set_min_battery", minBattery);
}

export async function getMinBattery(): Promise<number> {
    try {
        return await call<[], number>("get_min_battery");
    } catch (e) {
        log.error("Failed to get min_battery: " + e);
    }

    return -1;
}

export async function getBatteryLevel(): Promise<number> {
    try {
        return await call<[], number>("get_battery_level");
    } catch (e) {
        log.error("Failed to get battery_level: " + e);
    }

    return 101;
}

export async function getIsCharging(): Promise<boolean> {
    try {
        return await call<[], boolean>("get_is_charging");
    } catch (e) {
        log.error("Failed to get is_charging: " + e);
    }

    return true;
}
