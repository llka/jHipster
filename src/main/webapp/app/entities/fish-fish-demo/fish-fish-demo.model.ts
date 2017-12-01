import { BaseEntity } from './../../shared';

export const enum FishEatingType {
    'CARNIVORE',
    'OMNIVORE',
    'HERBIVORE'
}

export const enum FishDepth {
    'SURFACE',
    'TOP',
    'MIDDLE',
    'BOTTOM'
}

export class FishFishDemo implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public description?: string,
        public eatingType?: FishEatingType,
        public avgWeight?: number,
        public maxWeight?: number,
        public avgLength?: number,
        public maxLength?: number,
        public maxAge?: number,
        public summerDepth?: FishDepth,
        public rivers?: BaseEntity[],
        public lakes?: BaseEntity[],
    ) {
    }
}
