import { container, DependencyContainer, inject, injectable } from "tsyringe";
import { JsonUtil } from "@spt-aki/utils/JsonUtil";
import { IPostDBLoadMod } from "@spt-aki/models/external/IPostDBLoadMod";
import { DatabaseServer } from "@spt-aki/servers/DatabaseServer";
import { ILogger } from "@spt-aki/models/spt/utils/ILogger";
import { ImporterUtil } from "@spt-aki/utils/ImporterUtil";

import { basename, dirname } from "path";

@injectable()
class iX implements IPostDBLoadMod {
    constructor(
        @inject("DatabaseServer") protected dbServer: DatabaseServer,
        @inject("JsonUtil") protected jsonUtil: JsonUtil,
        @inject("ImporterUtil") protected importer: ImporterUtil,
        @inject("WinstonLogger") protected logger: ILogger,
    ) { }

    public postDBLoad(container: DependencyContainer): void {
        const serverDB = this.dbServer.getTables();

        serverDB.templates.customization["5cde95d97d6c8b647a3769b0"]._props.Prefab.path = "assets/INFILTRATOR_FGIX_TOP.bundle";
        serverDB.templates.customization["5cde95ef7d6c8b04713c4f2d"]._props.Prefab.path = "assets/INFILTRATOR_FGIX_BOTTOM.bundle";
        serverDB.templates.customization["5cde95fa7d6c8b04737c2d13"]._props.Prefab.path = "assets/INFILTRATOR_FGIX_HANDS.bundle";
        this.logger.success("[iX] My camo has replaced the default USEC clothes.");
    }
}

container.registerSingleton(iX);
export const mod = container.resolve(iX);