import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FishingSharedModule } from '../../shared';
import {
    RiverFishDemoService,
    RiverFishDemoPopupService,
    RiverFishDemoComponent,
    RiverFishDemoDetailComponent,
    RiverFishDemoDialogComponent,
    RiverFishDemoPopupComponent,
    RiverFishDemoDeletePopupComponent,
    RiverFishDemoDeleteDialogComponent,
    riverRoute,
    riverPopupRoute,
    RiverFishDemoResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...riverRoute,
    ...riverPopupRoute,
];

@NgModule({
    imports: [
        FishingSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        RiverFishDemoComponent,
        RiverFishDemoDetailComponent,
        RiverFishDemoDialogComponent,
        RiverFishDemoDeleteDialogComponent,
        RiverFishDemoPopupComponent,
        RiverFishDemoDeletePopupComponent,
    ],
    entryComponents: [
        RiverFishDemoComponent,
        RiverFishDemoDialogComponent,
        RiverFishDemoPopupComponent,
        RiverFishDemoDeleteDialogComponent,
        RiverFishDemoDeletePopupComponent,
    ],
    providers: [
        RiverFishDemoService,
        RiverFishDemoPopupService,
        RiverFishDemoResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FishingRiverFishDemoModule {}
