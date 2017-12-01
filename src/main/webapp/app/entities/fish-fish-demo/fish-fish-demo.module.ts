import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FishingSharedModule } from '../../shared';
import {
    FishFishDemoService,
    FishFishDemoPopupService,
    FishFishDemoComponent,
    FishFishDemoDetailComponent,
    FishFishDemoDialogComponent,
    FishFishDemoPopupComponent,
    FishFishDemoDeletePopupComponent,
    FishFishDemoDeleteDialogComponent,
    fishRoute,
    fishPopupRoute,
    FishFishDemoResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...fishRoute,
    ...fishPopupRoute,
];

@NgModule({
    imports: [
        FishingSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        FishFishDemoComponent,
        FishFishDemoDetailComponent,
        FishFishDemoDialogComponent,
        FishFishDemoDeleteDialogComponent,
        FishFishDemoPopupComponent,
        FishFishDemoDeletePopupComponent,
    ],
    entryComponents: [
        FishFishDemoComponent,
        FishFishDemoDialogComponent,
        FishFishDemoPopupComponent,
        FishFishDemoDeleteDialogComponent,
        FishFishDemoDeletePopupComponent,
    ],
    providers: [
        FishFishDemoService,
        FishFishDemoPopupService,
        FishFishDemoResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FishingFishFishDemoModule {}
