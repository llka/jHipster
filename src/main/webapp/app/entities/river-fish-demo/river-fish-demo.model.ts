import { BaseEntity } from './../../shared';

export class RiverFishDemo implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public averageSpeed?: number,
        public lengthInKm?: number,
        public regions?: BaseEntity[],
        public fishRiver?: BaseEntity,
    ) {
    }
}
