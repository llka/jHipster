import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FishingSharedModule } from '../../shared';
import {
    LakeFishDemoService,
    LakeFishDemoPopupService,
    LakeFishDemoComponent,
    LakeFishDemoDetailComponent,
    LakeFishDemoDialogComponent,
    LakeFishDemoPopupComponent,
    LakeFishDemoDeletePopupComponent,
    LakeFishDemoDeleteDialogComponent,
    lakeRoute,
    lakePopupRoute,
    LakeFishDemoResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...lakeRoute,
    ...lakePopupRoute,
];

@NgModule({
    imports: [
        FishingSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        LakeFishDemoComponent,
        LakeFishDemoDetailComponent,
        LakeFishDemoDialogComponent,
        LakeFishDemoDeleteDialogComponent,
        LakeFishDemoPopupComponent,
        LakeFishDemoDeletePopupComponent,
    ],
    entryComponents: [
        LakeFishDemoComponent,
        LakeFishDemoDialogComponent,
        LakeFishDemoPopupComponent,
        LakeFishDemoDeleteDialogComponent,
        LakeFishDemoDeletePopupComponent,
    ],
    providers: [
        LakeFishDemoService,
        LakeFishDemoPopupService,
        LakeFishDemoResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FishingLakeFishDemoModule {}
