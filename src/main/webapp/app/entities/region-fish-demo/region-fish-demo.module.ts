import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FishingSharedModule } from '../../shared';
import {
    RegionFishDemoService,
    RegionFishDemoPopupService,
    RegionFishDemoComponent,
    RegionFishDemoDetailComponent,
    RegionFishDemoDialogComponent,
    RegionFishDemoPopupComponent,
    RegionFishDemoDeletePopupComponent,
    RegionFishDemoDeleteDialogComponent,
    regionRoute,
    regionPopupRoute,
    RegionFishDemoResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...regionRoute,
    ...regionPopupRoute,
];

@NgModule({
    imports: [
        FishingSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        RegionFishDemoComponent,
        RegionFishDemoDetailComponent,
        RegionFishDemoDialogComponent,
        RegionFishDemoDeleteDialogComponent,
        RegionFishDemoPopupComponent,
        RegionFishDemoDeletePopupComponent,
    ],
    entryComponents: [
        RegionFishDemoComponent,
        RegionFishDemoDialogComponent,
        RegionFishDemoPopupComponent,
        RegionFishDemoDeleteDialogComponent,
        RegionFishDemoDeletePopupComponent,
    ],
    providers: [
        RegionFishDemoService,
        RegionFishDemoPopupService,
        RegionFishDemoResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FishingRegionFishDemoModule {}
