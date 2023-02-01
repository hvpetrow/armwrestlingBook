import { RouterModule, Routes } from "@angular/router";
import { AuthenticationGuard } from "../core/guards/authentication.guard";
import { AllTopicsComponent } from "./all-topics/all-topics.component";
import { CreateTopicComponent } from "./create-topic/create-topic.component";
import { DetailsComponent } from "./details/details.component";
import { EditTopicComponent } from "./edit-topic/edit-topic.component";
import { SearchComponent } from "./search/search.component";

const routes: Routes = [
    {
        path: 'all-topics',
        pathMatch: 'full',
        component: AllTopicsComponent
    },
    {
        path: 'new',
        canActivate: [AuthenticationGuard],
        component: CreateTopicComponent
    },
    {
        path: ':topicId/edit',
        component: EditTopicComponent
    },
    {
        path: ':topicId/details',
        component: DetailsComponent,
    },
    {
        path: 'search',
        component: SearchComponent,
    },
];

export const ContestRoutingModule = RouterModule.forChild(routes);