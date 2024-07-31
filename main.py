import os
from pathlib import Path as path

# The decky plugin module is located at decky-loader/plugin
# For easy intellisense checkout the decky-loader code one directory up
# or add the `decky-loader/plugin` path to `python.analysis.extraPaths` in `.vscode/settings.json`
import decky
from settings import SettingsManager as settings_manager

settings = settings_manager(name="config", settings_directory=decky.DECKY_PLUGIN_SETTINGS_DIR)
settings.read()

class Plugin:
    async def log_info(self, msg: str):
        decky.logger.info(msg)

    async def log_error(self, msg: str):
        decky.logger.error(msg)

    async def log_warning(self, msg: str):
        decky.logger.warning(msg)

    async def set_cron(self, cron: str):
        settings.setSetting("cron", cron)

    async def get_cron(self):
        return settings.getSetting("cron")

    async def set_min_battery(self, min_battery: int):
        settings.setSetting("min_battery", min_battery)

    async def get_min_battery(self):
        return settings.getSetting("min_battery", 50)

    async def get_battery_level(self):
        battery_path = get_battery_path()
        if battery_path and (battery_path / "capacity").exists():
            try:
                with open(battery_path / "capacity", "r") as f:
                    return int(f.read().strip())
            except Exception as e:
                pass
        # No battery system, return an unbearable number
        return 101

    async def get_is_charging(self):
        battery_path = get_battery_path()
        if battery_path and (battery_path / "status").exists():
            try:
                with open(battery_path / "status", "r") as f:
                    return (f.read().strip() != "Discharging")
            except Exception as e:
                pass
        # No battery system, don't worry about it
        return True

def get_battery_path():
    power_supply = path("/sys/class/power_supply/")
    battery_list = sorted(power_supply.glob("BAT*"))
    if battery_list:
        return battery_list[0]
    return None
