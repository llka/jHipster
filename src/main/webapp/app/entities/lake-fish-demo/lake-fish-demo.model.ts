import { BaseEntity } from './../../shared';

export class LakeFishDemo implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public averageDepth?: number,
        public maxDepth?: number,
        public region?: BaseEntity,
        public fishLake?: BaseEntity,
    ) {
    }
}
