import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { RegionFishDemo } from './region-fish-demo.model';
import { RegionFishDemoService } from './region-fish-demo.service';

@Component({
    selector: 'jhi-region-fish-demo-detail',
    templateUrl: './region-fish-demo-detail.component.html'
})
export class RegionFishDemoDetailComponent implements OnInit, OnDestroy {

    region: RegionFishDemo;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private regionService: RegionFishDemoService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInRegions();
    }

    load(id) {
        this.regionService.find(id).subscribe((region) => {
            this.region = region;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInRegions() {
        this.eventSubscriber = this.eventManager.subscribe(
            'regionListModification',
            (response) => this.load(this.region.id)
        );
    }
}
