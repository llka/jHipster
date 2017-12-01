import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { FishingLakeFishDemoModule } from './lake-fish-demo/lake-fish-demo.module';
import { FishingRiverFishDemoModule } from './river-fish-demo/river-fish-demo.module';
import { FishingRegionFishDemoModule } from './region-fish-demo/region-fish-demo.module';
import { FishingFishFishDemoModule } from './fish-fish-demo/fish-fish-demo.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        FishingLakeFishDemoModule,
        FishingRiverFishDemoModule,
        FishingRegionFishDemoModule,
        FishingFishFishDemoModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FishingEntityModule {}
