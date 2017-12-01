import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { RiverFishDemo } from './river-fish-demo.model';
import { RiverFishDemoService } from './river-fish-demo.service';

@Component({
    selector: 'jhi-river-fish-demo-detail',
    templateUrl: './river-fish-demo-detail.component.html'
})
export class RiverFishDemoDetailComponent implements OnInit, OnDestroy {

    river: RiverFishDemo;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private riverService: RiverFishDemoService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInRivers();
    }

    load(id) {
        this.riverService.find(id).subscribe((river) => {
            this.river = river;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInRivers() {
        this.eventSubscriber = this.eventManager.subscribe(
            'riverListModification',
            (response) => this.load(this.river.id)
        );
    }
}
