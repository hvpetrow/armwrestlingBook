import { RouterModule, Routes } from "@angular/router";
import { AuthenticationGuard } from "../core/guards/authentication.guard";
import { LoginComponent } from "./login/login.component";
import { MyTopicsComponent } from "./my-topics/my-topics.component";
import { RegisterComponent } from "./register/register.component";

const routes: Routes = [
    {
        path: 'my-topics',
        canActivate: [AuthenticationGuard],
        component: MyTopicsComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegisterComponent,
    },
];

export const AuthRoutingModule = RouterModule.forChild(routes);