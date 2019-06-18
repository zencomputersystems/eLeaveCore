import { Module, HttpModule } from "@nestjs/common";
import { AuthModule } from "src/auth/auth.module";
import { PassportModule } from "@nestjs/passport";
import { DreamFactory } from "src/config/dreamfactory";
import { DashboardController } from "./dashboard.controller";

@Module({
    modules: [
        AuthModule,
        PassportModule.register({ session: false }),
        HttpModule.register({ headers: { 'Content-Type': 'application/json', 'X-Dreamfactory-API-Key': DreamFactory.df_key } })
    ],
    providers: [
    ],
    controllers: [DashboardController]
})
export class DashboardModule { }