import { BaseEntity } from './../../shared';

export class RegionFishDemo implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public postalCode?: string,
        public mainCity?: string,
        public lake?: BaseEntity,
        public river?: BaseEntity,
    ) {
    }
}
